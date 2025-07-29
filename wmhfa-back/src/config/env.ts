export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3000", 10),
  HOST: process.env.HOST || "localhost",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
} as const;

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
