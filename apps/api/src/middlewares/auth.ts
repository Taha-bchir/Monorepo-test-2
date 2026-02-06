import { MiddlewareHandler } from "hono";
import { supabase } from "../utils/supabase.js";
import type { AuthVariables } from "../types/auth.js";

/**
 * Authentication middleware that verifies Supabase JWTs.
 * 
 * How it works:
 * 1. Extracts the Authorization header (expects "Bearer <token>")
 * 2. Verifies the JWT token with Supabase
 * 3. If valid, extracts the user ID and stores it in context (c.set("user", ...))
 * 4. If invalid or missing, returns 401 Unauthorized
 * 
 * Usage:
 * - Apply this middleware to routes that require authentication
 * - After this middleware runs, you can access the user with: c.get("user")
 */
export const authMiddleware: MiddlewareHandler<{
  Variables: AuthVariables;
}> = async (c, next) => {
  // 1. Extract the Authorization header
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: { message: "Missing or invalid Authorization header" } }, 401);
  }

  // 2. Extract the token (remove "Bearer " prefix)
  const token = authHeader.substring(7);

  try {
    // 3. Verify the JWT with Supabase
    // Supabase's getUser() method verifies the JWT and returns user info if valid
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return c.json(
        { error: { message: "Invalid or expired token" } },
        401
      );
    }

    // 4. Store the authenticated user in context
    // This makes it available to route handlers via c.get("user")
    c.set("user", {
      id: user.id,
      email: user.email,
    });

    // 5. Continue to the next middleware/route handler
    await next();
  } catch (err) {
    // Handle any unexpected errors during token verification
    return c.json(
      { error: { message: "Authentication failed" } },
      401
    );
  }
};
