"use client";

import React from "react";
import { Calendar, ShieldCheck, ArrowRight } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image: string;
  link: string;
  logo: React.ReactNode;
  color: string;
}

const certificationsList: Certification[] = [
  {
    id: "01",
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    date: "March 2023",
    credentialId: "UC-12345",
    image: "Full-Stack Web Development Mastery",
    link: "#",
    color: "from-[#A435F0] to-[#8A2BE2]",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 md:w-11 md:h-11 text-[#A435F0]" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" className="opacity-20" />
        <path d="M16 8v3.5c0 2.48-1.52 4-4 4s-4-1.52-4-4V8h2v3.5c0 1.38.83 2 2 2s2-.62 2-2V8h2z" fill="currentColor" />
        <path d="M12 17.5l-2-2.5h4l-2 2.5z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "React - The Complete Guide",
    issuer: "Coursera",
    date: "September 2022",
    credentialId: "CR-67890",
    image: "React Hooks, Redux & Component Design",
    link: "#",
    color: "from-[#0056D2] to-[#00419E]",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 md:w-11 md:h-11 text-[#0056D2]" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="currentColor" className="opacity-20" />
        <path d="M12 6a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6 .68 0 1.33-.12 1.94-.33l-1.02-1.8A4.14 4.14 0 0 1 12 16a4 4 0 1 1 2.83-6.83l1.8-1.02A6 6 0 0 0 12 6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Python for Data Science",
    issuer: "edX",
    date: "January 2023",
    credentialId: "EDX-24680",
    image: "Structured Algorithms & Core Libraries",
    link: "#",
    color: "from-[#FF1E46] to-[#D6002A]",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="w-9 h-9 md:w-11 md:h-11 text-[#FF1E46]" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="20" x="2" y="2" rx="4" fill="currentColor" className="opacity-20" />
        <path d="M7 8h3v1.5H7V12h3.5v1.5H7v2.5h3.5v1.5H5V8h2zm5.5 0h2.5c1.38 0 2.5 1.12 2.5 2.5V13c0 1.38-1.12 2.5-2.5 2.5h-2.5V8zm2.5 6c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1h-1v4h1zm4 1.5l1.8-2.5 1.8 2.5h1.9l-2.8-4 2.8-4h-1.9l-1.8 2.5-1.8-2.5H16l2.8 4-2.8 4h1.9z" fill="currentColor" />
      </svg>
    ),
  },
];

// Triplicate certifications programmatically so the loop scrolls seamlessly without gaps (K = 3)
const duplicatedCertifications = [
  ...certificationsList,
  ...certificationsList,
  ...certificationsList,
];

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="relative py-24 sm:py-32 bg-black border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic inline styles for seamless rightward infinite ticker scroll (translate -33.333% to 0 for triplication) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee-right {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 30s linear infinite;
        }
        .marquee-container:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      ` }} />

      {/* Background Soft Spots */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#F97316]/3 to-[#EF4444]/2 filter blur-[120px] pointer-events-none z-0" />

      {/* Left/Right fading viewport masks */}
      <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-36 lg:w-64 bg-gradient-to-r from-black to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-36 lg:w-64 bg-gradient-to-l from-black to-transparent pointer-events-none z-20" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10 mb-16 text-center flex flex-col items-center">
        <span className="text-xs font-black text-[#F97316] tracking-[0.25em] uppercase block bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_12px_rgba(249,115,22,0.15)] px-4 py-1.5 rounded-full mb-6">
          04 / ACHIEVEMENTS
        </span>
        <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
          Certifications
        </h2>
        {/* signature coral orange accent underline */}
        <div className="h-[3px] w-24 sm:w-32 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] rounded-full mt-4 shadow-[0_0_10px_rgba(249,115,22,0.5)] mb-6" />
        <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-400 max-w-lg">
          An interactive infinite-scrolling gallery of professional credentials, scrolling from left to right. Hover over the track to pause.
        </p>
      </div>

      {/* Infinite Left-to-Right Scrolling Ticker Track */}
      <div className="relative w-full overflow-hidden py-4 z-10 marquee-container">
        <div className="animate-marquee-right flex gap-6 md:gap-8 px-2">
          {duplicatedCertifications.map((cert, index) => (
            <div
              key={`${cert.id}-${index}`}
              className="group relative w-[280px] sm:w-[340px] md:w-[420px] rounded-2xl p-[1px] bg-white/5 hover:bg-gradient-to-br hover:from-[#F59E0B]/30 hover:via-[#F97316]/20 hover:to-[#EF4444]/30 backdrop-blur-md transition-all duration-500 hover:shadow-[0_15px_30px_rgba(249,115,22,0.15)] hover:scale-105 cursor-pointer flex-shrink-0"
            >
              {/* Matte glassmorphic card body */}
              <div className="relative rounded-[15px] p-6 sm:p-7 md:p-8 bg-[#0A0A0C] flex flex-col justify-between min-h-[210px] sm:min-h-[240px] md:min-h-[280px] overflow-hidden">
                
                {/* Parallax low-contrast outline background index */}
                <span className="absolute -top-10 -left-6 font-display font-black text-7xl md:text-8xl tracking-widest text-[#F97316]/5 uppercase pointer-events-none select-none z-0 group-hover:text-[#F97316]/10 transition-all duration-700">
                  {cert.id}
                </span>

                {/* Ambient spotlight backglow inside card */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] group-hover:bg-[#F97316]/5 rounded-full filter blur-xl pointer-events-none transition-colors duration-500" />

                {/* Upper row: title, issuer, and logo */}
                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-[#FDE68A] transition-colors duration-300">
                        {cert.issuer}
                      </span>
                      <h3 className="font-display font-black text-xl md:text-2xl text-white tracking-wide leading-tight pt-1">
                        {cert.title}
                      </h3>
                    </div>

                    {/* Issuer Logo cleanly in top right corner */}
                    <div className="shrink-0 p-2 rounded-xl bg-zinc-900 border border-white/5 opacity-55 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 shadow-md">
                      {cert.logo}
                    </div>
                  </div>

                  {/* Certification visual description visual block */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-[11px] sm:text-xs font-mono italic text-zinc-400 truncate tracking-wide group-hover:text-zinc-300 transition-colors">
                    {cert.image}
                  </div>
                </div>

                {/* Lower row: dates, IDs, verify link */}
                <div className="relative z-10 pt-4 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-zinc-600 group-hover:text-[#F59E0B] transition-colors" />
                      <span className="font-semibold group-hover:text-zinc-400 transition-colors">{cert.date}</span>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-center gap-1 hidden sm:flex">
                        <ShieldCheck size={12} className="text-zinc-600 group-hover:text-[#EF4444] transition-colors" />
                        <span className="font-mono text-[9px] uppercase tracking-widest">
                          ID: {cert.credentialId}
                        </span>
                      </div>
                    )}
                  </div>

                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-1 font-bold uppercase tracking-widest text-[9px] text-zinc-500 group-hover:text-[#F97316] transition-colors group/link cursor-pointer"
                  >
                    VERIFY
                    <ArrowRight size={10} className="group-hover/link:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

