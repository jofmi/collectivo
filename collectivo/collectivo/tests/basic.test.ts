import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";

describe("basics", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("..", import.meta.url)),
    server: true,
  });

  it("can reach API", async () => {
    const res = await $fetch("/api/status/");
    expect(res).toStrictEqual({ healthy: true });
  });
});
