import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import fjwt from '@fastify/jwt';
import fCookie from '@fastify/cookie';
import cors from '@fastify/cors';

import userRoutes from './modules/user/user.route';
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
              options: { colorize: true },
            },
          }
        : { level: config.LOG_LEVEL },
  });

  await app.register(fjwt, {
    secret: config.JWT_SECRET,
    cookie: {
      cookieName: 'token',
      signed: false,
    },
  });

  await app.register(fCookie);

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  app.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.status(401).send({ message: 'Authentication required' });
      }
    },
  );

  await app.register(userRoutes, { prefix: '/api/users' });

  await app.register(healthRoutes, { prefix: '/api/v1' });

  return app;
};
