export const errorMiddleware = async (c, next) => {
    try {
        await next();
    }
    catch (err) {
        const status = err.status || 500;
        return c.json({
            error: {
                message: err.message || "Internal Server Error",
                status,
            },
        }, status);
    }
};
