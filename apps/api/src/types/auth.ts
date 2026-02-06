/**
 * Type definitions for authentication context variables.
 * 
 * In Hono, we can store custom data in the context using c.set() and c.get().
 * This file defines the types for our auth-related context variables.
 */

/**
 * The authenticated user information extracted from the Supabase JWT.
 * This is what we'll store in the context after verifying the token.
 */
export interface AuthUser {
  id: string;
  email?: string;
  // Add other fields from Supabase user metadata as needed
}

/**
 * Type helper for Hono context variables.
 * This tells TypeScript what variables we can access with c.get("user").
 */
export type AuthVariables = {
  user: AuthUser;
};
