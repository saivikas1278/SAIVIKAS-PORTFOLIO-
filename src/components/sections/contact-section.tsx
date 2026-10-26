"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { playUISound } from "@/utils/sound-manager";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Honeypot
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactSection() {
  // Contact info
  const email = "cheepusaivikas549@gmail.com";
  const phone = "+91 7989001874";
  const location = "Bhimavaram & Hyderabad, India · IST (UTC+5:30)";

  // Copy email feedback
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  // Track focused fields for floating label styles
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Handle Copy Email
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    try { playUISound("click"); } catch {}
    setTimeout(() => setCopied(false), 2500);
  };

  // Field validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      try { playUISound("click"); } catch {}
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setServerMessage("");
    try { playUISound("click"); } catch {}

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message.");
      }

      setSubmitStatus("success");
      setServerMessage(data.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        website: "",
      });
      setErrors({});
    } catch (err: unknown) {
      setSubmitStatus("error");
      const errObj = err as Error;
      setServerMessage(errObj.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact & Inquiries"
      className="relative py-20 lg:py-[120px] w-full bg-[var(--bg)] overflow-hidden"
    >
      {/* Background Soft Spots */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF7A1A]/5 filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF3D54]/5 filter blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 relative z-10">
        {/* =================================================================== */}
        {/* SECTION HEADER                                                      */}
        {/* =================================================================== */}
        <motion.header
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-16 flex flex-col items-start text-left"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-3 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
              ● 06 / CONTACT
            </span>
          </div>

          {/* Large Header */}
          <h2 className="font-display font-semibold text-[clamp(2.25rem,4.5vw,3.75rem)] tracking-[-0.03em] leading-[1.05] text-[var(--text)] max-w-2xl">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] bg-clip-text text-transparent">
              remarkable
            </span>{" "}
            together.
          </h2>

          <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-[1.7] max-w-xl mt-4">
            Whether you&apos;re looking for high-performance frontend architecture, real-time WebSocket systems, or an ambitious full-stack engineer to scale your team, my inbox is open.
          </p>
        </motion.header>

        {/* =================================================================== */}
        {/* 2-COLUMN CONTACT GRID                                               */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: 3 Contact Cards + Socials + Reply Line               */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            {/* 1. Email Card */}
            <div className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,122,26,0.12)]">
              <div className="flex items-center justify-between gap-4">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 min-w-0 flex-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A] group-hover:scale-105 transition-transform duration-300 shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-dim)] tracking-wider block">
                      EMAIL DIRECT
                    </span>
                    <span className="font-mono text-sm text-[var(--text)] group-hover:text-white transition-colors truncate block">
                      {email}
                    </span>
                  </div>
                </a>

                {/* Copy to Clipboard Button with Feedback */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    title="Copy email to clipboard"
                    className="relative px-3 py-2 min-h-[44px] rounded-lg bg-[var(--surface-2)] hover:bg-white/10 border border-[var(--border)] text-xs text-[var(--text-muted)] hover:text-white transition-all flex items-center gap-1.5 select-none"
                  >
                    {copied ? (
                      <>
                        <Check size={13} className="text-emerald-400" />
                        <span className="font-mono text-[11px] text-emerald-400 font-semibold">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span className="font-mono text-[11px]">Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}`}
                    aria-label="Send email"
                    className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Phone / WhatsApp Card */}
            <a
              href={`https://wa.me/917989001874`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,122,26,0.12)] flex items-center justify-between gap-4 block"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <Phone size={18} />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-dim)] tracking-wider block">
                    PHONE / WHATSAPP
                  </span>
                  <span className="font-mono text-sm text-[var(--text)] group-hover:text-white transition-colors">
                    {phone}
                  </span>
                </div>
              </div>

              <div className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </div>
            </a>

            {/* 3. Location Card */}
            <div className="group relative rounded-[20px] bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(255,122,26,0.12)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8] group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] uppercase font-bold text-[var(--text-dim)] tracking-wider block">
                    LOCATION / TIMEZONE
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-[var(--text)] group-hover:text-white transition-colors line-clamp-1">
                    {location}
                  </span>
                </div>
              </div>

              <div className="text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors shrink-0">
                <ArrowUpRight
                  size={18}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </div>
            </div>

            {/* Social Icon Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/saivikas1278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[#FF7A1A]/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,122,26,0.2)]"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="https://linkedin.com/in/sai-vikas"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(10,102,194,0.2)]"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://x.com/saivikas1278"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter) Profile"
                className="w-11 h-11 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-white/30 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
              >
                <FaXTwitter size={16} />
              </a>
            </div>

            {/* Availability / Reply Notice */}
            <div className="pt-3 flex items-center gap-2 font-mono text-xs text-[var(--text-muted)] select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              <span>Typically replies within 24 hours</span>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: Glass Form Card with Floating Labels & Honeypot     */}
          {/* ================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[24px] bg-[var(--surface)] border border-[var(--border)] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Corner ambient glow */}
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 w-48 h-48 bg-[#FF7A1A]/10 rounded-full filter blur-3xl pointer-events-none"
              />

              <div className="relative z-10 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-white tracking-tight">
                    Send a direct message
                  </h3>
                  <p className="font-sans text-xs text-[var(--text-muted)] mt-1">
                    Fill in your details below and I will get back to you promptly.
                  </p>
                </div>
                <Sparkles size={18} className="text-[var(--accent)] animate-pulse" />
              </div>

              {/* Status Banner */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-start gap-3 text-xs font-mono"
                  >
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Message sent successfully!</p>
                      <p className="opacity-90">{serverMessage}</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-start gap-3 text-xs font-mono"
                  >
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold">Delivery failed</p>
                      <p className="opacity-90">{serverMessage}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* 1. Honeypot Input (Invisible to humans, caught on bots) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="opacity-0 pointer-events-none absolute -top-9999px -left-9999px h-0 w-0"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Floating-Label Input */}
                  <div>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pt-6 pb-2.5 px-4 rounded-xl bg-[var(--surface-2)] border text-sm text-white placeholder-transparent focus:outline-none transition-all duration-200 ${
                          errors.name
                            ? "border-red-500/70 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                            : "border-[var(--border)] focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/15"
                        }`}
                        placeholder="Your Name"
                      />
                      <label
                        htmlFor="contact-name"
                        className={`absolute left-4 pointer-events-none transition-all duration-200 select-none ${
                          focusedField === "name" || formData.name.length > 0
                            ? "top-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)]"
                            : "top-4 text-xs text-[var(--text-dim)]"
                        }`}
                      >
                        Your Name
                      </label>
                    </div>
                    {errors.name && (
                      <p className="font-mono text-[11px] text-red-400 mt-1 pl-1 flex items-center gap-1">
                        ● {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Floating-Label Input */}
                  <div>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className={`w-full pt-6 pb-2.5 px-4 rounded-xl bg-[var(--surface-2)] border text-sm text-white placeholder-transparent focus:outline-none transition-all duration-200 ${
                          errors.email
                            ? "border-red-500/70 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                            : "border-[var(--border)] focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/15"
                        }`}
                        placeholder="Your Email"
                      />
                      <label
                        htmlFor="contact-email"
                        className={`absolute left-4 pointer-events-none transition-all duration-200 select-none ${
                          focusedField === "email" || formData.email.length > 0
                            ? "top-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)]"
                            : "top-4 text-xs text-[var(--text-dim)]"
                        }`}
                      >
                        Your Email
                      </label>
                    </div>
                    {errors.email && (
                      <p className="font-mono text-[11px] text-red-400 mt-1 pl-1 flex items-center gap-1">
                        ● {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Floating-Label Input */}
                <div>
                  <div className="relative">
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: undefined });
                      }}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pt-6 pb-2.5 px-4 rounded-xl bg-[var(--surface-2)] border text-sm text-white placeholder-transparent focus:outline-none transition-all duration-200 ${
                        errors.subject
                          ? "border-red-500/70 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                          : "border-[var(--border)] focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/15"
                      }`}
                      placeholder="Subject"
                    />
                    <label
                      htmlFor="contact-subject"
                      className={`absolute left-4 pointer-events-none transition-all duration-200 select-none ${
                        focusedField === "subject" || formData.subject.length > 0
                          ? "top-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)]"
                          : "top-4 text-xs text-[var(--text-dim)]"
                      }`}
                    >
                      Subject / Project Scope
                    </label>
                  </div>
                  {errors.subject && (
                    <p className="font-mono text-[11px] text-red-400 mt-1 pl-1 flex items-center gap-1">
                      ● {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message Floating-Label Textarea */}
                <div>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: undefined });
                      }}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pt-7 pb-3 px-4 rounded-xl bg-[var(--surface-2)] border text-sm text-white placeholder-transparent focus:outline-none transition-all duration-200 resize-none ${
                        errors.message
                          ? "border-red-500/70 focus:border-red-400 focus:ring-4 focus:ring-red-500/15"
                          : "border-[var(--border)] focus:border-[#FF7A1A] focus:ring-4 focus:ring-[#FF7A1A]/15"
                      }`}
                      placeholder="Message"
                    />
                    <label
                      htmlFor="contact-message"
                      className={`absolute left-4 pointer-events-none transition-all duration-200 select-none ${
                        focusedField === "message" || formData.message.length > 0
                          ? "top-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--accent)]"
                          : "top-4 text-xs text-[var(--text-dim)]"
                      }`}
                    >
                      Tell me about your project or opportunity...
                    </label>
                  </div>
                  {errors.message && (
                    <p className="font-mono text-[11px] text-red-400 mt-1 pl-1 flex items-center gap-1">
                      ● {errors.message}
                    </p>
                  )}
                </div>

                {/* Large Morphing Primary Gradient Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 px-8 rounded-full bg-gradient-to-r from-[#FFB020] via-[#FF7A1A] to-[#FF3D54] hover:shadow-[0_0_30px_rgba(255,122,26,0.35)] text-[#07070A] font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Transmission...</span>
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <CheckCircle2 size={16} className="text-[#07070A]" />
                        <span>Message Sent</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowUpRight size={15} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
