"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

type ButtonVariant = "primary" | "secondary" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  target?: string;
  rel?: string;
  arrow?: boolean;
  icon?: React.ReactNode;
  "aria-label"?: string;
  children?: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  href,
  target,
  rel,
  arrow = false,
  icon,
  children,
  className = "",
  onClick,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    try {
      playUISound("click");
    } catch {
      // Audio playback non-blocking
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const handleMouseEnter = () => {
    try {
      playUISound("hover");
    } catch {
      // Audio playback non-blocking
    }
  };

  // Base styling for all buttons
  const baseClasses =
    "group inline-flex items-center justify-center font-sans font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] disabled:opacity-50 disabled:pointer-events-none select-none";

  // Variant-specific styling
  let variantClasses = "";
  if (variant === "primary") {
    variantClasses =
      "relative px-6 py-3 rounded-full text-[#07070A] font-semibold bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_24px_-4px_rgba(255,122,26,0.35)] hover:shadow-[0_0_36px_0px_rgba(255,122,26,0.5)] active:scale-[0.98]";
  } else if (variant === "secondary") {
    variantClasses =
      "px-6 py-3 rounded-full bg-transparent text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] active:scale-[0.98]";
  } else if (variant === "icon") {
    variantClasses =
      "w-11 h-11 rounded-full p-0 bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:bg-[var(--surface-2)] hover:text-[var(--text)] hover:border-[var(--border-strong)] active:scale-[0.95]";
  }

  const content = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {arrow && (
        <ArrowRight
          size={16}
          className="ml-2 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        aria-label={ariaLabel}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      aria-label={ariaLabel}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
}
