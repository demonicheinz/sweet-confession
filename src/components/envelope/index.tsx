import type React from "react";
import EnvelopeFront from "./envelope-front";
import EnvelopeBack from "./envelope-back";

interface EnvelopeProps {
  onOpen: () => void;
  isOpened: boolean;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen, isOpened }) => {
  const handleEnvelopeClick = () => {
    if (!isOpened) {
      onOpen();
    }
  };

  return (
    <div
      className="relative w-full max-w-xs sm:max-w-sm mx-auto"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-72 h-56 mx-auto">
        {/* EnvelopeBack is right behind EnvelopeFront */}
        <div className="absolute inset-0 z-0">
          <EnvelopeBack isOpen={isOpened} />
        </div>

        {/* EnvelopeFront is in front with higher z-index */}
        <div
          className={`absolute inset-0 z-10 transition-all duration-500 ${isOpened ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <EnvelopeFront
            isOpen={isOpened}
            onClick={handleEnvelopeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Envelope;
