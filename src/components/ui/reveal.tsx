"use client";

import React from "react";
import { motion, type Variants } from "motion/react";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  className?: string;
  amount?: number;
}

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Reveal({
  children,
  delay = 0,
  stagger = false,
  staggerDelay = 0.08,
  className = "",
  amount = 0.2,
}: RevealProps) {
  if (stagger) {
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: staggerDelay,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={containerVariants}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: itemVariants.hidden,
        visible: {
          ...itemVariants.visible,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
