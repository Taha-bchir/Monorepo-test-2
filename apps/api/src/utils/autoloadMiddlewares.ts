import type { Hono } from "hono";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadMiddlewares(app: Hono, baseDir: string) {
  const files = (await readdir(baseDir)).sort();

  for (const file of files) {
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    const fullPath = join(baseDir, file);
    const fileUrl = pathToFileURL(fullPath).href;

    const mod = await import(fileUrl);

    if (typeof mod.default === "function") {
      mod.default(app);
    }
  }
}
