"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  MapPin,
  Code2,
  Cpu,
  Globe,
  GraduationCap,
  Sparkles,
  Download,
  CheckCircle2,
  Compass,
} from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

// Spotlight Card Helper Component
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={
        {
          "--mx": `${mousePos.x}%`,
          "--my": `${mousePos.y}%`,
          transition:
            "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        } as React.CSSProperties
      }
      className={`group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${className}`}
    >
      {/* Radial Spotlight Gradient tracking cursor */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(400px circle at var(--mx) var(--my), rgba(255, 122, 26, 0.08), transparent 65%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="pointer-events-none absolute inset-0 z-0 will-change-[opacity]"
      />

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

export default function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, amount: 0.2 });

  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section
      id="about"
      aria-label="About Sai Vikas"
      className="relative py-20 lg:py-[120px] w-full bg-[var(--bg)]"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-badge-subtle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .anim-float-photo {
          animation: float-badge-subtle 6s ease-in-out infinite;
        }
      ` }} />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* =================================================================== */}
        {/* 1. SECTION HEADER (REVEAL)                                          */}
        {/* =================================================================== */}
        <motion.header
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
              ● 02 / ABOUT
            </span>
          </div>

          {/* H2 Title */}
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)] max-w-[16ch]">
            Engineering with intent
          </h2>

          {/* Description */}
          <p className="mt-3.5 font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-2xl">
            A synthesis of computer science fundamentals, full-stack craftsmanship, and real-time systems.
          </p>
        </motion.header>

        {/* =================================================================== */}
        {/* 2. BENTO GRID MATRIX (12 COLS DESKTOP | 2 COLS TABLET | 1 COL MOB)  */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">

          {/* ----------------------------------------------------------------- */}
          {/* CARD 1: "WHO I AM" (7 COLS DESKTOP)                               */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 lg:col-span-7 h-full"
          >
            <BentoCard className="p-7 sm:p-9 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#FF7A1A]">
                    01 // NARRATIVE
                  </span>
                  <span className="font-mono text-xs text-[var(--text-dim)] uppercase">
                    SRKR CS &amp; IT
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white mb-5">
                  Who I am
                </h3>

                {/* Bio text (17px, 1.75 line-height, max-w-[62ch]) */}
                <div className="space-y-4 font-sans text-[17px] leading-[1.75] text-[var(--text-muted)] max-w-[62ch]">
                  <p>
                    I&apos;m a dedicated <strong className="text-white font-semibold">Computer Science &amp; Information Technology</strong> student at <strong className="text-white font-semibold">SRKR Engineering College</strong> with an obsession for high-throughput distributed systems and fluid web interfaces. My engineering path took off when I designed my first interactive web application in 2nd year, and I&apos;ve been hooked on low-latency event-driven architectures ever since.
                  </p>
                  <p>
                    Throughout my academic and project work, I&apos;ve cultivated a disciplined approach to <strong className="text-white font-semibold">algorithmic problem solving</strong>, clean modular code (DRY), and scalable database modelling. Whether architecting real-time WebSocket state synchronizations or crafting pixel-perfect responsive layouts, I focus on building resilient software that performs under high load.
                  </p>
                  <p>
                    Outside of core academics, I actively coordinate local cricket tournaments, track sports telemetry metrics, and mentor peers in competitive programming. I believe software engineering is an art of intentionality: every byte, transition, and endpoint should serve a distinct purpose.
                  </p>
                </div>
              </div>

              {/* Signature-style line at the bottom */}
              <div className="pt-5 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-3">
                <span className="font-signature text-3xl sm:text-4xl text-[#FF7A1A] tracking-wide select-none">
                  Sai Vikas
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider">
                  Full-Stack Craftsman
                </span>
              </div>
            </BentoCard>
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* CARD 2: PHOTO CARD (5 COLS DESKTOP)                               */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 lg:col-span-5 h-full"
          >
            <BentoCard className="p-3 sm:p-4 h-full flex flex-col justify-center">
              <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full min-h-[380px] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                {/* Floating Image with Grayscale to Color Transition on Hover */}
                <div className="anim-float-photo relative w-full h-full">
                  <Image
                    src="/assets/images/my1.jpg"
                    alt="Sai Vikas Portrait"
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-top filter grayscale contrast-[1.05] brightness-[0.98] group-hover:grayscale-0 group-hover:contrast-[1.02] group-hover:brightness-[1.02] transition-all duration-700 ease-out"
                  />
                  {/* Subtle Dark Vignette Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                </div>

                {/* Floating Glass Badge in Corner: "Final-year CSE · SRKR" */}
                <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 border border-white/15 text-white backdrop-blur-md shadow-lg select-none">
                  <GraduationCap size={14} className="text-[#FF7A1A]" />
                  <span className="font-mono text-xs font-medium">Final-year CSE · SRKR</span>
                </div>

                {/* Second Small Floating Badge: "Open to work" */}
                <div className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 border border-emerald-500/30 text-emerald-400 backdrop-blur-md shadow-lg select-none">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    Open to work
                  </span>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* CARD 3: EDUCATION TIMELINE (4 COLS DESKTOP)                       */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-1 lg:col-span-4 h-full"
          >
            <BentoCard className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#FF7A1A]">
                  02 // ACADEMICS
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase">
                  TIMELINE
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white mb-5">
                  Education
                </h3>

                {/* Vertical Timeline with Animated ScaleY Line */}
                <div ref={timelineRef} className="relative pl-6 space-y-6">
                  {/* Drawing Orange Timeline Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isTimelineInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                      style={{ originY: 0 }}
                      className="w-full h-full bg-gradient-to-b from-[#FFB020] via-[#FF7A1A] to-[#FF3D54]"
                    />
                  </div>

                  {/* Node 1: SRKR */}
                  <div className="relative space-y-1">
                    {/* Pulsing Dot Node */}
                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FF7A1A] ring-4 ring-[#FF7A1A]/20" />
                    <span className="font-mono text-xs text-[#FF7A1A] font-semibold tracking-wider block">
                      2023 — 2027 (Current)
                    </span>
                    <h4 className="font-display font-bold text-base text-white">
                      SRKR Engineering College
                    </h4>
                    <p className="font-sans text-xs text-[var(--text-muted)]">
                      B.Tech in Computer Science &amp; IT
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-white font-medium">
                      GPA: 8.0 / 10.0
                    </span>
                  </div>

                  {/* Node 2: Tirumala */}
                  <div className="relative space-y-1">
                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 ring-4 ring-white/5" />
                    <span className="font-mono text-xs text-[var(--text-dim)] tracking-wider block">
                      2021 — 2023
                    </span>
                    <h4 className="font-display font-semibold text-sm text-white">
                      Tirumala Junior College
                    </h4>
                    <p className="font-sans text-xs text-[var(--text-muted)]">
                      Intermediate (MPC)
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-[var(--text-muted)]">
                      958 / 1000 · Rank 15,511
                    </span>
                  </div>

                  {/* Node 3: Sree Sree */}
                  <div className="relative space-y-1">
                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-white/40 ring-4 ring-white/5" />
                    <span className="font-mono text-xs text-[var(--text-dim)] tracking-wider block">
                      2020 — 2021
                    </span>
                    <h4 className="font-display font-semibold text-sm text-white">
                      Sree Sree High School
                    </h4>
                    <p className="font-sans text-xs text-[var(--text-muted)]">
                      Secondary School Certificate (SSC)
                    </p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-emerald-400">
                      Perfect 10.0 / 10.0 GPA
                    </span>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* CARD 4: QUICK FACTS (4 COLS DESKTOP)                              */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-1 lg:col-span-4 h-full"
          >
            <BentoCard className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#FF7A1A]">
                  03 // PROFILE
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase">
                  QUICK FACTS
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white mb-5">
                  Overview
                </h3>

                {/* 4 Rows with Icons and Hairline Borders */}
                <div className="divide-y divide-white/[0.06]">
                  {/* Row 1: Location */}
                  <div className="py-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[#FF7A1A] shrink-0 mt-0.5">
                      <MapPin size={15} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                        Location
                      </span>
                      <span className="font-sans text-sm font-medium text-white block">
                        Bhimavaram, Andhra Pradesh, IN
                      </span>
                    </div>
                  </div>

                  {/* Row 2: Role */}
                  <div className="py-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                      <Code2 size={15} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                        Role
                      </span>
                      <span className="font-sans text-sm font-medium text-white block">
                        Full-Stack Developer &amp; Engineer
                      </span>
                    </div>
                  </div>

                  {/* Row 3: Focus Area */}
                  <div className="py-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Cpu size={15} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                        Focus Area
                      </span>
                      <span className="font-sans text-sm font-medium text-white block">
                        Real-Time WebSockets &amp; Next.js 15
                      </span>
                    </div>
                  </div>

                  {/* Row 4: Languages */}
                  <div className="py-3.5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                      <Globe size={15} />
                    </div>
                    <div>
                      <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider block">
                        Languages
                      </span>
                      <span className="font-sans text-sm font-medium text-white block">
                        English, Telugu, Hindi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* CARD 5: "WHAT I CARE ABOUT" (4 COLS DESKTOP)                      */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-2 lg:col-span-4 h-full"
          >
            <BentoCard className="p-6 sm:p-7 flex flex-col justify-between h-full space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[#FF7A1A]">
                  04 // VALUES
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase">
                  PHILOSOPHY
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white mb-5">
                  What I care about
                </h3>

                {/* 3 Principles with Hover Orange Left Border */}
                <div className="space-y-4">
                  {/* Principle 01 */}
                  <div className="group/row border-l-2 border-transparent hover:border-l-[var(--accent)] pl-3 transition-all duration-200">
                    <span className="font-mono text-xs text-[#FF7A1A] font-bold block mb-1">
                      01 // PERFORMANCE &amp; LOW LATENCY
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] group-hover/row:text-zinc-200 leading-relaxed transition-colors">
                      Sub-50ms synchronization, minimal bundle footprints, and zero redundant DOM re-renders.
                    </p>
                  </div>

                  {/* Principle 02 */}
                  <div className="group/row border-l-2 border-transparent hover:border-l-[var(--accent)] pl-3 transition-all duration-200">
                    <span className="font-mono text-xs text-[#FF7A1A] font-bold block mb-1">
                      02 // CLEAN ARCHITECTURE
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] group-hover/row:text-zinc-200 leading-relaxed transition-colors">
                      Strict typing, DRY modular components, predictable state machines, and resilient error boundaries.
                    </p>
                  </div>

                  {/* Principle 03 */}
                  <div className="group/row border-l-2 border-transparent hover:border-l-[var(--accent)] pl-3 transition-all duration-200">
                    <span className="font-mono text-xs text-[#FF7A1A] font-bold block mb-1">
                      03 // EXCEPTIONAL UX &amp; MOTION
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] group-hover/row:text-zinc-200 leading-relaxed transition-colors">
                      Purposeful micro-interactions, natural spatial physics, and accessible keyboard-first navigation.
                    </p>
                  </div>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* ----------------------------------------------------------------- */}
          {/* CARD 6: WIDE STRIP METRICS CARD (12 COLS DESKTOP)                 */}
          {/* ----------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 md:col-span-2 lg:col-span-12"
          >
            <BentoCard className="p-6 sm:p-8">
              <div
                ref={statsRef}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]"
              >
                {/* Stat 1: 8.0 B.Tech GPA */}
                <div className="pt-4 lg:pt-0 lg:px-6 first:pl-0 text-left space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] block">
                    B.TECH GPA
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl sm:text-5xl text-white">
                      8.0
                    </span>
                    <span className="font-mono text-sm text-[var(--text-dim)] font-semibold">
                      / 10
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[var(--text-muted)] block">
                    SRKR Engineering College (IT)
                  </span>
                </div>

                {/* Stat 2: 958 Intermediate */}
                <div className="pt-4 lg:pt-0 lg:px-6 text-left space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#FF7A1A] block">
                    INTERMEDIATE IPE
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl sm:text-5xl text-[#FF7A1A]">
                      958
                    </span>
                    <span className="font-mono text-sm text-[var(--text-dim)] font-semibold">
                      / 1000
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[var(--text-muted)] block">
                    Tirumala Junior College (MPC)
                  </span>
                </div>

                {/* Stat 3: 15,511 EAPCET Rank */}
                <div className="pt-4 lg:pt-0 lg:px-6 text-left space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block">
                    EAPCET STATE RANK
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl sm:text-5xl text-emerald-400">
                      15,511
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[var(--text-muted)] block">
                    Engineering Entrance Merit
                  </span>
                </div>

                {/* Stat 4: 5+ Production Systems */}
                <div className="pt-4 lg:pt-0 lg:px-6 text-left space-y-1">
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 block">
                    DEPLOYED APPS
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-display font-bold text-3xl sm:text-5xl text-cyan-400">
                      5+
                    </span>
                    <span className="font-mono text-sm text-[var(--text-dim)] font-semibold">
                      Live
                    </span>
                  </div>
                  <span className="font-sans text-xs text-[var(--text-muted)] block">
                    Full-Stack Systems &amp; Engines
                  </span>
                </div>
              </div>
            </BentoCard>
          </motion.div>

        </div>

        {/* =================================================================== */}
        {/* 3. DOWNLOAD RESUME SECONDARY BUTTON BELOW GRID                       */}
        {/* =================================================================== */}
        <div className="mt-12 flex justify-center">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => { try { playUISound("click"); } catch {} }}
            onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-sans font-medium text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] hover:text-white shadow-lg active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none"
          >
            <Download
              size={16}
              className="text-[#FF7A1A] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5"
            />
            <span>Download Resume</span>
          </a>
        </div>

      </div>
    </section>
  );
}
