import { useState } from "react";

interface AnimationState {
  isEnvelopeOpen: boolean;
  isLetterVisible: boolean;
}

export const useAnimation = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isEnvelopeOpen: false,
    isLetterVisible: false,
  });

  const openEnvelope = () => {
    // Set envelope to open
    setAnimationState((prev) => ({ ...prev, isEnvelopeOpen: true }));

    // After envelope animation completes, show letter
    setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, isLetterVisible: true }));
    }, 800); // This matches the envelope opening animation duration
  };

  const resetAnimation = () => {
    setAnimationState({
      isEnvelopeOpen: false,
      isLetterVisible: false,
    });
  };

  return {
    ...animationState,
    openEnvelope,
    resetAnimation,
  };
};

export default useAnimation;
