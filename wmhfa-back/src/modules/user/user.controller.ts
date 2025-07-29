import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from './user.service';
import { RegisterUserInput, LoginUserInput } from './user.schema';

export async function signupHandler(
  request: FastifyRequest<{ Body: RegisterUserInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const existingUser = await findUserByEmail(body.email);

    if (existingUser) {
      return reply
        .code(409)
        .send({ message: 'User with this email already exists' });
    }

    const user = await createUser(body);

    const { password, createdAt, updatedAt, __v, _id, ...rest } = user;

    const userResponse = {
      ...rest,
      id: _id.toString(),
    };

    return reply.code(201).send(userResponse);
  } catch (e) {
    console.error(e);
    console.error('Error creating user:', e);
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginUserInput }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await findUserByEmail(body.email);

    if (!user) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return reply.code(401).send({ message: 'Invalid email or password' });
    }

    const { password, createdAt, updatedAt, __v, _id, ...rest } = user;

    const userResponse = {
      ...rest,
      id: _id.toString(),
    };

    const token = await reply.jwtSign(userResponse);

    reply.setCookie('token', token, {
      path: '/',
      httpOnly: true,
      secure: true,
    });

    return reply.code(200).send({ token });
  } catch (e) {
    console.error(e);
    return reply.code(500).send({ message: 'Internal Server Error' });
  }
}

export async function logoutHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  reply.clearCookie('token', { path: '/' });
  return reply.code(200).send({ message: 'Successfully logged out' });
}

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.code(200).send(request.user);
}
