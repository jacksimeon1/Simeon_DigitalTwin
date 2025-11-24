'use client';

import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative w-full px-4 py-20 sm:py-32 md:py-40 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          {/* Greeting with animation */}
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-4 flex items-center justify-center md:justify-start animate-slide-down">
            <span className="inline-block mr-2 text-2xl animate-float">👋</span> Welcome to my Digital Twin
          </p>

          {/* Main Headline with animated gradient */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 leading-tight animate-slide-up" style={{backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite'}}>
            Robert Simeon Jr.
          </h1>

          {/* Subtitle */}
          <p className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-300 mb-4 font-semibold animate-slide-up" style={{animationDelay: '0.1s'}}>
            4th Year IT Student @ SPUP
          </p>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Information Technology student at St. Paul University Philippines (SPUP). 
            Specializing in information systems and software development with a focus on 
            creating practical solutions for real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '0.3s'}}>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group"
            >
              <Sparkles className="mr-2 group-hover:animate-spin" size={20} />
              View My Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1" size={20} />
            </a>
            <a
              href="#chat"
              className="inline-flex items-center justify-center px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400 group"
            >
              <Code2 className="mr-2 group-hover:scale-110" size={20} />
              Chat with AI Assistant
            </a>
          </div>

          {/* Stats with enhanced cards */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-md mx-auto md:mx-0">
            {[
              { label: 'Projects', value: '10+', icon: '📁', color: 'blue' },
              { label: 'Skills', value: '15+', icon: '🎯', color: 'purple' },
              { label: 'Dedicated', value: '100%', icon: '⚡', color: 'pink' }
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg hover:shadow-lg dark:hover:shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-1 animate-slide-up"
                style={{animationDelay: `${0.4 + idx * 0.1}s`}}
              >
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{stat.value}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Additional features highlight */}
          <div className="mt-16 grid sm:grid-cols-3 gap-6 max-w-3xl animate-slide-up" style={{animationDelay: '0.7s'}}>
            {[
              { title: 'Full-Stack', description: 'Frontend to Backend', icon: '🚀' },
              { title: 'AI-Powered', description: 'Groq Integration', icon: '🤖' },
              { title: 'Responsive', description: 'Mobile-First Design', icon: '📱' }
            ].map((feature) => (
              <div key={feature.title} className="group text-center p-4 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all">
                <p className="text-3xl mb-2 group-hover:scale-125 transition-transform">{feature.icon}</p>
                <p className="font-semibold text-slate-900 dark:text-white">{feature.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
