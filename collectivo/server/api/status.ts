export default defineEventHandler(async (_event) => {
  let directusHealthy = true;

  try {
    await useDirectusAdmin();
  } catch (e) {
    directusHealthy = false;
    console.error("Directus refresh error", e);
  }

  return {
    healthy: {
      collectivo: true,
      directus: directusHealthy,
    },
  };
});
