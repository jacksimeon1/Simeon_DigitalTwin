'use client';

import { ExternalLink, Github, Star, TrendingUp } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'In-Off Campus Activity Scheduling Information System',
    description:
      'A comprehensive web-based system for managing and scheduling both on-campus and off-campus activities. Enables efficient event planning, participant registration, and resource allocation for educational institutions. Built with modern full-stack technologies.',
    tags: ['Information Systems', 'Database Design', 'Web Development'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'E-Bayo',
    description:
      'A modern ecommerce website platform designed for seamless online shopping experiences. Features product catalog management, secure payment processing, user authentication, shopping cart functionality, and order tracking. Built with responsive design and optimized for performance.',
    tags: ['E-commerce', 'React', 'Node.js', 'MongoDB', 'Payment Integration'],
    link: '#',
    github: '#',
    featured: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="text-blue-600" size={24} />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Projects & Showcase
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            Here are some of my recent projects that showcase my skills in full-stack development and problem-solving.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group animate-slide-up"
              style={{animationDelay: `${idx * 0.2}s`}}
            >
              {/* Card Container */}
              <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden h-full flex flex-col transform-gpu hover:scale-105 hover:rotate-1 perspective-1000 hover-lift hover-glow">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold group-hover:scale-110 transition-transform">
                    <Star size={14} fill="currentColor" />
                    Featured
                  </div>
                )}

                {/* Project Image/Header */}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500 flex items-center justify-center overflow-hidden">
                  {/* 3D Rotating Elements */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-20 h-20 bg-white/10 rounded-full animate-spin-slow group-hover:animate-spin-fast"></div>
                    <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full animate-spin-reverse group-hover:animate-spin-reverse-fast"></div>
                    <div className="absolute w-12 h-12 bg-purple-400/20 rounded-full animate-spin-slow group-hover:animate-spin-fast"></div>
                  </div>
                  
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent animate-pulse"></div>
                  </div>
                  
                  {/* Content with 3D effect */}
                  <div className="relative text-center text-white px-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 preserve-3d">
                    <p className="text-sm font-semibold opacity-75 mb-2 group-hover:opacity-100 transition-opacity">Project Showcase</p>
                    <p className="text-3xl font-bold transform group-hover:rotate-180 transition-transform duration-1000">📋</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Title */}
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIdx) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-600 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full hover:scale-105 transition-transform"
                        style={{transitionDelay: `${tagIdx * 50}ms`}}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {project.link && (
                      <a
                        href={project.link}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group/link transition-colors"
                      >
                        <ExternalLink size={16} className="group-hover/link:translate-x-0.5 transition-transform" />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group/link transition-colors"
                      >
                        <Github size={16} className="group-hover/link:rotate-180 transition-transform" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 pt-16 border-t border-slate-200 dark:border-slate-700 text-center animate-slide-up" style={{animationDelay: '0.4s'}}>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">More Projects Coming Soon</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">I'm actively working on more exciting projects. Stay tuned for updates!</p>
          <div className="flex gap-4 justify-center">
            <a
              href="#chat"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Chat with me
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg hover:border-blue-400 dark:hover:border-blue-400 transition-all hover:scale-105"
            >
              Visit GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
