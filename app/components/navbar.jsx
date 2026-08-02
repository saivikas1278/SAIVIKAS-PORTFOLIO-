"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll to add background to navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for highlighting sections
  useEffect(() => {
    const sections = ["about", "experience", "skills", "projects", "education", "certifications"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // triggers when section is in the middle viewport area
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: "ABOUT", href: "/#about", id: "about" },
    { label: "MILESTONES", href: "/#experience", id: "experience" },
    { label: "SKILLS", href: "/#skills", id: "skills" },
    { label: "PROJECTS", href: "/#projects", id: "projects" },
    { label: "EDUCATION", href: "/#education", id: "education" },
    { label: "CERTIFICATIONS", href: "/#certifications", id: "certifications" },
    { label: "BLOGS", href: "/blog", id: "blogs" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-bg-base/80 backdrop-blur-md border-b border-border-glow shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-primary text-xl sm:text-2xl font-bold tracking-wider hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                CHEEPU SAI VIKAS
              </Link>
            </div>

            {/* Desktop Navbar */}
            <div className="hidden md:block">
              <ul className="flex items-center space-x-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className={`nav-link px-4 py-2 text-sm font-medium tracking-wide no-underline transition-colors duration-300 ${
                        activeSection === link.id
                          ? "text-primary font-semibold nav-link-active"
                          : "text-white hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-primary p-2 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <IoClose size={26} /> : <IoMenu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to push content below fixed nav */}
      <div className="h-20" />

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-bg-card/95 backdrop-blur-xl border-l border-border-glow p-6 transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-primary text-xl font-bold tracking-wider">MENU</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-primary p-1 focus:outline-none transition-colors"
            aria-label="Close menu"
          >
            <IoClose size={26} />
          </button>
        </div>

        <ul className="flex flex-col space-y-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium tracking-wide transition-colors duration-300 ${
                  activeSection === link.id
                    ? "text-primary font-semibold pl-2 border-l-2 border-primary"
                    : "text-white hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Navbar;