"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowUp, Mail, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { playUISound } from "@/utils/sound-manager";

// =============================================================================
// BIG CTA BAND WITH MAGNETIC BUTTON EFFECT
// =============================================================================
function BigCtaBand() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    const dist = Math.hypot(dx, dy);

    // Subtle magnetic attraction within 60px radius of button edge
    const activationRadius = 60 + rect.width / 2;
    if (dist < activationRadius) {
      const pullFactor = 0.28;
      setBtnOffset({
        x: dx * pullFactor,
        y: dy * pullFactor,
      });
    } else {
      setBtnOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleCtaClick = () => {
    try { playUISound("click"); } catch {}
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("contact-name");
        input?.focus();
      }, 500);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="max-w-[1200px] mx-auto px-6 lg:px-12 mb-20 lg:mb-28 relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[28px] overflow-hidden p-8 sm:p-12 md:p-16 border border-white/10 bg-[var(--surface)] shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        {/* Gradient Orange Mesh Background at 15% opacity */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#FF7A1A]/15 via-[#FF3D54]/10 to-[#FFB020]/10 backdrop-blur-xl pointer-events-none"
        />

        {/* Ambient radial accent lights */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FF7A1A]/20 filter blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#FF3D54]/15 filter blur-3xl pointer-events-none"
        />

        {/* Left Side: Headline & Narrative */}
        <div className="relative z-10 space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] text-[var(--accent)] mb-1">
            <Sparkles size={13} />
            <span>LET&apos;S COLLABORATE</span>
          </div>

          <h3 className="font-display font-semibold text-[clamp(1.75rem,3.5vw,2.75rem)] tracking-tight leading-tight text-white">
            Have a project in mind?
          </h3>

          <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            From high-throughput real-time engines to polished web applications, let&apos;s build software that performs under load.
          </p>
        </div>

        {/* Right Side: Magnetic Button */}
        <div className="relative z-10 shrink-0">
          <motion.button
            ref={btnRef}
            onClick={handleCtaClick}
            animate={{ x: btnOffset.x, y: btnOffset.y }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
            className="group relative h-14 px-8 sm:px-10 rounded-full bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] text-[#07070A] font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_35px_rgba(255,122,26,0.35)] hover:shadow-[0_0_50px_rgba(255,122,26,0.55)] flex items-center gap-3 transition-shadow duration-300 cursor-pointer"
          >
            <span>Start a conversation</span>
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
            />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

// =============================================================================
// MAIN FOOTER COMPONENT
// =============================================================================
export default function Footer() {
  const scrollToTop = () => {
    try { playUISound("click"); } catch {}
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SKILLS", href: "#skills" },
    { label: "CERTIFICATES", href: "#certifications" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <div className="relative w-full bg-[var(--bg)] overflow-hidden">
      {/* 1. Big CTA Band above footer */}
      <BigCtaBand />

      {/* 2. Footer Body */}
      <footer className="relative w-full border-t border-[var(--border)] pt-16 pb-12 overflow-hidden">
        {/* Giant Outlined "SAI VIKAS" Background Text at 4% opacity */}
        <div
          aria-hidden="true"
          className="absolute bottom-[-12%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0"
        >
          <span
            className="font-display font-black text-[clamp(4.5rem,14vw,12rem)] tracking-widest text-transparent uppercase whitespace-nowrap opacity-[0.04]"
            style={{
              WebkitTextStroke: "1.5px #FFFFFF",
            }}
          >
            SAI VIKAS
          </span>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
          {/* 3-Column Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border)]">
            {/* Column 1: Logo + Tagline */}
            <div className="md:col-span-5 space-y-4">
              <Link
                href="#home"
                onClick={() => { try { playUISound("click"); } catch {} }}
                className="inline-flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] group-hover:border-[var(--accent)] group-hover:shadow-[0_0_15px_rgba(255,122,26,0.3)] flex items-center justify-center font-display font-bold text-base text-white transition-all duration-300">
                  SV
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[var(--accent)] transition-colors">
                    SAI VIKAS
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-dim)] uppercase">
                    Full-Stack Engineer
                  </span>
                </div>
              </Link>

              <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
                Engineering scalable real-time systems, performant WebSockets, and modern web architectures.
              </p>

              <p className="font-mono text-xs text-[var(--text-dim)]">
                SRKR Engineering College · Bhimavaram, India
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-4 space-y-3">
              <span className="font-mono text-xs uppercase font-bold text-[var(--accent)] tracking-[0.14em] block">
                NAVIGATION
              </span>

              <ul className="grid grid-cols-2 gap-2 font-mono text-xs text-[var(--text-muted)]">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => { try { playUISound("click"); } catch {} }}
                      className="hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 py-1"
                    >
                      <span className="text-[var(--text-dim)] text-[10px]">↳</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Socials & Connect */}
            <div className="md:col-span-3 space-y-3">
              <span className="font-mono text-xs uppercase font-bold text-[var(--accent)] tracking-[0.14em] block">
                CONNECT
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/saivikas1278"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[#FF7A1A]/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                >
                  <FaGithub size={16} />
                </a>

                <a
                  href="https://linkedin.com/in/sai-vikas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                >
                  <FaLinkedin size={16} />
                </a>

                <a
                  href="https://x.com/saivikas1278"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Profile"
                  className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-white/30 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                >
                  <FaXTwitter size={14} />
                </a>

                <a
                  href="mailto:cheepusaivikas549@gmail.com"
                  aria-label="Email Direct"
                  className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[#FF7A1A]/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                >
                  <Mail size={16} />
                </a>
              </div>

              <div className="pt-2 font-mono text-[11px] text-[var(--text-dim)]">
                Available for internships & full-time developer roles.
              </div>
            </div>
          </div>

          {/* Bottom Row: Copyright + Back to Top */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--text-dim)]">
            <p>© 2026 Sai Vikas. Built with Next.js 15.</p>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer select-none"
            >
              <span>Back to top</span>
              <ArrowUp
                size={13}
                className="group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
