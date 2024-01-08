import pkg from "../../package.json";
import m001_memberships from "../schemas/001_memberships";
import m002_profile from "../schemas/002_profile";
import examples from "../examples/examples";

// Register extension on startup
export default defineNitroPlugin(() => {
  registerExtension({
    name: "memberships",
    description: pkg.description,
    version: pkg.version,
    schemas: [
      combineSchemas("memberships", "0.0.1", [m001_memberships, m002_profile]),
    ],
    examples: examples,
  });
});
