"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowDown, Copy, Check, Terminal, MapPin, Clock, Sparkles } from "lucide-react";
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

const ROLES = [
  "Full-Stack Architect",
  "Next.js & React 19 Specialist",
  "Real-Time WebSocket Engineer",
  "Cricket Auction Platform Lead",
  "UI/UX Motion Developer",
];

export default function HeroSection() {
  // 1. Dynamic Terminal Typewriter
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // 2. 1-Click Clipboard State
  const [copied, setCopied] = useState(false);

  // 3. Live IST Clock
  const [liveTime, setLiveTime] = useState<string>("");

  // 4. Holographic Card 3D Tilt State
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLiveTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter ticker loop
  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentFullRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentFullRole.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentFullRole.substring(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Clipboard copy handler with tactile feedback
  const handleCopyEmail = useCallback(() => {
    playUISound("click");
    navigator.clipboard.writeText("cheepusaivikas549@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  }, []);

  // 3D Parallax Tilt calculation for the Identity Card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTiltStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTiltStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <section
      id="home"
      aria-label="Developer Identity & Hero"
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 md:px-12 lg:px-16 pt-24 pb-12 overflow-hidden bg-[#030303]"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC CANVAS & SPATIAL LIGHTING                                   */}
      {/* ========================================================================= */}
      {/* Background Architectural Grid Mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"
      />

      {/* Primary Amber Aurora Spotlight (Top-Left) */}
      <div
        aria-hidden="true"
        className="absolute -top-20 left-1/4 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full bg-gradient-to-br from-[#F59E0B]/12 via-[#F97316]/8 to-transparent blur-[120px] pointer-events-none z-0 animate-pulse"
        style={{ animationDuration: "9s" }}
      />

      {/* Crimson Atmospheric Accent Glow (Bottom-Right) */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-gradient-to-tl from-[#EF4444]/8 via-[#F97316]/5 to-transparent blur-[140px] pointer-events-none z-0"
      />

      {/* Architectural Corner Crosshairs (+) */}
      <div aria-hidden="true" className="absolute top-20 left-6 text-zinc-700/60 font-mono text-sm pointer-events-none select-none hidden lg:block">+</div>
      <div aria-hidden="true" className="absolute top-20 right-6 text-zinc-700/60 font-mono text-sm pointer-events-none select-none hidden lg:block">+</div>
      <div aria-hidden="true" className="absolute bottom-6 left-6 text-zinc-700/60 font-mono text-sm pointer-events-none select-none hidden lg:block">+</div>
      <div aria-hidden="true" className="absolute bottom-6 right-6 text-zinc-700/60 font-mono text-sm pointer-events-none select-none hidden lg:block">+</div>

      {/* ========================================================================= */}
      {/* 2. TOP HUD STATUS RIBBON (RESPONSIVE)                                      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/[0.06]">
        {/* Availability Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/80 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.12)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-emerald-300 uppercase">
            Available for Hire / Contracts
          </span>
        </div>

        {/* Live Location & Ticking IST Clock */}
        <div className="flex items-center gap-4 text-[10px] sm:text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-[#F97316]" />
            <span>Bhimavaram, IN</span>
          </div>
          <span className="text-zinc-700">•</span>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-amber-400" />
            <span className="text-zinc-300">{liveTime || "GMT+5:30"}</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN DUAL-WING STAGE: NARRATIVE (LEFT) + IDENTITY DECK (RIGHT)          */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 sm:py-12 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ----------------------------------------------------------------------- */}
          {/* LEFT WING (7 COLS): POWER TYPOGRAPHY & INTERACTIVE CONSOLE             */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">

            {/* Micro-Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F59E0B]/10 via-[#F97316]/10 to-transparent border border-[#F97316]/25">
              <Sparkles size={13} className="text-[#F59E0B]" />
              <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#F97316] uppercase">
                00 // FULL-STACK ARCHITECT & CRAFTSMAN
              </span>
            </div>

            {/* Primary Headline */}
            <div className="space-y-1">
              <span className="block font-mono text-xs sm:text-sm font-semibold tracking-widest text-zinc-400 uppercase">
                Cheepu
              </span>
              <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
                Sai <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444]">Vikas</span>
              </h1>
            </div>

            {/* Interactive Terminal / Role Ticker Console */}
            <div className="w-full max-w-xl rounded-xl sm:rounded-2xl bg-zinc-950/90 border border-white/10 p-3.5 sm:p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="text-[10px] font-mono text-zinc-500 ml-2">bash ~ dev.env</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <Terminal size={11} />
                  <span>LIVE</span>
                </div>
              </div>
              <div className="font-mono text-xs sm:text-sm md:text-base text-left flex items-center">
                <span className="text-zinc-500 mr-2 select-none">&gt;</span>
                <span className="text-amber-400 font-semibold mr-2">specialty:</span>
                <span className="text-white font-bold tracking-wide">
                  &quot;{displayedText}&quot;
                  <span className="inline-block w-2 h-4 sm:h-5 ml-1 bg-[#F97316] animate-pulse align-middle" />
                </span>
              </div>
            </div>

            {/* Senior Editorial Statement */}
            <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl leading-relaxed">
              Computer Science & IT engineer at <strong className="text-white font-semibold underline decoration-[#F97316]/50 underline-offset-4">SRKR Engineering College</strong>. I build high-concurrency real-time WebSocket engines, fluid 3D interactive web applications, and resilient Next.js architectures.
            </p>

            {/* Action Bar (Tactile CTAs & 1-Click Copy Utility) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full pt-1">
              {/* Primary CTA */}
              <a
                href="#projects"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-widest text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_25px_rgba(249,115,22,0.35)] hover:shadow-[0_0_35px_rgba(249,115,22,0.55)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                EXPLORE WORK
                <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
              </a>

              {/* 1-Click Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => playUISound("hover")}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 active:scale-95 ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                    : "bg-zinc-900/80 text-zinc-300 border border-white/10 hover:border-white/30 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-zinc-400" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              {/* Social Icon Deck */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href="https://github.com/saivikas1278"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  onClick={() => playUISound("click")}
                  onMouseEnter={() => playUISound("hover")}
                  className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white hover:border-[#F97316]/50 hover:bg-zinc-800 transition-all duration-200 active:scale-95"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/sai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  onClick={() => playUISound("click")}
                  onMouseEnter={() => playUISound("hover")}
                  className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-zinc-800 transition-all duration-200 active:scale-95"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </div>

          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT WING (5 COLS): 3D HOLOGRAPHIC DEVELOPER IDENTITY DECK            */}
          {/* ----------------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: tiltStyle,
                transition: "transform 0.18s cubic-bezier(0.2, 0, 0, 1)",
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-sm sm:max-w-md rounded-3xl p-3 sm:p-4 bg-zinc-950/80 border border-white/15 shadow-2xl backdrop-blur-2xl group overflow-hidden"
            >
              {/* Dynamic Mouse Glare Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-30"
                style={{
                  background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`,
                }}
              />

              {/* Holographic Glowing Border Ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-[1px] rounded-3xl bg-gradient-to-tr from-[#F59E0B]/30 via-[#F97316]/20 to-[#EF4444]/30 opacity-70 group-hover:opacity-100 transition-opacity blur-[1px] pointer-events-none"
              />

              {/* Inner Card Container */}
              <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-white/10">
                {/* Tech Status Header on Card */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider bg-black/75 border border-white/15 text-zinc-300 backdrop-blur-md">
                    SYS: SV-DEV-2026
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 backdrop-blur-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE
                  </span>
                </div>

                {/* High-Resolution Portrait Display */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src="/assets/images/my1.jpg"
                    alt="Sai Vikas"
                    fill
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover object-top filter contrast-[1.04] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient Shade for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                </div>

                {/* Floating Bottom Card Telemetry Pill Deck */}
                <div className="absolute bottom-3 left-3 right-3 z-20 space-y-2 pointer-events-none">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/80 border border-[#F59E0B]/30 text-amber-300 backdrop-blur-md">
                      Next.js 15
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/80 border border-[#F97316]/30 text-orange-300 backdrop-blur-md">
                      WebSockets
                    </span>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/80 border border-white/20 text-white backdrop-blur-md">
                      React 19
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/85 border border-white/10 backdrop-blur-lg flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-500 block">Verified Focus</span>
                      <span className="text-xs font-mono font-bold text-white block">Real-Time Auction Architecture</span>
                    </div>
                    <ArrowUpRight size={16} className="text-[#F97316]" />
                  </div>
                </div>

              </div>

              {/* Outer Decorative Tech Crosshairs */}
              <div aria-hidden="true" className="absolute top-2 right-2 text-zinc-600 font-mono text-[9px] pointer-events-none select-none">[01]</div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM TELEMETRY HUD BAR (METRIC MATRIX)                                */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/[0.06]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

          {/* Metric 1 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md text-left group hover:border-[#F59E0B]/30 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              ACADEMICS
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl text-white">8.0</span>
              <span className="text-xs font-mono font-bold text-zinc-400">/ 10</span>
            </div>
            <span className="text-[11px] font-sans text-zinc-400 block mt-0.5">B.Tech CS & IT Score</span>
          </div>

          {/* Metric 2 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md text-left group hover:border-[#F97316]/30 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F97316] block mb-1">
              PRODUCTION
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#F97316]">5+</span>
              <span className="text-xs font-mono font-bold text-zinc-400">Apps</span>
            </div>
            <span className="text-[11px] font-sans text-zinc-400 block mt-0.5">Deployed Full-Stack Systems</span>
          </div>

          {/* Metric 3 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md text-left group hover:border-emerald-500/30 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
              CORE STACK
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400">11+</span>
              <span className="text-xs font-mono font-bold text-zinc-400">Tools</span>
            </div>
            <span className="text-[11px] font-sans text-zinc-400 block mt-0.5">Modern Web & DB Matrix</span>
          </div>

          {/* Metric 4 */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md text-left group hover:border-cyan-500/30 transition-all duration-300">
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              PERFORMANCE
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-black text-2xl sm:text-3xl text-cyan-400">&lt;50ms</span>
            </div>
            <span className="text-[11px] font-sans text-zinc-400 block mt-0.5">WebSocket Auction Latency</span>
          </div>

        </div>
      </div>

    </section>
  );
}
