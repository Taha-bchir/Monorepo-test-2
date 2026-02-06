export const CONSTANT = 'Hello from your Hono API!';
/** App route paths (web app) */
export const ROUTES = {
    HOME: '/',
    AUTH_LOGIN: '/auth/login',
    AUTH_SIGNUP: '/auth/signup',
    APP_DASHBOARD: '/app/dashboard',
};
/** API path segments (used by api and web client) */
export const API_PATHS = {
    HEALTH: '/health',
    AUTH_LOGIN: '/auth/login',
    AUTH_SIGNUP: '/auth/signup',
    ME: '/me',
    USERS: '/users',
};
/** Env variable keys (for documentation / validation) */
export const ENV_KEYS = {
    SUPABASE_URL: 'SUPABASE_URL',
    SUPABASE_ANON_KEY: 'SUPABASE_ANON_KEY',
    SUPABASE_SERVICE_ROLE_KEY: 'SUPABASE_SERVICE_ROLE_KEY',
    API_URL: 'NEXT_PUBLIC_API_URL',
};
/** Common limits */
export const LIMITS = {
    PASSWORD_MIN_LENGTH: 6,
    USER_DISPLAY_NAME_MAX: 100,
};
