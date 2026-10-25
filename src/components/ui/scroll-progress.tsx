"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] origin-left z-[100] pointer-events-none"
    />
  );
}
