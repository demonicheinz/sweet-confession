"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import audioManager from "../../utils/audio";

const SoundControls: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Set initial mute state
    setIsMuted(false);
  }, []);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioManager.mute(newMuteState);
  };

  return (
    <motion.div
      className="absolute top-3 sm:top-4 right-3 sm:right-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.button
        className="bg-white/30 rounded-full p-2 sm:p-2.5 shadow-md hover:bg-white/40 cursor-pointer"
        onClick={toggleMute}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isMuted ? "Sound is muted" : "Sound is enabled"}
      >
        {isMuted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="sm:w-6 sm:h-6 text-pink-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
          >
            <title>Sound is muted</title>
            <path d="M11 5L6 9H2v6h4l5 4zM22 9l-6 6M16 9l6 6" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="sm:w-6 sm:h-6 text-pink-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            role="img"
          >
            <title>Sound is enabled</title>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        )}
      </motion.button>
    </motion.div>
  );
};

export default SoundControls;
