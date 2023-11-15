// Run pending migrations for a set of extensions, based on current state in db
export default defineEventHandler(async (event) => {
  // Protect route with API Token
  verifyCollectivoApiToken(event);
  await refreshDirectus();

  // Read parameters
  const query = getQuery(event);
  const extension = query["extension"];
  const migrateAllParam = parseBoolean(query["all"], false);
  const force = parseBoolean(query["force"], false);
  const down = parseBoolean(query["down"], false);
  const version = query["version"] as string;
  const exampleData = parseBoolean(query["exampleData"], false);

  // Get extension configs
  const exts = getRegisteredExtensions();

  // Case 1: Migrate all extensions
  if (migrateAllParam) {
    migrateAll(exts, exampleData);
    return {
      detail: "Running migrations for all extensions",
    };
  }

  // Case 1.5: Only create example data
  if (!extension && exampleData) {
    for (const ext of exts) {
      if (ext.exampleDataFn) {
        await ext.exampleDataFn();
      }
    }
    return {
      detail: "Creating example data for all extensions",
    };
  }

  // Case 2: Migrate a specific extension
  const ext = exts.find((f: any) => f.name === extension);
  if (!ext) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot find extension with name " + extension,
    });
  }

  // Case 2-1: Force a single migration
  if (force) {
    migrateCustom(ext, version, down, exampleData);
    const direction = down ? "down" : "up";
    return {
      detail: `Running forced migration ${version} (${direction}) of ${ext.name}`,
    };
  }

  // Case 2-2: Migrate extension to specified version
  migrateExtension(ext, version, exampleData);
  return {
    detail: "Running migrations for extension " + extension,
  };
});
