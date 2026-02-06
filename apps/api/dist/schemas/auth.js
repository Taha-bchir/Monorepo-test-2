import { z } from "zod";
// Request body for POST /register
export const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
// Shape of the user object we return from the API.
// Adjust fields if your Prisma User model is different.
export const userSchema = z.object({
    id: z.string().or(z.number()),
    email: z.string().email(),
    password: z.string(), // usually you'd omit this in responses; kept for now to match current logic.
});
export const registerResponseSchema = z.object({
    user: userSchema,
});
// Auth API (Supabase) request body: same shape as register
export const authBodySchema = registerBodySchema;
// Auth API response: token + user (no password)
export const authUserSchema = z.object({
    id: z.string(),
    email: z.string().email().nullable(),
});
export const authResponseSchema = z.object({
    access_token: z.string(),
    user: authUserSchema,
});
