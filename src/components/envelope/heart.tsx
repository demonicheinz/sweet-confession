import type React from "react";
import { motion } from "framer-motion";

const Heart: React.FC = () => {
  return (
    <motion.div
      className="w-12 h-12"
      initial={{ scale: 1 }}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <div
        className="w-full h-full relative"
        style={{
          filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))",
        }}
      >
        {/* SVG Heart Shape for better definition */}
        <svg
          viewBox="0 0 24 24"
          className="w-full h-full"
          style={{
            fill: "url(#heart-gradient)",
            filter: "drop-shadow(0 0 2px rgba(255, 0, 0, 0.5))",
          }}
        >
          <title>Heart</title>
          <defs>
            <linearGradient
              id="heart-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#ff6b6b"
              />
              <stop
                offset="100%"
                stopColor="#d63031"
              />
            </linearGradient>
          </defs>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>

        {/* Heart shine effects */}
        <div className="absolute top-1 left-3 w-2 h-2 bg-white opacity-80 rounded-full" />
        <div className="absolute top-2 left-4 w-1 h-1 bg-white opacity-60 rounded-full" />

        {/* Pulse effect */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(255,107,107,0.7) 0%, rgba(214,48,49,0) 70%)",
            borderRadius: "50%",
          }}
        />
      </div>
    </motion.div>
  );
};

export default Heart;
