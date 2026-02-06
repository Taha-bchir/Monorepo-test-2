import { serve } from "@hono/node-server";
import dotenv from "dotenv";
import { createApp } from "./app.js";
import { prisma } from "@repo/database";




dotenv.config({ quiet: true });
dotenv.config({ path: ".env.local", quiet: true });

const port = Number(process.env.PORT) || 3000;

const app = await createApp();

serve({
  fetch: app.fetch,
  port,
});

console.log(`🚀 API running on http://localhost:${port}`);

try {
  await prisma.$queryRaw`SELECT 1`;
  console.log("API → DB OK");
} catch (err) {
  console.warn("API → DB unreachable:", (err as Error).message);
}