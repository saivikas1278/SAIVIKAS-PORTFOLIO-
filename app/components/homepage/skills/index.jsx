"use client";

import { useState } from "react";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { RiLayoutLine, RiServerLine, RiTerminalLine } from "react-icons/ri";

const CODE_SNIPPETS = {
  React: {
    file: "Dashboard.jsx",
    lang: "javascript",
    code: `import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  
  useEffect(() => {
    fetch('/api/analytics/realtime')
      .then(res => res.json())
      .then(setMetrics);
  }, []);

  return (
    <div className="glass-card p-6">
      <h2 className="text-primary">Glow Metrics</h2>
      <ActivityChart data={metrics} />
    </div>
  );
}`
  },
  Tailwind: {
    file: "tailwind.config.css",
    lang: "css",
    code: `/* Tailwind Glassmorphic Token */
@utility glass-panel {
  backdrop-filter: blur(16px);
  background: rgba(11, 15, 25, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 
    0 8px 32px 0 rgba(0, 0, 0, 0.37),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}`
  },
  "Node JS": {
    file: "server.js",
    lang: "javascript",
    code: `const express = require('express');
const app = express();

app.get('/api/v1/health', async (req, res) => {
  try {
    const dbActive = await checkDbStatus();
    res.status(200).json({
      status: 'operational',
      latency: \`\${Date.now() - req.startTime}ms\`,
      database: dbActive
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`
  },
  Python: {
    file: "data_cleaner.py",
    lang: "python",
    code: `import numpy as np
import pandas as pd

def filter_anomalies(data_path: str) -> dict:
    # Clean dataset using standard deviations
    df = pd.read_csv(data_path)
    z_scores = np.abs((df - df.mean()) / df.std())
    clean_df = df[(z_scores < 3).all(axis=1)]
    return {
        "rows_retained": len(clean_df),
        "mean_latency": clean_df["latency"].mean()
    }`
  },
  Java: {
    file: "UserController.java",
    lang: "java",
    code: `@RestController
@RequestMapping("/api/users")
public class UserController {
    
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(user -> ResponseEntity.ok().body(new UserDTO(user)))
            .orElse(ResponseEntity.notFound().build());
    }
}`
  },
  Git: {
    file: "publish.sh",
    lang: "bash",
    code: `# Create dynamic branch workflow
$ git checkout -b feature/cyber-skills
Switched to a new branch 'feature/cyber-skills'

$ git add app/components/skills/
$ git commit -m "feat: design bento skills playground"
[feature/cyber-skills 9f12b7d] feat: skills playground

$ git push origin feature/cyber-skills`
  },
  Figma: {
    file: "wireframe_spec.json",
    lang: "json",
    code: `{
  "layer": "Bento Cards Grid",
  "layoutConstraints": {
    "horizontal": "SCALE",
    "vertical": "TOP"
  },
  "effects": [
    { "type": "BACKGROUND_BLUR", "radius": 24 },
    { "type": "INNER_SHADOW", "color": "#10b981", "opacity": 0.12 }
  ],
  "autoLayout": "Horizontal-Spacing-24"
}`
  },
  Canva: {
    file: "design_system.theme",
    lang: "json",
    code: `{
  "branding_name": "Sai Vikas Identity",
  "palette": {
    "primary": "#10b981",
    "secondary": "#8b5cf6",
    "background": "#030712",
    "accent": "#06b6d4"
  },
  "typography": {
    "headings": "Outfit-ExtraBold",
    "paragraphs": "PlusJakartaSans-Medium"
  }
}`
  }
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState("React");

  const frontendSkills = ["React", "Tailwind", "Figma", "Canva"];
  const backendSkills = ["Node JS", "Python", "Java", "Git"];

  const currentSnippet = CODE_SNIPPETS[hoveredSkill] || CODE_SNIPPETS["React"];

  return (
    <section id="skills" className="py-12 lg:py-24 relative">
      {/* Accent Background Glows */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-secondary-glow rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-primary-glow rounded-full filter blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="space-y-2 mb-12 text-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-widest">// technical_capabilities</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Skills & Stack Playground
        </h2>
        <p className="text-xs text-muted font-mono tracking-wide max-w-md mx-auto">
          Hover over any skill to load live code execution simulations in the terminal panel.
        </p>
      </div>

      {/* Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        
        {/* Bento Card 1: Frontend & Visual Design */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 bg-black/40 backdrop-blur-xl group hover:border-primary/20 transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded bg-primary-glow text-primary group-hover:scale-110 duration-300">
                <RiLayoutLine size={20} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors duration-200">
                Frontend & Design
              </h3>
            </div>
            <p className="text-xs text-muted mb-6 font-mono leading-relaxed">
              Designing fluid, responsive interfaces and vector components.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
            {frontendSkills.map((skill) => {
              const img = skillsImage(skill);
              const isSelected = hoveredSkill === skill;
              return (
                <div
                  key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? "bg-primary-glow/10 border-primary shadow-lg shadow-primary-glow/20 scale-105"
                      : "bg-white/5 border-white/5 hover:border-primary/30 hover:bg-white/10"
                  }`}
                >
                  <div className="h-10 w-10 relative flex items-center justify-center mb-2">
                    {img?.src ? (
                      <Image
                        src={img.src}
                        alt={skill}
                        width={38}
                        height={38}
                        className="object-contain max-h-full max-w-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-400">
                        {skill.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bento Card 2: Backend, Systems & Logic */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between border border-white/5 bg-black/40 backdrop-blur-xl group hover:border-secondary/20 transition-all duration-300">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded bg-secondary-glow text-secondary group-hover:scale-110 duration-300">
                <RiServerLine size={20} />
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-secondary transition-colors duration-200">
                Backend & Systems
              </h3>
            </div>
            <p className="text-xs text-muted mb-6 font-mono leading-relaxed">
              Writing scalable backend APIs, processing scripts, and versioning.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5">
            {backendSkills.map((skill) => {
              const img = skillsImage(skill);
              const isSelected = hoveredSkill === skill;
              return (
                <div
                  key={skill}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onClick={() => setHoveredSkill(skill)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer border transition-all duration-200 ${
                    isSelected
                      ? "bg-secondary-glow/10 border-secondary shadow-lg shadow-secondary-glow/20 scale-105"
                      : "bg-white/5 border-white/5 hover:border-secondary/30 hover:bg-white/10"
                  }`}
                >
                  <div className="h-10 w-10 relative flex items-center justify-center mb-2">
                    {img?.src ? (
                      <Image
                        src={img.src}
                        alt={skill}
                        width={38}
                        height={38}
                        className="object-contain max-h-full max-w-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-400">
                        {skill.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-white tracking-wide">
                    {skill}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bento Card 3: Live Code Sandbox/Terminal */}
        <div className="glass-card rounded-2xl border border-white/5 bg-black/50 backdrop-blur-xl flex flex-col overflow-hidden h-full min-h-[320px]">
          {/* Header Panel */}
          <div className="px-5 py-3 border-b border-white/5 flex items-center justify-between bg-black/20">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
            </div>
            
            {/* Display hovered file name */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted pl-4">
              <RiTerminalLine className="text-primary text-xs" />
              <span>{currentSnippet.file}</span>
            </div>

            <div className="text-[10px] font-mono text-slate-600 uppercase select-none">
              sandbox_v1
            </div>
          </div>

          {/* Interactive Code Preview Block */}
          <div className="p-5 flex-1 font-mono text-xs overflow-auto bg-black/40 text-slate-300 scrollbar-thin">
            <pre className="relative leading-relaxed select-text">
              <code className="block whitespace-pre">
                {currentSnippet.code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                    <span className="text-slate-600 select-none w-6 inline-block text-right pr-2">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}