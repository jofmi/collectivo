import { createDirectus, authentication, rest, readMe } from "@directus/sdk";

// Test authentication from server side
export default defineEventHandler(async (event) => {
  console.log("Registering new membership");

  let token = getRequestHeader(event, "Authorization");

  if (token?.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  const client = createDirectus("http://localhost:8055")
    .with(authentication())
    .with(rest());

  if (!token) {
    throw new Error("No token found");
  }

  client.setToken(token);

  const user = await client.request(
    readMe({
      fields: ["id", "first_name", "last_name", "email"],
    })
  );

  return {
    message: "Authentication successful",
    user: user,
  };
});
