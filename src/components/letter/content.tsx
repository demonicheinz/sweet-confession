import type React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import audioManager from "../../utils/audio";

interface ContentProps {
  message: string;
  isVisible: boolean;
  recipientName?: string;
  onFinish?: () => void;
}

const Content: React.FC<ContentProps> = ({
  message,
  isVisible,
  recipientName = "kamu",
  onFinish,
}) => {
  // Replace {recipient} placeholder with actual recipient name
  const processedMessageRef = useRef<string>("");

  // States for paragraphs and typing status
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([]);
  const [typingStates, setTypingStates] = useState<{ [key: number]: string }>({});

  // Refs to prevent multiple renders and infinite loops
  const hasCalledOnFinishRef = useRef(false);
  const animatingRef = useRef<{ [key: number]: boolean }>({});
  const initializedRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // Process message only once when component mounts or message/recipientName changes
  useEffect(() => {
    // Replace {recipient} placeholder with recipient name
    const processed = message.replace(/\{recipient\}/g, recipientName || "kamu");
    processedMessageRef.current = processed;

    // Split message into paragraphs
    const paragraphArray = processed.split("\n").filter((p) => p.trim() !== "");
    setParagraphs(paragraphArray);

    // Reset animation states
    setVisibleParagraphs([]);
    setTypingStates({});
    animatingRef.current = {};
    initializedRef.current = false;
    hasCalledOnFinishRef.current = false;

    // Clear any existing timers
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    return () => {
      // Cleanup timers
      timersRef.current.forEach(clearTimeout);
      // Make sure sound stops when component unmounts
      audioManager.stop("typing");
    };
  }, [message, recipientName]);

  // Function to display the next paragraph - memoized with useCallback
  const showNextParagraph = useCallback(() => {
    setVisibleParagraphs((prev) => {
      const nextIndex = prev.length;

      if (nextIndex < paragraphs.length) {
        // Start typing animation for this paragraph
        const timer = setTimeout(() => {
          animateTyping(nextIndex, paragraphs[nextIndex]);
        }, 100);
        timersRef.current.push(timer);

        return [...prev, nextIndex];
      }

      return prev;
    });
  }, [paragraphs]);

  // Handle typing character by character with optimized delays
  const typeNextChar = useCallback(
    (index: number, text: string, position: number) => {
      if (position <= text.length) {
        setTypingStates((prev) => ({
          ...prev,
          [index]: text.substring(0, position),
        }));

        // Play typing sound for specific characters - reduced frequency and volume
        if (position > 0 && position % 5 === 0) {
          audioManager.play("typing", { volume: 0.2 });
        }

        // Determine delay for next character
        let delay = 50; // base typing speed

        // Add pauses after punctuation for more natural typing
        if (position > 0) {
          const currentChar = text[position - 1];
          if (currentChar === ".") {
            delay = 600; // longer pause after sentences
            // Stop typing sound briefly after sentences
            audioManager.stop("typing");
          } else if (currentChar === ",") {
            delay = 300; // medium pause after commas
          } else if (currentChar === "?" || currentChar === "!") {
            delay = 500; // pause after questions/exclamations
            // Stop typing sound briefly after questions/exclamations
            audioManager.stop("typing");
          }
        }

        // Schedule next character
        const timer = setTimeout(() => {
          typeNextChar(index, text, position + 1);
        }, delay);
        timersRef.current.push(timer);
      } else {
        // Stop typing sound when finished
        audioManager.stop("typing");

        // Animation ends, check if this is the last paragraph
        if (index < paragraphs.length - 1) {
          // If not the last paragraph, continue to the next one
          const timer = setTimeout(() => {
            showNextParagraph();
          }, 800);
          timersRef.current.push(timer);
        } else {
          // If this is the last paragraph, call onFinish callback
          if (onFinish && !hasCalledOnFinishRef.current) {
            hasCalledOnFinishRef.current = true;
            // No longer changing music volume when typing is finished
            onFinish();
          }
        }
      }
    },
    [onFinish, paragraphs, showNextParagraph],
  );

  // Function to animate typing effect for a paragraph with pauses on punctuation
  const animateTyping = useCallback(
    (index: number, text: string) => {
      // If already animating, don't repeat
      if (animatingRef.current[index]) {
        return;
      }

      // Mark as currently animating
      animatingRef.current[index] = true;
      setTypingStates((prev) => ({ ...prev, [index]: "" }));

      // Start typing
      typeNextChar(index, text, 0);
    },
    [typeNextChar],
  );

  // Effect to handle animations when letter is visible
  useEffect(() => {
    // Reset if letter is not visible
    if (!isVisible) {
      setVisibleParagraphs([]);
      setTypingStates({});
      initializedRef.current = false;
      hasCalledOnFinishRef.current = false;

      // Stop typing sound
      audioManager.stop("typing");

      // Clear timers
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      return;
    }

    // Prevent re-renders causing loops
    if (initializedRef.current) {
      return;
    }

    // Mark as initialized
    initializedRef.current = true;

    // Start displaying first paragraph after delay
    if (paragraphs.length > 0) {
      const timer = setTimeout(() => {
        showNextParagraph();
      }, 500);
      timersRef.current.push(timer);
    }

    return () => {
      // Cleanup timers
      timersRef.current.forEach(clearTimeout);
      // Make sure sound stops when component unmounts
      audioManager.stop("typing");
    };
  }, [isVisible, paragraphs, showNextParagraph]);

  return (
    <div className="w-full text-left px-3 sm:px-6 pb-4 sm:pb-6">
      {paragraphs.map((paragraph, index) => (
        <motion.p
          key={index}
          className="mb-4 sm:mb-6 text-gray-800 dancing-script text-base sm:text-lg md:text-xl leading-relaxed"
          style={{
            opacity: visibleParagraphs.includes(index) ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {typingStates[index] || ""}
          {index in typingStates && typingStates[index].length < paragraph.length && (
            <span className="inline-block w-[3px] sm:w-1 h-4 sm:h-5 bg-pink-500 ml-1 animate-pulse" />
          )}
        </motion.p>
      ))}
    </div>
  );
};

export default Content;
