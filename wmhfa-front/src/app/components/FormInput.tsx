import React from "react";
import { type FieldError } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  register: any;
  error?: FieldError;
  icon: React.ReactNode;
  placeholder?: string;
}

const FormInput = ({
  id,
  label,
  type,
  register,
  error,
  icon,
  placeholder,
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
        placeholder={placeholder}
        {...register(id)}
        className={`w-full pl-10 pr-3 py-2 border rounded-md transition-colors duration-300 placeholder:text-gray-400
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

export default FormInput;
