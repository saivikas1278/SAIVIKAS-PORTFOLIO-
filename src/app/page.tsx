import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import ContactSection from "@/components/sections/contact-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CertificationsSection from "@/components/sections/certifications-section";
import SignatureCard from "@/components/sections/signature-card";
import profileData from "@/data/profile.json";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Redesigned Fixed Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Me Section */}
      <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 bg-zinc-950/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Header */}
            <div className="lg:col-span-4 space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="text-xs font-bold text-[#F97316] tracking-[0.2em] uppercase block">
                01 / IDENTITY
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-wide uppercase">
                About Me
              </h2>
              <div className="w-16 h-[2px] bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] mx-auto lg:mx-0" />
            </div>

            {/* Right Details */}
            <div className="lg:col-span-8 space-y-8 text-center lg:text-left">
              <div className="space-y-6 text-zinc-400 font-sans text-base sm:text-lg leading-relaxed">
                <p>
                  I&apos;m a dedicated Computer Science & Information Technology student with a deep passion for building interactive web applications, real-time bid managers, and database models. My engineering journey is built around structured problem solving and crafting highly visual, responsive layouts.
                </p>
                <p>
                  Beyond web structures, I am highly interested in playing cricket, coordinating local tournaments, tracking sports metrics, and working on competitive programming algorithms. I keep myself updated with cutting-edge libraries to build highly functional web systems.
                </p>
              </div>

              {/* Statistics Counters */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    8.0
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    B.Tech GPA
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    958
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    Intermediate Marks
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 block">
                    15,511
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-zinc-500 uppercase block mt-1">
                    EAPCET Rank
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Certifications Section */}
      <CertificationsSection />

      {/* Contact Section */}
      <ContactSection
        emailjsConfig={profileData.contact.emailjs}
        email={profileData.contact.email}
        phone={profileData.contact.phones[0]}
        githubUrl="https://github.com/saivikas1278"
        linkedinUrl="https://linkedin.com/in/sai-vikas"
      />

      {/* Interactive Signature Card */}
      <SignatureCard />

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5 bg-black text-zinc-600 font-sans text-xs">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} SAI VIKAS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
