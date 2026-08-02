import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

export default function ContactSection() {
  const socialLinks = [
    { href: personalData.github, icon: <IoLogoGithub size={20} />, label: 'GitHub' },
    { href: personalData.linkedIn, icon: <BiLogoLinkedin size={20} />, label: 'LinkedIn' },
    { href: personalData.twitter, icon: <FaXTwitter size={20} />, label: 'Twitter' },
    { href: personalData.stackOverflow, icon: <FaStackOverflow size={20} />, label: 'Stack Overflow' },
    { href: personalData.facebook, icon: <FaFacebook size={20} />, label: 'Facebook' },
  ].filter(({ href }) => Boolean(href));

  return (
    <section id="contact" className="py-12 lg:py-24 relative">
      {/* Side visual indicator */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-10 select-none">
        <span className="text-xs font-mono tracking-widest text-slate-500 uppercase rotate-90 my-8">
          // direct_uplink
        </span>
        <div className="h-24 w-[1px] bg-white/10"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left Side: Form */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>

        {/* Right Side: Information Card */}
        <div className="lg:col-span-5 w-full flex flex-col gap-6">
          <div className="glass-card rounded-xl p-6 space-y-6">
            <h4 className="text-sm font-mono text-primary uppercase tracking-widest">// directory_nodes</h4>
            
            <div className="space-y-4">
              <a 
                href={`mailto:${personalData.email}`}
                className="flex items-center gap-4 text-muted hover:text-white group transition duration-200"
              >
                <div className="p-2.5 rounded bg-white/5 border border-white/5 group-hover:border-primary/40 group-hover:bg-primary-glow/10 duration-200 text-primary">
                  <MdAlternateEmail size={18} />
                </div>
                <span className="text-sm font-mono truncate">{personalData.email}</span>
              </a>

              {personalData.phone && (
                <a 
                  href={`tel:${personalData.phone}`}
                  className="flex items-center gap-4 text-muted hover:text-white group transition duration-200"
                >
                  <div className="p-2.5 rounded bg-white/5 border border-white/5 group-hover:border-secondary/40 group-hover:bg-secondary-glow/10 duration-200 text-secondary">
                    <IoMdCall size={18} />
                  </div>
                  <span className="text-sm font-mono">{personalData.phone}</span>
                </a>
              )}

              <div className="flex items-center gap-4 text-muted">
                <div className="p-2.5 rounded bg-white/5 border border-white/5 text-slate-400">
                  <CiLocationOn size={18} />
                </div>
                <span className="text-sm font-mono">{personalData.address}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Social channels */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono text-slate-500 uppercase tracking-wide">// social_network_relays</h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ href, icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:border-primary/40 hover:text-primary hover:scale-105 duration-200 text-muted"
                    aria-label={label}
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}