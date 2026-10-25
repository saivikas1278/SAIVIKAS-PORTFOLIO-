"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
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
  "Full-Stack Developer",
  "Next.js & React Specialist",
  "Real-Time WebSocket Architect",
  "Cricket Tech Innovator",
];

export default function HeroSection() {
  // Dynamic Typewriter Engine
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing characters
        setDisplayedText(currentFullRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentFullRole.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting characters
        setDisplayedText(currentFullRole.substring(0, displayedText.length - 1));
        if (displayedText.length - 1 === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      aria-label="Introduction & Identity"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 pt-20 pb-12 overflow-hidden bg-neutral-950"
    >
      {/* ========================================================================= */}
      {/* ANTI-GRAVITY BACKGROUND ENVIRONMENT                                       */}
      {/* ========================================================================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.25; }
          50% { transform: scale(1.15); opacity: 0.45; }
        }
        @keyframes avatar-ring-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .anim-ring {
          animation: avatar-ring-rotate 12s linear infinite;
        }
        .anim-hero-glow {
          animation: hero-pulse-glow 8s ease-in-out infinite;
        }
      ` }} />

      {/* Atmospheric Radial Spotlights */}
      <div 
        aria-hidden="true" 
        className="anim-hero-glow absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full bg-gradient-to-tr from-[#F59E0B]/10 via-[#F97316]/8 to-[#EF4444]/5 blur-[100px] sm:blur-[140px] pointer-events-none z-0" 
      />

      {/* Engineering Grid Mesh Backdrop */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" 
      />

      {/* Floating Ambient Code Tokens */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <span className="absolute top-[18%] left-[8%] sm:left-[12%] font-mono text-xs sm:text-sm text-[#F59E0B]/25">{"<developer />"}</span>
        <span className="absolute top-[28%] right-[8%] sm:right-[14%] font-mono text-xs sm:text-sm text-[#F97316]/25">{"{ web: 'full-stack' }"}</span>
        <span className="absolute bottom-[22%] left-[10%] sm:left-[16%] font-mono text-xs sm:text-sm text-[#EF4444]/25">{"const status = 'active';"}</span>
        <span className="absolute bottom-[28%] right-[10%] sm:right-[16%] font-mono text-xs sm:text-sm text-amber-400/25">{"git commit -m 'ship'"}</span>
      </div>

      {/* ========================================================================= */}
      {/* MAIN HERO CONTENT STACK                                                   */}
      {/* ========================================================================= */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center space-y-5 sm:space-y-6">

        {/* 1. CYBER AVATAR WITH LIVE STATUS BEACON */}
        <div className="relative flex flex-col items-center">
          {/* Animated Gradient Halo Ring */}
          <div className="relative p-[3px] rounded-full bg-gradient-to-tr from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_30px_rgba(249,115,22,0.35)] group">
            
            {/* Inner Dark Rim */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-900 border-2 border-neutral-950">
              <Image
                src="/assets/images/my1.jpg"
                alt="Cheepu Sai Vikas"
                fill
                priority
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover object-top filter contrast-[1.05] brightness-[1.02] hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Floating Availability Pill */}
          <div className="mt-[-12px] inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900/90 border border-emerald-500/30 shadow-[0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-md z-20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-wide text-emerald-300 uppercase">
              Available for Hire
            </span>
          </div>
        </div>

        {/* 2. CATEGORY CHIP */}
        <div className="pt-1">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#F97316] bg-[#F97316]/10 border border-[#F97316]/25 shadow-[0_0_15px_rgba(249,115,22,0.15)] px-4 py-1.5 rounded-full inline-block">
            ENGINEERING & INNOVATION
          </span>
        </div>

        {/* 3. NAME & DYNAMIC ROLE TYPEWRITER */}
        <div className="space-y-1.5">
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-white uppercase drop-shadow-sm">
            Sai Vikas
          </h1>

          {/* Animated Role Ticker */}
          <div className="h-8 sm:h-10 flex items-center justify-center">
            <span className="font-mono text-base sm:text-xl md:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444]">
              &lt;{displayedText}
              <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-6 ml-1 bg-[#F97316] animate-pulse" />
              /&gt;
            </span>
          </div>
        </div>

        {/* 4. CONCISE COMPELLING BIO */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-neutral-400 max-w-xl leading-relaxed px-2">
          Computer Science & IT student at <strong className="text-white font-semibold">SRKR Engineering College</strong>. Specializing in high-performance <strong className="text-white font-semibold">Next.js</strong> web applications, real-time <strong className="text-white font-semibold">WebSocket auction engines</strong>, and fluid interactive frontend architectures.
        </p>

        {/* 5. QUICK STAT INDICATOR CHIPS */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md pt-1">
          <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
            <span className="font-display font-black text-base sm:text-lg text-white block">8.0</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">B.Tech GPA</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
            <span className="font-display font-black text-base sm:text-lg text-[#F97316] block">5+</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Live Apps</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-center">
            <span className="font-display font-black text-base sm:text-lg text-emerald-400 block">11+</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-500 block">Tech Stack</span>
          </div>
        </div>

        {/* 6. PRIMARY ACTION TRIGGER BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full sm:w-auto pt-2">
          <a
            href="#projects"
            onClick={() => playUISound("click")}
            onMouseEnter={() => playUISound("hover")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs font-mono font-bold tracking-widest text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_25px_rgba(249,115,22,0.45)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            EXPLORE PROJECTS
            <ArrowDown size={14} className="animate-bounce" />
          </a>
          <a
            href="#contact"
            onClick={() => playUISound("click")}
            onMouseEnter={() => playUISound("hover")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl text-xs font-mono font-bold tracking-widest text-neutral-300 border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 hover:text-white hover:border-neutral-700 active:scale-95 transition-all duration-300"
          >
            <Mail size={14} />
            GET IN TOUCH
          </a>
        </div>

        {/* 7. QUICK SOCIAL CHANNELS ROW */}
        <div className="flex items-center gap-3 pt-2">
          <a
            href="https://github.com/saivikas1278"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            onClick={() => playUISound("click")}
            onMouseEnter={() => playUISound("hover")}
            className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-[#F97316]/50 hover:bg-neutral-800 transition-all duration-200 active:scale-95"
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
            className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-neutral-800 transition-all duration-200 active:scale-95"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href="mailto:cheepusaivikas549@gmail.com"
            aria-label="Email Sai Vikas"
            onClick={() => playUISound("click")}
            onMouseEnter={() => playUISound("hover")}
            className="p-2 rounded-xl bg-neutral-900/80 border border-neutral-800 text-neutral-400 hover:text-[#F97316] hover:border-[#F97316]/50 hover:bg-neutral-800 transition-all duration-200 active:scale-95"
          >
            <Mail size={16} />
          </a>
        </div>

      </div>
    </section>
  );
}
