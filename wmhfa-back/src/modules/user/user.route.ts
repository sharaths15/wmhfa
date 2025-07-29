import { FastifyInstance } from 'fastify';
import {
  signupHandler,
  loginHandler,
  logoutHandler,
  getMeHandler,
} from './user.controller';
import {
  registerUserSchema,
  loginUserSchema,
  userResponseSchema,
} from './user.schema';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export default async function userRoutes(server: FastifyInstance) {
  server.post(
    '/signup',
    {
      schema: {
        body: zodToJsonSchema(registerUserSchema),
        response: {
          201: zodToJsonSchema(userResponseSchema),
        },
      },
    },
    signupHandler,
  );

  server.post(
    '/login',
    {
      schema: {
        body: zodToJsonSchema(loginUserSchema),
        response: {
          200: zodToJsonSchema(z.object({ token: z.string() })),
        },
      },
    },
    loginHandler,
  );

  server.post('/logout', {}, logoutHandler);

  server.get(
    '/me',
    {
      preHandler: [server.authenticate],
      schema: {
        response: {
          200: zodToJsonSchema(userResponseSchema),
        },
      },
    },
    getMeHandler,
  );
}
