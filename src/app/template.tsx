import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      {/* Fixed Ambient Background Layer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -10,
          pointerEvents: "none",
          background: "radial-gradient(circle at 70% 60%, rgba(245,158,11,0.12), transparent 60%)",
        }}
      />
      {/* Subtle Exit Overlay */}
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
      {children}
    </AnimatePresence>
  );
}
