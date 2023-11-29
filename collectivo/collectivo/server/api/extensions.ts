// Return list of registered extensions
export default defineEventHandler((_event) => {
  // verifyCollectivoApiToken(event);
  const registeredExtensions = [];

  for (const ext of getRegisteredExtensions()) {
    registeredExtensions.push({
      name: ext.name,
      version: ext.version,
    });
  }

  return {
    registeredExtensions: registeredExtensions,
  };
});
