'use client';

import { ExternalLink, Star, Sparkles, FolderGit2, Globe, Github } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import ProjectImageScroller from './ProjectImageScroller';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  liveDemo?: string;
  github?: string;
  featured?: boolean;
  isPrivate?: boolean;
  isOpenSource?: boolean;
  screenshotsKey?: 'off-campus' | 'santo-nino' | 'capstone-ai' | 'sip-3d' | '3d-room';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'In-Off Campus Activity Scheduling Information System',
    description:
      'A comprehensive web-based system for managing and scheduling both on-campus and off-campus activities. Enables efficient event planning, participant registration, and resource allocation for educational institutions. Built with PHP, Laravel framework, Bootstrap, and MySQL.',
    tags: ['PHP', 'Laravel', 'Bootstrap', 'MySQL', 'Info Systems'],
    link: '#',
    github: '#',
    featured: true,
    isPrivate: true,
    screenshotsKey: 'off-campus',
  },
  {
    id: 2,
    title: 'Santo Niño Building Permit System',
    description:
      'A specialized municipal e-governance platform designed for the Local Government Unit of Santo Niño, Cagayan. Automates citizen building permit applications, blueprint and floor plan submissions, municipal administrative evaluations, cashier payment processing, and revenue reporting.',
    tags: ['PHP', 'MySQL', 'Bootstrap', 'GovTech', 'Municipal Portal', 'PDF Reports'],
    link: '#',
    github: '#',
    featured: true,
    isPrivate: true,
    screenshotsKey: 'santo-nino',
  },
  {
    id: 3,
    title: 'Capstone AI Title Generator',
    description:
      'An open-source AI-powered academic research platform and thesis title synthesis engine. Formulates defensible, accredited capstone project titles tailored by academic program, project type, and target beneficiaries. Features an interactive AI title verification sandbox, live heuristic validation engine, and multi-paradigm research recommendations.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Synthesis Engine', 'Academic Research', 'Open Source'],
    link: 'https://jacksimeon1.github.io/capstone-title-ai/',
    liveDemo: 'https://jacksimeon1.github.io/capstone-title-ai/',
    github: 'https://github.com/jacksimeon1/capstone-title-ai',
    featured: true,
    isOpenSource: true,
    screenshotsKey: 'capstone-ai',
  },
  {
    id: 4,
    title: 'SIP 3D – 3D Beverage Showcase Website',
    description:
      'An interactive 3D beverage showcase and animation demonstration website. Features real-time 360° can cylinder rotation physics, multi-flavor switching (Crisp Pear, Midnight Apple, Tropical Exotic), dynamic background kinetic typography, floating fruit particles, and automated demonstration controls.',
    tags: ['Three.js / 3D Web', 'CSS 3D Transforms', 'JavaScript ES6+', 'HTML5 Canvas', 'Kinetic Typography', 'Interactive UI', 'Open Source'],
    link: 'https://jacksimeon1.github.io/3d-can-animation/',
    liveDemo: 'https://jacksimeon1.github.io/3d-can-animation/',
    github: 'https://github.com/jacksimeon1/3d-can-animation',
    featured: true,
    isOpenSource: true,
    screenshotsKey: 'sip-3d',
  },
  {
    id: 5,
    title: '3D Room – Isometric 3D Room & Studio',
    description:
      'An interactive isometric 3D living sanctuary and studio showcase built with pure CSS 3D transforms, JavaScript, and HTML5. Features real-time camera perspective rotation, dynamic ambient lighting presets, interactive room elements, multi-channel animated TV display, and relaxing soundscapes.',
    tags: ['CSS 3D Transforms', 'JavaScript ES6+', 'HTML5 Canvas', 'Interactive 3D', 'Isometric Design', 'Open Source'],
    link: 'https://jacksimeon1.github.io/3D-Room/',
    liveDemo: 'https://jacksimeon1.github.io/3D-Room/',
    github: 'https://github.com/jacksimeon1/3D-Room',
    featured: true,
    isOpenSource: true,
    screenshotsKey: '3d-room',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="pt-16 pb-10 sm:pt-20 sm:pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-500/10 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-7 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] font-semibold mb-2 tracking-wide">
              <Sparkles size={12} className="text-purple-600 dark:text-purple-400" />
              <span>PORTFOLIO & WORK</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
              Featured Projects
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto text-xs leading-relaxed">
              A curated selection of software engineering, open source platforms, web applications, and interactive systems.
            </p>
          </div>
        </ScrollReveal>

        {/* Projects Grid - compact & uniform size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 items-stretch">
          {projects.map((project, idx) => {
            const isPrivate = project.isPrivate;

            return (
              <ScrollReveal
                key={project.id}
                animation="tilt-3d"
                duration={0.8}
                staggerIndex={idx}
                staggerDelay={0.1}
                className="h-full"
              >
                <div
                  className="group relative flex flex-col justify-between h-full rounded-xl p-3.5 sm:p-4 border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111116] hover:border-purple-500/40 hover:bg-neutral-50 dark:hover:bg-[#15151c] transition-all duration-300 hover:-translate-y-1 shadow-sm dark:shadow-xl hover:shadow-purple-950/20"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Top header bar */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/[0.05] border border-neutral-200 dark:border-white/[0.08] flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                        <FolderGit2 size={14} />
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {project.isOpenSource && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <Globe size={10} />
                            Open Source
                          </span>
                        )}
                        {isPrivate && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-white/[0.06] border border-neutral-300 dark:border-white/10 px-2 py-0.5 rounded-full">
                            🔒 Private System
                          </span>
                        )}
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/20 px-2 py-0.5 rounded-full">
                            <Star size={10} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title - clickable if live demo available */}
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white mb-1.5 transition-colors break-words">
                      {project.liveDemo ? (
                        <a
                          href={project.liveDemo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        >
                          <span>{project.title}</span>
                          <ExternalLink size={13} className="opacity-70 text-emerald-500 shrink-0" />
                        </a>
                      ) : (
                        <span className="group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
                          {project.title}
                        </span>
                      )}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed mb-2.5 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Embedded Animated Screenshot Showcase */}
                    {project.screenshotsKey && (
                      <ProjectImageScroller systemKey={project.screenshotsKey} />
                    )}
                  </div>

                  {/* Tags & Footer (pinned to bottom) */}
                  <div className="pt-2.5 border-t border-neutral-200 dark:border-white/[0.06] mt-auto">
                    <div className="flex flex-wrap gap-1 mb-2 items-start">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 text-[9px] font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.06] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 pt-0.5">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {project.liveDemo && (
                          <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] shadow-xs hover:shadow-emerald-600/30 transition-all duration-200 group/btn"
                          >
                            <Globe size={11} />
                            <span>Live Demo</span>
                            <ExternalLink size={10} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                          </a>
                        )}
                        {project.github && project.github !== '#' && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-300 dark:border-white/10 hover:border-neutral-400 dark:hover:border-white/20 bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white font-semibold text-[11px] transition-all duration-200"
                          >
                            <Github size={11} />
                            <span>Source Code</span>
                          </a>
                        )}
                        <a
                          href="#chat"
                          className="inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors"
                        >
                          <span>Ask AI</span>
                          <ExternalLink size={11} />
                        </a>
                        {isPrivate && (
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500 hidden sm:inline">
                            • Confidential
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                        #0{project.id}
                      </span>
                    </div>
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
