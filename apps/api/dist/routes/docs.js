import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { registerBodySchema, registerResponseSchema, } from "../schemas/auth.js";
// This app is only responsible for serving OpenAPI docs and Swagger UI.
const app = new OpenAPIHono();
// Describe the /register endpoint using the same Zod schemas
// that the real route uses for validation and responses.
const registerRoute = createRoute({
    method: "post",
    path: "/register",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: registerBodySchema,
                },
            },
            required: true,
        },
    },
    responses: {
        200: {
            description: "User successfully registered",
            content: {
                "application/json": {
                    schema: registerResponseSchema,
                },
            },
        },
    },
});
// Register the route definition with OpenAPI.
// The handler here is not used by your main API logic; it only exists so
// that zod-openapi can generate documentation.
app.openapi(registerRoute, (c) => c.json({}));
// Expose the OpenAPI JSON document.
app.doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
        title: "Hono API",
        version: "1.0.0",
    },
    // This ensures "Try it out" calls go to /api/v1/* endpoints.
    servers: [{ url: "/api/v1" }],
});
// Serve Swagger UI at /api/v1/docs, pointing it at our OpenAPI JSON.
app.get("/", swaggerUI({
    url: "/api/v1/docs/openapi.json",
}));
export default app;
