import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CertificationsSection from "@/components/sections/certifications-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fixed Navbar with Scroll Spy & Morphing Mobile Menu */}
      <Navbar />

      {/* Hero Section with 3D Tilt Flagship Card */}
      <HeroSection />

      {/* Bento About Section */}
      <AboutSection />

      {/* Projects Section with Live Simulated Auction Mockup */}
      <ProjectsSection />

      {/* Skills Section with 60fps Marquee & Bento Cards */}
      <SkillsSection />

      {/* Certifications Section with Lightbox & Spotlight */}
      <CertificationsSection />

      {/* Contact Section with Floating-Label Form & Direct Cards */}
      <ContactSection />

      {/* Big CTA Band & 3-Column Footer */}
      <Footer />
    </div>
  );
}
