export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3000', 10),
  HOST: process.env.HOST || 'localhost',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  JWT_SECRET: process.env.JWT_SECRET || 'default_secret',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/wmhfa',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
} as const;

export const isDevelopment = config.NODE_ENV === 'development';
export const isProduction = config.NODE_ENV === 'production';
