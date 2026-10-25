"use client";

import React from "react";

export default function SignatureCard() {
  return (
    <section className="relative py-16 bg-black flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#F97316]/5 filter blur-[80px] pointer-events-none z-0" />

      {/* Styled inline scoped classes for high-performance animation & responsiveness */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --sig-card-width: 220px;
          --sig-card-height: 321px;
          --sig-circle-size: 120px;
          --sig-img-size: 110px;
          --sig-font-size: 13px;
          --sig-primary-glow: rgba(249, 115, 22, 0.15);
          --sig-border-color: rgba(255, 255, 255, 0.05);
          --sig-hover-border: rgba(249, 115, 22, 0.3);
        }

        .sig-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 10px;
          z-index: 10;
        }

        .sig-card {
          width: var(--sig-card-width);
          height: var(--sig-card-height);
          background: #070708;
          border: 1px solid var(--sig-border-color);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
        }

        .sig-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(239, 68, 68, 0.05));
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 0;
        }

        .sig-circle {
          width: var(--sig-circle-size);
          height: var(--sig-circle-size);
          border-radius: 50%;
          background: #0E0E10;
          border: 1px solid var(--sig-border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 2;
        }

        .sig-circle::before {
          content: "";
          position: absolute;
          inset: 2px;
          border-radius: 50%;
          background: #070708;
          z-index: 1;
          transition: background 0.5s ease;
        }

        .sig-overlay {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B, #EF4444);
          transform: scale(0);
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          z-index: 0;
        }

        .sig-circle img {
          width: var(--sig-img-size);
          height: var(--sig-img-size);
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          border: 2px solid rgba(255, 255, 255, 0.08);
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .sig-label {
          margin-top: 24px;
          font-family: var(--font-display), sans-serif;
          font-weight: 900;
          font-size: var(--sig-font-size);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #8E8E93;
          z-index: 2;
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        /* Hover animations restricted to devices supporting hover to prevent mobile touch stickiness */
        @media (hover: hover) {
          .sig-card:hover {
            transform: translateY(-8px);
            border-color: var(--sig-hover-border);
            box-shadow: 0 20px 45px var(--sig-primary-glow);
          }
          .sig-card:hover::before {
            opacity: 1;
          }
          .sig-card:hover .sig-circle {
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.2);
          }
          .sig-card:hover .sig-circle::before {
            background: transparent;
          }
          .sig-card:hover .sig-overlay {
            transform: scale(4);
          }
          .sig-card:hover .sig-circle img {
            transform: scale(1.06);
            border-color: rgba(255, 255, 255, 0.9);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.25);
          }
          .sig-card:hover .sig-label {
            color: #FFFFFF;
            letter-spacing: 0.24em;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          }
        }

        /* Active/Touch state for mobile devices */
        .sig-card:active {
          transform: scale(0.97) translateY(-2px);
          border-color: var(--sig-hover-border);
        }
        .sig-card:active .sig-overlay {
          transform: scale(4);
        }
        .sig-card:active .sig-circle::before {
          background: transparent;
        }
        .sig-card:active .sig-label {
          color: #FFFFFF;
        }

        /* Fluid sizing and scaling for mobile viewports */
        @media (max-width: 480px) {
          :root {
            --sig-card-width: 190px;
            --sig-card-height: 276px;
            --sig-circle-size: 100px;
            --sig-img-size: 90px;
            --sig-font-size: 11px;
          }
          .sig-label {
            margin-top: 18px;
          }
        }

        /* Extreme small screen protection (under 360px) */
        @media (max-width: 360px) {
          :root {
            --sig-card-width: 170px;
            --sig-card-height: 248px;
            --sig-circle-size: 88px;
            --sig-img-size: 78px;
            --sig-font-size: 10px;
          }
          .sig-label {
            margin-top: 14px;
            letter-spacing: 0.12em;
          }
        }
      ` }} />

      <div className="sig-container">
        <div className="sig-card">
          <div className="sig-circle">
            <div className="sig-overlay"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/images/my1.jpg" 
              alt="Sai Vikas" 
              onError={(e) => {
                // Fallback to placeholder if custom profile picture is not loaded
                e.currentTarget.src = "/assets/images/placeholder-avatar.png";
              }}
            />
          </div>
          <p className="sig-label">Let&apos;s Work Together</p>
        </div>
      </div>
    </section>
  );
}
