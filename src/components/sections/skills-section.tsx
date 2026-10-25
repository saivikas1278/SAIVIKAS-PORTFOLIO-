"use client";

import React from "react";
import { playUISound } from "@/utils/sound-manager";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills & Technologies"
      className="relative py-16 sm:py-24 md:py-32 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] md:w-[700px] h-[340px] sm:h-[600px] md:h-[700px] rounded-full bg-gradient-to-tr from-[#F59E0B]/5 via-[#F97316]/4 to-transparent blur-[90px] sm:blur-[140px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <header className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <span className="text-[10px] sm:text-xs font-black text-[#F97316] tracking-[0.25em] uppercase block bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] px-3.5 py-1 rounded-full mb-4 sm:mb-6">
            03 / CAPABILITIES
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            Skills Bento Grid
          </h2>
          <div className="h-[3px] w-20 sm:w-28 md:w-32 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] rounded-full mt-3 sm:mt-4 shadow-[0_0_10px_rgba(249,115,22,0.5)] mb-4 sm:mb-6" />
          <p className="font-sans text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400 px-2">
            Every core technology engineered into an isolated, responsive bento matrix.
          </p>
        </header>

        {/* ========================================================================= */}
        {/* RESPONSIVE BENTO MATRIX: 2 COLS MOBILE -> 3 COLS TABLET -> 4 COLS DESKTOP */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">

          {/* 1. HERO WIDE CELL: REACT 19 (Mobile: col-span-2 | Desktop: col-span-2) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-2 lg:col-span-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 bg-zinc-950/80 border border-white/10 hover:border-[#00D8FF]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(0,216,255,0.12)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D8FF] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-28 sm:w-36 h-28 sm:h-36 bg-[#00D8FF]/10 rounded-full blur-2xl group-hover:bg-[#00D8FF]/20 transition-colors pointer-events-none" />
            <div className="flex items-start justify-between gap-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#00D8FF]/10 border border-[#00D8FF]/20 text-[#00D8FF] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-7 sm:h-7" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <ellipse cx="12" cy="12" rx="12" ry="4.5" transform="rotate(30 12 12)" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="12" cy="12" rx="12" ry="4.5" transform="rotate(90 12 12)" stroke="currentColor" strokeWidth="1.5" />
                  <ellipse cx="12" cy="12" rx="12" ry="4.5" transform="rotate(150 12 12)" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#00D8FF]/10 border border-[#00D8FF]/20 text-[#00D8FF] shrink-0">
                PRIMARY CORE
              </span>
            </div>
            <div className="space-y-1 pt-3 sm:pt-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Frontend Framework</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide group-hover:text-[#00D8FF] transition-colors">React 19</h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium line-clamp-2">Dynamic SPAs, reusable custom hooks & virtual DOM optimization.</p>
            </div>
          </article>

          {/* 2. CELL: NEXT.JS (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-white/10 border border-white/20 text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M17.5 17.5L9.25 7.25V16.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.75 7.25H16.25V12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-zinc-500">v16.2</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Fullstack</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-zinc-200 transition-colors">Next.js</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">SSR & Server Comp.</p>
            </div>
          </article>

          {/* 3. CELL: JAVASCRIPT (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#F7DF1E]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(247,223,30,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7DF1E] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#F7DF1E]/10 border border-[#F7DF1E]/20 text-[#F7DF1E] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0h24v24H0V0zm20.33 18.53c-.34-.6-.73-1.07-1.46-1.07-.48 0-.83.25-.83.76 0 .52.38.7.9.93 1.62.68 2.65 1.2 2.65 3.09 0 1.9-1.46 3.09-3.56 3.09-2.07 0-3.13-1.09-3.5-2.23l1.88-1.1c.34.6.76 1 1.48 1 .48 0 .86-.23.86-.74 0-.5-.38-.68-.96-.94-1.52-.66-2.58-1.12-2.58-3.03 0-1.8 1.34-3.03 3.32-3.03 1.77 0 2.82.9 3.2 2.03l-1.96 1.23zm-8.38-2.03h2.14v8.03h-2.14v-8.03z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#F7DF1E] bg-[#F7DF1E]/10 px-1.5 py-0.5 rounded-full">ES6+</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Language</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#F7DF1E] transition-colors truncate">JavaScript</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Async & DOM API.</p>
            </div>
          </article>

          {/* 4. CELL: NODE.JS (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#8CC84B]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(140,200,75,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8CC84B] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#8CC84B]/10 border border-[#8CC84B]/20 text-[#8CC84B] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 6.5V15.5L12 20L20 15.5V6.5L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M12 11V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M16 8.75L12 11L8 8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-emerald-400">REST</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Backend</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#8CC84B] transition-colors">Node.js</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Event loop & sockets.</p>
            </div>
          </article>

          {/* 5. VERTICAL METRIC CARD: HIGH CONTRAST INDICATOR (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-[#F97316]/30 shadow-lg hover:shadow-[0_15px_35px_rgba(249,115,22,0.18)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
              <span className="text-[8px] sm:text-[9px] font-mono font-black text-[#F97316] tracking-widest uppercase">AUDIT</span>
            </div>
            <div className="space-y-0.5 py-1">
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-display">100%</div>
              <div className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-[#F97316] truncate">Core Web Vitals</div>
            </div>
            <p className="text-[9px] sm:text-[10px] text-zinc-500 font-mono truncate">Zero layout shifts.</p>
          </article>

          {/* 6. HERO WIDE CELL: TAILWIND CSS (Mobile: col-span-2 | Desktop: col-span-2) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-2 lg:col-span-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 bg-zinc-950/80 border border-white/10 hover:border-[#38BDF8]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(56,189,248,0.12)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8] flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-28 sm:w-36 h-28 sm:h-36 bg-[#38BDF8]/10 rounded-full blur-2xl group-hover:bg-[#38BDF8]/20 transition-colors pointer-events-none" />
            <div className="flex items-start justify-between gap-2">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6C9 6 7.2 7.5 6.6 10.5C7.5 9.3 8.7 8.7 10.2 8.7C12.3 8.7 13.8 10.2 14.85 11.775C15.9 13.35 17.1 15 20.4 15C23.4 15 25.2 13.5 25.8 10.5C24.9 11.7 23.7 12.3 22.2 12.3C20.1 12.3 18.6 10.8 17.55 9.225C16.5 7.65 15.3 6 12 6ZM6.6 13.5C3.6 13.5 1.8 15 1.2 18C2.1 16.8 3.3 16.2 4.8 16.2C6.9 16.2 8.4 17.7 9.45 19.275C10.5 20.85 11.7 22.5 15 22.5C18 22.5 19.8 21 20.4 18C19.5 19.2 18.3 19.8 16.8 19.8C14.7 19.8 13.2 18.3 12.15 16.725C11.1 15.15 9.9 13.5 6.6 13.5Z" />
                </svg>
              </div>
              <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] shrink-0">
                ENGINE v4
              </span>
            </div>
            <div className="space-y-1 pt-3 sm:pt-4">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">Design System</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide group-hover:text-[#38BDF8] transition-colors">Tailwind CSS</h3>
              <p className="text-[11px] sm:text-xs text-zinc-400 font-medium line-clamp-2">Responsive layouts, custom grid architectures & zero-runtime CSS.</p>
            </div>
          </article>

          {/* 7. CELL: PYTHON (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#3776AB]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(55,118,171,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3776AB] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#3776AB]/10 border border-[#3776AB]/20 text-[#3776AB] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.91 0c-1.85 0-3.4.15-4.47.41-2.22.56-2.58 1.83-2.58 4.23v2.09h7.24v.98H2.17C.71 7.71 0 8.65 0 10.97v4.54c0 2.22.95 3.03 2.63 3.32 1.63.29 3.23.29 4.8 0 .8-.15 1.54-.41 1.54-1.74v-2.32h4.74c1.65 0 2.63-.82 2.92-2.5.3-1.63.3-3.26 0-4.89-.25-1.42-1.07-2.12-2.58-2.32v-.93h.93c1.62 0 2.5-.74 2.8-2.35.3-1.62.3-3.2 0-4.82-.25-1.39-1.02-2.12-2.55-2.25C14.39.09 13.2 0 11.91 0zm-3.66 1.82c.48 0 .87.39.87.87s-.39.87-.87.87a.87.87 0 1 1 0-1.74zM12 11.75c1.62 0 2.8.12 3.86.35 2.14.47 2.14 1.82 2.14 4.14v2.03h-7.14v-.96h9.72c1.46 0 2.15-.9 2.15-3.13v-4.45c0-2.19-.92-3.03-2.55-3.32a18.23 18.23 0 0 0-4.73 0c-.8.15-1.5.42-1.5 1.71v2.32H9.21c-1.63 0-2.61.82-2.9 2.47-.3 1.66-.3 3.32 0 4.98.26 1.42 1.05 2.12 2.55 2.32v.93h-.93c-1.63 0-2.5.75-2.8 2.38-.3 1.6-.3 3.2 0 4.8.25 1.4 1.02 2.13 2.55 2.26 1.45.1 2.64.19 3.92.19 1.86 0 3.42-.15 4.5-.41 2.22-.56 2.58-1.83 2.58-4.24v-2.08h-7.24v-.99h9.94c1.46 0 2.17-.94 2.17-3.26v-4.54c0-2.22-.95-3.03-2.63-3.32-1.63-.29-3.23-.29-4.8 0-.8.15-1.54.41-1.54 1.74v2.32H12zm3.66 8.56c.48 0 .87.39.87.87s-.39.87-.87.87a.87.87 0 1 1 0-1.74z" />
                </svg>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500">v3.x</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Scripting</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#3776AB] transition-colors">Python</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Data & algorithms.</p>
            </div>
          </article>

          {/* 8. CELL: HTML5 (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#E34F26]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(227,79,38,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E34F26] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#E34F26]/10 border border-[#E34F26]/20 text-[#E34F26] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 5.6H5.2l.4 4.5h10.4l-.4 4.5-3.6 1.2-3.6-1.2-.2-2.3H5.8l.4 4.6 5.8 1.9 5.8-1.9.9-10.3-.2-1z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#E34F26]">SEO</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Markup</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#E34F26] transition-colors">HTML5</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Semantic layout.</p>
            </div>
          </article>

          {/* 9. CELL: CSS3 (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#1572B6]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(21,114,182,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1572B6] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#1572B6]/10 border border-[#1572B6]/20 text-[#1572B6] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 5.6H5.2l.4 4.5h10.4l-.4 4.5-3.6 1.2-3.6-1.2-.2-2.3H5.8l.4 4.6 5.8 1.9 5.8-1.9.9-10.3-.2-1z" className="opacity-30" />
                  <path d="M12 2.2L3.5 5l1.5 13.5 7 2.3 7-2.3 1.5-13.5-8.5-2.8zm5.2 6.8H8.8l-.2 2.2h8.4l-.4 4.4-4.6 1.5-4.6-1.5-.2-2.2H9.8l.2 1.2 2 1 2-1 .2-2.2H8.2l-.2-2.2h9.6l-.2 2.2z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-sky-400">Flex</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Styling</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#1572B6] transition-colors">CSS3</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Fluid animations.</p>
            </div>
          </article>

          {/* 10. CELL: FIGMA (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#A259FF]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(162,89,255,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A259FF] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#A259FF]/10 border border-[#A259FF]/20 shrink-0">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 3c-1.65 0-3 1.35-3 3s1.35 3 3 3h3V3H6z" fill="#F24E1E" />
                  <path d="M6 9c-1.65 0-3 1.35-3 3s1.35 3 3 3h3V9H6z" fill="#A259FF" />
                  <path d="M6 15c-1.65 0-3 1.35-3 3s1.35 3 3 3h3v-6H6z" fill="#0ACF83" />
                  <path d="M15 9c1.65 0 3-1.35 3-3s-1.35-3-3-3h-3v6h3z" fill="#FF7262" />
                  <path d="M12 9h3c1.65 0 3 1.35 3 3s-1.35 3-3 3h-3V9z" fill="#1ABCFE" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#A259FF]">UI/UX</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Interface</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#A259FF] transition-colors">Figma</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Prototypes & UI.</p>
            </div>
          </article>

          {/* 11. CELL: CANVA (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#00C4CC]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(0,196,204,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C4CC] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#00C4CC]/10 border border-[#00C4CC]/20 text-[#00C4CC] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#00C4CC]">Art</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Visual</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#00C4CC] transition-colors">Canva</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Graphics & banners.</p>
            </div>
          </article>

          {/* 12. CELL: PENPOT (Col 1 on Mobile) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-1 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 md:p-6 bg-zinc-950/80 border border-white/10 hover:border-[#FF176B]/40 shadow-lg hover:shadow-[0_15px_35px_rgba(255,23,107,0.1)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF176B] flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-start justify-between gap-1">
              <div className="p-2 sm:p-2.5 rounded-xl bg-[#FF176B]/10 border border-[#FF176B]/20 text-[#FF176B] shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-1.5" />
                  <path d="M14 17l-1.5-1.5" />
                  <path d="M19 12L12 5 9 8l7 7 3-3z" />
                  <path d="M15 8l-1.5-1.5" />
                  <path d="M11 12l-1.5-1.5" />
                  <path d="M9 8L2 1 1 2l7 7 1-1z" />
                </svg>
              </div>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#FF176B]">OS</span>
            </div>
            <div className="space-y-0.5 pt-3 sm:pt-4">
              <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-zinc-500 block truncate">Vector</span>
              <h3 className="text-base sm:text-lg md:text-xl font-black text-white group-hover:text-[#FF176B] transition-colors">Penpot</h3>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-medium line-clamp-1">Open mockups.</p>
            </div>
          </article>

          {/* 13. MEDIA / GRAPH REPRESENTATION CONTAINER (Mobile: col-span-2 | Desktop: col-span-2) */}
          <article
            tabIndex={0}
            onMouseEnter={() => playUISound("hover")}
            className="group relative col-span-2 lg:col-span-2 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 bg-zinc-950/80 border border-white/10 hover:border-emerald-500/40 shadow-lg hover:shadow-[0_15px_35px_rgba(16,185,129,0.12)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 flex flex-col justify-between overflow-hidden"
          >
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/5 font-mono text-[10px] sm:text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-bold tracking-wider uppercase text-[10px] sm:text-xs">Telemetry</span>
              </div>
              <span className="text-emerald-400 font-bold text-[9px] sm:text-[10px]">24ms LATENCY</span>
            </div>

            {/* Simulated Live Latency Waveform Graph */}
            <div className="py-2.5 sm:py-3 flex items-end justify-between gap-1 sm:gap-1.5 h-12 sm:h-16 w-full">
              {[40, 65, 30, 85, 45, 95, 60, 75, 40, 80, 55, 90, 70, 85, 100].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-full bg-gradient-to-t from-emerald-500/20 to-emerald-400 group-hover:from-emerald-500/40 group-hover:to-emerald-300 transition-all duration-300"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] sm:text-xs pt-1 sm:pt-2">
              <span className="text-zinc-500 font-mono">11+ Stack</span>
              <span className="text-white font-mono font-bold">Zero Overhead</span>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
