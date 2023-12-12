import pkg from "../../package.json";
import m001_example_migration from "../migrations/001_example_migration";
import examples from "../exampleData/exampleData";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerExtension({
    name: "example",
    description: pkg.description,
    version: pkg.version,
    migrations: [m001_example_migration],
    examples: examples,
  });
});
