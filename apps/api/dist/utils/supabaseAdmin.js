import { createClient } from "@supabase/supabase-js";
let _admin = null;
/**
 * Supabase client with service role key for admin operations (e.g. create user
 * without sending confirmation email). Only use on the backend; never expose
 * this key to the frontend. Throws only when first used if env is missing.
 */
export function getSupabaseAdmin() {
    if (_admin)
        return _admin;
    const url = process.env.SUPABASE_URL || "";
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    if (!url || !serviceRoleKey) {
        throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for signup. " +
            "Get the service role key from Supabase Dashboard → Project Settings → API.");
    }
    _admin = createClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
    return _admin;
}
