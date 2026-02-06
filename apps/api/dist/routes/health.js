import { Hono } from "hono";
const route = new Hono();
route.get("/health", (c) => c.json({
    status: "ok",
    version: process.env.API_VERSION || "1.0.0",
    uptime: process.uptime(),
}));
export default route;
