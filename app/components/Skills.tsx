'use client';

import { useState } from 'react';
import {
  Code2,
  Server,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { TechIcons } from './TechIcons';
import ScrollReveal from './ScrollReveal';

interface TechItem {
  name: string;
  role: string;
}

interface SkillCategory {
  id: string;
  category: string;
  tagline: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
  glowColor: string;
  items: TechItem[];
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    category: 'Frontend',
    tagline: 'Client-side interfaces & responsive web systems',
    icon: Code2,
    accentColor: 'text-violet-400 border-violet-500/30 bg-violet-500/10',
    glowColor: 'from-violet-500/20 to-transparent',
    items: [
      { name: 'React', role: 'Component UI Library' },
      { name: 'Next.js', role: 'Full-Stack React Framework' },
      { name: 'TypeScript', role: 'Typed JavaScript' },
      { name: 'Tailwind CSS', role: 'Utility-First Styling' },
      { name: 'HTML/CSS', role: 'Web Standards & Semantics' },
      { name: 'JavaScript', role: 'Core Web Programming' },
      { name: 'Bootstrap', role: 'Responsive Grid & UI' },
    ],
  },
  {
    id: 'backend',
    category: 'Backend',
    tagline: 'Server logic, APIs, architectures & database systems',
    icon: Server,
    accentColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    glowColor: 'from-indigo-500/20 to-transparent',
    items: [
      { name: 'Node.js', role: 'JavaScript Runtime' },
      { name: 'Python', role: 'Programming & AI Scripts' },
      { name: 'Express.js', role: 'Node.js Web Framework' },
      { name: 'PostgreSQL', role: 'Advanced Relational DB' },
      { name: 'MongoDB', role: 'NoSQL Document Database' },
      { name: 'PHP', role: 'Server-Side Scripting' },
      { name: 'Laravel', role: 'PHP MVC Framework' },
      { name: 'MySQL', role: 'Relational Database Service' },
      { name: 'NextAuth/Auth.js', role: 'Authentication & Security' },
      { name: 'Java', role: 'Object-Oriented Programming' },
    ],
  },
  {
    id: 'tools',
    category: 'Tools & Platforms',
    tagline: 'Version control, containers, cloud & prototyping',
    icon: Wrench,
    accentColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    glowColor: 'from-cyan-500/20 to-transparent',
    items: [
      { name: 'Git', role: 'Distributed Version Control' },
      { name: 'Docker', role: 'Software Containerization' },
      { name: 'AWS', role: 'Cloud Infrastructure' },
      { name: 'Vercel', role: 'Edge Deployment & Hosting' },
      { name: 'Figma', role: 'UI/UX Interface Prototyping' },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[450px] h-[280px] bg-purple-900/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[420px] h-[260px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle dot matrix pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-7 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] font-semibold mb-2 tracking-wide shadow-xs">
              <Sparkles size={12} className="text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>TECHNICAL PROFICIENCY & STACK</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
              Skills & Core Technologies
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto text-xs leading-relaxed">
              Languages, frameworks, and modern developer tooling applied across full-stack applications and client projects.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4">
              {[
                { id: 'all', label: 'All Technologies' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'tools', label: 'Tools & Platforms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2.5 sm:px-3.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30 border border-purple-400/40 scale-105'
                      : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200 dark:border-white/[0.06]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Skill Category Sections */}
        <div className="space-y-4 sm:space-y-5 mb-4">
          {filteredCategories.map((group, idx) => {
            const IconComponent = group.icon;
            const waveAnim = idx % 2 === 0 ? 'wave-slide' : 'wave-slide-right';
            return (
              <ScrollReveal key={group.id} animation={waveAnim} duration={0.75} staggerIndex={idx} staggerDelay={0.12}>
              <div
                key={group.id}
                className="group relative p-3.5 sm:p-5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111116]/90 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300 shadow-sm dark:shadow-xl overflow-hidden"
              >
                {/* Internal Glow Backdrop */}
                <div
                  className={`absolute -top-24 -right-24 w-44 h-44 rounded-full bg-gradient-to-br ${group.glowColor} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                />

                {/* Category Header */}
                <div className="flex items-center gap-2.5 mb-3.5 sm:mb-4 relative z-10">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg border flex items-center justify-center ${group.accentColor}`}
                  >
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                      {group.category}
                    </h3>
                    <p className="text-[10.5px] sm:text-[11px] text-neutral-500 dark:text-neutral-400">{group.tagline}</p>
                  </div>
                </div>

                {/* Tech Logos Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5 relative z-10">
                  {group.items.map((tech) => {
                    const SvgIcon = TechIcons[tech.name];
                    return (
                      <div
                        key={tech.name}
                        className="group/item flex items-center gap-2 p-2 sm:p-2.5 rounded-lg border border-neutral-200 dark:border-white/[0.06] bg-neutral-50 dark:bg-[#0d0d12]/90 hover:bg-neutral-100 dark:hover:bg-[#151520] hover:border-purple-500/40 transition-all duration-200 hover:-translate-y-0.5 shadow-xs dark:shadow-sm cursor-default min-w-0"
                      >
                        {/* SVG Logo */}
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-white dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.06] flex items-center justify-center shrink-0 p-1 group-hover/item:scale-105 group-hover/item:border-purple-500/30 transition-all shadow-xs dark:shadow-none">
                          {SvgIcon ? (
                            <SvgIcon size={15} />
                          ) : (
                            <Code2 size={15} className="text-purple-500 dark:text-purple-400" />
                          )}
                        </div>

                        {/* Tech Label & Subtitle */}
                        <div className="overflow-hidden min-w-0 flex-1">
                          <p className="text-[11px] sm:text-[11.5px] font-bold text-neutral-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-300 transition-colors truncate">
                            {tech.name}
                          </p>
                          <p className="text-[9px] sm:text-[9.5px] text-neutral-500 dark:text-neutral-400 truncate">
                            {tech.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
