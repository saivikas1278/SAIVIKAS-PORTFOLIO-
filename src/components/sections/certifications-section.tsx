"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Award,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { SiUdemy, SiCoursera, SiEdx } from "react-icons/si";
import { playUISound } from "@/utils/sound-manager";

type CertCategory = "All" | "Cloud" | "Development" | "Core CS";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerIcon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  issuerColor: string;
  date: string;
  credentialId: string;
  image?: string;
  link: string;
  category: "Development" | "Core CS" | "Cloud";
  skills: string[];
}

const CERTIFICATES_DATA: Certification[] = [
  {
    id: "01",
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    issuerIcon: SiUdemy,
    issuerColor: "#A435F0",
    date: "March 2023",
    credentialId: "UC-12345",
    image: "/assets/images/cer1.png",
    link: "https://www.udemy.com/certificate/UC-12345/",
    category: "Development",
    skills: ["Full-Stack", "JavaScript", "Node.js"],
  },
  {
    id: "02",
    title: "React - The Complete Guide",
    issuer: "Coursera",
    issuerIcon: SiCoursera,
    issuerColor: "#0056D2",
    date: "September 2022",
    credentialId: "CR-67890",
    link: "https://coursera.org/verify/CR-67890",
    category: "Development",
    skills: ["React", "Redux", "Hooks"],
  },
  {
    id: "03",
    title: "Python for Data Science",
    issuer: "edX",
    issuerIcon: SiEdx,
    issuerColor: "#FF1E46",
    date: "January 2023",
    credentialId: "EDX-24680",
    link: "https://credentials.edx.org/credentials/EDX-24680/",
    category: "Core CS",
    skills: ["Python", "Algorithms", "Core CS"],
  },
];

const CATEGORIES: CertCategory[] = ["All", "Cloud", "Development", "Core CS"];

// =============================================================================
// INDIVIDUAL CERTIFICATE CARD WITH MOUSE SPOTLIGHT EFFECT
// =============================================================================
function CertificateCard({
  cert,
  index,
  onClick,
}: {
  cert: Certification;
  index: number;
  onClick: () => void;
}) {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IssuerIcon = cert.issuerIcon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        try { playUISound("hover"); } catch {}
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl hover:shadow-[0_0_35px_rgba(255,122,26,0.18)] p-5 flex flex-col justify-between overflow-hidden cursor-pointer select-none"
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 122, 26, 0.12), transparent 75%)`
            : undefined,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Top: 4:3 Certificate Thumbnail Frame */}
        <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 bg-black/50 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
          {cert.image ? (
            <Image
              src={cert.image}
              alt={cert.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            /* Clean Award Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#15151C] via-[#0E0E13] to-[#0A0A0E] relative overflow-hidden">
              {/* Subtle background circuit pattern */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-10 bg-[radial-gradient(#FF7A1A_1px,transparent_1px)] [background-size:16px_16px]"
              />

              <div className="relative w-14 h-14 rounded-2xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] group-hover:scale-110 group-hover:bg-[#FF7A1A]/15 transition-all duration-300 shadow-[0_0_20px_rgba(255,122,26,0.15)] mb-2">
                <Award size={26} />
              </div>

              <span className="relative font-mono text-[10px] uppercase font-bold tracking-[0.16em] text-[var(--accent)]">
                VERIFIED CREDENTIAL
              </span>
              <span className="relative font-mono text-[9px] text-[var(--text-dim)] uppercase mt-0.5">
                ID: {cert.credentialId}
              </span>
            </div>
          )}

          {/* Floating Glass Issuer Badge */}
          <div className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface)]/90 backdrop-blur-md border border-white/15 shadow-md">
            <IssuerIcon size={13} style={{ color: cert.issuerColor }} />
            <span className="font-mono text-[11px] font-semibold text-white tracking-wide">
              {cert.issuer}
            </span>
          </div>

          {/* Subtle click to zoom hint pill on hover */}
          <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm border border-white/10 font-mono text-[10px] text-zinc-300">
            Click to view
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-4 space-y-2">
          {/* Title */}
          <h3 className="font-display text-[20px] font-bold text-white tracking-tight leading-snug group-hover:text-[#FFB020] transition-colors duration-200 line-clamp-1">
            {cert.title}
          </h3>

          {/* Issuer + Date in mono muted */}
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)]">
            <span>{cert.issuer}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} className="text-zinc-500" />
              {cert.date}
            </span>
          </div>

          {/* Short Skill Tags Row (max 3 chips) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px] px-2.5 py-0.5 rounded-[8px] bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text-muted)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between">
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            try { playUISound("click"); } catch {}
          }}
          className="group/link inline-flex items-center gap-1 font-mono text-xs font-semibold text-[var(--accent)] hover:text-white transition-colors"
        >
          <span>View Credential</span>
          <ArrowUpRight
            size={14}
            className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
          />
        </a>

        {cert.link && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#22C55E] font-mono text-[10px] font-medium">
            <CheckCircle2 size={11} />
            <span>Verified</span>
          </span>
        )}
      </div>
    </motion.article>
  );
}

// =============================================================================
// MAIN CERTIFICATIONS SECTION COMPONENT
// =============================================================================
export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState<CertCategory>("All");
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Filtered list
  const filteredCerts = CERTIFICATES_DATA.filter((cert) => {
    if (activeFilter === "All") return true;
    return cert.category === activeFilter;
  });

  const activeCert = selectedCertIndex !== null ? filteredCerts[selectedCertIndex] : null;

  // Handlers for Modal Navigation
  const closeModal = useCallback(() => {
    setSelectedCertIndex(null);
  }, []);

  const prevCert = useCallback(() => {
    if (filteredCerts.length === 0) return;
    try { playUISound("click"); } catch {}
    setSelectedCertIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : filteredCerts.length - 1
    );
  }, [filteredCerts.length]);

  const nextCert = useCallback(() => {
    if (filteredCerts.length === 0) return;
    try { playUISound("click"); } catch {}
    setSelectedCertIndex((prev) =>
      prev !== null && prev < filteredCerts.length - 1 ? prev + 1 : 0
    );
  }, [filteredCerts.length]);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (selectedCertIndex === null) return;

    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        prevCert();
      } else if (e.key === "ArrowRight") {
        nextCert();
      } else if (e.key === "Tab") {
        // Simple focus trap inside modal
        if (!modalRef.current) return;
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCertIndex, closeModal, prevCert, nextCert]);

  return (
    <section
      id="certifications"
      aria-label="Verified Credentials & Certifications"
      className="relative py-20 lg:py-[120px] w-full bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* =================================================================== */}
        {/* 1. SECTION HEADER (REVEAL)                                          */}
        {/* =================================================================== */}
        <motion.header
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 lg:mb-12 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
              ● 05 / CERTIFICATES
            </span>
          </div>

          {/* H2 Title */}
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)]">
            Verified credentials
          </h2>

          {/* Description line */}
          <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-xl mt-3.5">
            Formal validations, specialization programs, and technical certifications earned across full-stack engineering and computer science.
          </p>
        </motion.header>

        {/* =================================================================== */}
        {/* 2. CATEGORY FILTER WITH ANIMATED LAYOUTID PILL                      */}
        {/* =================================================================== */}
        <div className="flex flex-wrap items-center gap-2 mb-8 select-none">
          {CATEGORIES.map((category) => {
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
                {/* Sliding LayoutId Pill Background */}
                {isActive && (
                  <motion.div
                    layoutId="cert-filter-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] shadow-[0_0_20px_rgba(255,122,26,0.35)]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 3. RESPONSIVE GRID (3 COLS DESKTOP, 2 TABLET, 1 MOBILE)             */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCerts.length > 0 ? (
              filteredCerts.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  onClick={() => {
                    try { playUISound("click"); } catch {}
                    setSelectedCertIndex(index);
                  }}
                />
              ))
            ) : (
              /* Clean Empty State for In-Progress Categories */
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-16 px-6 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--text-dim)] mb-3">
                  <Award size={24} />
                </div>
                <p className="font-display font-medium text-white text-base">
                  No credentials in {activeFilter} currently
                </p>
                <p className="font-sans text-xs text-[var(--text-muted)] mt-1 max-w-sm">
                  Active cloud coursework and architecture certifications are currently in progress.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 4. LIGHTBOX MODAL (SCALE-IN 0.95 -> 1, ARROWS, FOCUS TRAP, KEYBOARD) */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeModal}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
            role="dialog"
            aria-modal="true"
            aria-label={`${activeCert.title} credential view`}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[var(--surface)] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="h-14 px-5 sm:px-6 bg-[var(--surface-2)] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--accent)] font-bold">
                    0{selectedCertIndex! + 1} / 0{filteredCerts.length}
                  </span>
                  <span className="text-white/20">|</span>
                  <div className="flex items-center gap-2">
                    {React.createElement(activeCert.issuerIcon, {
                      size: 14,
                      style: { color: activeCert.issuerColor },
                    })}
                    <span className="font-mono text-xs text-white font-medium">
                      {activeCert.issuer}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  ref={closeBtnRef}
                  onClick={closeModal}
                  aria-label="Close credential lightbox"
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body / Enlarged Visual */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black/90 flex items-center justify-center overflow-hidden">
                {activeCert.image ? (
                  <Image
                    src={activeCert.image}
                    alt={activeCert.title}
                    fill
                    sizes="(max-width: 1200px) 100vw, 1000px"
                    className="object-contain"
                  />
                ) : (
                  /* Enlarged High-Fidelity Certificate Sheet */
                  <div className="w-full h-full p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-gradient-to-b from-[#13131A] via-[#0E0E13] to-[#0A0A0E] relative">
                    <div
                      aria-hidden="true"
                      className="absolute inset-4 rounded-xl border border-dashed border-[#FF7A1A]/30 pointer-events-none"
                    />

                    <div className="w-20 h-20 rounded-2xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/25 flex items-center justify-center text-[#FF7A1A] mb-4 shadow-[0_0_30px_rgba(255,122,26,0.2)]">
                      <Award size={40} />
                    </div>

                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--accent)] font-semibold">
                      VERIFIED ACADEMIC CREDENTIAL
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight mt-2 max-w-lg">
                      {activeCert.title}
                    </h3>
                    <p className="font-sans text-sm text-[var(--text-muted)] mt-1.5">
                      Issued by <span className="text-white font-medium">{activeCert.issuer}</span> in {activeCert.date}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-zinc-300">
                      <ShieldCheck size={14} className="text-emerald-400" />
                      <span>AUTHENTICATED RECORD: {activeCert.credentialId}</span>
                    </div>
                  </div>
                )}

                {/* Left Arrow Navigation */}
                <button
                  onClick={prevCert}
                  aria-label="Previous certificate"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                >
                  <ChevronLeft size={22} />
                </button>

                {/* Right Arrow Navigation */}
                <button
                  onClick={nextCert}
                  aria-label="Next certificate"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Modal Footer / Caption */}
              <div className="p-5 sm:p-6 bg-[var(--surface-2)] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-lg text-white">
                    {activeCert.title}
                  </h4>
                  <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-dim)] mt-1">
                    <span>{activeCert.issuer}</span>
                    <span>•</span>
                    <span>{activeCert.date}</span>
                    <span>•</span>
                    <span className="text-emerald-400">ID: {activeCert.credentialId}</span>
                  </div>
                </div>

                <a
                  href={activeCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    try { playUISound("click"); } catch {}
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] text-[#07070A] font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,122,26,0.3)] hover:opacity-90 transition-opacity"
                >
                  <span>Verify on Official Portal</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
