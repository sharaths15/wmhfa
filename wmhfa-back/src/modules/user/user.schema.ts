import { z } from 'zod';

const userCore = {
  email: z.string().email('Not a valid email').min(1, 'Email is required'),

  fullName: z.string().min(1, 'Full name is required'),
};

export const registerUserSchema = z.object({
  ...userCore,
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const loginUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Not a valid email'),

  password: z.string().min(1, 'Password is required'),
});

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullName: z.string(),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
