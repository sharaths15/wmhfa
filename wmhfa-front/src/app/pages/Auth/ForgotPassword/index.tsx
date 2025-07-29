import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { FiMail, FiArrowLeft } from "react-icons/fi";
import AuthLayout from "../../../layout/AuthLayout";
import FormInput from "../../../components/FormInput";

const forgotPasswordSchema = z.object({
  email: z
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),
});
export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

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
          placeholder="email@example.com"
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
