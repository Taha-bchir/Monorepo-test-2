import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
const route = new Hono();
// Example of validating query parameters: /users?limit=10
const usersQuerySchema = z.object({
    limit: z
        .string()
        .transform((value) => parseInt(value, 10))
        .optional(),
});
route.get("/users", zValidator("query", usersQuerySchema), (c) => {
    const { limit } = c.req.valid("query");
    // For now we still return a static array to avoid changing logic.
    // You can later plug in your UserRepository here.
    const users = [];
    return c.json({
        users,
        limit: limit ?? null,
    });
});
export default route;
