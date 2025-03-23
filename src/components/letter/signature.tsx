import type React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import audioManager from "../../utils/audio";

interface SignatureProps {
  senderName: string;
  isVisible: boolean;
  onFinish?: () => void;
  onVisible?: () => void;
}

const Signature: React.FC<SignatureProps> = ({ senderName, isVisible, onFinish, onVisible }) => {
  const hasCalledOnFinishRef = useRef(false);
  const hasCalledOnVisibleRef = useRef(false);

  // Effect to handle callbacks
  useEffect(() => {
    if (isVisible && !hasCalledOnVisibleRef.current) {
      hasCalledOnVisibleRef.current = true;
      // Play signing pen sound
      audioManager.play("signingPen", { volume: 0.8 });

      // Call onVisible callback if provided
      if (onVisible) {
        onVisible();
      }
    }

    // Reset state if letter is hidden
    if (!isVisible) {
      hasCalledOnFinishRef.current = false;
      hasCalledOnVisibleRef.current = false;
    }
  }, [isVisible, onVisible]);

  // Handler to call onFinish after animation completes
  const handleAnimationComplete = () => {
    // Only call onFinish if signature is visible
    if (isVisible && !hasCalledOnFinishRef.current && onFinish) {
      hasCalledOnFinishRef.current = true;
      // Delay to ensure animation appears complete
      setTimeout(() => {
        onFinish();
      }, 500);
    }
  };

  return (
    <motion.div
      className="w-full text-right px-4 sm:px-8 py-2 sm:py-4"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="inline-block"
        initial={{ scale: 0.5, rotate: -5 }}
        animate={isVisible ? { scale: 1, rotate: 0 } : { scale: 0.5, rotate: -5 }}
        transition={{ duration: 0.8, type: "spring" }}
        onAnimationComplete={handleAnimationComplete}
      >
        <div className="text-xs sm:text-sm text-gray-500 dancing-script mb-1">Dengan cinta,</div>
        <div className="text-xl sm:text-2xl md:text-3xl text-pink-500 dancing-script font-bold">
          {senderName}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Signature;
