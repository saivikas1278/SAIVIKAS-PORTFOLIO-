"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {/* 1. Subtle Noise / Grain Overlay (3% opacity) */}
      <div className="absolute inset-0 bg-noise-overlay opacity-30 mix-blend-screen" />

      {/* 2. Fixed Soft Radial Glow (Top-Right: Orange, 10% opacity, 120px blur) */}
      <div
        className="anim-drift-1 absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-[#FF7A1A]/10 blur-[120px] will-change-transform"
      />

      {/* 3. Fixed Soft Radial Glow (Bottom-Left: Dim Coral, 8% opacity, 120px blur) */}
      <div
        className="anim-drift-2 absolute -bottom-40 -left-20 w-[650px] h-[650px] rounded-full bg-[#FF3D54]/[0.08] blur-[120px] will-change-transform"
      />

      {/* 4. Faint Grid Pattern (1px lines at 4% opacity, 64px cells with radial fade mask) */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-80"
      />
    </div>
  );
}
