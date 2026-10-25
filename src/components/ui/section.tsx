"use client";

import React from "react";
import Reveal from "./reveal";

interface SectionProps {
  id?: string;
  eyebrow: string;
  title: string | React.ReactNode;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerAlign?: "left" | "center";
}

export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  headerAlign = "left",
}: SectionProps) {
  const isCenter = headerAlign === "center";

  return (
    <section
      id={id}
      className={`relative py-20 lg:py-[120px] w-full ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <Reveal>
          <header
            className={`mb-12 lg:mb-16 flex flex-col ${
              isCenter ? "items-center text-center mx-auto" : "items-start text-left"
            }`}
          >
            {/* Mono Eyebrow with Small Accent Dot */}
            <div className="inline-flex items-center gap-2 mb-3 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
                {eyebrow}
              </span>
            </div>

            {/* Section H2 Title */}
            <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)] max-w-[16ch]">
              {title}
            </h2>

            {/* Optional One-Line Muted Description */}
            {description && (
              <p className="mt-3.5 font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-2xl">
                {description}
              </p>
            )}
          </header>
        </Reveal>

        {/* Section Body */}
        {children}
      </div>
    </section>
  );
}
