import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Certifications from "./components/homepage/certifications";
import TimelineTabs from "./components/homepage/timeline-tabs";

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = await res.json();

  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
};

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects projects={projectsData} />
      <Education />
      
      {/* Mobile Combined Timeline switcher */}
      <div className="block md:hidden">
        <TimelineTabs />
      </div>

      <Certifications />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  )
};