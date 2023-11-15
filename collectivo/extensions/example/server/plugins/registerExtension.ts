import pkg from "../../package.json";
import m001_example_migration from "../migrations/001_example_migration";
import exampleDataFn from "../exampleData/exampleData";

// Register extension on startup
export default defineNitroPlugin((nitroApp) => {
  registerExtension({
    name: "example",
    description: pkg.description,
    version: pkg.version,
    migrations: [m001_example_migration],
    exampleDataFn: exampleDataFn,
  });
});
