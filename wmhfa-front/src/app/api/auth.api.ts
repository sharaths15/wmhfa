import api from "../lib/axios";
import { type User } from "../types/user";
import { type TLoginSchema } from "../pages/Auth/Login";
import { type TSignupSchema } from "../pages/Auth/Signup";

type SignupPayload = Omit<TSignupSchema, "name" | "confirmPassword"> & {
  fullName: string;
};

export const signupUser = async (userData: SignupPayload) => {
  const { data } = await api.post<User>("/users/signup", userData);
  return data;
};

export const loginUser = async (credentials: TLoginSchema) => {
  const { data } = await api.post<{ token: string }>(
    "/users/login",
    credentials
  );
  return data;
};

export const logoutUser = async () => {
  const { data } = await api.post<{ message: string }>("/users/logout");
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>("/users/me");
  return data;
};
