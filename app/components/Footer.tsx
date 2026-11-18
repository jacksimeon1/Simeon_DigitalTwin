'use client';

import { Github, Linkedin, Mail, Facebook, Youtube, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/jacksimeon1' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/robert-simeon-08063b214' },
    { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/jackieeeeeeeeeeeeeeee/' },
    { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@Track_Theory-4ever' },
    { icon: Mail, label: 'Email', href: 'mailto:robertsimeon12345@gmail.com' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Resume', href: '#resume' },
    { label: 'Chat Assistant', href: '#chat' },
  ];

  return (
    <footer className="relative border-t border-neutral-200 dark:border-[var(--border)] text-neutral-600 dark:text-neutral-400 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[var(--surface)]/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                RS
              </div>
              <span className="font-bold text-neutral-900 dark:text-white text-sm tracking-tight">Robert Simeon Jr.</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-sm mb-3">
              BSIT Graduate @ SPUP (June 2026) • Full-Stack Software Developer. Creating high-performance client solutions with modern stacks.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400">
              <Code2 size={13} className="text-purple-600 dark:text-purple-400" />
              <span>Next.js • Tailwind CSS • Groq AI</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-300 transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Channels */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-3">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 sm:w-8 sm:h-8 rounded-lg bg-white dark:bg-white/[0.04] border border-neutral-300 dark:border-white/[0.08] flex items-center justify-center text-neutral-600 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-white hover:border-purple-500/40 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-all shadow-xs dark:shadow-none"
                    title={social.label}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Available for internships, technical roles, and collaboration.
            </p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-neutral-200 dark:border-white/[0.06] pt-5 sm:pt-6 flex items-center justify-center sm:justify-start text-center sm:text-left text-[11px] text-neutral-500 dark:text-neutral-400">
          <p>© {currentYear} Robert Simeon Jr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
