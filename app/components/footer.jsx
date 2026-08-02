import Link from 'next/link';
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-bg-base border-border-glow text-white">
      {/* Top glowing separator */}
      <div className="flex justify-center -z-10">
        <div className="absolute top-0 h-[1px] w-2/3 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>
      
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-border-glow/50 pb-8 mb-8">
          
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start space-y-2">
            <Link href="/" className="text-primary text-xl font-bold tracking-wider hover:opacity-90 transition-opacity">
              CHEEPU SAI VIKAS
            </Link>
            <p className="text-xs text-muted font-mono tracking-wide">
              // crafting_digital_solutions
            </p>
          </div>

          {/* Quick Nav Column */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/#about" className="text-sm text-muted hover:text-primary transition-colors duration-200">About</Link>
            <Link href="/#experience" className="text-sm text-muted hover:text-primary transition-colors duration-200">Milestones</Link>
            <Link href="/#skills" className="text-sm text-muted hover:text-primary transition-colors duration-200">Skills</Link>
            <Link href="/#projects" className="text-sm text-muted hover:text-primary transition-colors duration-200">Projects</Link>
            <Link href="/#contact" className="text-sm text-muted hover:text-primary transition-colors duration-200">Contact</Link>
          </div>

          {/* GitHub actions / Socials Column */}
          <div className="flex justify-center md:justify-end items-center gap-5">
            <Link
              target="_blank"
              href="https://github.com/saivikas1278/PORTFOLIO"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-primary/40 hover:text-primary text-xs font-mono tracking-wide transition-all duration-200"
            >
              <IoStar className="text-secondary" />
              <span>Star Repo</span>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/saivikas1278/PORTFOLIO/fork"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-secondary/40 hover:text-secondary text-xs font-mono tracking-wide transition-all duration-200"
            >
              <CgGitFork className="text-primary" />
              <span>Fork Repo</span>
            </Link>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted font-mono tracking-wider space-y-3 sm:space-y-0">
          <p>© {currentYear} Cheepu Sai Vikas. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with 
            <span className="text-rose-500 animate-pulse">❤️</span> 
            using 
            <Link target="_blank" href="https://nextjs.org/" className="text-white hover:text-primary underline decoration-dotted transition-colors">
              Next.js
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;