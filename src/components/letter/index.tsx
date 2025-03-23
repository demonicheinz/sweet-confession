import type React from "react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Content from "./content";
import Signature from "./signature";
import audioManager from "../../utils/audio";

interface LetterProps {
  isVisible: boolean;
  message: string;
  senderName: string;
  recipientName?: string;
  onContentFinish?: () => void;
  onSignatureFinish?: () => void;
}

const Letter: React.FC<LetterProps> = ({
  isVisible,
  message,
  senderName,
  recipientName,
  onContentFinish,
  onSignatureFinish,
}) => {
  // State to control visibility of each letter section
  const [isContentVisible, setContentVisible] = useState(false);
  const [isSignatureVisible, setSignatureVisible] = useState(false);
  const paperSoundPlayedRef = useRef(false);

  // Reset state when letter is not visible
  useEffect(() => {
    if (!isVisible) {
      setContentVisible(false);
      setSignatureVisible(false);
      // Stop sound effects if letter is hidden
      audioManager.stop("paperRustle");
      paperSoundPlayedRef.current = false;
    } else {
      // Play paper rustle sound BEFORE content appears
      if (!paperSoundPlayedRef.current) {
        audioManager.play("paperRustle", { volume: 0.7 });
        paperSoundPlayedRef.current = true;
      }

      // Delay content display slightly so paper sound can be heard first
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 700);

      // Ensure signature is initially hidden
      setSignatureVisible(false);

      return () => clearTimeout(timer);
    }

    // Cleanup function to ensure complete reset on unmount
    return () => {
      if (!isVisible) {
        setContentVisible(false);
        setSignatureVisible(false);
        audioManager.stop("paperRustle");
        paperSoundPlayedRef.current = false;
      }
    };
  }, [isVisible]);

  // Handler when content finishes
  const handleContentFinish = () => {
    // Call callback if it exists
    if (onContentFinish) {
      onContentFinish();
    }

    // Show signature after content finishes
    setSignatureVisible(true);
  };

  // Handler when signature finishes
  const handleSignatureFinish = () => {
    // Call callback if it exists
    if (onSignatureFinish) {
      onSignatureFinish();
    }
  };

  // Handler for signature visibility
  const handleSignatureVisible = () => {
    // Play signing pen sound with higher volume
    audioManager.play("signingPen", { volume: 0.8 });
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-3 sm:p-5 shadow-xl max-w-full mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{
        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.2)",
      }}
    >
      <div
        className="border-[1px] sm:border-[2px] border-pink-100 rounded-lg p-2 sm:p-4 bg-pink-50/40"
        style={{
          backgroundImage:
            "linear-gradient(to right bottom, rgba(252, 231, 243, 0.1), rgba(249, 168, 212, 0.05))",
        }}
      >
        <Content
          message={message}
          isVisible={isContentVisible}
          recipientName={recipientName}
          onFinish={handleContentFinish}
        />
        <Signature
          senderName={senderName}
          isVisible={isSignatureVisible}
          onFinish={handleSignatureFinish}
          onVisible={handleSignatureVisible}
        />
      </div>
    </motion.div>
  );
};

export default Letter;
