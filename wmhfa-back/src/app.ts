import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { config } from './config/env';
import { healthRoutes } from './routes/health';

export const createApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({
    logger:
      config.NODE_ENV === 'development'
        ? {
            level: config.LOG_LEVEL,
            transport: {
              target: 'pino-pretty',
              options: {
                colorize: true,
              },
            },
          }
        : {
            level: config.LOG_LEVEL,
          },
  });

  await app.register(cors, {
    origin: config.NODE_ENV === 'development' ? true : false,
    credentials: true,
  });

  await app.register(healthRoutes, { prefix: '/api/v1' });

  return app;
};
