"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Copy, Check, Sparkles, Layers, Cpu, Award } from "lucide-react";
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

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  // 1-Click Clipboard handler
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

  return (
    <section
      id="home"
      aria-label="Executive Developer Overview"
      className="relative min-h-[90vh] sm:min-h-screen w-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 pt-24 pb-16 bg-[#030303] overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC CANVAS LIGHTING                                             */}
      {/* ========================================================================= */}
      {/* Subtle Architectural Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none z-0"
      />

      {/* Warm Ambient Amber Halo (Top Left) */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F59E0B]/10 via-[#F97316]/5 to-transparent blur-[140px] pointer-events-none z-0"
      />

      {/* Subtle Warm Backdrop (Center-Right) */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#EF4444]/6 via-[#F97316]/4 to-transparent blur-[160px] pointer-events-none z-0"
      />

      {/* ========================================================================= */}
      {/* 2. EXECUTIVE HERO BENTO GRID MATRIX                                        */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-4 sm:space-y-5">

        {/* ----------------------------------------------------------------------- */}
        {/* TOP ROW: CELL 1 (IDENTITY - 8 COLS) + CELL 2 (FLAGSHIP SYSTEM - 4 COLS)  */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* CELL 1: PRIMARY IDENTITY & NARRATIVE (Desktop 8-col) */}
          <article className="lg:col-span-8 rounded-3xl p-6 sm:p-8 md:p-10 bg-zinc-950/75 border border-white/[0.08] hover:border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            
            {/* Header: Minimalist Avatar + Professional Identity Block */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Minimalist Studio Avatar */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden p-[2px] bg-gradient-to-tr from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_20px_rgba(249,115,22,0.25)] shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black">
                    <Image
                      src="/assets/images/my1.jpg"
                      alt="Sai Vikas"
                      fill
                      priority
                      sizes="64px"
                      className="object-cover object-top filter contrast-[1.05] brightness-[1.02]"
                    />
                  </div>
                </div>

                {/* Identity Metadata */}
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight uppercase">
                      Sai Vikas
                    </h1>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      IN
                    </span>
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-zinc-400">
                    Computer Science Engineer & Full-Stack Developer
                  </p>
                </div>
              </div>

              {/* Status Indicator Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-semibold tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Available for Opportunities</span>
              </div>
            </div>

            {/* Core Value Proposition Headline */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[#F97316] text-xs font-mono font-bold tracking-widest uppercase">
                <Sparkles size={14} />
                <span>Executive Portfolio</span>
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.1] uppercase">
                Building scalable real-time systems &amp; high-performance web architectures.
              </h2>
              <p className="font-sans text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed max-w-2xl">
                Final-year Computer Science engineer at <strong className="text-white font-semibold">SRKR Engineering College</strong>. Specializing in low-latency WebSocket auction engines, production-ready <strong className="text-white font-semibold">Next.js 15</strong> architectures, and responsive digital products.
              </p>
            </div>

            {/* Tactical Action Deck */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                VIEW PROJECTS
                <ArrowDown size={14} />
              </a>

              <a
                href="#contact"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wider text-zinc-300 bg-zinc-900/80 border border-white/10 hover:border-white/30 hover:bg-zinc-800 hover:text-white active:scale-95 transition-all duration-300"
              >
                GET IN TOUCH
              </a>

              {/* 1-Click Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => playUISound("hover")}
                className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold tracking-wide transition-all duration-300 active:scale-95 ${
                  copied
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50"
                    : "bg-zinc-900/60 text-zinc-400 border border-white/5 hover:border-white/20 hover:text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>

              {/* Social Channels */}
              <div className="flex items-center gap-2">
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

          </article>

          {/* CELL 2: FLAGSHIP SYSTEM SPOTLIGHT (Desktop 4-col) */}
          <article className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-zinc-950/75 border border-white/[0.08] hover:border-[#F97316]/40 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-5 group relative overflow-hidden">
            {/* Top Tag & Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#F97316] uppercase px-2.5 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/25">
                  FLAGSHIP SYSTEM
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  REAL-TIME ARCHITECTURE
                </span>
              </div>

              <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-wide uppercase group-hover:text-[#F97316] transition-colors">
                Cricket Auction Engine
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2">
                Distributed low-latency auction platform with live bidirectional WebSocket synchronization, dynamic squad balance calculators, and auctioneer room controls.
              </p>
            </div>

            {/* Interactive Live Auction Simulation HUD */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/[0.07] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-500">CURRENT LOT:</span>
                <span className="text-white font-bold">Marquee All-Rounder</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 border border-emerald-500/20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Active Bid</span>
                </div>
                <span className="font-mono font-bold text-sm text-white">₹ 12.50 Cr</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-0.5">
                <span>Latency: &lt; 45ms</span>
                <span className="text-emerald-400">WebSocket Synced</span>
              </div>
            </div>

            {/* Stack Tags & Navigation CTA */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                  Next.js 15
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                  WebSockets
                </span>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                  MongoDB
                </span>
              </div>

              <a
                href="#projects"
                onClick={() => playUISound("click")}
                onMouseEnter={() => playUISound("hover")}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#F97316] hover:text-white transition-colors group/link"
              >
                <span>EXPLORE ARCHITECTURE</span>
                <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </article>

        </div>

        {/* ----------------------------------------------------------------------- */}
        {/* BOTTOM ROW: CELL 3 (TECH CAPABILITIES) + CELL 4 (PROVEN METRICS)        */}
        {/* ----------------------------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">

          {/* CELL 3: TECHNICAL CAPABILITIES MATRIX (Desktop 6-col) */}
          <article className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-zinc-950/75 border border-white/[0.08] hover:border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={14} className="text-[#F59E0B]" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  TECHNICAL CAPABILITIES
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">CORE STACK</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">Next.js 15</span>
                <span className="text-[10px] text-zinc-500 block">App Router</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">React 19</span>
                <span className="text-[10px] text-zinc-500 block">Custom Hooks</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-[#F97316] block">WebSockets</span>
                <span className="text-[10px] text-zinc-500 block">Real-Time Sync</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">TypeScript</span>
                <span className="text-[10px] text-zinc-500 block">Type Safety</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">Node.js</span>
                <span className="text-[10px] text-zinc-500 block">REST APIs</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">MongoDB</span>
                <span className="text-[10px] text-zinc-500 block">Aggregations</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">Tailwind v4</span>
                <span className="text-[10px] text-zinc-500 block">Design System</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-xs font-mono font-bold text-white block">Git &amp; CI/CD</span>
                <span className="text-[10px] text-zinc-500 block">Workflows</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-zinc-400 pt-1">
              Adheres strictly to modern development principles: high modularity, DRY abstraction, and sub-50ms event-driven backends.
            </p>
          </article>

          {/* CELL 4: PROVEN METRICS & ACADEMICS (Desktop 6-col) */}
          <article className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-zinc-950/75 border border-white/[0.08] hover:border-white/15 shadow-2xl backdrop-blur-xl transition-all duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-emerald-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  VERIFIED METRICS
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">ACADEMICS &amp; WORK</span>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">ACADEMIC GPA</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-white block mt-0.5">8.0</span>
                <span className="text-[10px] font-sans text-zinc-400 block mt-0.5">SRKR Eng. College</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] block">DEPLOYED</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-[#F97316] block mt-0.5">5+</span>
                <span className="text-[10px] font-sans text-zinc-400 block mt-0.5">Live Web Systems</span>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-zinc-900/60 border border-white/5 text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block">SYNC SPEED</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400 block mt-0.5">&lt;50ms</span>
                <span className="text-[10px] font-sans text-zinc-400 block mt-0.5">WebSocket Latency</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-zinc-400 pt-1">
              Solid theoretical computer science foundation combined with hands-on production deployment experience.
            </p>
          </article>

        </div>

      </div>

    </section>
  );
}
