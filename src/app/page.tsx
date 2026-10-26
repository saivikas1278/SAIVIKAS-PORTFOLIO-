import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";

// Code-split below-the-fold sections for instant first-load LCP & FID
const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  {
    loading: () => <div className="py-20 min-h-[400px]" />,
  }
);

const SkillsSection = dynamic(
  () => import("@/components/sections/skills-section"),
  {
    loading: () => <div className="py-20 min-h-[400px]" />,
  }
);

const CertificationsSection = dynamic(
  () => import("@/components/sections/certifications-section"),
  {
    loading: () => <div className="py-20 min-h-[400px]" />,
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section"),
  {
    loading: () => <div className="py-20 min-h-[400px]" />,
  }
);

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="py-16 min-h-[250px]" />,
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed Navbar with Scroll Spy & Morphing Mobile Menu */}
      <Navbar />

      {/* Hero Section with 3D Tilt Flagship Card & Word-by-Word Reveal */}
      <HeroSection />

      {/* Bento About Section with Verified Academic Metrics */}
      <AboutSection />

      {/* Projects Section with Live Simulated Auction Mockup */}
      <ProjectsSection />

      {/* Skills Section with 60fps Keyframe Marquee & Bento Cards */}
      <SkillsSection />

      {/* Certifications Section with Lightbox Modal & Spotlight */}
      <CertificationsSection />

      {/* Contact Section with Floating-Label Form & Direct Cards */}
      <ContactSection />

      {/* Big CTA Band with Magnetic Button & 3-Column Footer */}
      <Footer />
    </main>
  );
}
