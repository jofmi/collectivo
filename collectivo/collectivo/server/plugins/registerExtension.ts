import pkg from "../../package.json";

import m001_extensions from "../migrations/001_extensions";
import m002_settings from "../migrations/002_settings";
import m003_tags from "../migrations/003_tags";
import m004_tiles from "../migrations/004_tiles";
import m005_messages from "../migrations/005_messages";

import exampleDataFn from "../exampleData/exampleData";

// Register extension on startup
export default defineNitroPlugin((nitroApp) => {
  registerExtension({
    name: "collectivo",
    version: pkg.version,
    migrations: [
      m001_extensions,
      m002_settings,
      m003_tags,
      m004_tiles,
      m005_messages,
    ],
    exampleDataFn: exampleDataFn,
  });
});
