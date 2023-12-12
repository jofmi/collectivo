import pkg from "../../package.json";
// import m1 from "../migrations/001_settings";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerExtension({
    name: "mila",
    description: pkg.description,
    version: pkg.version,
    // schemas: [m1],
  });
});
