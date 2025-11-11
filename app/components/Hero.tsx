'use client';

import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative w-full px-4 py-20 sm:py-32 md:py-40 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          {/* Greeting */}
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-4 flex items-center justify-center md:justify-start">
            <span className="inline-block mr-2">👋</span> Welcome to my Digital Twin
          </p>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 leading-tight">
            Robert Simeon Jr.
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 mb-4 font-semibold">
            4th Year IT Student @ SPUP
          </p>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed">
            Information Technology student at St. Paul University Philippines (SPUP). 
            Specializing in information systems and software development with a focus on 
            creating practical solutions for real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              View My Projects
              <ArrowRight className="ml-2" size={20} />
            </a>
            <a
              href="#chat"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700"
            >
              Chat with AI Assistant
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-md mx-auto md:mx-0">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">15+</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Skills</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-3xl font-bold text-pink-600 dark:text-pink-400">100%</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Dedicated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
