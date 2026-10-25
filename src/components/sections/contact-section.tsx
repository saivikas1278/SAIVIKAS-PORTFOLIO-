"use client";

import React from "react";
import { Mail, Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "./contact-form";

interface ContactSectionProps {
  emailjsConfig: {
    publicKey: string;
    serviceId: string;
    templateId: string;
  };
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
}

export default function ContactSection({
  emailjsConfig,
  email,
  phone,
  githubUrl,
  linkedinUrl,
}: ContactSectionProps) {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-black"
    >
      {/* Ambient background glows */}
      <div className="absolute top-[30%] -left-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#F59E0B]/5 filter blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] -right-[10%] w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-[#EF4444]/5 filter blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column: Heading, Subtitle, Contact details & Socials */}
          <div className="lg:col-span-5 space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div variants={itemVariants} className="space-y-4 w-full">
              <span className="text-xs font-black text-[#F97316] tracking-[0.25em] uppercase block">
                04 / ENGAGE
              </span>
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
                Let&apos;s Connect
              </h2>
              {/* Eye-catching gradient accent line */}
              <div className="h-[3px] w-24 sm:w-32 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EF4444] rounded-full mx-auto lg:mx-0 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="font-sans text-sm sm:text-base leading-relaxed text-zinc-400 max-w-md"
            >
              I&apos;m always open to discussing new freelance roles, sports app ideas,
              full-stack database integrations, or technical collaborations. Let&apos;s
              create something functional!
            </motion.p>

            {/* Direct Info List - Clean, Modern Cards with subtle glow */}
            <motion.div variants={itemVariants} className="space-y-4 w-full max-w-md">
              {/* Email Card */}
              <a
                href={`mailto:${email}`}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md transition-all duration-300 hover:border-[#F97316]/30 hover:bg-zinc-900/40 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)] block"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F97316] group-hover:scale-110 group-hover:border-[#F97316]/45 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.2)] transition-all duration-300 flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">
                    Email Me
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-300 group-hover:text-white transition-colors break-all">
                    {email}
                  </span>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="group flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-zinc-950/40 backdrop-blur-md transition-all duration-300 hover:border-[#F59E0B]/30 hover:bg-zinc-900/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] block"
              >
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 group-hover:border-[#F59E0B]/45 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300 flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase block">
                    Call Me
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-300 group-hover:text-white transition-colors">
                    {phone}
                  </span>
                </div>
              </a>
            </motion.div>

            {/* Social Icons with Smooth Hover Animations */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-4 pt-4 w-full"
            >
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#F59E0B]/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#EF4444]/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" rx="1" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column: High-Converting Form Card with Custom Glow */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 w-full"
          >
            <div className="relative rounded-3xl p-6 sm:p-8 border border-white/5 bg-zinc-950/40 backdrop-blur-md overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] group/card">
              {/* Internal Accent Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F59E0B]/10 rounded-full filter blur-2xl group-hover/card:bg-[#F59E0B]/15 transition-all duration-500 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#EF4444]/5 rounded-full filter blur-2xl group-hover/card:bg-[#EF4444]/8 transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Sparkles size={16} className="text-[#F97316] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                    Looking for a custom project?
                  </span>
                </div>
                
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                  Send a message and let&apos;s turn your ideas into a functional reality.
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Whether you need a sleek sports web portal, robust API integrations, or modern single-page applications, leave your contact details below.
                </p>

                {/* EmailJS integrated contact form */}
                <div className="pt-4 border-t border-white/5">
                  <ContactForm emailjsConfig={emailjsConfig} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
