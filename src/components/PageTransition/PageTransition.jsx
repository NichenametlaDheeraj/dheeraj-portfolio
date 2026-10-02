import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();

  const standardVariants = {
    initial: {
      opacity: 0,
      y: 20,
      rotateX: 1.5,
      scale: 0.985,
    },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -5,
      rotateX: -0.5,
    },
  };

  const reducedVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const transitionConfig = {
    duration: shouldReduceMotion ? 0.15 : 0.32,
    ease: [0.16, 1, 0.3, 1], // Smooth professional cubic-bezier ease-out
  };

  return (
    <div
      style={{
        perspective: shouldReduceMotion ? "none" : "1400px",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={shouldReduceMotion ? reducedVariants : standardVariants}
        transition={transitionConfig}
        style={{
          width: "100%",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          transformStyle: shouldReduceMotion ? "flat" : "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
