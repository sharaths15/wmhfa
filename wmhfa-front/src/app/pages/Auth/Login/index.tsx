import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";

import AuthLayout from "../../../layout/AuthLayout";
import FormInput from "../../../components/FormInput";
import OAuthButton from "../../../components/OAuthButton";
import { useAuth } from "../../../hooks/useAuth";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
export type TLoginSchema = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    try {
      await login(data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setError("root", {
          type: "manual",
          message: error.response.data.message || "An unknown error occurred",
        });
      } else {
        setError("root", {
          type: "manual",
          message: "Login failed. Please try again later.",
        });
      }
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      imageSrc="https://images.unsplash.com/photo-1554734867-bf3c00a49371?q=80&w=1965&auto=format&fit=crop"
      imageAlt="A person walking on a path in a sunlit forest"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          label="Email Address"
          placeholder="email@example.com"
          type="email"
          register={register}
          error={errors.email}
          icon={<FiMail />}
        />
        <FormInput
          id="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          icon={<FiLock />}
        />

        <div className="text-right mb-6">
          <Link
            to="/forgot-password"
            className="text-sm text-accent hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {errors.root && (
          <p className="mb-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
            {errors.root.message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-green-500 transition-all shadow-lg disabled:bg-gray-400"
        >
          {isSubmitting ? "Signing In..." : "Log In"}
        </motion.button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>

        <div className="space-y-3">
          <OAuthButton
            icon={<FcGoogle size={20} />}
            text="Continue with Google"
          />
          <OAuthButton
            icon={<FaMicrosoft size={20} color="#00A4EF" />}
            text="Continue with Microsoft"
          />
        </div>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-accent hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
