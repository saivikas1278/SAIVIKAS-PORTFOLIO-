"use client";

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill, RiTerminalBoxLine, RiBracesFill, RiBookOpenLine } from "react-icons/ri";

const TYPING_ROLES = ["Full-Stack Developer", "Software Engineer", "Problem Solver", "CS/IT Student"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // profile, education, terminal
  
  // Terminal states
  const [cmdInput, setCmdInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState([
    { text: "Welcome to Sai Vikas's interactive shell v1.0.0", type: "system" },
    { text: "Type 'help' to see all available commands.", type: "system" }
  ]);
  const terminalBottomRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Mouse spotlight glow coordinates
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Typing animation loop
  useEffect(() => {
    let timer;
    const currentRole = TYPING_ROLES[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? currentRole.slice(0, displayedText.length - 1)
            : currentRole.slice(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  const focusTerminal = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cleanCmd = cmdInput.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...terminalHistory, { text: `guest@saivikas:~$ ${cmdInput}`, type: "command" }];

    switch (cleanCmd) {
      case "help":
        newHistory.push({
          text: `Available commands:\n  about     - Core developer overview\n  skills    - Major technical skills list\n  projects  - Featured systems details\n  education - College & degree specs\n  clear     - Wipe console history\n  secret    - Execute secret sub-program`,
          type: "output"
        });
        break;
      case "about":
        newHistory.push({
          text: `Technical generalist combining full-stack development skills with a proven track record in strategic campaign execution and team leadership. Adept at managing projects and driving collaborative tech initiatives from concept to delivery.`,
          type: "output"
        });
        break;
      case "skills":
        newHistory.push({
          text: `Languages & Frameworks:\n  • React.js, Next.js, TailwindCSS\n  • Node.js, Express\n  • Python, Java, JavaScript\n  • Git, Figma, Canva`,
          type: "output"
        });
        break;
      case "projects":
        newHistory.push({
          text: `1. Cricket Funds & Expenses Tracker (React, Express, Supabase)\n2. Smart Timetable Scheduling System (TypeScript, Python, ILP Solver)\n3. My Digital Diary (Node, Express, HTML/CSS)`,
          type: "output"
        });
        break;
      case "education":
        newHistory.push({
          text: `B.Tech in Computer Science and Information Technology\nSRKR Engineering College, Bhimavaram (2023 - 2027)`,
          type: "output"
        });
        break;
      case "clear":
        setTerminalHistory([]);
        setCmdInput("");
        return;
      case "secret":
        newHistory.push({
          text: `  /\\_/\\  \n ( o.o ) ~ Meow! Welcome to Antigravity CLI easter egg!\n  > ^ <  `,
          type: "output"
        });
        break;
      default:
        newHistory.push({
          text: `bash: command not found: ${cleanCmd}. Type 'help' for options.`,
          type: "error"
        });
    }

    setTerminalHistory(newHistory);
    setCmdInput("");
  };

  const socialLinks = [
    { href: personalData.github, icon: <BsGithub size={24} />, label: "GitHub" },
    { href: personalData.linkedIn, icon: <BsLinkedin size={24} />, label: "LinkedIn" },
  ].filter(({ href }) => Boolean(href));

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="spotlight-container relative flex flex-col items-center justify-between py-12 lg:py-24"
    >
      <div 
        className="spotlight-glow"
        style={{
          "--x": `${coords.x}px`,
          "--y": `${coords.y}px`,
        }}
      />

      <div className="grid grid-cols-1 items-center lg:grid-cols-12 gap-12 w-full">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start justify-center order-1">
          <span className="text-xs font-mono uppercase tracking-widest text-primary mb-3 bg-primary-glow px-3 py-1 rounded-full border border-primary/20">
            System status: active
          </span>
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl mb-6">
            Hi, I'm <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{personalData.name}</span>
            <br />
            I'm a <span className="text-secondary min-h-[3rem] inline-block">{displayedText}<span className="blink"></span></span>
          </h1>

          <p className="text-muted text-base md:text-lg mb-8 leading-relaxed max-w-xl">
            {personalData.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link href="#contact" className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <button className="relative px-8 py-3.5 bg-bg-base hover:bg-bg-base/80 rounded-full text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2 transition duration-200">
                <span>Contact me</span>
                <RiContactsFill size={18} className="text-primary" />
              </button>
            </Link>

            {personalData.resume && (
              <a 
                href={personalData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-white/10 hover:border-secondary/40 bg-white/5 hover:bg-secondary-glow text-sm font-semibold uppercase tracking-wider text-white flex items-center gap-2 transition-all duration-300"
              >
                <span>Get Resume</span>
                <MdDownload size={18} className="text-secondary" />
              </a>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-muted uppercase tracking-wider">Social portals:</span>
            {socialLinks.map(({ href, icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                className="p-2.5 rounded-full glass-card hover:text-primary hover:border-primary/40 hover:scale-110 duration-300 text-muted"
                aria-label={label}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>

        {/* IDE & CLI Mock Card */}
        <div className="lg:col-span-5 w-full order-2">
          <div className="glass-card rounded-xl overflow-hidden shadow-2xl border-white/10 flex flex-col h-[400px]">
            {/* Header / Tabs */}
            <div className="bg-black/40 border-b border-white/10 px-4 py-3 flex items-center justify-between">
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-amber-500/70"></div>
                <div className="h-3 w-3 rounded-full bg-emerald-500/70"></div>
              </div>

              <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-mono transition-all ${
                    activeTab === "profile" 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-muted hover:text-white"
                  }`}
                >
                  <RiBracesFill size={12} className="text-amber-400 hidden xs:inline" />
                  <span>Profile.json</span>
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-mono transition-all ${
                    activeTab === "education" 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-muted hover:text-white"
                  }`}
                >
                  <RiBookOpenLine size={12} className="text-secondary hidden xs:inline" />
                  <span>College.json</span>
                </button>
                <button
                  onClick={() => setActiveTab("terminal")}
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-mono transition-all ${
                    activeTab === "terminal" 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-muted hover:text-white"
                  }`}
                >
                  <RiTerminalBoxLine size={12} className="text-primary hidden xs:inline" />
                  <span>terminal.sh</span>
                </button>
              </div>
            </div>

            {/* Editor Screen */}
            <div className="flex-1 p-4 overflow-y-auto bg-black/20 text-xs md:text-sm font-mono leading-relaxed">
              {activeTab === "profile" && (
                <div className="text-muted">
                  <p><span className="text-secondary">const</span> <span className="text-white">developer</span> = <span className="text-amber-300">{`{`}</span></p>
                  <p className="pl-4"><span className="text-white">name:</span> <span className="text-emerald-400">"{personalData.name}"</span>,</p>
                  <p className="pl-4"><span className="text-white">title:</span> <span className="text-emerald-400">"{personalData.designation}"</span>,</p>
                  <p className="pl-4"><span className="text-white">stack:</span> <span className="text-amber-300">[</span></p>
                  <p className="pl-8 text-emerald-400">"React", "Next.js", "Node.js", "Express",</p>
                  <p className="pl-8 text-emerald-400">"Python", "Java", "TailwindCSS", "Git"</p>
                  <p className="pl-4"><span className="text-amber-300">]</span>,</p>
                  <p className="pl-4"><span className="text-white">status:</span> <span className="text-emerald-400">"academic_senior"</span>,</p>
                  <p className="pl-4"><span className="text-white">availability:</span> <span className="text-secondary">true</span></p>
                  <p><span className="text-amber-300">{`}`}</span>;</p>
                </div>
              )}

              {activeTab === "education" && (
                <div className="text-muted">
                  <p><span className="text-secondary">const</span> <span className="text-white">education</span> = <span className="text-amber-300">{`{`}</span></p>
                  <p className="pl-4"><span className="text-white">degree:</span> <span className="text-emerald-400">"B.Tech in CS & IT"</span>,</p>
                  <p className="pl-4"><span className="text-white">college:</span> <span className="text-emerald-400">"SRKR Engineering College"</span>,</p>
                  <p className="pl-4"><span className="text-white">location:</span> <span className="text-emerald-400">"Bhimavaram, AP, India"</span>,</p>
                  <p className="pl-4"><span className="text-white">duration:</span> <span className="text-emerald-400">"2023 - 2027"</span>,</p>
                  <p className="pl-4"><span className="text-white">academicFocus:</span> <span className="text-emerald-400">"Full-Stack Dev & Project Coordination"</span></p>
                  <p><span className="text-amber-300">{`}`}</span>;</p>
                </div>
              )}

              {activeTab === "terminal" && (
                <div 
                  className="h-full flex flex-col text-slate-300 cursor-text"
                  onClick={focusTerminal}
                >
                  <div className="flex-1 overflow-y-auto space-y-1.5 pb-2">
                    {terminalHistory.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`whitespace-pre-wrap ${
                          item.type === "command" 
                            ? "text-white font-semibold" 
                            : item.type === "error" 
                              ? "text-red-400" 
                              : item.type === "system" 
                                ? "text-slate-500" 
                                : "text-primary"
                        }`}
                      >
                        {item.text}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>
                  
                  <form onSubmit={handleTerminalSubmit} className="flex items-center border-t border-white/5 pt-2">
                    <span className="text-secondary mr-2 shrink-0">guest@saivikas:~$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={cmdInput}
                      onChange={(e) => setCmdInput(e.target.value)}
                      className="bg-transparent border-none outline-none text-white flex-1 min-w-0 font-mono text-xs md:text-sm"
                      autoFocus={activeTab === "terminal"}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}