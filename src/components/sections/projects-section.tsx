"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

// Github SVG Icon
const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="opacity-80"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  url: string;
  asymmetricSpan: string;
  mockup: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Multi-Layered 3D Parallax Tilt Card Component
// ---------------------------------------------------------------------------
function ParallaxTiltCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [canHover, setCanHover] = useState(false);

  // Environmental Capability Sensor (hover: hover & !prefers-reduced-motion)
  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluateCapabilities = () => {
      setCanHover(hoverQuery.matches && !motionQuery.matches);
    };

    evaluateCapabilities();
    hoverQuery.addEventListener("change", evaluateCapabilities);
    motionQuery.addEventListener("change", evaluateCapabilities);

    return () => {
      hoverQuery.removeEventListener("change", evaluateCapabilities);
      motionQuery.removeEventListener("change", evaluateCapabilities);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Strict Restraint Tuning: Clamped between -8deg and +8deg
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    const rotateX = (yPct * -16).toFixed(2);
    const rotateY = (xPct * 16).toFixed(2);

    // Hardware Boost: scale3d(1.02, 1.02, 1.02) to mitigate Chromium subpixel rendering blur
    setTransformStyle(
      `scale3d(1.02, 1.02, 1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );

    setGlarePos({
      x: Math.round(x),
      y: Math.round(y),
      opacity: 1,
    });
  }, [canHover]);

  const handleMouseEnter = () => {
    if (!canHover) return;
    playUISound("hover");
  };

  const handleMouseLeave = () => {
    if (!canHover) return;
    setTransformStyle("scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)");
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative ${project.asymmetricSpan} rounded-2xl sm:rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] select-none`}
      style={{
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
      }}
    >
      {/* 3D Motion Container */}
      <div
        className="relative w-full h-full rounded-2xl sm:rounded-3xl border border-neutral-800 bg-neutral-900/90 backdrop-blur-xl transition-transform duration-200 ease-out shadow-2xl overflow-hidden flex flex-col justify-between"
        style={{
          transform: transformStyle || "scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
        }}
      >
        {/* ========================================================================= */}
        {/* LAYER 0 (Base Skin): translateZ(0px) - Mesh Texture & Ambient Vignette   */}
        {/* ========================================================================= */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-2xl sm:rounded-3xl"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Crisp Engineering Grid Mesh */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:20px_20px]" />
          
          {/* Subtle Corner Lighting Aura */}
          <div className="absolute -top-16 -right-16 w-36 sm:w-52 h-36 sm:h-52 bg-[#F97316]/10 rounded-full blur-3xl group-hover:bg-[#F97316]/20 transition-colors duration-500" />
          <div className="absolute -bottom-16 -left-16 w-36 sm:w-52 h-36 sm:h-52 bg-[#EF4444]/10 rounded-full blur-3xl group-hover:bg-[#EF4444]/20 transition-colors duration-500" />

          {/* Specular Glare Tracking Overlay */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 380px at ${glarePos.x}px ${glarePos.y}px, rgba(249, 115, 22, 0.16), transparent 75%)`,
            }}
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative p-4 sm:p-6 md:p-8 flex flex-col justify-between h-full gap-4 sm:gap-6 z-10">

          {/* Top Info Bar */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-xs font-black text-[#F97316] tracking-[0.2em] uppercase px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)]">
              PROJECT {project.id}
            </span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Production
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LAYER 1 (Mid-ground Copy): translateZ(35px) - Headings, Copy, & Mockup    */}
          {/* ========================================================================= */}
          <div
            className="space-y-3 sm:space-y-4"
            style={{ transform: "translateZ(35px)" }}
          >
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 block mb-0.5 sm:mb-1">
                {project.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-wide uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FDE68A] transition-all duration-300">
                {project.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans line-clamp-3">
              {project.description}
            </p>

            {/* Simulated Live Console Dashboard */}
            <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-xl group-hover:border-[#F97316]/30 transition-colors duration-300">
              <div className="w-full px-3 py-1.5 sm:px-3.5 sm:py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between select-none">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-rose-500/80" />
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 mx-2 sm:mx-4 py-0.5 rounded bg-black/60 border border-neutral-800 text-[8px] sm:text-[9px] text-neutral-500 tracking-wider flex items-center justify-center gap-1 font-mono uppercase truncate">
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {project.url}
                </div>
                <span className="text-[7px] sm:text-[8px] font-mono text-neutral-600 uppercase font-bold">3D-MESH</span>
              </div>
              <div className="relative w-full">
                {project.mockup}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* LAYER 2 (Foreground Accents): translateZ(65px) - Badges & Trigger Chips   */}
          {/* ========================================================================= */}
          <div
            className="space-y-3 sm:space-y-4 pt-1 sm:pt-2"
            style={{ transform: "translateZ(65px)" }}
          >
            {/* Tech Stack Visual Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 group-hover:border-orange-500/40 group-hover:bg-orange-500/15 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Trigger Chips */}
            <div className="flex items-center gap-2 sm:gap-3 w-full">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUISound("click")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white border border-neutral-700 bg-neutral-800/60 hover:bg-neutral-800 hover:border-neutral-500 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <GithubIcon size={13} />
                SOURCE
              </a>
              <a
                href={project.demo}
                onClick={() => playUISound("click")}
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-mono font-bold tracking-widest text-white bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <ExternalLink size={13} />
                LIVE DEMO
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Projects Section with Anti-Gravity Background Canvas
// ---------------------------------------------------------------------------
export default function ProjectsSection() {
  const projects: ProjectItem[] = [
    {
      id: "01",
      title: "Cricket Team Fund Tracker",
      subtitle: "Fintech & Ledger Architecture",
      description: "Full-stack budget ledger designed to reconcile team funds, tournament entry fees, match expenditures, and player micro-contributions with automated settlement calculation.",
      tags: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB"],
      github: "https://github.com/saivikas1278/cricket-fund-tracker",
      demo: "#",
      url: "cricket-fund-tracker.dev",
      asymmetricSpan: "lg:col-span-7",
      mockup: (
        <div className="w-full min-h-[190px] p-3 sm:p-4 flex flex-col justify-between bg-neutral-950 font-mono text-xs text-neutral-400 select-none">
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-800">
            <span className="font-bold text-white uppercase text-[9px] sm:text-[10px]">Team Ledger Console</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[8px] sm:text-[9px] tracking-wider">SYNCED</span>
          </div>
          <div className="grid grid-cols-12 gap-2 sm:gap-2.5 my-auto py-1">
            <div className="col-span-5 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-0.5 sm:space-y-1">
              <span className="text-[8px] sm:text-[9px] text-neutral-500 uppercase block truncate">Treasury Balance</span>
              <span className="text-sm sm:text-base font-bold text-white tracking-tight truncate block">₹48,250.00</span>
              <span className="text-[7px] sm:text-[8px] text-emerald-400 block">↑ 12% surplus</span>
            </div>
            <div className="col-span-7 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1 sm:space-y-1.5">
              <span className="text-[8px] sm:text-[9px] text-neutral-500 uppercase block truncate">Recent Inflows</span>
              <div className="flex justify-between text-[8px] sm:text-[9px]">
                <span className="text-neutral-300 truncate">Vikas (Fee)</span>
                <span className="text-emerald-400 font-bold">+₹500</span>
              </div>
              <div className="flex justify-between text-[8px] sm:text-[9px]">
                <span className="text-neutral-300 truncate">Sai (Kit)</span>
                <span className="text-emerald-400 font-bold">+₹1k</span>
              </div>
            </div>
          </div>
          <div className="space-y-1 pt-1 border-t border-neutral-800">
            <div className="flex justify-between text-[8px] uppercase text-neutral-500">
              <span>Goal: League Cap</span>
              <span className="text-white font-bold">85%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-neutral-900 overflow-hidden">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "02",
      title: "Cricket Auction Engine",
      subtitle: "Real-Time WebSocket Protocol",
      description: "Interactive real-time bidding room for cricket leagues. Synchronizes multi-client bid state, purse balances, countdown timers, and active player spotlights with zero broadcast delay.",
      tags: ["React", "Express", "Socket.io", "MongoDB"],
      github: "https://github.com/saivikas1278/cricket-auction-app",
      demo: "#",
      url: "cricket-auction.io",
      asymmetricSpan: "lg:col-span-5",
      mockup: (
        <div className="w-full min-h-[190px] p-3 sm:p-4 flex flex-col justify-between bg-neutral-950 font-mono text-xs text-neutral-400 select-none">
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-800">
            <span className="font-bold text-white uppercase text-[9px] sm:text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              AUCTION FLOOR
            </span>
            <span className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-[8px] sm:text-[9px] text-neutral-400 font-bold">RND 1</span>
          </div>
          <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-1.5 my-auto shadow-lg">
            <div className="flex justify-between items-start">
              <div className="truncate">
                <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block truncate">Player</span>
                <span className="text-xs sm:text-sm font-bold text-white truncate block">Sai Vikas (All-Rounder)</span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#FDE68A] font-bold text-[7px] sm:text-[8px] shrink-0">BASE 5L</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-neutral-800">
              <div>
                <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block">High Bid</span>
                <span className="text-sm sm:text-base font-black text-[#F97316]">14.50 Lakhs</span>
              </div>
              <div className="text-right">
                <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block">Leader</span>
                <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase truncate block">Royal Strikers</span>
              </div>
            </div>
          </div>
          <div className="text-[8px] sm:text-[9px] bg-neutral-900/60 p-1.5 rounded border border-neutral-800 flex justify-between items-center">
            <span className="text-neutral-500 truncate">Vizag Titans raised to 14.0L</span>
            <span className="text-neutral-600 text-[7px] sm:text-[8px] shrink-0 ml-1">1.8s ago</span>
          </div>
        </div>
      ),
    },
    {
      id: "03",
      title: "E-Commerce Payment Core",
      subtitle: "Secure Cart & Checkout API",
      description: "Robust retail web application featuring parameterized catalog searches, persistent cart sessions, cryptographic transaction signing, and Stripe API checkout webhooks.",
      tags: ["JavaScript", "Node.js", "MongoDB", "Stripe"],
      github: "https://github.com/saivikas1278/ecommerce-website",
      demo: "#",
      url: "shop-platform.com",
      asymmetricSpan: "lg:col-span-5",
      mockup: (
        <div className="w-full min-h-[190px] p-3 sm:p-4 flex flex-col justify-between bg-neutral-950 font-mono text-xs text-neutral-400 select-none">
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-800">
            <span className="font-bold text-white uppercase text-[9px] sm:text-[10px]">Stripe Gateway</span>
            <span className="text-[8px] sm:text-[9px] text-neutral-500 uppercase">256-BIT SSL</span>
          </div>
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2 my-auto items-center py-1">
            <div className="col-span-7 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-0.5 sm:space-y-1">
              <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block">Items</span>
              <div className="flex justify-between text-[8px] sm:text-[9px] text-neutral-300">
                <span className="truncate">Bat x1</span>
                <span className="font-bold text-white">₹12,499</span>
              </div>
              <div className="flex justify-between text-[8px] sm:text-[9px] text-neutral-300">
                <span className="truncate">Balls x6</span>
                <span className="font-bold text-white">₹2,800</span>
              </div>
            </div>
            <div className="col-span-5 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-[#F97316]/20 space-y-0.5 sm:space-y-1 text-center">
              <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block">Net</span>
              <span className="text-xs sm:text-sm font-black text-white block">₹15,299</span>
              <span className="px-1 py-0.5 rounded bg-orange-500/10 text-orange-400 text-[7px] sm:text-[8px] font-bold uppercase inline-block">SECURE</span>
            </div>
          </div>
          <div className="w-full py-1.5 sm:py-2 rounded-xl bg-[#F97316] text-white font-bold text-[8px] sm:text-[9px] tracking-widest uppercase text-center shadow-[0_0_12px_rgba(249,115,22,0.3)]">
            AUTHORIZE STRIPE
          </div>
        </div>
      ),
    },
    {
      id: "04",
      title: "Geographical Weather Metric",
      subtitle: "OpenWeather REST Pipeline",
      description: "Atmospheric intelligence client providing real-time barometric pressure readings, wind vector angles, localized humidity indices, and predictive 5-day meteorological forecasts.",
      tags: ["HTML5", "CSS3", "JavaScript", "REST API"],
      github: "https://github.com/saivikas1278/weather-dashboard",
      demo: "#",
      url: "weather-metrics.net",
      asymmetricSpan: "lg:col-span-7",
      mockup: (
        <div className="w-full min-h-[190px] p-3 sm:p-4 flex flex-col justify-between bg-neutral-950 font-mono text-xs text-neutral-400 select-none">
          <div className="flex justify-between items-center pb-1.5 border-b border-neutral-800">
            <span className="font-bold text-white uppercase text-[9px] sm:text-[10px]">OpenWeather Feed</span>
            <span className="text-[8px] sm:text-[9px] text-[#38BDF8] uppercase font-bold">17.68° N</span>
          </div>
          <div className="grid grid-cols-12 gap-1.5 sm:gap-2.5 my-auto items-center py-1">
            <div className="col-span-6 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-center space-y-0.5">
              <span className="text-[7px] sm:text-[8px] text-neutral-500 uppercase block truncate">Visakhapatnam</span>
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">32°C</span>
              <span className="text-[7px] sm:text-[8px] text-[#38BDF8] uppercase block">Haze</span>
            </div>
            <div className="col-span-6 p-2 sm:p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-0.5 sm:space-y-1 text-[8px] sm:text-[9px]">
              <div className="flex justify-between">
                <span className="text-neutral-500">Wind</span>
                <span className="text-neutral-300 font-bold">14 km/h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Humidity</span>
                <span className="text-neutral-300 font-bold">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Baro</span>
                <span className="text-neutral-300 font-bold">1008 hPa</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-[8px] sm:text-[9px]">
            <div className="bg-neutral-900/60 p-1 rounded border border-neutral-800">
              <span className="text-neutral-500 block">Wed</span>
              <span className="font-bold text-white">33° / 29°</span>
            </div>
            <div className="bg-neutral-900/60 p-1 rounded border border-neutral-800">
              <span className="text-neutral-500 block">Thu</span>
              <span className="font-bold text-white">31° / 28°</span>
            </div>
            <div className="bg-neutral-900/60 p-1 rounded border border-neutral-800">
              <span className="text-neutral-500 block">Fri</span>
              <span className="font-bold text-[#38BDF8]">28° / 25°</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="projects"
      aria-label="Featured Engineering Projects"
      className="relative py-16 sm:py-24 md:py-32 bg-neutral-950 border-t border-neutral-800/80 overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. ENVIRONMENT & ANTI-GRAVITY PHYSICS (Ambient Floating Particles)        */}
      {/* Pure GPU-Accelerated CSS Keyframes for Weightless Zero-Gravity Simulation */}
      {/* ========================================================================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float-antigravity-1 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.15; }
          50% { transform: translateY(-70px) translateX(25px) rotate(18deg); opacity: 0.45; }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.15; }
        }
        @keyframes float-antigravity-2 {
          0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-110px) translateX(-35px) rotate(-22deg); opacity: 0.55; }
          100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.2; }
        }
        @keyframes float-antigravity-3 {
          0% { transform: translateY(0px) translateX(0px) scale(0.9); opacity: 0.1; }
          50% { transform: translateY(-90px) translateX(40px) scale(1.15); opacity: 0.35; }
          100% { transform: translateY(0px) translateX(0px) scale(0.9); opacity: 0.1; }
        }
        .anim-float-1 { animation: float-antigravity-1 14s ease-in-out infinite; }
        .anim-float-2 { animation: float-antigravity-2 19s ease-in-out infinite; }
        .anim-float-3 { animation: float-antigravity-3 23s ease-in-out infinite; }
      ` }} />

      {/* Micro-Geometric Ambient Tokens */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <span className="anim-float-1 absolute top-[12%] left-[8%] font-mono text-xs sm:text-sm text-[#F59E0B]/30 select-none">{"{ }"}</span>
        <span className="anim-float-2 absolute top-[28%] right-[10%] font-mono text-sm sm:text-base text-[#F97316]/25 select-none">{"< / >"}</span>
        <span className="anim-float-3 absolute bottom-[18%] left-[14%] font-mono text-xs sm:text-sm text-[#EF4444]/30 select-none">{"const"}</span>
        <span className="anim-float-1 absolute bottom-[35%] right-[12%] font-mono text-xs sm:text-sm text-amber-500/25 select-none">{"=>"}</span>
        <span className="anim-float-2 absolute top-[65%] left-[6%] font-mono text-[10px] sm:text-xs text-orange-400/25 select-none">{"[ ]"}</span>

        {/* Ambient Blur Circles & Micro Dots */}
        <div className="anim-float-2 absolute top-[18%] left-[22%] w-2 h-2 rounded-full bg-[#F59E0B]/30 blur-[1px]" />
        <div className="anim-float-1 absolute top-[42%] right-[25%] w-3 h-3 rounded-full bg-[#F97316]/25 blur-[1px]" />
        <div className="anim-float-3 absolute bottom-[22%] right-[30%] w-2.5 h-2.5 rounded-full bg-[#EF4444]/30 blur-[1px]" />
        <div className="anim-float-1 absolute top-[80%] left-[35%] w-1.5 h-1.5 rounded-full bg-amber-400/35" />
        <div className="anim-float-2 absolute top-[30%] left-[48%] w-2 h-2 rounded-full bg-orange-500/25" />
        <div className="anim-float-3 absolute top-[5%] right-[40%] w-2 h-2 rounded-full bg-rose-400/25" />

        {/* Deep Atmosphere Spotlights */}
        <div className="absolute top-[20%] -left-[10%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#F59E0B]/5 blur-[100px] sm:blur-[130px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#EF4444]/5 blur-[100px] sm:blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 relative z-10">

        {/* Section Header */}
        <header className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs font-black text-[#F97316] tracking-[0.25em] uppercase block bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] px-3.5 py-1 rounded-full mb-4 sm:mb-6">
            02 / WORK
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            Featured Projects
          </h2>
          <div className="h-[3px] w-20 sm:w-28 md:w-32 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] rounded-full mt-3 sm:mt-4 shadow-[0_0_10px_rgba(249,115,22,0.5)] mb-4 sm:mb-6" />
          <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400 px-2">
            Real-world systems engineered with multi-layered 3D perspective depth, live data pipelines, and responsive algorithms.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* 2. ASYMMETRIC GRID CANVAS (Unified Perspective: 1200px)                   */}
        {/* ========================================================================= */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch"
          style={{ perspective: "1200px" }}
        >
          {projects.map((project) => (
            <ParallaxTiltCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
