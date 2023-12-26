// Register a new membership
export default defineEventHandler(async (event) => {
  console.log("Registering new membership");

  const body = await readBody(event);

  await refreshDirectus();

  return {
    status: 200,
    body: {
      message: "Membership registered",
    },
  };
});
