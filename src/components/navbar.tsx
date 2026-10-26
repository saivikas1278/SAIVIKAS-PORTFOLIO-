"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { playUISound } from "@/utils/sound-manager";

interface NavLink {
  label: string;
  href: string;
  targetId: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "HOME", href: "#home", targetId: "home" },
  { label: "ABOUT", href: "#about", targetId: "about" },
  { label: "PROJECTS", href: "#projects", targetId: "projects" },
  { label: "SKILLS", href: "#skills", targetId: "skills" },
  { label: "CERTIFICATES", href: "#certifications", targetId: "certifications" },
  { label: "CONTACT", href: "#contact", targetId: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

  // 1. Scroll-Direction Sensing & Blur-Glass Activation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Blur-glass toggle at 20px
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > 80 && currentScrollY > lastScrollY.current && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  // 2. Scroll-Spy with IntersectionObserver
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "skills", "certifications", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3. Body Scroll Lock on Mobile Menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // 4. Smooth Scrolling with 80px Navbar Offset
  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      try {
        playUISound("click");
      } catch {
        // Non-blocking sound
      }

      const elem =
        document.getElementById(targetId) ||
        (targetId === "certifications" ? document.getElementById("certificates") : null);

      if (elem) {
        const targetPosition = elem.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        setActiveSection(targetId);
      }

      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* ===================================================================== */}
      {/* MAIN FIXED NAVBAR CONTAINER                                           */}
      {/* ===================================================================== */}
      <header
        style={{
          transform: isVisible ? "translateY(0)" : "translateY(-100%)",
          transition:
            "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className={`fixed top-0 left-0 right-0 z-50 w-full ${
          isScrolled
            ? "h-16 bg-[#0A0A0E]/70 backdrop-blur-md border-b border-[var(--border)] shadow-lg shadow-black/30"
            : "h-[72px] bg-transparent border-b border-transparent shadow-none"
        }`}
      >
        <div className="max-w-[1200px] mx-auto h-full px-6 lg:px-12 flex items-center justify-between">

          {/* ----------------------------------------------------------------- */}
          {/* LEFT: LOGO "SV" (40x40, 1px border, Space Grotesk Bold)          */}
          {/* ----------------------------------------------------------------- */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "home")}
            onMouseEnter={() => {
              try { playUISound("hover"); } catch {}
            }}
            aria-label="Sai Vikas Home"
            className="group relative flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(255,122,26,0.35)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] shrink-0"
          >
            <span className="font-display font-bold text-base tracking-tight text-[var(--text)] group-hover:text-white transition-colors duration-200">
              SV
            </span>
          </a>

          {/* ----------------------------------------------------------------- */}
          {/* CENTER: DESKTOP NAVIGATION LINKS (>= 900px)                      */}
          {/* ----------------------------------------------------------------- */}
          <nav
            aria-label="Primary Navigation"
            className="hidden min-[900px]:flex items-center gap-6 lg:gap-8 whitespace-nowrap"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.targetId;
              const isHovered = hoveredLink === link.targetId;

              return (
                <a
                  key={link.targetId}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.targetId)}
                  onMouseEnter={() => {
                    setHoveredLink(link.targetId);
                    try { playUISound("hover"); } catch {}
                  }}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={`relative py-1.5 px-1 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-colors duration-200 select-none ${
                    isActive ? "text-white" : "text-[var(--text-muted)] hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>

                  {/* Active Link Sliding Pill / Underline Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      transition={{
                        type: "spring" as const,
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FFB020] to-[#FF7A1A] rounded-full"
                    />
                  )}

                  {/* Hover Accent Dot (fades in under link when not active) */}
                  {!isActive && isHovered && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ----------------------------------------------------------------- */}
          {/* RIGHT: "HIRE ME" PRIMARY GRADIENT BUTTON + MOBILE MENU TRIGGER   */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex items-center gap-3">
            {/* Primary HIRE ME Button (Desktop >= 900px) */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "contact")}
              onMouseEnter={() => {
                try { playUISound("hover"); } catch {}
              }}
              className="hidden min-[900px]:inline-flex items-center justify-center h-10 px-5 rounded-full font-sans font-semibold text-xs tracking-wider uppercase text-[#07070A] bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_20px_-2px_rgba(255,122,26,0.35)] hover:shadow-[0_0_30px_rgba(255,122,26,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] select-none shrink-0"
            >
              HIRE ME
            </a>

            {/* Mobile Hamburger Morph Button (< 900px) */}
            <button
              onClick={() => {
                try { playUISound("click"); } catch {}
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              className="min-[900px]:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] text-[var(--text)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px] shrink-0"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                {/* Top line */}
                <span
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(7px) rotate(45deg)"
                      : "translateY(0) rotate(0deg)",
                    transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="w-full h-[2px] bg-[var(--text)] rounded-full origin-center"
                />
                {/* Middle line */}
                <span
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transform: mobileMenuOpen ? "scaleX(0)" : "scaleX(1)",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  className="w-full h-[2px] bg-[var(--text)] rounded-full origin-center"
                />
                {/* Bottom line */}
                <span
                  style={{
                    transform: mobileMenuOpen
                      ? "translateY(-7px) rotate(-45deg)"
                      : "translateY(0) rotate(0deg)",
                    transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                  className="w-full h-[2px] bg-[var(--text)] rounded-full origin-center"
                />
              </div>
            </button>
          </div>

        </div>
      </header>

      {/* ===================================================================== */}
      {/* MOBILE FULL-SCREEN BLURRED OVERLAY (< 900px)                         */}
      {/* ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 min-[900px]:hidden bg-[#07070A]/95 backdrop-blur-2xl flex flex-col justify-between px-8 pt-28 pb-12"
          >
            {/* Top Eyebrow Label */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--text-dim)]">
                NAVIGATION
              </span>
            </div>

            {/* Mobile Navigation Links (Space Grotesk 36px with Staggered Slide-Up) */}
            <nav className="flex flex-col space-y-4 my-auto">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.targetId;

                return (
                  <motion.div
                    key={link.targetId}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 * idx,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.targetId)}
                      className={`group inline-flex items-center gap-4 font-display font-semibold text-3xl sm:text-4xl tracking-tight transition-colors duration-200 ${
                        isActive ? "text-[var(--accent)]" : "text-[var(--text)] hover:text-white"
                      }`}
                    >
                      <span className="font-mono text-xs text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
                        0{idx + 1}
                      </span>
                      <span>{link.label}</span>
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="space-y-4 pt-6 border-t border-[var(--border)]">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, "contact")}
                className="w-full inline-flex items-center justify-center h-12 rounded-full font-sans font-semibold text-sm tracking-wider uppercase text-[#07070A] bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_24px_rgba(255,122,26,0.4)] active:scale-[0.98] transition-all"
              >
                HIRE ME
              </a>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--text-dim)]">
                <span>© 2026 SAI VIKAS</span>
                <span className="text-emerald-400">● AVAILABLE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
