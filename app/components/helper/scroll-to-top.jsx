"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial scroll offset
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onClickBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={onClickBtn}
      className={`fixed bottom-8 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-secondary/80 to-primary/80 border border-white/10 hover:border-primary text-white backdrop-blur-md shadow-lg shadow-primary-glow/20 transition-all duration-300 hover:scale-110 active:scale-95 ${
        isVisible 
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
          : "opacity-0 translate-y-4 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTop;
