import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-12 lg:py-24 relative">
      {/* Decorative vertical badge */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-10 select-none">
        <span className="text-xs font-mono tracking-widest text-slate-500 uppercase rotate-90 my-8">
          // core_specifications
        </span>
        <div className="h-24 w-[1px] bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Side: Bio & Avatar */}
        <div className="lg:col-span-7 space-y-6 order-1">
          <div className="space-y-2">
            <span className="text-xs font-mono text-primary uppercase tracking-widest">// bios_module</span>
            <h2 className="text-3xl font-extrabold text-white md:text-4xl">
              Who I am
            </h2>
          </div>
          
          <div className="space-y-4 text-muted text-base md:text-lg leading-relaxed">
            <p>
              I am a student at <strong className="text-white font-medium">SRKR Engineering College</strong> pursuing my B.Tech in Computer Science and Information Technology (2023 - 2027). I specialize in architecting complete web solutions, bridging robust backend engines with modern frontend layouts.
            </p>
            <p>
              My approach focuses on writing modular, self-documenting code and leveraging automated scheduling tools. As a natural technical generalist, I love coordinating projects and translating complex problems into clean, high-performance web systems.
            </p>
          </div>
        </div>

        {/* Right Side: Visual Spec Card */}
        <div className="lg:col-span-5 flex justify-center order-2 w-full">
          <div className="glass-card rounded-xl p-6 w-full max-w-md space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-secondary/40 shrink-0">
                <Image
                  src={personalData.profile || "/profile.png"}
                  alt={personalData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">{personalData.name}</h3>
                <span className="text-xs font-mono text-muted">{personalData.designation}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="space-y-4 font-mono text-xs text-muted">
              <div className="flex justify-between items-center">
                <span>[academic_branch]</span>
                <span className="text-white">CS & IT</span>
              </div>
              <div className="flex justify-between items-center">
                <span>[current_gpa_status]</span>
                <span className="text-primary font-bold">Excellent</span>
              </div>
              <div className="flex justify-between items-center">
                <span>[deployment_focus]</span>
                <span className="text-white">Full-Stack Apps</span>
              </div>
              <div className="flex justify-between items-center">
                <span>[collaboration_style]</span>
                <span className="text-secondary font-bold">Team Coordinator</span>
              </div>
              <div className="flex justify-between items-center">
                <span>[location_ping]</span>
                <span className="text-white text-right">Bhimavaram, AP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}