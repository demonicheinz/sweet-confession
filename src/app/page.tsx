"use client";

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Envelope from "../components/envelope";
import Letter from "../components/letter";
import ReplyButton from "../components/reply/reply-button";
import SoundControls from "../components/sound/sound-controls";
import useAnimation from "../hooks/useAnimation";
import { DEFAULT_MESSAGES, CONTACT_INFO } from "../utils/constants";
import audioManager from "../utils/audio";

export default function Home() {
  // Customize these values as needed - using useMemo to avoid unnecessary recalculations
  const [message] = useState(DEFAULT_MESSAGES.LOVE_LETTER);
  const [recipientName] = useState("Penerima");
  const [senderName] = useState("Pengirim");
  const [phoneNumber] = useState(CONTACT_INFO.PHONE_NUMBER);
  const [replyMessage, setReplyMessage] = useState("");

  // State to control reply button visibility
  const [isReplyButtonVisible, setReplyButtonVisible] = useState(false);

  // State to track animation progress
  const [contentFinished, setContentFinished] = useState(false);
  const [signatureFinished, setSignatureFinished] = useState(false);

  // State for user interaction
  const [userInteracted, setUserInteracted] = useState(false);

  // Update reply message with sender name
  useEffect(() => {
    const personalizedReply = CONTACT_INFO.DEFAULT_REPLY_MESSAGE.replace("{sender}", senderName);
    setReplyMessage(personalizedReply);
  }, [senderName]);

  // Animation state management
  const { isEnvelopeOpen, isLetterVisible, openEnvelope } = useAnimation();

  // Effect to play background music after envelope opens
  useEffect(() => {
    // Only enable music when user has interacted and envelope is open
    if (userInteracted && isEnvelopeOpen) {
      // Wait a bit before playing background music to avoid too much noise
      const timer = setTimeout(() => {
        // Start with consistent volume
        audioManager.play("ambientMusic", { volume: 0.7, loop: true });
      }, 2000); // Wait longer (2 seconds) to start music

      return () => clearTimeout(timer);
    }
  }, [userInteracted, isEnvelopeOpen]);

  // Handler for content completion - using useCallback to avoid unnecessary recreations
  const handleContentFinish = useCallback(() => {
    setContentFinished(true);
  }, []);

  // Handler for signature completion
  const handleSignatureFinish = useCallback(() => {
    setSignatureFinished(true);

    // Show reply button after signature animation completes
    const timer = setTimeout(() => {
      setReplyButtonVisible(true);
    }, 500);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, []);

  // Handler for user interaction
  const handleUserInteraction = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
    openEnvelope();
  }, [userInteracted, openEnvelope]);

  // Prepare animation classes with useMemo to avoid recalculations
  const headerAnimationClass = useMemo(
    () =>
      `flex flex-col items-center text-center transition-all duration-500 ${
        isLetterVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`,
    [isLetterVisible],
  );

  const envelopeAnimationClass = useMemo(
    () =>
      `transition-all duration-500 ${
        isLetterVisible ? "opacity-0 pointer-events-none" : "opacity-100"
      }`,
    [isLetterVisible],
  );

  const letterAnimationClass = useMemo(
    () =>
      `absolute inset-0 flex items-center justify-center transition-all duration-500 ${
        isLetterVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`,
    [isLetterVisible],
  );

  return (
    <main
      className="flex flex-col items-center justify-center min-h-svh py-4 px-3 sm:py-6 sm:px-4 relative"
      onClick={() => setUserInteracted(true)}
    >
      {/* Sound Controls */}
      <SoundControls />

      {/* Container for all content */}
      <div className="flex flex-col items-center justify-center w-full gap-6 sm:gap-8 relative">
        {/* Header */}
        <motion.div
          className={headerAnimationClass}
          animate={{
            scale: isLetterVisible ? 0.9 : 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-1 sm:mb-2">
            Sweet Confession 💌
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-medium max-w-md mx-auto opacity-90 px-2">
            Share your sweet confessions with your special someone.
          </p>
        </motion.div>

        {/* Envelope - size made smaller on mobile */}
        <motion.div
          className={envelopeAnimationClass}
          animate={{
            scale: isLetterVisible ? 0.9 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Envelope
            isOpened={isEnvelopeOpen}
            onOpen={handleUserInteraction}
          />
        </motion.div>

        {/* Letter */}
        <motion.div
          className={letterAnimationClass}
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLetterVisible ? 1 : 0,
            scale: isLetterVisible ? 1 : 0.9,
            pointerEvents: isLetterVisible ? "auto" : "none",
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="w-full max-w-[95%] sm:max-w-md">
            <Letter
              isVisible={isLetterVisible}
              message={message}
              senderName={senderName}
              recipientName={recipientName}
              onContentFinish={handleContentFinish}
              onSignatureFinish={handleSignatureFinish}
            />

            {/* Reply Button */}
            <div className="mt-6 sm:mt-8 flex justify-center">
              <ReplyButton
                isVisible={isReplyButtonVisible}
                phoneNumber={phoneNumber}
                message={replyMessage}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
