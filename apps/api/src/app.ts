import { Hono } from "hono";
import { cors } from "hono/cors";
import { loadMiddlewares } from "./utils/autoloadMiddlewares.js";
import { loadRoutes } from "./utils/autoload.js";
import { resolve } from "node:path";

export async function createApp() {
  const app = new Hono();

  // CORS first so preflight (OPTIONS) and all responses get correct headers
  // Allow localhost for development and Vercel domains for production
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.NEXT_PUBLIC_WEB_URL || "",
  ].filter(Boolean);

  app.use(
    "*",
    cors({
      origin: allowedOrigins,
      allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  await loadMiddlewares(app, resolve("src/middlewares"));

  const api = new Hono();
  await loadRoutes(api, resolve("src/routes"));

  app.route("/api/v1", api);

  return app;
}
