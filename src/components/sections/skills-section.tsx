"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Code2,
  Server,
  Database,
  Radio,
  Wrench,
  Terminal,
} from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiFirebase,
  SiRedis,
  SiSocketdotio,
  SiGit,
  SiGithubactions,
  SiDocker,
  SiVercel,
  SiPostman,
  SiFigma,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiFramer,
} from "react-icons/si";
import { playUISound } from "@/utils/sound-manager";

type ProficiencyLevel = "daily" | "comfortable" | "learning";

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  brandColor: string;
  level: ProficiencyLevel;
}

interface SkillGroup {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skills: SkillItem[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Component hierarchies, virtual DOM optimization & modern design systems.",
    icon: Code2,
    skills: [
      { name: "React 19", icon: SiReact, brandColor: "#61DAFB", level: "daily" },
      { name: "Next.js 15", icon: SiNextdotjs, brandColor: "#FFFFFF", level: "daily" },
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6", level: "daily" },
      { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#06B6D4", level: "daily" },
      { name: "Framer Motion", icon: SiFramer, brandColor: "#0055FF", level: "comfortable" },
      { name: "HTML5 / CSS3", icon: SiHtml5, brandColor: "#E34F26", level: "daily" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Event-driven services, RESTful endpoints & secure session handling.",
    icon: Server,
    skills: [
      { name: "Node.js", icon: SiNodedotjs, brandColor: "#5FA04E", level: "daily" },
      { name: "Express.js", icon: SiExpress, brandColor: "#FFFFFF", level: "daily" },
      { name: "REST APIs", icon: Server, brandColor: "#FF7A1A", level: "daily" },
      { name: "JWT Auth", icon: Code2, brandColor: "#FFB020", level: "comfortable" },
      { name: "Webhooks", icon: Radio, brandColor: "#22C55E", level: "comfortable" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Document models, relational schemas & low-latency caching layers.",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: SiMongodb, brandColor: "#47A248", level: "daily" },
      { name: "PostgreSQL", icon: SiPostgresql, brandColor: "#4169E1", level: "comfortable" },
      { name: "Firebase", icon: SiFirebase, brandColor: "#FFCA28", level: "comfortable" },
      { name: "Redis", icon: SiRedis, brandColor: "#DC382D", level: "learning" },
    ],
  },
  {
    id: "realtime-devops",
    title: "Real-time & DevOps",
    description: "Persistent bid pipes, containerization & automated CI/CD deployments.",
    icon: Radio,
    skills: [
      { name: "WebSockets", icon: Radio, brandColor: "#FF7A1A", level: "daily" },
      { name: "Socket.io", icon: SiSocketdotio, brandColor: "#FFFFFF", level: "daily" },
      { name: "Git & GitHub", icon: SiGit, brandColor: "#F05032", level: "daily" },
      { name: "CI/CD Actions", icon: SiGithubactions, brandColor: "#2088FF", level: "comfortable" },
      { name: "Docker", icon: SiDocker, brandColor: "#2496ED", level: "learning" },
      { name: "Vercel", icon: SiVercel, brandColor: "#FFFFFF", level: "daily" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    description: "API testing clients, UI wireframing & package management tooling.",
    icon: Wrench,
    skills: [
      { name: "VS Code", icon: Code2, brandColor: "#007ACC", level: "daily" },
      { name: "Postman", icon: SiPostman, brandColor: "#FF6C37", level: "daily" },
      { name: "Figma", icon: SiFigma, brandColor: "#F24E1E", level: "comfortable" },
      { name: "Linux CLI", icon: Terminal, brandColor: "#4EAA25", level: "comfortable" },
    ],
  },
  {
    id: "languages",
    title: "Languages",
    description: "Strict typed scripting, system programming & competitive algorithms.",
    icon: Terminal,
    skills: [
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6", level: "daily" },
      { name: "JavaScript", icon: SiJavascript, brandColor: "#F7DF1E", level: "daily" },
      { name: "Python", icon: SiPython, brandColor: "#3776AB", level: "comfortable" },
      { name: "C / C++", icon: SiCplusplus, brandColor: "#00599C", level: "comfortable" },
    ],
  },
];

// Marquee Logo Items (Rows 1 & 2)
const MARQUEE_ROW_1 = [
  { name: "React 19", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js 15", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#FFFFFF" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
];

const MARQUEE_ROW_2 = [
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
];

export default function SkillsSection() {
  const [hoveredChip, setHoveredChip] = useState<string | null>(null);

  return (
    <section
      id="skills"
      aria-label="Technical Skills & Stack"
      className="relative py-20 lg:py-[120px] w-full bg-[var(--bg)] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        {/* =================================================================== */}
        {/* 1. SECTION HEADER                                                   */}
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
              ● 04 / SKILLS
            </span>
          </div>

          {/* H2 Title */}
          <h2 className="font-display font-semibold text-[clamp(2rem,4vw,3.25rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)]">
            Tools I build with
          </h2>

          {/* Description line & Global Proficiency Legend */}
          <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-3.5">
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-xl">
              Core technologies, architectural frameworks, and production tools I leverage to build resilient systems.
            </p>

            {/* Proficiency Dots Legend */}
            <div className="inline-flex items-center gap-4 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] font-mono text-[11px] text-[var(--text-dim)] select-none shadow-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-zinc-300">Daily use</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7A1A]" />
                <span className="text-zinc-300">Comfortable</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span className="text-zinc-300">Learning</span>
              </span>
            </div>
          </div>
        </motion.header>

        {/* =================================================================== */}
        {/* 2. TOP ELEMENT: TWO-ROW INFINITE MARQUEE WITH FADE MASKS            */}
        {/* =================================================================== */}
        <div className="relative w-full my-8 py-3 overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          {/* Row 1 (Scrolls Left at 40s) */}
          <div className="anim-marquee-left flex items-center gap-4 mb-3">
            {[...MARQUEE_ROW_1, ...MARQUEE_ROW_1].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r1-${item.name}-${idx}`}
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-white/20 transition-all duration-300 shrink-0 cursor-default"
                >
                  <Icon
                    size={16}
                    className="filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: item.color }}
                  />
                  <span className="font-mono text-xs text-[var(--text-dim)] group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Row 2 (Scrolls Right at 40s) */}
          <div className="anim-marquee-right flex items-center gap-4">
            {[...MARQUEE_ROW_2, ...MARQUEE_ROW_2].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={`r2-${item.name}-${idx}`}
                  className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-white/20 transition-all duration-300 shrink-0 cursor-default"
                >
                  <Icon
                    size={16}
                    className="filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: item.color }}
                  />
                  <span className="font-mono text-xs text-[var(--text-dim)] group-hover:text-white transition-colors duration-200">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. 3-COLUMN BENTO GRID OF GROUPED CARDS                             */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
          {SKILL_GROUPS.map((group, groupIdx) => {
            const GroupIcon = group.icon;

            return (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: groupIdx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 overflow-hidden"
              >
                {/* Card Top: 40px Icon Square + Group Title & One-line Description */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {/* 40px Icon Square */}
                    <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] group-hover:scale-105 transition-transform duration-300 shrink-0">
                      <GroupIcon size={20} />
                    </div>

                    <span className="font-mono text-[11px] text-[var(--text-dim)] uppercase tracking-wider">
                      0{groupIdx + 1} //
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    {group.title}
                  </h3>
                  <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed mt-1 line-clamp-2">
                    {group.description}
                  </p>

                  {/* Subtle 3-dot proficiency mini legend under group label */}
                  <div className="flex items-center gap-3 pt-3 font-mono text-[10px] text-[var(--text-dim)] select-none">
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
                      <span>Daily</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A1A]" />
                      <span>Comfortable</span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <span>Learning</span>
                    </span>
                  </div>
                </div>

                {/* Skill Chips with Icon + Name + Dot + Hover Brand Color & Lift */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {group.skills.map((skill, chipIdx) => {
                    const SkillIcon = skill.icon;
                    const chipKey = `${group.id}-${skill.name}`;
                    const isHovered = hoveredChip === chipKey;

                    // Dot color according to level
                    let dotBg = "bg-[#22C55E]";
                    if (skill.level === "comfortable") dotBg = "bg-[#FF7A1A]";
                    if (skill.level === "learning") dotBg = "bg-[#38BDF8]";

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.92 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.12 + chipIdx * 0.03,
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onMouseEnter={() => {
                          setHoveredChip(chipKey);
                          try { playUISound("hover"); } catch {}
                        }}
                        onMouseLeave={() => setHoveredChip(null)}
                        style={{
                          transform: isHovered ? "translateY(-2px)" : "translateY(0px)",
                          borderColor: isHovered ? "var(--accent)" : undefined,
                          backgroundColor: isHovered ? "rgba(255, 122, 26, 0.08)" : undefined,
                        }}
                        className="group/chip inline-flex items-center gap-2 px-3 py-2 rounded-[12px] bg-[var(--surface-2)] border border-[var(--border)] transition-all duration-200 select-none cursor-default"
                      >
                        {/* Skill Logo */}
                        <SkillIcon
                          size={15}
                          className="transition-colors duration-200 shrink-0"
                          style={{
                            color: isHovered ? skill.brandColor : "#71717A",
                          }}
                        />

                        {/* Skill Name */}
                        <span className="font-sans text-xs font-medium text-[var(--text)] group-hover/chip:text-white transition-colors duration-200">
                          {skill.name}
                        </span>

                        {/* Tiny Proficiency Dot */}
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${dotBg} shrink-0 opacity-80 group-hover/chip:opacity-100 transition-opacity`}
                          title={`Proficiency: ${skill.level}`}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
