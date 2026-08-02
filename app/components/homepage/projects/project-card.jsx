import * as React from 'react';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';

// Helper to assign nice HSL glow colors based on tool names
const getToolColor = (tool) => {
  const t = tool.toLowerCase();
  if (t.includes('react') || t.includes('vite')) return 'from-cyan-500/20 to-cyan-500/5 text-cyan-300 border-cyan-500/30';
  if (t.includes('node') || t.includes('express')) return 'from-emerald-500/20 to-emerald-500/5 text-emerald-300 border-emerald-500/30';
  if (t.includes('supabase') || t.includes('render')) return 'from-amber-500/20 to-amber-500/5 text-amber-300 border-amber-500/30';
  if (t.includes('python') || t.includes('typescript')) return 'from-blue-500/20 to-blue-500/5 text-blue-300 border-blue-500/30';
  if (t.includes('css') || t.includes('tailwind')) return 'from-pink-500/20 to-pink-500/5 text-pink-300 border-pink-500/30';
  return 'from-slate-500/20 to-slate-500/5 text-slate-300 border-slate-500/30';
};

export default function ProjectCard({ project }) {
  const { name, description, tools, role, code, demo } = project;

  return (
    <div className="glass-card rounded-xl overflow-hidden flex flex-col justify-between w-full h-full border border-white/5 bg-black/40 backdrop-blur-xl group hover:border-secondary/30 transition-all duration-300">
      {/* Top glowing bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-secondary/50 via-primary/50 to-secondary/50"></div>
      
      {/* Card Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500/60"></div>
          <div className="h-2 w-2 rounded-full bg-amber-500/60"></div>
          <div className="h-2 w-2 rounded-full bg-emerald-500/60"></div>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
          // deployment_ledger
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
              {name}
            </h3>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-white/10 text-muted shrink-0">
              {role}
            </span>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            {description}
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, idx) => (
            <span
              key={idx}
              className={`text-xs font-mono px-2.5 py-1 rounded-full border bg-gradient-to-r ${getToolColor(tool)}`}
            >
              {tool}
            </span>
          ))}
        </div>

        <hr className="border-white/5" />

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {code ? (
            <a
              href={code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-white transition duration-200"
            >
              <FaCode size={14} className="text-secondary" />
              <span>Source Code</span>
            </a>
          ) : (
            <span className="text-xs font-mono text-slate-600 line-through">Source Private</span>
          )}

          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary-glow border border-primary/20 hover:border-primary/50 text-xs font-mono text-primary hover:text-white transition-all duration-200"
            >
              <span>Live Preview</span>
              <FaExternalLinkAlt size={10} />
            </a>
          ) : (
            <span className="text-xs font-mono text-slate-600">Demo Offline</span>
          )}
        </div>
      </div>
    </div>
  );
}