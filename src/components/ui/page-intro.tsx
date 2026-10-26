"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function PageIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#07070A] flex flex-col items-center justify-center select-none pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute w-72 h-72 rounded-full bg-[#FF7A1A]/15 filter blur-3xl pointer-events-none"
          />

          {/* Center Monogram Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.06, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-20 h-20 rounded-2xl bg-[#0E0E13] border border-white/15 flex items-center justify-center shadow-[0_0_40px_rgba(255,122,26,0.3)] overflow-hidden"
          >
            {/* SVG Vector Paths for "S" and "V" with draw-in stroke animation */}
            <svg
              viewBox="0 0 100 100"
              className="w-12 h-12 text-[#FF7A1A]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* "S" Path */}
              <motion.path
                d="M 42 32 C 42 25, 20 23, 20 34 C 20 46, 44 43, 44 57 C 44 69, 21 68, 20 59"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* "V" Path */}
              <motion.path
                d="M 54 28 L 68 70 L 82 28"
                stroke="currentColor"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </motion.div>

          {/* Micro Progress Line below */}
          <div className="w-14 h-[2px] rounded-full bg-white/10 overflow-hidden mt-5 relative">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
