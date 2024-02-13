import axios from "axios";
import { describe, expect, test } from "vitest";

describe("basics", async () => {
  test("Status healthy", async () => {
    const response = await axios.get("http://localhost:3000/api/status");
    expect(response.status).toBe(200);

    expect(response.data).toStrictEqual({
      healthy: {
        collectivo: true,
        directus: true,
      },
    });
  });
});
