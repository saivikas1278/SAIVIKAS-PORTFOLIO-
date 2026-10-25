"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/hero-section";
import ContactSection from "@/components/sections/contact-section";
import SkillsSection from "@/components/sections/skills-section";
import ProjectsSection from "@/components/sections/projects-section";
import CertificationsSection from "@/components/sections/certifications-section";
import SignatureCard from "@/components/sections/signature-card";
import profileData from "@/data/profile.json";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];


  return (
    <div className="relative min-h-screen selection:bg-[#F59E0B]/30 selection:text-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-black/85 backdrop-blur-md border-b border-[#F59E0B]/15 z-50">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-8 md:px-12 lg:px-16 flex items-center justify-between relative">
          {/* Brand Logo */}
          <a href="#home" className="font-display font-black text-lg tracking-wider text-white">
            <span className="inline-block border border-[#F97316]/50 px-2.5 py-1 rounded bg-[#F97316]/5 hover:shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all">
              SV
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-semibold text-xs uppercase tracking-widest text-zinc-400 hover:text-[#F59E0B] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* HIRE ME Button (Desktop) */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg text-xs font-bold tracking-wider text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              HIRE ME
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 border border-white/10 rounded-lg text-zinc-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-[#F59E0B]/15 px-6 py-6 flex flex-col gap-4 animate-fade-in">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-sans font-bold text-sm tracking-wide text-zinc-300 hover:text-[#F59E0B] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444]"
            >
              HIRE ME
            </a>
          </nav>
        )}
      </header>

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
