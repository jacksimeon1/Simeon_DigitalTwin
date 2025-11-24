'use client';

import { ArrowRight, Sparkles, Code2, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="relative w-full px-4 py-16 bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animate-morph"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000 animate-wave"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000 animate-glow-pulse"></div>
        
        {/* Additional morphing shapes */}
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-10 animate-morph animate-bounce-3d"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 opacity-10 animate-morph animate-wave" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center md:text-left">
          {/* Greeting with animation */}
          <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg mb-4 flex items-center justify-center md:justify-start animate-slide-down">
            <span className="inline-block mr-2 text-2xl animate-float">👋</span> Welcome to my Digital Twin
          </p>

          {/* Main Headline with animated gradient */}
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 leading-tight animate-scale-in animate-neon-flicker" style={{backgroundSize: '200% 200%', animation: 'gradientShift 3s ease infinite, scale-in 0.8s ease-out, neon-flicker 1.5s ease-in-out infinite'}}>
            Robert Simeon Jr.
          </h1>

          {/* Profile Picture Frame */}
          <div className="flex justify-center md:justify-end mb-6 animate-slide-up absolute top-0 right-0" style={{animationDelay: '0.1s'}}>
            <div className="relative group">
              {/* Animated glow ring */}
              <div className="absolute inset-0 w-48 h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse opacity-75 blur-lg group-hover:opacity-100 transition-opacity"></div>
              
              {/* Rotating border ring */}
              <div className="absolute inset-0 w-48 h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full animate-spin-slow opacity-50 group-hover:animate-spin-fast transition-all duration-300"></div>
              
              {/* Main frame */}
              <div className="relative w-48 h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-full p-1 group-hover:scale-105 transition-transform duration-300">
                {/* Inner circle for picture */}
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-slate-200 dark:border-slate-700">
                  {/* Placeholder icon or image goes here */}
                  <div className="text-5xl font-bold text-slate-400 dark:text-slate-600">
                    👨‍💻
                  </div>
                  {/* Uncomment below when you have your image */}
                  {/* <img 
                    src="/your-photo.jpg" 
                    alt="Robert Simeon Jr" 
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              </div>
              
              {/* Floating particles around frame */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-bounce-3d opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full animate-wave opacity-60" style={{animationDelay: '0.5s'}}></div>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-4 font-semibold animate-slide-in-right" style={{animationDelay: '0.2s'}}>
            4th Year IT Student @ SPUP
          </p>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            Information Technology student at St. Paul University Philippines (SPUP). 
            Specializing in information systems and software development with a focus on 
            creating practical solutions for real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start animate-slide-up" style={{animationDelay: '0.3s'}}>
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 group"
            >
              <Sparkles className="mr-2 group-hover:animate-spin" size={16} />
              View My Projects
              <ArrowRight className="ml-2 group-hover:translate-x-1" size={16} />
            </a>
            <a
              href="#chat"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-400 group"
            >
              <Code2 className="mr-2 group-hover:scale-110" size={16} />
              Chat with AI Assistant
            </a>
          </div>

          {/* Stats with enhanced cards */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto md:mx-0">
            {[
              { label: 'Projects', value: '10+', icon: '📁', color: 'blue' },
              { label: 'Skills', value: '15+', icon: '🎯', color: 'purple' },
              { label: 'Dedicated', value: '100%', icon: '⚡', color: 'pink' }
            ].map((stat, idx) => (
              <div
                key={stat.label}
                className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-3 rounded-lg hover:shadow-lg dark:hover:shadow-blue-500/20 transition-all cursor-pointer transform hover:-translate-y-1 animate-slide-up"
                style={{animationDelay: `${0.4 + idx * 0.1}s`}}
              >
                <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">{stat.value}</p>
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
