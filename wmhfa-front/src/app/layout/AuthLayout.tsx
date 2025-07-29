import React from "react";
import { motion } from "framer-motion";

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

export default AuthLayout;
