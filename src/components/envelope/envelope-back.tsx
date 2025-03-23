import type React from "react";
import { motion } from "framer-motion";
import Heart from "./heart";

interface EnvelopeBackProps {
  isOpen: boolean;
}

const EnvelopeBack: React.FC<EnvelopeBackProps> = ({ isOpen }) => {
  return (
    <motion.div
      className="w-full h-full bg-pink-300 rounded-lg shadow-lg relative overflow-hidden"
      animate={{
        scale: isOpen ? 1.05 : 1,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)",
      }}
    >
      {/* Envelope base */}
      <div className="absolute inset-0 bg-pink-200 rounded-lg" />

      {/* Envelope back flap (top) */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1/2 bg-pink-300 origin-bottom rounded-t-lg"
        animate={{
          rotateX: isOpen ? -180 : 0,
        }}
        transition={{
          duration: 0.8,
          delay: isOpen ? 0 : 0.4,
        }}
        style={{
          transformStyle: "preserve-3d",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)",
        }}
      >
        {/* Flap shadow line */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-pink-400/40" />
      </motion.div>

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

      {/* Heart (centered) */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Heart />
      </div>
    </motion.div>
  );
};

export default EnvelopeBack;
