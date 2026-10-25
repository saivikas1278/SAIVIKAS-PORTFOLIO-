"use client";

import React from "react";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  dot?: boolean;
  dotColor?: "accent" | "success" | "neutral";
  variant?: "default" | "active" | "muted";
  className?: string;
}

export default function Pill({
  children,
  dot = false,
  dotColor = "accent",
  variant = "default",
  className = "",
  ...props
}: PillProps) {
  let variantStyles = "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)]";
  if (variant === "active") {
    variantStyles = "bg-[var(--surface-2)] text-[var(--text)] border-[var(--border-strong)]";
  } else if (variant === "muted") {
    variantStyles = "bg-transparent text-[var(--text-dim)] border-[var(--border)]";
  }

  let dotStyle = "bg-[var(--accent)]";
  if (dotColor === "success") {
    dotStyle = "bg-[var(--success)]";
  } else if (dotColor === "neutral") {
    dotStyle = "bg-[var(--text-dim)]";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium uppercase tracking-[0.12em] border select-none transition-colors duration-200 ${variantStyles} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotStyle}`} />}
      <span>{children}</span>
    </span>
  );
}
