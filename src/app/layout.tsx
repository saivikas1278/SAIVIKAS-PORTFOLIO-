import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ui/scroll-progress";
import AmbientBackground from "@/components/ui/ambient-background";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sai Vikas — Full-Stack Developer & Software Engineer",
  description: "Computer Science & IT developer specializing in real-time architectures, Next.js, and high-performance web systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans antialiased min-h-screen selection:bg-[#FF7A1A]/30 selection:text-[#F5F5F7] overflow-x-hidden relative">
        {/* Fixed 2px Top Scroll Progress Bar */}
        <ScrollProgressBar />

        {/* Ambient Drifting Glows & Noise Texture */}
        <AmbientBackground />

        {/* Page Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
