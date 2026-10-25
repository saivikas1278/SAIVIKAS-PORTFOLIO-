"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, type Variants } from "motion/react";
import {
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  Copy,
  Check,
  Layers,
  Award,
  Radio,
  ExternalLink,
} from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

// Social SVG Icons
const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Headline words for word-by-word fade & blur animation
const HEADLINE_WORDS = [
  { text: "Building", highlight: false },
  { text: "scalable", highlight: false },
  { text: "real-time", highlight: true },
  { text: "systems", highlight: true },
  { text: "&", highlight: false },
  { text: "high-performance", highlight: false },
  { text: "web", highlight: false },
  { text: "architectures.", highlight: false },
];

export default function HeroSection() {
  // 1. Copy Email state
  const [copied, setCopied] = useState(false);

  // 2. Parallax mouse tracking for 3D card tilt & ambient glow shift
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState("");

  // 3. Live Auction Mini-Widget states
  const [bidAmount, setBidAmount] = useState(12.5);
  const [isFlashing, setIsFlashing] = useState(false);
  const [bidHistory, setBidHistory] = useState<number[]>([11.5, 11.75, 12.0, 12.25, 12.5]);

  // 4. In-view ref for stats count-up trigger
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.3 });

  // Mouse move handler for parallax glow and 3D tilt (max 6 deg)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { innerWidth, innerHeight } = window;

    // Normalised from -1 to 1
    const nx = (clientX / innerWidth) * 2 - 1;
    const ny = (clientY / innerHeight) * 2 - 1;
    setMousePos({ x: nx, y: ny });

    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (clientX - cx) / (rect.width / 2);
      const dy = (clientY - cy) / (rect.height / 2);

      // Max 6 degrees tilt
      const rotX = Math.max(-6, Math.min(6, -dy * 6));
      const rotY = Math.max(-6, Math.min(6, dx * 6));

      setTiltStyle(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
      );
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setMousePos({ x: 0, y: 0 });
  }, []);

  // 1-Click Clipboard handler
  const handleCopyEmail = useCallback(() => {
    try {
      playUISound("click");
    } catch {}
    navigator.clipboard.writeText("cheepusaivikas549@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  // Live Auction Mini-Widget Bidding Loop (increments every 2.5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setBidAmount((prev) => {
        const next = prev >= 15.5 ? 12.5 : +(prev + 0.25).toFixed(2);
        // Flash amount
        setIsFlashing(true);
        setTimeout(() => setIsFlashing(false), 400);

        // Update sparkline history
        setBidHistory((hist) => {
          const updated = [...hist.slice(1), next];
          return updated;
        });

        return next;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Sparkline coordinates for 5 points in a 120x36 box
  const minVal = 11.5;
  const maxVal = 16.0;
  const sparkPoints = bidHistory
    .map((val, idx) => {
      const x = 8 + idx * 26;
      const y = 30 - ((val - minVal) / (maxVal - minVal)) * 22;
      return `${x},${y}`;
    })
    .join(" ");

  const lastSparkX = 8 + (bidHistory.length - 1) * 26;
  const lastSparkY = 30 - ((bidAmount - minVal) / (maxVal - minVal)) * 22;

  return (
    <section
      id="home"
      aria-label="Hero Overview"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-72px)] w-full flex flex-col justify-between px-6 lg:px-12 pt-28 pb-16 overflow-hidden bg-[var(--bg)]"
    >
      {/* ========================================================================= */}
      {/* 1. PARALLAX AMBIENT GLOWS & HERO MESH BACKDROP                            */}
      {/* ========================================================================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes conic-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-conic-spin {
          animation: conic-spin 8s linear infinite;
        }
        @keyframes mouse-scroll-dot {
          0% { transform: translateY(0px); opacity: 1; }
          75% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0px); opacity: 0; }
        }
        .anim-scroll-dot {
          animation: mouse-scroll-dot 1.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
      ` }} />

      {/* Parallax Shifted Ambient Light (Orange Top-Right) */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate(${mousePos.x * 16}px, ${mousePos.y * 16}px)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="pointer-events-none absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full bg-[#FF7A1A]/10 blur-[120px] will-change-transform z-0"
      />

      {/* Parallax Shifted Ambient Light (Coral Bottom-Left) */}
      <div
        aria-hidden="true"
        style={{
          transform: `translate(${mousePos.x * -16}px, ${mousePos.y * -16}px)`,
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="pointer-events-none absolute bottom-1/4 -left-20 w-[480px] h-[480px] rounded-full bg-[#FF3D54]/[0.08] blur-[120px] will-change-transform z-0"
      />

      {/* ========================================================================= */}
      {/* 2. 12-COLUMN MAIN HERO GRID (LEFT: 7 COLS | RIGHT: 5 COLS)                */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* --------------------------------------------------------------------- */}
          {/* LEFT COLUMN: 7 COLS (MAIN NARRATIVE & ACTION DECK)                    */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">

            {/* 1. TOP ROW: PROFILE PHOTO (72px) + NAME + SUBTITLE + AVAILABILITY     */}
            <div className="w-full flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* 72px Circular Portrait with 8s Rotating Conic-Gradient Ring */}
                <div className="relative w-[72px] h-[72px] rounded-full p-[2px] shrink-0">
                  {/* Rotating Conic Gradient Outer Ring */}
                  <div className="anim-conic-spin absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#FFB020,#FF7A1A,#FF3D54,#FFB020)]" />

                  {/* Inner Dark Rim */}
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-black border-2 border-black">
                    <Image
                      src="/assets/images/my1.jpg"
                      alt="Sai Vikas"
                      width={72}
                      height={72}
                      priority
                      className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02]"
                    />
                  </div>

                  {/* Tiny Green Pulsing Online Dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#07070A] shadow-[0_0_8px_rgba(16,185,129,0.8)] flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                </div>

                {/* Identity Text */}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl tracking-tight text-white uppercase">
                      SAI VIKAS
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 font-mono text-[11px] text-[var(--text-muted)]">
                      IN
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[var(--text-muted)]">
                    Computer Science Engineer &amp; Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Available for Opportunities Pill (Desktop Right End) */}
              <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-emerald-500/30 text-emerald-400 font-mono text-xs font-medium select-none shadow-[0_0_15px_rgba(16,185,129,0.12)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for Opportunities</span>
              </div>
            </div>

            {/* 2. EYEBROW: SPARKLE + "EXECUTIVE PORTFOLIO" IN MONO ORANGE           */}
            <div className="inline-flex items-center gap-2 text-[#FF7A1A] font-mono text-xs font-medium uppercase tracking-[0.12em] select-none">
              <Sparkles size={14} className="text-[#FF7A1A]" />
              <span>EXECUTIVE PORTFOLIO</span>
            </div>

            {/* 3. H1: SENTENCE CASE, FLUID CLAMP, ANIMATED WORD BY WORD              */}
            <h1 className="font-display font-bold text-[clamp(2.5rem,5vw,4.5rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)] max-w-[16ch]">
              {HEADLINE_WORDS.map((item, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.04 * idx,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`inline-block mr-[0.25em] ${
                    item.highlight
                      ? "bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] bg-clip-text text-transparent"
                      : "text-white"
                  }`}
                >
                  {item.text}
                </motion.span>
              ))}
            </h1>

            {/* 4. BIO PARAGRAPH: MAX 560PX, 18PX, WHITE HIGHLIGHTS                  */}
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-[560px]">
              Final-year Computer Science engineer at{" "}
              <strong className="text-white font-semibold">SRKR Engineering College</strong>.
              Specializing in low-latency WebSocket bidding systems, production-ready{" "}
              <strong className="text-white font-semibold">Next.js 15</strong> architectures,
              and resilient digital products.
            </p>

            {/* 5. BUTTON ROW: PRIMARY, SECONDARY, COPY EMAIL, SOCIALS               */}
            <div className="flex flex-wrap items-center gap-3 w-full pt-1">
              {/* Primary Gradient CTA */}
              <a
                href="#projects"
                onClick={() => { try { playUISound("click"); } catch {} }}
                onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#07070A] bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_24px_-4px_rgba(255,122,26,0.35)] hover:shadow-[0_0_36px_rgba(255,122,26,0.55)] hover:scale-105 active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none shrink-0"
              >
                <span>View Projects</span>
                <ArrowDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Secondary Button */}
              <a
                href="#contact"
                onClick={() => { try { playUISound("click"); } catch {} }}
                onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium text-[var(--text)] bg-transparent border border-[var(--border)] hover:bg-[var(--surface-2)] hover:border-[var(--border-strong)] active:scale-[0.98] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none shrink-0"
              >
                Get in touch
              </a>

              {/* Copy Email Ghost Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
                aria-label="Copy email address"
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full text-xs font-mono font-medium transition-all duration-300 active:scale-[0.98] select-none shrink-0 ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] hover:text-white hover:border-[var(--border-strong)]"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              {/* GitHub 44px Circle Icon Button */}
              <a
                href="https://github.com/saivikas1278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                onClick={() => { try { playUISound("click"); } catch {} }}
                onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-white hover:border-[#FF7A1A] hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(255,122,26,0.25)] active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0"
              >
                <GithubIcon size={18} />
              </a>

              {/* LinkedIn 44px Circle Icon Button */}
              <a
                href="https://linkedin.com/in/sai-vikas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                onClick={() => { try { playUISound("click"); } catch {} }}
                onMouseEnter={() => { try { playUISound("hover"); } catch {} }}
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[#00D8FF] hover:border-[#00D8FF]/60 hover:-translate-y-1 hover:shadow-[0_0_16px_rgba(0,216,255,0.2)] active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shrink-0"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>

            {/* 6. THIN ROW OF 3 MINI STATS WITH VERTICAL DIVIDERS                    */}
            <div
              ref={statsRef}
              className="w-full max-w-xl pt-4 border-t border-[var(--border)] flex items-center justify-between text-left"
            >
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-0.5"
              >
                <span className="font-display font-bold text-xl sm:text-2xl text-white block">
                  Final Year
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider block">
                  B.Tech Student
                </span>
              </motion.div>

              <div className="w-[1px] h-8 bg-white/10" />

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-0.5"
              >
                <span className="font-display font-bold text-xl sm:text-2xl text-[#FF7A1A] block">
                  8.0 GPA
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider block">
                  Academic Score
                </span>
              </motion.div>

              <div className="w-[1px] h-8 bg-white/10" />

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-0.5"
              >
                <span className="font-display font-bold text-xl sm:text-2xl text-white block">
                  Real-Time
                </span>
                <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider block">
                  WebSocket Engines
                </span>
              </motion.div>
            </div>

          </div>

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT COLUMN: 5 COLS (FLAGSHIP CRICKET AUCTION CARD)                  */}
          {/* --------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              ref={cardRef}
              style={{
                transform: tiltStyle,
                transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-md rounded-[20px] p-[1px] group select-none"
            >
              {/* Soft Orange Glow Behind the Card */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[20px] bg-gradient-to-br from-[#FFB020]/20 via-[#FF7A1A]/15 to-[#FF3D54]/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              {/* Animated Conic Gradient Border (1px) */}
              <div className="anim-conic-spin absolute inset-0 rounded-[20px] bg-[conic-gradient(from_0deg,#FFB020,#FF7A1A,#FF3D54,#FFB020)] opacity-70 group-hover:opacity-100 transition-opacity" />

              {/* Inner Card Body */}
              <div className="relative rounded-[19px] bg-[var(--surface)] p-6 sm:p-7 flex flex-col justify-between space-y-5 h-full overflow-hidden">

                {/* Top Row: FLAGSHIP SYSTEM Pill + REAL-TIME ARCHITECTURE */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#FF7A1A] px-3 py-1 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/30">
                    FLAGSHIP SYSTEM
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider">
                    REAL-TIME ARCHITECTURE
                  </span>
                </div>

                {/* Card Title & Description */}
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-white group-hover:text-[#FF7A1A] transition-colors duration-200">
                    Cricket Auction Engine
                  </h3>
                  <p className="font-sans text-sm text-[var(--text-muted)] leading-relaxed mt-2">
                    Distributed live bidding architecture featuring sub-50ms synchronized state broadcast, auctioneer controls, and dynamic team budget calculations.
                  </p>
                </div>

                {/* LIVE AUCTION MINI-WIDGET (FILLS THE SPACE COMPLETELY) */}
                <div className="p-4 rounded-xl bg-black/60 border border-[var(--border)] space-y-3">
                  {/* Widget Header: Lot & Live Beacon */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-dim)] block">
                        CURRENT LOT
                      </span>
                      <span className="font-mono font-semibold text-xs text-white">
                        Marquee All-Rounder
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-[10px] font-bold tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>LIVE</span>
                    </div>
                  </div>

                  {/* Bid Display with Number Roll & Flash */}
                  <div
                    style={{
                      transition: "color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                    }}
                    className={`p-3 rounded-lg bg-zinc-950/90 border flex items-center justify-between ${
                      isFlashing
                        ? "border-[#FF7A1A] shadow-[0_0_20px_rgba(255,122,26,0.35)]"
                        : "border-white/10"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-[var(--text-dim)] uppercase block">
                        Active Top Bid
                      </span>
                      <span
                        className={`font-mono font-bold text-lg sm:text-xl transition-colors duration-300 ${
                          isFlashing ? "text-[#FF7A1A]" : "text-white"
                        }`}
                      >
                        ₹ {bidAmount.toFixed(2)} Cr
                      </span>
                    </div>

                    {/* Animated Line Sparkline */}
                    <div className="relative w-[120px] h-[36px]">
                      <svg viewBox="0 0 120 36" className="w-full h-full overflow-visible">
                        <polyline
                          fill="none"
                          stroke="#FF7A1A"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={sparkPoints}
                        />
                        <circle
                          cx={lastSparkX}
                          cy={lastSparkY}
                          r={isFlashing ? 4.5 : 3}
                          fill="#FFB020"
                          className="transition-all duration-300"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Latency Telemetry Readout */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-dim)] pt-0.5">
                    <span>Latency &lt; 45ms</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      WebSocket Synced
                    </span>
                  </div>
                </div>

                {/* Bottom: Tech Chips & Explore Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-[var(--border)] text-[var(--text-muted)]">
                      Next.js 15
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-[var(--border)] text-[var(--text-muted)]">
                      WebSockets
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-[var(--border)] text-[var(--text-muted)]">
                      MongoDB
                    </span>
                  </div>

                  <a
                    href="#projects"
                    onClick={() => { try { playUISound("click"); } catch {} }}
                    className="group/link inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#FF7A1A] hover:text-white transition-colors select-none"
                  >
                    <span>Explore Architecture</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/link:translate-x-1 group-hover/link:-translate-y-1"
                    />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCROLL INDICATOR AT BOTTOM CENTER                                       */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-8 pb-4 select-none">
        <a
          href="#capabilities"
          aria-label="Scroll to capabilities"
          className="flex flex-col items-center gap-2 text-[var(--text-dim)] hover:text-white transition-colors"
        >
          <div className="w-[18px] h-7 rounded-full border border-white/20 flex justify-center pt-1.5">
            <span className="anim-scroll-dot w-1 h-1.5 rounded-full bg-[var(--accent)]" />
          </div>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
            Scroll
          </span>
        </a>
      </div>

      {/* ========================================================================= */}
      {/* 4. LOWER BENTO CARDS (PROPER ROW OF 2 EQUAL CARDS WITH NO TRUNCATION)     */}
      {/* ========================================================================= */}
      <div id="capabilities" className="relative z-10 w-full max-w-[1200px] mx-auto pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* CARD 1: TECHNICAL CAPABILITIES */}
          <div className="group rounded-[20px] p-6 sm:p-7 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 40px Rounded Square Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] shrink-0">
                  <Layers size={20} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white">
                    Technical Capabilities
                  </h4>
                  <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider block">
                    Core Engineering Stack
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                01 // CORE
              </span>
            </div>

            {/* Stack Pills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                Next.js 15
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                React 19
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-[#FF7A1A] text-center font-semibold">
                WebSockets
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                TypeScript
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                Node.js
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                MongoDB
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                Tailwind v4
              </span>
              <span className="p-2.5 rounded-xl bg-zinc-900/80 border border-white/5 font-mono text-xs text-white text-center">
                Git &amp; CI/CD
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pt-1">
              Production architectures engineered with strict type safety, modular DRY components, and high-concurrency event loops.
            </p>
          </div>

          {/* CARD 2: VERIFIED ACADEMICS & PRODUCTION DEPLOYMENTS */}
          <div className="group rounded-[20px] p-6 sm:p-7 bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* 40px Rounded Square Icon Box */}
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-lg text-white">
                    Verified Academics &amp; Systems
                  </h4>
                  <span className="font-mono text-xs text-[var(--text-dim)] uppercase tracking-wider block">
                    SRKR Engineering College
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs text-emerald-400 font-semibold">
                02 // METRICS
              </span>
            </div>

            {/* 3 Metric Blocks */}
            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 text-left">
                <span className="font-mono text-[10px] uppercase text-[var(--text-dim)] block">GPA</span>
                <span className="font-display font-bold text-xl sm:text-2xl text-white block mt-0.5">8.0</span>
                <span className="font-sans text-[10px] text-[var(--text-muted)] block mt-0.5">B.Tech CS &amp; IT</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 text-left">
                <span className="font-mono text-[10px] uppercase text-[var(--text-dim)] block">DEPLOYED</span>
                <span className="font-display font-bold text-xl sm:text-2xl text-[#FF7A1A] block mt-0.5">5+</span>
                <span className="font-sans text-[10px] text-[var(--text-muted)] block mt-0.5">Live Web Apps</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/5 text-left">
                <span className="font-mono text-[10px] uppercase text-[var(--text-dim)] block">LATENCY</span>
                <span className="font-display font-bold text-xl sm:text-2xl text-emerald-400 block mt-0.5">&lt;50ms</span>
                <span className="font-sans text-[10px] text-[var(--text-muted)] block mt-0.5">WebSocket Sync</span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed pt-1">
              Combining strong foundational computer science principles with practical experience delivering low-latency real-time platforms.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}
