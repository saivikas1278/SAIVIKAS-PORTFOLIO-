import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgressBar from "@/components/ui/scroll-progress";
import AmbientBackground from "@/components/ui/ambient-background";
import PageIntro from "@/components/ui/page-intro";

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

export const viewport: Viewport = {
  themeColor: "#07070A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://saivikas.dev"),
  title: {
    default: "Sai Vikas — Full-Stack Developer & Software Architect",
    template: "%s | Sai Vikas",
  },
  description:
    "Computer Science Engineer specializing in scalable real-time architectures, distributed systems, high-performance web applications, and WebSocket pipelines.",
  keywords: [
    "Sai Vikas",
    "Full-Stack Developer",
    "Software Engineer",
    "Next.js",
    "React 19",
    "TypeScript",
    "Real-Time Systems",
    "WebSockets",
    "Portfolio",
    "SRKR",
  ],
  authors: [{ name: "Sai Vikas", url: "https://saivikas.dev" }],
  creator: "Sai Vikas",
  publisher: "Sai Vikas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://saivikas.dev",
  },
  openGraph: {
    title: "Sai Vikas — Full-Stack Developer & Software Architect",
    description:
      "Computer Science Engineer specializing in scalable real-time architectures, distributed systems, and modern web applications.",
    url: "https://saivikas.dev",
    siteName: "Sai Vikas Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/my1.jpg",
        width: 1200,
        height: 630,
        alt: "Sai Vikas — Executive Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sai Vikas — Full-Stack Developer & Software Architect",
    description:
      "Computer Science Engineer specializing in scalable real-time architectures, distributed systems, and modern web applications.",
    creator: "@saivikas1278",
    images: ["/assets/images/my1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/assets/images/my1.jpg",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://saivikas.dev/#person",
      name: "Sai Vikas",
      jobTitle: "Full-Stack Engineer & Software Architect",
      url: "https://saivikas.dev",
      email: "cheepusaivikas549@gmail.com",
      telephone: "+917989001874",
      image: "https://saivikas.dev/assets/images/my1.jpg",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "SRKR Engineering College",
      },
      sameAs: [
        "https://github.com/saivikas1278",
        "https://linkedin.com/in/sai-vikas",
        "https://x.com/saivikas1278",
      ],
      knowsAbout: [
        "Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "WebSockets",
        "Distributed Systems",
        "Database Architecture",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://saivikas.dev/#website",
      url: "https://saivikas.dev",
      name: "Sai Vikas Portfolio",
      description: "Executive portfolio of Sai Vikas — Full-Stack Developer & Software Architect.",
      publisher: {
        "@id": "https://saivikas.dev/#person",
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans antialiased min-h-screen selection:bg-[#FF7A1A]/30 selection:text-[#F5F5F7] overflow-x-hidden relative">
        {/* Subtle 1-Second Page-Load Intro */}
        <PageIntro />

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
