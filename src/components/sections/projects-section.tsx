"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Sparkles,
  Radio,
  Check,
} from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

// Github SVG Icon
const GithubIcon = ({ size = 15 }: { size?: number }) => (
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

type FilterCategory = "All" | "Full-Stack" | "Real-time" | "Frontend";

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: ("Full-Stack" | "Real-time" | "Frontend")[];
  description: string;
  tags: string[];
  github: string;
  demo: string;
  featured?: boolean;
  problem: string;
  solution: string;
  impact: string;
  initials: string;
  gradient: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "cricket-auction",
    index: "01",
    title: "Cricket Auction Engine",
    subtitle: "Real-Time WebSocket Protocol",
    category: ["Real-time", "Full-Stack"],
    featured: true,
    description:
      "Interactive real-time bidding suite for cricket tournaments. Synchronizes multi-client bid state, squad budgets, countdown timers, and player highlights with zero broadcast delay.",
    tags: ["Next.js 15", "WebSockets", "Socket.io", "Node.js", "MongoDB"],
    github: "https://github.com/saivikas1278/cricket-auction-app",
    demo: "#",
    problem:
      "Traditional manual sports auctions suffered from desynced bid pricing, conflicting bids across concurrent room clients, and manual purse balance errors.",
    solution:
      "Architected an event-driven WebSocket room server with transactional state queues, sub-45ms latency pings, and automated team purse deductions.",
    impact:
      "Scaled to 8 concurrent team auctioneers with 0 dropped bids and sub-45ms synchronized state broadcast across all clients.",
    initials: "CA",
    gradient: "from-[#FFB020] via-[#FF7A1A] to-[#FF3D54]",
  },
  {
    id: "cricket-fund-tracker",
    index: "02",
    title: "Cricket Team Fund Tracker",
    subtitle: "Fintech & Ledger Architecture",
    category: ["Full-Stack", "Frontend"],
    description:
      "Full-stack team treasury ledger designed to reconcile team funds, tournament entry fees, match expenditures, and automated micro-contributions.",
    tags: ["Next.js 15", "Tailwind CSS", "Node.js", "MongoDB"],
    github: "https://github.com/saivikas1278/cricket-fund-tracker",
    demo: "#",
    problem:
      "Managing tournament entry fees, gear purchases, and varying micro-contributions across 15 squad members led to accounting disputes and manual calculation errors.",
    solution:
      "Built a real-time treasury ledger with automated contribution tracking, transparent transaction logs, and dynamic surplus/deficit calculations.",
    impact:
      "Successfully audited and managed over ₹48,000+ in team expenditures with zero accounting discrepancies.",
    initials: "FT",
    gradient: "from-amber-500 via-orange-600 to-red-600",
  },
  {
    id: "ecommerce-core",
    index: "03",
    title: "E-Commerce Payment Core",
    subtitle: "Secure Cart & Checkout API",
    category: ["Full-Stack"],
    description:
      "Robust retail web application featuring parameterized catalog searches, persistent cart sessions, cryptographic transaction signing, and Stripe API checkout webhooks.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
    github: "https://github.com/saivikas1278/ecommerce-website",
    demo: "#",
    problem:
      "Cart abandonment and inventory race conditions during high-concurrency checkout bursts in traditional web stores.",
    solution:
      "Designed transactional cart sessions with MongoDB atomic inventory reservation and cryptographic Stripe webhook signature verification.",
    impact:
      "Secured 256-bit SSL transaction completion with instant inventory deductions and automated checkout fulfillment.",
    initials: "EC",
    gradient: "from-blue-600 via-indigo-600 to-violet-600",
  },
  {
    id: "weather-metric",
    index: "04",
    title: "Geographical Weather Metric",
    subtitle: "OpenWeather REST Pipeline",
    category: ["Frontend", "Real-time"],
    description:
      "Atmospheric intelligence client providing real-time barometric pressure readings, wind vector angles, localized humidity indices, and predictive 5-day meteorological forecasts.",
    tags: ["React", "JavaScript", "Tailwind CSS", "REST API"],
    github: "https://github.com/saivikas1278/weather-dashboard",
    demo: "#",
    problem:
      "Raw meteorological APIs return dense JSON payloads that caused slow rendering and clunky mobile experience.",
    solution:
      "Built responsive SVG atmospheric gauges, localized coordinate caching, and optimized 5-day predictive weather cards.",
    impact:
      "Achieved sub-100ms render speeds for live geolocated climate readings with responsive visual indicators.",
    initials: "WM",
    gradient: "from-cyan-500 via-sky-600 to-blue-600",
  },
  {
    id: "task-management",
    index: "05",
    title: "Task Management Dashboard",
    subtitle: "Kanban Productivity Platform",
    category: ["Frontend", "Full-Stack"],
    description:
      "Intuitive sprint organizer featuring customizable Kanban boards, priority tagging, drag-and-drop workflow status, and real-time cloud data persistence.",
    tags: ["React", "Tailwind CSS", "JavaScript", "Firebase"],
    github: "https://github.com/saivikas1278/task-management",
    demo: "#",
    problem:
      "Overly complex enterprise project tools made daily sprint tracking burdensome and slow for engineering students.",
    solution:
      "Constructed a streamlined Kanban board with Firestore real-time listeners and offline local state caching.",
    impact:
      "Delivered instantaneous multi-device task synchronization with zero offline state conflicts.",
    initials: "TM",
    gradient: "from-emerald-500 via-teal-600 to-cyan-600",
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Custom Cursor for Desktop Project Hover (72px circle with "VIEW")
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsPointerDevice(query.matches);

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    if (query.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleExpand = useCallback((id: string) => {
    try {
      playUISound("click");
    } catch {}
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Filter projects (separate featured from secondary grid)
  const featuredProject = PROJECTS_DATA[0];
  const otherProjects = PROJECTS_DATA.slice(1);

  const filteredSecondaryProjects = otherProjects.filter((item) => {
    if (activeFilter === "All") return true;
    return item.category.includes(activeFilter);
  });

  return (
    <section
      id="projects"
      aria-label="Selected Work & Projects"
      className="relative py-20 lg:py-[120px] w-full bg-[var(--bg)] overflow-hidden"
    >
      {/* ===================================================================== */}
      {/* CUSTOM 72px "VIEW" CURSOR FOR DESKTOP CARD HOVER                      */}
      {/* ===================================================================== */}
      {isPointerDevice && (
        <motion.div
          aria-hidden="true"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHoveringCard ? 1 : 0,
            opacity: isHoveringCard ? 1 : 0,
          }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed pointer-events-none z-[80] w-[72px] h-[72px] rounded-full bg-[#FF7A1A] text-[#07070A] font-mono text-xs font-bold flex items-center justify-center shadow-[0_0_30px_rgba(255,122,26,0.6)] select-none"
        >
          VIEW
        </motion.div>
      )}

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* ===================================================================== */}
        {/* 1. SECTION HEADER (REVEAL)                                            */}
        {/* ===================================================================== */}
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
              ● 03 / PROJECTS
            </span>
          </div>

          {/* H2 Title */}
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)] max-w-[16ch]">
            Selected work
          </h2>

          {/* Description */}
          <p className="mt-3.5 font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-2xl">
            Systems I&apos;ve designed, built and shipped.
          </p>
        </motion.header>

        {/* ===================================================================== */}
        {/* 2. FEATURED PROJECT (CRICKET AUCTION ENGINE) - FULL WIDTH 2-COL CARD   */}
        {/* ===================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setIsHoveringCard(true)}
          onMouseLeave={() => setIsHoveringCard(false)}
          className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[#FF7A1A]/40 hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-2xl p-6 sm:p-8 lg:p-10 mb-14 overflow-hidden"
        >
          {/* Subtle Corner Ambient Glow */}
          <div
            aria-hidden="true"
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#FFB020]/15 via-[#FF7A1A]/10 to-transparent blur-3xl pointer-events-none group-hover:opacity-100 transition-opacity"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">

            {/* Left Column (Text & Controls) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-semibold text-[#FF7A1A] uppercase tracking-[0.12em] px-3 py-1 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/25">
                    FEATURED // 01
                  </span>
                  <span className="font-mono text-xs text-[var(--text-dim)] uppercase">
                    REAL-TIME SUITE
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white group-hover:text-[#FF7A1A] transition-colors">
                  {featuredProject.title}
                </h3>
                <p className="font-mono text-xs text-[var(--accent)] font-medium mt-1">
                  {featuredProject.subtitle}
                </p>

                <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed mt-4">
                  {featuredProject.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-md bg-zinc-900/90 border border-white/10 text-[var(--text-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={featuredProject.demo}
                  onClick={() => { try { playUISound("click"); } catch {} }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-[#07070A] bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_20px_-2px_rgba(255,122,26,0.35)] hover:shadow-[0_0_30px_rgba(255,122,26,0.55)] hover:scale-105 active:scale-95 transition-all select-none"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { try { playUISound("click"); } catch {} }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-[var(--text)] bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-white active:scale-95 transition-all select-none"
                >
                  <GithubIcon size={14} />
                  <span>Source</span>
                </a>

                {/* View Details Expand Toggle */}
                <button
                  onClick={() => toggleExpand(featuredProject.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-dim)] hover:text-white transition-colors py-2 px-2"
                >
                  <span>
                    {expandedCards[featuredProject.id] ? "Hide details" : "View details"}
                  </span>
                  {expandedCards[featuredProject.id] ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  )}
                </button>
              </div>

              {/* Expandable Problem → Solution → Impact Section */}
              <AnimatePresence>
                {expandedCards[featuredProject.id] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden pt-4 border-t border-white/[0.08] space-y-3"
                  >
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-red-400 tracking-wider block">
                        ● Problem
                      </span>
                      <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                        {featuredProject.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                        ● Solution
                      </span>
                      <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                        {featuredProject.solution}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                        ● Impact
                      </span>
                      <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed mt-0.5">
                        {featuredProject.impact}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Browser Window Mockup with macOS dots & Live UI */}
            <div className="lg:col-span-6 relative">
              {/* Backlight Glow Behind Mockup */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FFB020]/25 via-[#FF7A1A]/15 to-transparent blur-2xl pointer-events-none"
              />

              {/* macOS Browser Window Mockup */}
              <div className="relative rounded-2xl bg-zinc-950 border border-white/15 shadow-2xl overflow-hidden">
                {/* macOS Window Top Bar */}
                <div className="h-9 px-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                  </div>

                  {/* Browser URL Bar */}
                  <div className="px-4 py-0.5 rounded-md bg-black/60 border border-white/5 font-mono text-[10px] text-[var(--text-dim)] truncate max-w-[220px]">
                    https://cricket-auction.saivikas.dev
                  </div>

                  <span className="w-6" />
                </div>

                {/* Browser Interior: Simulated Live Auction Room Interface */}
                <div className="p-4 sm:p-5 bg-black/80 font-mono text-xs space-y-3.5 select-none">
                  {/* Room Status Ribbon */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-bold">AUCTION FLOOR #01</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-zinc-900 text-amber-400 border border-amber-500/20 text-[10px]">
                      ROUND 1
                    </span>
                  </div>

                  {/* Current Active Lot Highlight */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] text-[var(--text-dim)] uppercase block">
                          Current Player Lot
                        </span>
                        <span className="font-display font-bold text-sm sm:text-base text-white block">
                          Cheepu Sai Vikas
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          All-Rounder · Right-Hand Bat · Right-Arm Medium
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#FF7A1A]/10 border border-[#FF7A1A]/30 text-[#FF7A1A] font-bold text-[10px]">
                        BASE: 10L
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div>
                        <span className="text-[10px] text-[var(--text-dim)] uppercase block">
                          Current Top Bid
                        </span>
                        <span className="font-bold text-base sm:text-lg text-[#FF7A1A]">
                          ₹ 14.50 Lakhs
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-[var(--text-dim)] uppercase block">
                          Leading Franchise
                        </span>
                        <span className="font-bold text-xs text-white uppercase">
                          Royal Strikers
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Real-time Bid Log Stream */}
                  <div className="space-y-1.5 text-[10px]">
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                      <span className="text-[var(--text-muted)]">
                        ⚡ Vizag Titans raised bid to ₹14.00L
                      </span>
                      <span className="text-[var(--text-dim)]">1.2s ago</span>
                    </div>
                    <div className="p-2 rounded-lg bg-zinc-900/60 border border-white/5 flex items-center justify-between">
                      <span className="text-emerald-400">
                        ✓ Royal Strikers countered at ₹14.50L
                      </span>
                      <span className="text-[var(--text-dim)]">now</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* ===================================================================== */}
        {/* 3. FILTER BAR WITH ANIMATED LAYOUTID PILL                             */}
        {/* ===================================================================== */}
        <div className="flex flex-wrap items-center gap-2 mb-8 select-none">
          {(["All", "Full-Stack", "Real-time", "Frontend"] as FilterCategory[]).map(
            (category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    try { playUISound("click"); } catch {}
                    setActiveFilter(category);
                  }}
                  className={`relative px-4 py-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] transition-colors duration-200 ${
                    isActive ? "text-[#07070A] font-semibold" : "text-[var(--text-muted)] hover:text-white"
                  }`}
                >
                  {/* Sliding layoutId Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="projects-filter-pill"
                      transition={{
                        type: "spring" as const,
                        stiffness: 400,
                        damping: 32,
                      }}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_20px_rgba(255,122,26,0.35)]"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            }
          )}
        </div>

        {/* ===================================================================== */}
        {/* 4. 2-COLUMN GRID OF OTHER PROJECTS (1 COL MOBILE)                     */}
        {/* ===================================================================== */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredSecondaryProjects.map((project) => {
              const isExpanded = !!expandedCards[project.id];

              return (
                <motion.article
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setIsHoveringCard(true)}
                  onMouseLeave={() => setIsHoveringCard(false)}
                  className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[#FF7A1A]/40 hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Top Media Container: 16:10 Ratio, 14px Radius, Gradient Initial Placeholder */}
                    <div className="relative aspect-[16/10] w-full rounded-[14px] overflow-hidden mb-5 bg-zinc-950 border border-white/5 group/img">
                      {/* Generative Gradient Background Placeholder */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80 group-hover:scale-106 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center`}
                      >
                        <span className="font-display font-black text-4xl sm:text-5xl text-white/40 tracking-wider">
                          {project.initials}
                        </span>
                      </div>

                      {/* Dark Gradient Overlay at the bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                      {/* Floating Glass "↗" Circle Button in Top Right (rotates 45deg on hover) */}
                      <a
                        href={project.demo !== "#" ? project.demo : project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        onClick={() => { try { playUISound("click"); } catch {} }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/75 border border-white/15 text-white flex items-center justify-center backdrop-blur-md shadow-lg group-hover:rotate-45 transition-transform duration-300 z-20"
                      >
                        <ArrowUpRight size={16} />
                      </a>

                      {/* Bottom Image Tag Overlay */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <span className="font-mono text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                          {project.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-semibold text-[#FF7A1A] tracking-wider">
                        {project.index}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
                        {project.category.join(" · ")}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight group-hover:text-[#FF7A1A] transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed mt-2">
                      {project.description}
                    </p>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-[var(--text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action Row + Expand Details */}
                  <div className="pt-5 mt-5 border-t border-[var(--border)] space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {/* Live Demo Small Button */}
                        <a
                          href={project.demo}
                          onClick={() => { try { playUISound("click"); } catch {} }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#07070A] bg-gradient-to-r from-[#FFB020] to-[#FF7A1A] shadow-md hover:scale-105 active:scale-95 transition-all select-none"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={11} />
                        </a>

                        {/* Source Ghost Button */}
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => { try { playUISound("click"); } catch {} }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[var(--text)] bg-[var(--surface-2)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:text-white active:scale-95 transition-all select-none"
                        >
                          <GithubIcon size={13} />
                          <span>Source</span>
                        </a>
                      </div>

                      {/* Expand Details Trigger */}
                      <button
                        onClick={() => toggleExpand(project.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-dim)] hover:text-white transition-colors"
                      >
                        <span>{isExpanded ? "Hide" : "Details"}</span>
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>
                    </div>

                    {/* Expandable Problem → Solution → Impact Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pt-3 border-t border-white/5 space-y-2.5 text-xs font-sans"
                        >
                          <div>
                            <span className="font-mono text-[10px] uppercase font-bold text-red-400 tracking-wider block">
                              ● Problem
                            </span>
                            <p className="text-[var(--text-muted)] leading-relaxed mt-0.5">
                              {project.problem}
                            </p>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                              ● Solution
                            </span>
                            <p className="text-[var(--text-muted)] leading-relaxed mt-0.5">
                              {project.solution}
                            </p>
                          </div>

                          <div>
                            <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                              ● Impact
                            </span>
                            <p className="text-[var(--text-muted)] leading-relaxed mt-0.5">
                              {project.impact}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
