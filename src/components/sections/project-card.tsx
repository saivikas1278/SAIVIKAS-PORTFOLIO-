"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { playUISound } from "@/utils/sound-manager";

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
    className="opacity-75"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  url: string;
  mockup: React.ReactNode;
}

interface Project3DCardProps {
  project: ProjectData;
  index: number;
}

export default function Project3DCard({ project, index }: Project3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });

  // Normalized motion values (-0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural tilt feel
  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setGlarePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playUISound("hover");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-3xl p-[1px] bg-white/[0.08] hover:bg-gradient-to-br hover:from-[#F59E0B]/40 hover:via-[#F97316]/30 hover:to-[#EF4444]/40 transition-all duration-500 shadow-2xl hover:shadow-[0_25px_60px_rgba(249,115,22,0.18)] flex flex-col h-full bg-zinc-950/90 overflow-hidden"
      >
        {/* Dynamic Specular Glare Layer that follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 380px at ${glarePosition.x}px ${glarePosition.y}px, rgba(249, 115, 22, 0.15), transparent 75%)`,
          }}
        />

        {/* Ambient Corner Glows */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-[#F97316]/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#EF4444]/10 rounded-full filter blur-3xl pointer-events-none" />

        {/* Inner Card Content Container */}
        <div 
          className="relative rounded-[23px] bg-zinc-950/95 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between h-full z-10 space-y-6"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Header Row: Project ID, Title & Status */}
          <div 
            className="space-y-3"
            style={{ transform: "translateZ(30px)" }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-xs text-[#F97316] tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 shadow-[0_0_10px_rgba(249,115,22,0.12)]">
                PROJECT {project.id}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Featured
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FDE68A] transition-all duration-300">
              {project.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Interactive Mockup Console Floating with maximum 3D Z-Depth */}
          <div 
            className="w-full relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-zinc-900 group-hover:border-[#F97316]/30 transition-colors duration-300"
            style={{ transform: "translateZ(45px)" }}
          >
            {/* Top Browser Window Header */}
            <div className="w-full px-3.5 py-2.5 bg-zinc-900 border-b border-white/5 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 mx-4 py-0.5 rounded bg-black/50 border border-white/5 text-[9px] text-zinc-500 tracking-wider flex items-center justify-center gap-1 font-mono uppercase truncate">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {project.url}
              </div>
              <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase">3D PROJ</span>
            </div>

            {/* Embedded Live Simulation */}
            <div className="relative w-full">
              {project.mockup}
            </div>
          </div>

          {/* Tech Stack Pills Layer */}
          <div 
            className="flex flex-wrap gap-1.5 pt-1"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 group-hover:border-orange-500/40 group-hover:bg-orange-500/15 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link Buttons floating on high Z-plane */}
          <div 
            className="flex items-center gap-3 pt-2 w-full"
            style={{ transform: "translateZ(50px)" }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUISound("click")}
              onMouseEnter={() => playUISound("hover")}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest text-white border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <GithubIcon size={14} />
              GITHUB
            </a>
            <a
              href={project.demo}
              onClick={() => playUISound("click")}
              onMouseEnter={() => playUISound("hover")}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold tracking-widest text-white bg-gradient-to-r from-[#F97316] to-[#EF4444] hover:shadow-[0_0_20px_rgba(249,115,22,0.45)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink size={14} />
              DEMO
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
