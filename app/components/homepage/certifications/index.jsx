import { certifications } from "@/utils/data/certifications";
import GlowCard from "../../helper/glow-card";
import { FaDatabase, FaUsers, FaBullhorn, FaShieldAlt, FaCode, FaAward } from "react-icons/fa";

const iconMap = {
  data: <FaDatabase size={22} className="text-[#10b981]" />,
  leadership: <FaUsers size={22} className="text-[#8b5cf6]" />,
  outreach: <FaBullhorn size={22} className="text-[#f59e0b]" />,
  cybersecurity: <FaShieldAlt size={22} className="text-[#ef4444]" />,
  mern: <FaCode size={22} className="text-[#06b6d4]" />,
};

const skillMap = {
  1: ["Data Visualization", "Data Cleaning", "Insights Generation"],
  2: ["Leadership", "Teamwork", "Event Organizing"],
  3: ["Campaign Strategy", "Outreach", "Marketing"],
  4: ["Cyber Threats", "Network Vulnerability", "Defense Systems"],
  5: ["MongoDB", "Express.js", "React.js", "Node.js"]
};

export default function Certifications() {
  if (!certifications.length) {
    return null;
  }

  return (
    <section id="certifications" className="py-12 lg:py-24 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="space-y-2 mb-12 text-center relative z-10">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">// credentials_certifications</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Certifications & Achievements
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Mobile/Tablet Horizontal Carousel */}
        <div className="flex md:hidden overflow-x-auto gap-6 snap-x snap-mandatory pb-6 scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch] -mx-6 px-6 glow-container">
          {certifications.map((cert) => {
            const skills = skillMap[cert.id] || [];
            return (
              <div key={cert.id} className="w-[80vw] xs:w-[300px] shrink-0 snap-center flex">
                <GlowCard identifier={`certifications-${cert.id}`}>
                  <div className="p-6 flex flex-col h-full justify-between">
                    <div>
                      {/* Header: Icon + Institution */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-lg backdrop-blur-md">
                          {iconMap[cert.icon] || <FaAward size={22} className="text-[#10b981]" />}
                        </div>
                        <span className="text-[10px] font-semibold font-mono text-primary bg-primary-glow border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                          {cert.institution}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-3 tracking-wide leading-snug group-hover:text-primary transition-colors duration-300">
                        {cert.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted leading-relaxed mb-6 font-sans">
                        {cert.description}
                      </p>
                    </div>

                    {/* Skills/Tags Footer */}
                    <div className="border-t border-white/5 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md transition-all duration-300 hover:bg-primary-glow hover:border-primary/20 hover:text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </div>
            );
          })}
        </div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 glow-container">
          {certifications.map((cert) => {
            const skills = skillMap[cert.id] || [];
            return (
              <GlowCard key={cert.id} identifier={`certifications-${cert.id}`}>
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    {/* Header: Icon + Institution */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 shrink-0 shadow-lg backdrop-blur-md">
                        {iconMap[cert.icon] || <FaAward size={22} className="text-[#10b981]" />}
                      </div>
                      <span className="text-[10px] font-semibold font-mono text-primary bg-primary-glow border border-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                        {cert.institution}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide leading-snug group-hover:text-primary transition-colors duration-300">
                      {cert.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted leading-relaxed mb-6 font-sans">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills/Tags Footer */}
                  <div className="border-t border-white/5 pt-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md transition-all duration-300 hover:bg-primary-glow hover:border-primary/20 hover:text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
