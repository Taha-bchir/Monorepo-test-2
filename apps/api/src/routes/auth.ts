import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { supabase } from "../utils/supabase.js";
import { getSupabaseAdmin } from "../utils/supabaseAdmin.js";
import { authBodySchema, authResponseSchema } from "../schemas/auth.js";

const route = new Hono();

/**
 * POST /api/v1/auth/signup
 * Creates a user in Supabase (backend-only, no email confirmation) then signs in and returns token.
 */
route.post(
  "/auth/signup",
  zValidator("json", authBodySchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const { data: createData, error: createError } =
      await getSupabaseAdmin().auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createError) {
      return c.json({ error: { message: createError.message } }, 400);
    }

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError || !signInData.session) {
      return c.json(
        { error: { message: signInError?.message ?? "Sign in after signup failed" } },
        500
      );
    }

    const user = createData.user;
    const response = authResponseSchema.parse({
      access_token: signInData.session.access_token,
      user: { id: user.id, email: user.email ?? null },
    });
    return c.json(response);
  }
);

/**
 * POST /api/v1/auth/login
 * Signs in with Supabase and returns access token + user.
 */
route.post(
  "/auth/login",
  zValidator("json", authBodySchema),
  async (c) => {
    const { email, password } = c.req.valid("json");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return c.json({ error: { message: error.message } }, 401);
    }
    if (!data.session || !data.user) {
      return c.json({ error: { message: "No session returned" } }, 500);
    }

    const response = authResponseSchema.parse({
      access_token: data.session.access_token,
      user: { id: data.user.id, email: data.user.email ?? null },
    });
    return c.json(response);
  }
);

export default route;
