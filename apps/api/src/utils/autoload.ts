import type { Hono } from "hono";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadRoutes(app: Hono, baseDir: string) {
  const files = await readdir(baseDir);

  for (const file of files) {
    if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

    const fullPath = join(baseDir, file);
    const fileUrl = pathToFileURL(fullPath).href;

    const mod = await import(fileUrl);
    const route = mod.default;

    // Don't rely on `instanceof Hono` here:
    // packages like `@hono/zod-openapi` may bring their own Hono instance,
    // and then `instanceof` can fail even though it's a valid sub-app.
    const isHonoLike =
      route &&
      typeof route === "object" &&
      typeof route.route === "function" &&
      typeof route.fetch === "function";

    if (!isHonoLike) continue;

    const name = file.replace(/\.(ts|js)$/, "");
    const mountPath = name === "docs" ? "/docs" : "/";

    app.route(mountPath, route);
  }
}
