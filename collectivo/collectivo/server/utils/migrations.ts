import { createItem, readItems, updateItem } from "@directus/sdk";
import ExtensionBaseMigration from "../migrations/001_extensions";
import { ExtensionConfig } from "./extensions";

// Type definition for a dependency of a migration
export interface CollectivoMigrationDependency {
  extension: string;
  version: string;
}

// Type definition for a migration of an extension
export interface CollectivoMigration {
  extension: string;
  version: string;
  description?: string;
  up: () => Promise<void>;
  down: () => Promise<void>;
  dependencies?: CollectivoMigrationDependency[];
}

// Utility function to create a migration
export function createMigration(
  extension: string,
  version: string,
  up: () => Promise<void>,
  down: () => Promise<void>,
  dependencies?: CollectivoMigrationDependency[]
): CollectivoMigration {
  return {
    extension: extension,
    version: version,
    up: up,
    down: down,
    dependencies: dependencies,
  } as CollectivoMigration;
}

// Run pending migrations for a set of extensions, based on db state
export async function migrateAll(
  exts: ExtensionConfig[],
  createExampleData: boolean = false
) {
  const extsDb = await getExtensionsFromDb();
  for (const ext of exts) {
    await runMigrations(ext, extsDb);
  }
  if (createExampleData) {
    for (const ext of exts) {
      if (ext.exampleDataFn) {
        await ext.exampleDataFn();
      }
    }
  }
}

// Run migrations for an extension up to a specified target version
export async function migrateExtension(
  ext: ExtensionConfig,
  to?: string, // Target migration version. If not specified, to latest.
  createExampleData: boolean = false
) {
  const extsDb = await getExtensionsFromDb();
  await runMigrations(ext, extsDb, to);
  if (createExampleData) {
    if (ext.exampleDataFn) {
      await ext.exampleDataFn();
    }
  }
}

// Get current state of extensions from the database
async function getExtensionsFromDb() {
  const directus = await useDirectus();
  var extensions: any = null;

  try {
    extensions = await directus.request(readItems("collectivo_extensions"));
    if (extensions.length === 0) {
      throw new Error("Extensions collection is empty");
    }
    return extensions;
  } catch (e) {
    // Run initial migration if extensions collection is not found
    try {
      await ExtensionBaseMigration.up();
      await directus.request(
        createItem("collectivo_extensions", {
          name: "collectivo",
          version: "0.0.0",
          migration: "0.0.0",
        })
      );
    } catch (e2) {
      logger.log({
        level: "error",
        message: `Error reading or creating extensions collection`,
        error: e,
      });
      logger.log({
        level: "error",
        message: `Error reading or creating extensions collection`,
        error: e2,
      });
      throw new Error("Error reading or creating extensions collection");
    }
    extensions = await directus.request(readItems("collectivo_extensions"));
    if (extensions.length === 0) {
      return undefined;
    }
    return extensions;
  }
}

// Run specific migration for an extension, regardless of db state
export async function migrateCustom(
  ext: ExtensionConfig,
  version: string,
  down?: boolean,
  createExampleData: boolean = false
) {
  const direction = down ? "down" : "up";
  logger.info(
    `Forced migration ${version} (${direction}) of ${ext.name} starting`
  );
  if (!ext.migrations) {
    throw new Error(`Migration ${version} of ${ext.name} not found`);
  }

  const migration = ext.migrations.find((f) => f.version === version);
  if (!migration) {
    throw new Error(`Migration ${version} of ${ext.name} not found`);
  }
  try {
    if (down) {
      await migration.down();
    } else {
      await migration.up();
    }
  } catch (e) {
    logger.error(
      `Error running forced migration v${version} (${direction}) of extension '${ext.name}'`
    );
    throw e;
  }

  logger.info(
    `Forced migration v${version} (${direction}) of extension '${ext.name}' successful`
  );

  if (createExampleData) {
    if (ext.exampleDataFn) {
      await ext.exampleDataFn();
    }
  }
  logger.info(`Creating example data of extension '${ext.name}' successful`);
}

async function runMigrations(ext: ExtensionConfig, extsDb: any[], to?: string) {
  const directus = await useDirectus();

  // Get state of current extension from database
  var extensionDb = extsDb.find((f) => f.name === ext.name);

  // Register extension if not found
  if (!extensionDb) {
    try {
      extensionDb = await directus.request(
        createItem("collectivo_extensions", {
          name: ext.name,
          version: ext.version,
          migration: "0.0.0",
        })
      );
    } catch (e) {
      logger.error(e);
      throw new Error(`Error creating extension ${ext.name}`);
    }
  }

  // Update version if extension is already registered
  else if (extensionDb.version !== ext.version) {
    await directus.request(
      updateItem("collectivo_extensions", extensionDb.id, {
        version: ext.version,
      })
    );
  }

  // Run selected migrations
  if (!ext.migrations) return;
  var migrationState: string = extensionDb ? extensionDb.migration : "0.0.0";

  // Target is either "to" or that latest migration
  const migrationTarget = to != undefined ? to : ext.migrations.at(-1)?.version;
  if (!migrationTarget) {
    throw new Error(`Error reading target migration version for ${ext.name}`);
  }

  var migrationStateIndex = ext.migrations.findIndex(
    (f) => f.version === migrationState
  );
  var migrationTargetIndex = ext.migrations.findIndex(
    (f) => f.version === migrationTarget
  );

  if (migrationState === migrationTarget) return;

  logger.info(
    `Migrating ${ext.name} from ${migrationState} to ${migrationTarget}`
  );

  if (migrationStateIndex < migrationTargetIndex) {
    for (const migration of ext.migrations.slice(
      migrationStateIndex + 1,
      migrationTargetIndex + 1
    )) {
      try {
        // TODO: checkDependencies(migration, extsDb);
        await migration.up();
        migrationStateIndex++;
        await directus.request(
          updateItem("collectivo_extensions", extensionDb.id, {
            migration: ext.migrations[migrationStateIndex].version,
          })
        );
      } catch (e) {
        logger.error(
          `Error running migration ${ext.migrations[migrationStateIndex].version} of ${ext.name}`
        );
        throw e;
      }
    }
  } else if (migrationStateIndex > migrationTargetIndex) {
    for (const migration of ext.migrations
      .slice(migrationTargetIndex, migrationStateIndex)
      .reverse()) {
      try {
        await migration.down();
        migrationStateIndex--;
        await directus.request(
          updateItem("collectivo_extensions", extensionDb.id, {
            migration: ext.migrations[migrationStateIndex].version,
          })
        );
      } catch (e) {
        logger.error(
          `Error running migration ${ext.migrations[migrationStateIndex].version} of ${ext.name}`
        );
        throw e;
      }
    }
  }

  logger.info(`Migrations of ${ext.name} successful`);
}

// function checkDependencies(
//   migration: CollectivoMigration,
//   extsDb: any[]
// ): void {
//   if (!migration.dependencies) return;
//   for (const dep of migration.dependencies) {
//     const depDb = extsDb.find((f) => f.name === dep.extensionName);
//     if (!depDb || depDb.migration < dep.migrationId) {
//       throw new Error(
//         `Dependency not met: ${dep.extensionName} must be at migration ${dep.migrationId}`
//       );
//     }
//   }
// }
