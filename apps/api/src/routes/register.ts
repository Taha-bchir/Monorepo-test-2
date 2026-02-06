import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createContainer } from "../container/index.js";
import {
  registerBodySchema,
  registerResponseSchema,
} from "../schemas/auth.js";

const route = new Hono();

route.post(
  "/register",
  // 1) Validate and parse the JSON body using Zod.
  zValidator("json", registerBodySchema),
  async (c) => {
    const container = createContainer();
    const { authService } = container;

    // 2) Safely access the validated body. Type is inferred from the Zod schema.
    const { email, password } = c.req.valid("json");

    const user = await authService.register(email, password);

    // 3) Response still matches the old logic, but we also have
    //    a Zod schema describing it (useful for OpenAPI later).
    const response = registerResponseSchema.parse({ user });

    return c.json(response);
  }
);

export default route;
