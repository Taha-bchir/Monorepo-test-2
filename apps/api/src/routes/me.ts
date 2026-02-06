import { Hono } from "hono";
import { authMiddleware } from "../middlewares/auth.js";
import type { AuthVariables } from "../types/auth.js";

/**
 * Route handler for GET /api/v1/me
 * 
 * This endpoint returns the current authenticated user's profile.
 * It requires authentication (uses authMiddleware), so it will return 401
 * if no valid Supabase JWT is provided.
 * 
 * How it works:
 * 1. The authMiddleware verifies the JWT and sets c.get("user")
 * 2. This route handler reads the user from context
 * 3. Returns the user profile as JSON
 */
const route = new Hono<{ Variables: AuthVariables }>();

route.get("/me", authMiddleware, (c) => {
  // Get the authenticated user from context
  // This was set by authMiddleware after verifying the JWT
  const user = c.get("user");

  // Return the user profile
  // In a real app, you might want to fetch additional user data
  // from your database here, but for now we return what we have from the JWT
  return c.json({
    user: {
      id: user.id,
      email: user.email,
    },
  });
});


export default route;
