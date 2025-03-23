import type React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

interface ReplyButtonProps {
  phoneNumber: string;
  message: string;
  isVisible: boolean;
}

const ReplyButton: React.FC<ReplyButtonProps> = ({ phoneNumber, message, isVisible }) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full"
      >
        <motion.button
          className="w-full max-w-[270px] sm:max-w-xs mx-auto py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-pink-500 to-pink-400 text-white font-medium rounded-full shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-shadow cursor-pointer"
          whileHover={{
            scale: 1.03,
            backgroundColor: "rgb(236, 72, 153)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FaWhatsapp
            className="w-4 h-4 sm:w-5 sm:h-5"
            aria-hidden="true"
            title="WhatsApp Icon"
          />
          <span className="text-sm sm:text-base">Balas Pesan</span>
        </motion.button>
      </a>
    </motion.div>
  );
};

export default ReplyButton;
