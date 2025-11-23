'use client';

import { Github, Linkedin, Mail, Heart, Code2, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/jacksimeon1', color: 'hover:text-slate-300' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: 'hover:text-blue-400' },
    { icon: Mail, label: 'Email', href: 'mailto:your.email@example.com', color: 'hover:text-red-400' },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Chat', href: '#chat' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1 animate-slide-up">
            <div className="flex items-center space-x-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all">
                <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform">RSJ</span>
              </div>
              <span className="font-bold text-white text-lg">Robert Simeon Jr.</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              4th Year IT Student @ SPUP | Full-Stack Developer | AI Enthusiast
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <Code2 size={14} />
              Built with modern web technologies
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-purple-600 to-pink-600 rounded-full"></div>
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'My GitHub', href: 'https://github.com/jacksimeon1' },
                { label: 'Contact Me', href: 'mailto:your.email@example.com' },
                { label: 'Portfolio', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('https') || link.href.startsWith('mailto') ? '_blank' : undefined}
                    rel={link.href.startsWith('https') || link.href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
                    className="text-slate-400 hover:text-blue-400 transition-all duration-300 inline-flex items-center gap-2 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                    {(link.href.startsWith('https') || link.href.startsWith('mailto')) && (
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h4 className="font-bold text-white mb-6 text-lg flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-600 to-rose-600 rounded-full"></div>
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 ${social.color} transition-all duration-300 transform hover:scale-110 group`}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <p className="text-xs text-slate-500 mt-4">Let's collaborate and create something amazing!</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 pt-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Projects', value: '10+' },
              { label: 'Skills', value: '15+' },
              { label: 'Technologies', value: '20+' },
              { label: 'Coffee Cups', value: '∞' },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all group cursor-default animate-slide-up"
                style={{animationDelay: `${0.4 + idx * 0.05}s`}}
              >
                <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="text-center py-4 border-t border-slate-700/50 animate-slide-up" style={{animationDelay: '0.5s'}}>
            <p className="text-sm text-slate-400 flex items-center justify-center gap-2 flex-wrap">
              <span>© {currentYear} Robert Simeon Jr.</span>
              <span className="text-slate-600">•</span>
              <span>Digital Twin Portfolio</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1">
                Built with <Heart size={14} className="text-red-500 animate-pulse" /> in SPUP
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-3">All rights reserved • Designed & Developed by Robert Simeon Jr.</p>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <div className="fixed bottom-8 right-8 animate-float">
        <a
          href="#"
          className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all opacity-0 hover:opacity-100 group focus:opacity-100"
          title="Back to top"
        >
          <span className="text-xl">↑</span>
        </a>
      </div>
    </footer>
  );
}
