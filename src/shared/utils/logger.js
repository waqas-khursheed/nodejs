import winston from "winston";

// Previously the only logging in the app was ~9 raw console.log/console.error
// calls in bootstrap code, and no request logging at all — no way to
// correlate a production error back to a specific request.
export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    process.env.NODE_ENV === "production"
      ? winston.format.json()
      : winston.format.combine(winston.format.colorize(), winston.format.simple())
  ),
  transports: [new winston.transports.Console()],
});
