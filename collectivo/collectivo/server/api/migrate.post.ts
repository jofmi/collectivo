// Run pending migrations for a set of extensions, based on current state in db
export default defineEventHandler(async (event) => {
  // Protect route with API Token
  verifyCollectivoApiToken(event);
  await refreshDirectus();

  // Read parameters
  const query = getQuery(event);
  const extension = query["extension"];
  const migrateAll = parseBoolean(query["all"], false);
  const force = parseBoolean(query["force"], false);
  const down = parseBoolean(query["down"], false);
  const version = query["version"] as string;
  const exampleData = parseBoolean(query["exampleData"], false);

  // Get extension configs
  const exts = getRegisteredExtensions();

  if (migrateAll) {
    // Migrate all extensions
    for (const ext of exts) {
      migrateExtension(ext, version, exampleData);
    }
    return {
      detail: "Running migrations for all extensions",
    };
  }

  // Migrate a specific extension
  const ext = exts.find((f: any) => f.name === extension);
  if (!ext) {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot find extension with name " + extension,
    });
  }

  if (force) {
    migrateCustom(ext, version, down, exampleData);
    const direction = down ? "down" : "up";
    return {
      detail: `Running forced migration ${version} (${direction}) of ${ext.name}`,
    };
  }

  migrateExtension(ext, version, exampleData);
  return {
    detail: "Running migrations for extension " + extension,
  };
});
