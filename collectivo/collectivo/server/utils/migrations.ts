import { createItem, readItems, updateItem } from "@directus/sdk";
import ExtensionBaseMigration from "../schemas/001_extensions";
import { ExtensionConfig } from "./extensions";

// Run pending migrations for a set of extensions, based on db state
export async function migrateAll(
  exts: ExtensionConfig[],
  createExampleData: boolean = false
) {
  const extsDb = await getExtensionsFromDb();

  for (const ext of exts) {
    logger.info(
      `Starting: Migrating schema of extension ${ext.name} to latest`
    );

    await runMigrations(ext, extsDb);

    logger.info(
      `Successful: Migrating schema of extension ${ext.name} to latest`
    );
  }

  if (createExampleData) {
    for (const ext of exts) {
      if (ext.examples) {
        logger.info(
          `Starting: Creating example data for extension ${ext.name}`
        );

        await ext.examples();

        logger.info(
          `Successful: Creating example data for extension ${ext.name}`
        );
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
  const log_message = `Migrating schema of extension ${ext.name} to v${to})`;
  logger.info("Starting: " + log_message);
  const extsDb = await getExtensionsFromDb();
  await runMigrations(ext, extsDb, to);
  logger.info("Successful: " + log_message);

  if (createExampleData) {
    if (ext.examples) {
      await ext.examples();
    }

    logger.info(`Successful: Creating example data of extension '${ext.name}'`);
  }
}

// Get current state of extensions from the database
async function getExtensionsFromDb() {
  const directus = await useDirectusAdmin();
  let extensions: any = null;

  try {
    extensions = await directus.request(readItems("collectivo_extensions"));

    if (extensions.length === 0) {
      throw new Error("Extensions collection is empty");
    }

    return extensions;
  } catch (e) {
    // Run initial migration if extensions collection is not found
    try {
      await ExtensionBaseMigration.apply();

      await directus.request(
        createItem("collectivo_extensions", {
          name: "collectivo",
          version: "0.0.0",
          schema_version: "0.0.0",
          schema_is_latest: false,
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
  createExampleData: boolean = false
) {
  const log_message = `Applying schema v${version} of extension '${ext.name}'`;
  logger.info("Starting: " + log_message);

  if (!ext.schemas) {
    throw new Error(`Schema v${version} of extension '${ext.name}' not found`);
  }

  const schema = ext.schemas.find((f) => f.version === version);

  if (!schema) {
    throw new Error(`Schema v${version} of extension '${ext.name}' not found`);
  }

  try {
    await schema.run_before();
    await schema.apply();
    await schema.run_after();
  } catch (e) {
    logger.error("Error: " + log_message);

    throw e;
  }

  logger.info("Successful: " + log_message);

  if (createExampleData) {
    if (ext.examples) {
      await ext.examples();
    }
  }

  logger.info(`Successful: Creating example data of extension '${ext.name}'`);
}

async function runMigrations(ext: ExtensionConfig, extsDb: any[], to?: string) {
  const directus = await useDirectusAdmin();

  // Get schema state of current extension from database
  let extensionDb = extsDb.find((f) => f.name === ext.name);

  // Register extension if not found
  if (!extensionDb) {
    try {
      extensionDb = await directus.request(
        createItem("collectivo_extensions", {
          name: ext.name,
          version: ext.version,
          schema_version: "0.0.0",
          schema_is_latest: false,
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
  if (!ext.schemas) return;
  const migrationState: string = extensionDb ? extensionDb.migration : "0.0.0";

  // Target is either "to" or that latest migration
  const migrationTarget = to != undefined ? to : ext.schemas.at(-1)?.version;

  if (!migrationTarget) {
    throw new Error(`Error reading target migration version for ${ext.name}`);
  }

  let migrationStateIndex = ext.schemas.findIndex(
    (f) => f.version === migrationState
  );

  const migrationTargetIndex = ext.schemas.findIndex(
    (f) => f.version === migrationTarget
  );

  if (migrationState === migrationTarget) {
    logger.info(`Skipping migrations for ${ext.name} (already up to date)`);
    return;
  }

  logger.info(
    `Migrating ${ext.name} from ${migrationState} to ${migrationTarget}`
  );

  if (migrationStateIndex < migrationTargetIndex) {
    for (const migration of ext.schemas.slice(
      migrationStateIndex + 1,
      migrationTargetIndex + 1
    )) {
      try {
        // TODO: checkDependencies(migration, extsDb);
        await migration.run_before();
        await migration.apply();
        await migration.run_after();
        migrationStateIndex++;

        await directus.request(
          updateItem("collectivo_extensions", extensionDb.id, {
            schema_version: ext.schemas[migrationStateIndex].version,
            schema_is_latest: migrationStateIndex === ext.schemas.length - 1,
          })
        );
      } catch (e) {
        logger.error(
          `Error applying schema ${ext.schemas[migrationStateIndex].version} of ${ext.name}`
        );

        throw e;
      }
    }
  } else if (migrationStateIndex > migrationTargetIndex) {
    for (const _ of ext.schemas
      .slice(migrationTargetIndex, migrationStateIndex)
      .reverse()) {
      try {
        throw new Error("Rollback not implemented");
        // migrationStateIndex--;

        // await directus.request(
        //   updateItem("collectivo_extensions", extensionDb.id, {
        //     migration: ext.schemas[migrationStateIndex].version,
        //   })
        // );
      } catch (e) {
        logger.error(
          `Error running migration ${ext.schemas[migrationStateIndex].version} of ${ext.name}`
        );

        throw e;
      }
    }
  }
}

// TODO: Dependency checking
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
