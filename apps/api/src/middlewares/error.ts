import { MiddlewareHandler } from "hono";

export const errorMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (err: any) {
    const status = err.status || 500;

    return c.json(
      {
        error: {
          message: err.message || "Internal Server Error",
          status,
        },
      },
      status
    );
  }
};
