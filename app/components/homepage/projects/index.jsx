"use client";

import { useState } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Projects = ({ projects = [] }) => {
  const displayProjects = projects.length > 0 ? projects : projectsData;
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? displayProjects : displayProjects.slice(0, 6);

  return (
    <section id="projects" className="py-12 lg:py-24 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/10 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="space-y-2 mb-12 text-center">
        <span className="text-xs font-mono text-secondary uppercase tracking-widest">// deployment_ledger</span>
        <h2 className="text-3xl font-extrabold text-white md:text-4xl">
          Featured Creations
        </h2>
      </div>

      {/* Mobile/Tablet Horizontal Carousel or Stacked List */}
      <div className={showAll 
        ? "flex flex-col gap-6 md:hidden" 
        : "flex md:hidden overflow-x-auto gap-6 snap-x snap-mandatory pb-6 scroll-smooth scrollbar-hide [-webkit-overflow-scrolling:touch] -mx-6 px-6"
      }>
        {visibleProjects.map((project, index) => (
          <div 
            key={project.id || index} 
            className={showAll 
              ? "w-full flex opacity-0 animate-fade-in-up" 
              : "w-[80vw] xs:w-[320px] shrink-0 snap-center flex opacity-0 animate-fade-in-up"
            }
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {visibleProjects.map((project, index) => (
          <div 
            key={project.id || index} 
            className="w-full flex opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {displayProjects.length > 6 && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-mono text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 cursor-pointer"
          >
            <span>{showAll ? 'Show Less' : 'Show More Projects'}</span>
            {showAll ? <FaChevronUp className="animate-bounce-slow" /> : <FaChevronDown className="animate-bounce-slow" />}
          </button>
        </div>
      )}
    </section>
  );
};

export default Projects;