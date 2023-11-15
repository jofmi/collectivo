// Register extensions into nuxt memory and get registered extensions
import { CollectivoMigration } from "./migrations";
import { validateStrict, compareVersions } from "compare-versions";

// This object defines an extension
export interface ExtensionConfig {
  name: string;
  version: string;
  description?: string;
  migrations?: CollectivoMigration[];
  exampleDataFn?: () => Promise<void>;
}

// Store for loaded extensions
var registeredExtensions: ExtensionConfig[] = [];

// Public function to get resistered extensions
export function getRegisteredExtensions() {
  return [...registeredExtensions];
}

// Public function to register a new extension
export function registerExtension(ext: ExtensionConfig) {
  try {
    loadExtension(ext);
  } catch (error) {
    logger.log({
      level: "error",
      message: `Error registering extension: ${ext.name} v${ext.version}`,
      error: error,
    });
  }
}

// To avoid name conflicts, the following extension names are forbidden
const FORBIDDEN_EXTENSION_NAMES = [
  "directus",
  "sort",
  "user",
  "users",
  "date",
  "email",
  "content",
  "profile",
  "files",
  "name",
  "notes",
  "version",
  "migration",
  "description",
  "status",
  "messages",
  "api",
  "tiles",
  "type",
  "subtype",
  "tags",
  "extensions",
  "settings",
];

// Load extension and run setup and migration functions
function loadExtension(ext: ExtensionConfig) {
  // Check that extension name does not contain an underscore
  if (ext.name.includes("_")) {
    throw new Error(
      `Extension name '${ext.name}' should not contain underscores`
    );
  }

  // Validate version string
  if (!validateStrict(ext.version)) {
    throw new Error(`Extension version '${ext.version}' is not valid`);
  }

  // Check forbidden names
  if (FORBIDDEN_EXTENSION_NAMES.includes(ext.name)) {
    throw new Error(`Extension name '${ext.name}' is forbidden`);
  }

  // Check if extension is already registered in this server instance
  if (registeredExtensions.find((f) => f.name === ext.name)) {
    throw new Error(`Extension setup already run: ${ext.name}`);
  }

  if (ext.migrations) {
    // Check that no version exists twice
    const versions = ext.migrations.map((m) => m.version);
    const uniqueVersions = [...new Set(versions)];
    if (uniqueVersions.length !== versions.length) {
      throw new Error(
        `Extension ${ext.name} has duplicate versions in migrations`
      );
    }

    // Sort migrations based on version
    ext.migrations.sort((a, b) => compareVersions(a.version, b.version));

    // Check that latest migration is not above extension version
    const latestMigration = ext.migrations[ext.migrations.length - 1];
    if (compareVersions(latestMigration?.version || "0.0.0", ext.version) > 0) {
      throw new Error(
        `Extension ${ext.name} has migration above extension version`
      );
    }
  }

  // Add config to memory
  registeredExtensions.push(ext);
}
