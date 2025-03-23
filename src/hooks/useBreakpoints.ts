import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Breakpoints {
  xs: boolean; // < 640px
  sm: boolean; // >= 640px
  md: boolean; // >= 768px
  lg: boolean; // >= 1024px
  xl: boolean; // >= 1280px
  "2xl": boolean; // >= 1536px
  current: Breakpoint;
}

export const useBreakpoints = (): Breakpoints => {
  // Default values for SSR
  const defaultBreakpoints: Breakpoints = {
    xs: true,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    "2xl": false,
    current: "xs",
  };

  const [breakpoints, setBreakpoints] = useState<Breakpoints>(defaultBreakpoints);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const updateBreakpoints = () => {
      const width = window.innerWidth;
      const newBreakpoints: Breakpoints = {
        xs: width < 640,
        sm: width >= 640,
        md: width >= 768,
        lg: width >= 1024,
        xl: width >= 1280,
        "2xl": width >= 1536,
        current: "xs",
      };

      // Determine current breakpoint (highest matching one)
      if (width >= 1536) {
        newBreakpoints.current = "2xl";
      } else if (width >= 1280) {
        newBreakpoints.current = "xl";
      } else if (width >= 1024) {
        newBreakpoints.current = "lg";
      } else if (width >= 768) {
        newBreakpoints.current = "md";
      } else if (width >= 640) {
        newBreakpoints.current = "sm";
      }

      setBreakpoints(newBreakpoints);
    };

    // Initial check
    updateBreakpoints();

    // Add event listener
    window.addEventListener("resize", updateBreakpoints);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateBreakpoints);
    };
  }, []);

  return breakpoints;
};

export default useBreakpoints;
