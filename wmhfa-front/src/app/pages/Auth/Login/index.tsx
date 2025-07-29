import React from "react";
import { useForm, type SubmitHandler, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

const AuthLayout = ({
  title,
  children,
  imageSrc,
  imageAlt,
}: {
  title: string;
  children: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
}) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-white flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl flex overflow-hidden"
    >
      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary">MHFAider</h2>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
        {children}
      </div>

      <div className="hidden md:block md:w-1/2 relative">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-primary opacity-20"></div>
      </div>
    </motion.div>
  </div>
);

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: FieldError;
  icon: React.ReactNode;
}

const FormInput = ({
  id,
  label,
  type,
  register,
  error,
  icon,
}: FormInputProps) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        {...register(id)}
        className={`w-full pl-10 pr-3 py-2 border rounded-md transition-colors duration-300
                    ${
                      error
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-secondary focus:border-secondary"
                    }
                `}
      />
    </div>
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-1 text-xs text-red-600"
        >
          {error.message}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const OAuthButton = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="w-full flex items-center justify-center gap-3 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {icon}
    {text}
  </motion.button>
);

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
type TLoginSchema = z.infer<typeof loginSchema>;

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type TSignupSchema = z.infer<typeof signupSchema>;

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});
type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login data:", data);
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
          type="email"
          register={register}
          error={errors.email}
          icon={<FiMail />}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          icon={<FiLock />}
        />

        <div className="text-right mb-6">
          <a
            href="/forgot-password"
            className="text-sm text-accent hover:underline"
          >
            Forgot Password?
          </a>
        </div>

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
          <a href="/signup" className="font-medium text-accent hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<TSignupSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Signup data:", data);
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
          register={register}
          error={errors.name}
          icon={<FiUser />}
        />
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          register={register}
          error={errors.email}
          icon={<FiMail />}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          register={register}
          error={errors.password}
          icon={<FiLock />}
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          error={errors.confirmPassword}
          icon={<FiLock />}
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-green-500 transition-all shadow-lg disabled:bg-gray-400"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </motion.button>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-accent hover:underline">
            Log In
          </a>
        </p>
      </form>
    </AuthLayout>
  );
};

export const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit: SubmitHandler<TForgotPasswordSchema> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Forgot password for:", data.email);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      imageSrc="https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=1964&auto=format&fit=crop"
      imageAlt="A lighthouse shining a beacon of light"
    >
      <p className="text-gray-600 mb-6">
        No problem. Enter the email address associated with your account and
        we'll send you a link to reset your password.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          register={register}
          error={errors.email}
          icon={<FiMail />}
        />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-6 bg-secondary text-white font-bold py-3 px-4 rounded-md hover:bg-green-500 transition-all shadow-lg disabled:bg-gray-400"
        >
          {isSubmitting ? "Sending Link..." : "Send Reset Link"}
        </motion.button>

        <div className="mt-8 text-center">
          <a
            href="/login"
            className="font-medium text-accent hover:underline flex items-center justify-center gap-2"
          >
            <FiArrowLeft />
            Back to Login
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};
