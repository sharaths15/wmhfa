import { z } from "zod";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type TSignupSchema = z.infer<typeof signupSchema>;

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";

import AuthLayout from "../../../layout/AuthLayout";
import FormInput from "../../../components/FormInput";
import { useAuth } from "../../../hooks/useAuth";

export const SignupPage = () => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<TSignupSchema> = async (data) => {
    try {
      await signup(data);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          setError("email", {
            type: "manual",
            message: "A user with this email already exists.",
          });
        } else {
          setError("root", {
            type: "manual",
            message: error.response.data.message || "An unknown error occurred",
          });
        }
      } else {
        setError("root", {
          type: "manual",
          message: "Signup failed. Please try again later.",
        });
      }
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      imageSrc="https://images.unsplash.com/photo-1507525428034-b723a9ce6890?q=80&w=2070&auto=format&fit=crop"
      imageAlt="Calm beach with waves reaching the shore"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="name"
          label="Full Name"
          type="text"
          placeholder="John Doe"
          register={register}
          error={errors.name}
          icon={<FiUser />}
        />
        <FormInput
          id="email"
          label="email@example.com"
          type="email"
          placeholder="email@example.com"
          register={register}
          error={errors.email}
          icon={<FiMail />}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          register={register}
          placeholder="Enter a strong password"
          error={errors.password}
          icon={<FiLock />}
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          icon={<FiLock />}
        />

        {errors.root && (
          <p className="mt-4 text-center text-sm text-red-600 bg-red-100 p-2 rounded-md">
            {errors.root.message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-[#10B981] text-white font-bold py-3 px-4 rounded-md hover:bg-green-500 transition-all shadow-lg disabled:bg-gray-400"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </motion.button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-[#3B82F6] hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
