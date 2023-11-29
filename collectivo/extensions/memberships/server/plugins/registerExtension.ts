import pkg from "../../package.json";
import m001_memberships from "../migrations/001_memberships";
import m002_profile from "../migrations/002_profile";
import exampleDataFn from "../exampleData/exampleData";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerExtension({
    name: "memberships",
    description: pkg.description,
    version: pkg.version,
    migrations: [m001_memberships, m002_profile],
    exampleDataFn: exampleDataFn,
  });
});
