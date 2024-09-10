import pkg from "../../package.json";
import s001_example_migration from "../schemas/001_schema_example";
import examples from "../examples/examples";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerExtension({
    name: "example",
    description: pkg.description,
    version: pkg.version,
    schemas: [s001_example_migration],
    examples: examples,
  });
});
