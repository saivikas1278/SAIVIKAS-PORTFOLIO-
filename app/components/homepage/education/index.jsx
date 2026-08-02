import { educations } from "@/utils/data/educations";
import { FaGraduationCap } from "react-icons/fa";
import studyLottie from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

export default function Education() {
  return (
    <section id="education" className="py-12 lg:py-24 relative hidden md:block">
      <div className="space-y-2 mb-12 text-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-widest">// academic_credentials</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Education History
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Side: Timeline Cards */}
        <div className="lg:col-span-7 order-1">
          <div className="flex flex-col gap-6 glow-container">
            {educations.map(edu => (
              <GlowCard key={edu.id} identifier={`education-${edu.id}`}>
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
        </div>

        {/* Right Side: Lottie Animation */}
        <div className="lg:col-span-5 flex justify-center items-center order-2">
          <div className="w-full max-w-sm glass-card p-6 rounded-xl relative overflow-hidden bg-black/20">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
            <AnimationLottie animationPath={studyLottie} />
          </div>
        </div>
      </div>
    </section>
  );
}