import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
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

      {/* Redesigned Bento About Section */}
      <AboutSection />

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
