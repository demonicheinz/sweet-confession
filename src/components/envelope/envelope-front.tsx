import type React from "react";
import { motion } from "framer-motion";
import Heart from "./heart";

interface EnvelopeFrontProps {
  isOpen: boolean;
  onClick: () => void;
}

const EnvelopeFront: React.FC<EnvelopeFrontProps> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      className={`w-full h-full bg-pink-300 rounded-lg shadow-lg cursor-pointer relative overflow-hidden ${isOpen ? "invisible" : "visible"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
      }}
    >
      {/* Envelope base */}
      <div className="absolute inset-0 bg-pink-200 rounded-lg" />

      {/* Top flap */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 rounded-t-lg flex items-center justify-center origin-bottom transform-gpu"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
        }}
      >
        {/* Flap shadow line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-400/40" />
      </div>

      {/* Center line (fold) */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-pink-400/50" />

      {/* Side flaps */}
      <div
        className="absolute top-1/2 left-0 w-1/2 h-1/2 bg-pink-200 origin-right"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 15%)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-pink-200 origin-left"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 15%, 100% 100%, 0 100%)",
        }}
      />

      {/* Bottom flap */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-pink-200 rounded-b-lg" />

      {/* Heart */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Heart />
      </div>
    </motion.div>
  );
};

export default EnvelopeFront;
