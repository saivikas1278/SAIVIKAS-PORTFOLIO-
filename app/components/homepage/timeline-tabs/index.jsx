"use client";

import { useState, useEffect } from "react";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";
import GlowCard from "../../helper/glow-card";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState("experience");

  // Sync tab active state with hash clicks on mobile
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#education") {
        setActiveTab("education");
      } else if (window.location.hash === "#experience") {
        setActiveTab("experience");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    // Run once on load
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section className="py-12 relative">
      {/* Scroll targets for menu drawer anchors */}
      <div id="experience" className="absolute -top-24"></div>
      <div id="education" className="absolute -top-24"></div>

      {/* Header */}
      <div className="space-y-2 mb-8 text-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-widest">// professional_chronology</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          History & Milestones
        </h2>
      </div>

      {/* Tabs switcher pill */}
      <div className="flex justify-center mb-8">
        <div className="flex p-1 bg-black/40 border border-white/10 rounded-full backdrop-blur-md">
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "experience"
                ? "bg-gradient-to-r from-secondary/80 to-primary/80 text-white shadow-lg shadow-primary-glow/20"
                : "text-muted hover:text-white"
            }`}
          >
            <BsPersonWorkspace size={13} />
            <span>Milestones</span>
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "education"
                ? "bg-gradient-to-r from-secondary/80 to-primary/80 text-white shadow-lg shadow-primary-glow/20"
                : "text-muted hover:text-white"
            }`}
          >
            <FaGraduationCap size={15} />
            <span>Education</span>
          </button>
        </div>
      </div>

      {/* Timeline Cards rendering */}
      <div className="flex flex-col gap-6 glow-container">
        {activeTab === "experience" &&
          experiences.map((item) => (
            <GlowCard key={item.id} identifier={`timeline-experience-${item.id}`}>
              <div className="p-6 relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono text-primary bg-primary-glow border border-primary/20 px-2.5 py-0.5 rounded-full">
                    {item.duration}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    ID: 00{item.id}
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-secondary p-3 rounded-lg bg-white/5 shrink-0 group-hover:scale-110 duration-300">
                    <BsPersonWorkspace size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}

        {activeTab === "education" &&
          educations.map((edu) => (
            <GlowCard key={edu.id} identifier={`timeline-education-${edu.id}`}>
              <div className="p-6 relative overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-mono text-primary bg-primary-glow border border-primary/20 px-2.5 py-0.5 rounded-full">
                    {edu.duration}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    STATUS: COMPLETED / ONGOING
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-primary p-3 rounded-lg bg-white/5 shrink-0 group-hover:scale-110 duration-300">
                    <FaGraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {edu.title}
                    </h3>
                    <p className="text-sm text-muted">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
      </div>
    </section>
  );
}
