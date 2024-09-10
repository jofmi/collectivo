import { defineEndpoint } from "@directus/extensions-sdk";
// Get directus access and refresh token

export default defineEndpoint((router) => {
  router.get("/tokenthroughkeycloak", (_req, res) =>
    res.send("Hello, World!")
  );
});
