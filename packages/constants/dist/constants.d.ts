export declare const CONSTANT = "Hello from your Hono API!";
/** App route paths (web app) */
export declare const ROUTES: {
    readonly HOME: "/";
    readonly AUTH_LOGIN: "/auth/login";
    readonly AUTH_SIGNUP: "/auth/signup";
    readonly APP_DASHBOARD: "/app/dashboard";
};
/** API path segments (used by api and web client) */
export declare const API_PATHS: {
    readonly HEALTH: "/health";
    readonly AUTH_LOGIN: "/auth/login";
    readonly AUTH_SIGNUP: "/auth/signup";
    readonly ME: "/me";
    readonly USERS: "/users";
};
/** Env variable keys (for documentation / validation) */
export declare const ENV_KEYS: {
    readonly SUPABASE_URL: "SUPABASE_URL";
    readonly SUPABASE_ANON_KEY: "SUPABASE_ANON_KEY";
    readonly SUPABASE_SERVICE_ROLE_KEY: "SUPABASE_SERVICE_ROLE_KEY";
    readonly API_URL: "NEXT_PUBLIC_API_URL";
};
/** Common limits */
export declare const LIMITS: {
    readonly PASSWORD_MIN_LENGTH: 6;
    readonly USER_DISPLAY_NAME_MAX: 100;
};
//# sourceMappingURL=constants.d.ts.map