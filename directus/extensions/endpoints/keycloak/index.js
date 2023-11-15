function defineEndpoint(config) {
    return config;
}

var index = defineEndpoint((router) => {
  router.get(
    "/tokenthroughkeycloak",
    (_req, res) => res.send("Hello, World!")
  );
});

export { index as default };
