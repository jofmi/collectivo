// Register a new membership
export default defineEventHandler(async (event) => {
  console.log("Registering new membership");

  await refreshDirectus();
});
