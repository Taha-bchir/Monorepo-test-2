import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client for server-side operations.
 * 
 * This client is used to verify JWTs from Supabase. We need:
 * - SUPABASE_URL: Your Supabase project URL (e.g., https://xxxxx.supabase.co)
 * - SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 * 
 * The anon key is safe to use on the server because we're only using it
 * to verify tokens that Supabase has already signed. We're not exposing
 * it to the client in this backend code.
 */
export const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_ANON_KEY || "",
  {
    auth: {
      // We only need to verify tokens, not make auth requests
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
