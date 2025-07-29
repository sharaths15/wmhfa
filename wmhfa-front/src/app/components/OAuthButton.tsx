import React from "react";
import { motion } from "framer-motion";

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

export default OAuthButton;
