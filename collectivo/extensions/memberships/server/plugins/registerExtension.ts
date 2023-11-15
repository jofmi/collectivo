import pkg from "../../package.json";
import m001_memberships from "../migrations/001_memberships";
import exampleDataFn from "../exampleData/exampleData";

// Register extension on startup
export default defineNitroPlugin((nitroApp) => {
  registerExtension({
    name: "memberships",
    description: pkg.description,
    version: pkg.version,
    migrations: [m001_memberships],
    exampleDataFn: exampleDataFn,
  });
});
