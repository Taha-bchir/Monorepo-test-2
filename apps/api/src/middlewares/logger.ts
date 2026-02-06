import pino from "pino";
import { pinoLogger } from "hono-pino";

const logger = pino({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
});

export const loggerMiddleware = pinoLogger({
  pino: logger,
});
