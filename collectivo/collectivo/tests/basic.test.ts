import { fileURLToPath } from "node:url";
import { describe, expect, test } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils/e2e";

describe("basics", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("..", import.meta.url)),
    server: true,
  });

  test("all services healthy", async () => {
    const res = await $fetch("/api/status/");
    expect(res).toStrictEqual({
      healthy: {
        collectivo: true,
        directus: true,
      },
    });
  });
});
