"use client";

import React, { useRef, useState, useCallback } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  enableSpotlight?: boolean;
}

export default function Card({
  children,
  className = "",
  enableSpotlight = true,
  ...props
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={enableSpotlight ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--mx": `${mousePos.x}%`,
          "--my": `${mousePos.y}%`,
          transition:
            "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        } as React.CSSProperties
      }
      className={`group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 overflow-hidden ${className}`}
      {...props}
    >
      {/* Radial Spotlight Gradient tracking cursor */}
      {enableSpotlight && (
        <div
          aria-hidden="true"
          style={{
            background: `radial-gradient(400px circle at var(--mx) var(--my), rgba(255, 122, 26, 0.08), transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          className="pointer-events-none absolute inset-0 z-0 will-change-[opacity]"
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
