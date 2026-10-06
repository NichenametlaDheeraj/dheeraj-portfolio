import React from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const pathname = location.pathname;

  // Helper to determine route variants & transition settings
  const getRouteConfig = (path) => {
    // 1. Home / Root route: fade + scale 0.98->1 + blur 8px->0, duration 0.6s ease [0.25, 0.1, 0.25, 1]
    if (path === "/") {
      return {
        initial: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
      };
    }

    // 2. Projects routes: slide from right x 80->0, exit x -40, plus stagger children 0.08s
    if (path.startsWith("/projects")) {
      return {
        initial: { opacity: 0, x: 80 },
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            staggerChildren: 0.08,
          },
        },
        exit: { opacity: 0, x: -40, transition: { duration: 0.4 } },
      };
    }

    // 3. About / Experience / Skills / Education / Achievements: slide up y 60->0 with ease [0.33, 1, 0.68, 1]
    if (
      path === "/about" ||
      path === "/experience" ||
      path === "/skills" ||
      path === "/education" ||
      path === "/achievements"
    ) {
      return {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
        transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
      };
    }

    // 4. Contact: slide from bottom y 100->0 + blur 10px->0, duration 0.7s
    if (path === "/contact") {
      return {
        initial: { opacity: 0, y: 100, filter: "blur(10px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: 50, filter: "blur(10px)" },
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
      };
    }

    // 5. Default: simple opacity fade
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4 },
    };
  };

  const config = getRouteConfig(pathname);

  const reducedVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div style={{ position: "relative", width: "100%", minHeight: "100%" }}>
      {/* Subtle Page Exit Overlay: bg-[#0C0A09] with opacity transition */}
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0.6 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#0C0A09",
          pointerEvents: "none",
          zIndex: 999,
        }}
      />

      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? "initial" : config.initial}
        animate={shouldReduceMotion ? "animate" : config.animate}
        exit={shouldReduceMotion ? "exit" : config.exit}
        variants={shouldReduceMotion ? reducedVariants : undefined}
        transition={shouldReduceMotion ? { duration: 0.15 } : config.transition}
        style={{ width: "100%", minHeight: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
