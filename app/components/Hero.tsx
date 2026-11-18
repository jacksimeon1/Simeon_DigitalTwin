'use client';

import { ArrowRight, Sparkles, Code2, GraduationCap } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Hero() {
  return (
    <section id="about" className="relative w-full px-4 pt-20 pb-10 sm:pt-24 sm:pb-12 lg:pt-20 lg:pb-10 min-h-screen flex items-center overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      {/* Subtle decorative glow elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-10 w-72 h-72 bg-purple-500/10 dark:bg-purple-600 rounded-full mix-blend-screen filter blur-[130px] opacity-[0.08]" />
        <div className="absolute top-32 right-10 w-72 h-72 bg-indigo-500/10 dark:bg-indigo-600 rounded-full mix-blend-screen filter blur-[130px] opacity-[0.06]" />

        {/* Minimalist dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10 max-w-lg mx-auto lg:mx-0">
            {/* Tagline */}
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] sm:text-xs font-semibold mb-4 backdrop-blur-md shadow-xs tracking-wide text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>Available for Work & Client Projects • 🇵🇭 Philippines</span>
              </div>
            </ScrollReveal>

            {/* Main Headline */}
            <ScrollReveal animation="fade-up" delay={0.25}>
              <h1
                className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-6xl font-bold tracking-[-0.04em] mb-3 leading-[1.08] select-none break-words"
                style={{ fontFamily: 'var(--font-display), var(--font-heading), ui-sans-serif, system-ui, sans-serif' }}
              >
                <span className="hero-name-gradient inline-block drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  Robert Simeon Jr
                </span>
                <span className="text-purple-500 dark:text-purple-400 animate-pulse">.</span>
              </h1>
            </ScrollReveal>

            {/* Subtitle */}
            <ScrollReveal animation="fade-up" delay={0.4}>
              <p className="text-xs sm:text-sm md:text-base mb-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1.5">
                <span
                  className="font-bold tracking-wider uppercase text-purple-700 dark:text-purple-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif', letterSpacing: '0.12em' }}
                >
                  Full-Stack Software Developer
                </span>
                <span className="hidden sm:inline-block w-px h-4 bg-purple-400/40 dark:bg-purple-500/30 rounded-full" />
                <span className="text-neutral-700 dark:text-neutral-200 font-medium tracking-wide text-xs sm:text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{ letterSpacing: '0.04em' }}>
                  Philippines 🇵🇭
                </span>
              </p>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal animation="fade-up" delay={0.55}>
              <p
                className="text-xs sm:text-base md:text-lg text-neutral-800 dark:text-neutral-200 mb-4 sm:mb-5 leading-[1.7] sm:leading-[1.8] font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'var(--font-sans), ui-sans-serif, system-ui, sans-serif' }}
              >
                Passionate about developing software that solves real-world challenges.
              </p>
            </ScrollReveal>

            {/* CTA Buttons */}
            <ScrollReveal animation="fade-up" delay={0.7} className="w-full">
              <div className="flex flex-col xs:flex-row flex-wrap gap-2.5 justify-center lg:justify-start w-full">
                <a
                  href="#projects"
                  className="font-heading inline-flex items-center justify-center px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-95 text-xs sm:text-sm gap-2 cursor-pointer w-full xs:w-auto"
                >
                  <Sparkles size={16} className="text-purple-200 shrink-0" />
                  <span>Explore Work</span>
                  <ArrowRight size={16} className="shrink-0" />
                </a>

                <a
                  href="#chat"
                  className="font-heading inline-flex items-center justify-center px-4.5 py-3 bg-neutral-900/60 dark:bg-white/[0.06] hover:bg-neutral-900/80 dark:hover:bg-white/[0.12] text-white font-semibold rounded-xl transition-all border border-neutral-700/60 dark:border-white/15 text-xs sm:text-sm gap-2 cursor-pointer backdrop-blur-md hover:scale-[1.02] active:scale-95 shadow-md w-full xs:w-auto"
                >
                  <Code2 size={16} className="text-purple-400 shrink-0" />
                  <span>Chat with Digital Twin</span>
                </a>

                <a
                  href="#resume"
                  className="font-heading inline-flex items-center justify-center px-4 py-2.5 text-neutral-700 hover:text-purple-600 dark:text-neutral-300 dark:hover:text-purple-300 text-xs sm:text-sm font-semibold transition-colors w-full xs:w-auto"
                >
                  <span>View Resume →</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Education Highlight Card */}
            <ScrollReveal animation="scale-in" delay={0.85} className="w-full max-w-[540px] mt-4">
              <div className="p-3.5 sm:p-5 rounded-xl border border-neutral-300/80 dark:border-white/10 bg-white/70 dark:bg-[#111116]/80 backdrop-blur-md transition-all duration-300 hover:border-purple-500/40 hover:bg-white/90 dark:hover:bg-[#16161d] shadow-sm dark:shadow-none flex flex-col xs:flex-row items-center xs:items-start text-center xs:text-left gap-3 sm:gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 dark:bg-purple-500/15 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-xs sm:text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
                    Graduated with a <span className="font-semibold text-neutral-900 dark:text-white">Bachelor of Science in Information Technology (BSIT)</span> from <span className="font-semibold text-neutral-900 dark:text-white">St. Paul University Philippines</span> in <span className="font-semibold text-purple-600 dark:text-purple-400">June 2026</span>, equipped with a strong foundation in software development, problem-solving, and emerging technologies.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Profile Showcase */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative z-10 mt-2 lg:mt-0">
            <ScrollReveal animation="scale-in" delay={0.5} duration={0.8}>
              <div className="relative group">
                {/* Ambient radial cosmic glow */}
                <div className="absolute -inset-3 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-purple-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-80" />

                {/* Glassmorphic card frame */}
                <div className="relative rounded-2xl sm:rounded-3xl p-2.5 sm:p-3 bg-white/70 dark:bg-[#0c0c11]/80 backdrop-blur-xl border border-neutral-300/80 dark:border-white/10 shadow-2xl shadow-purple-950/30 transition-all duration-500 hover:border-purple-500/40 hover:scale-[1.02]">
                  {/* Photo container */}
                  <div className="relative w-40 h-40 xs:w-48 xs:h-48 sm:w-52 sm:h-52 md:w-56 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-white/10">
                    <img
                      src="/robert_.jpg"
                      alt="Robert Simeon Jr"
                      className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04] group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Subtle inner bottom gradient overlay for badge contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Corner status chip */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-2 sm:px-2.5 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-[10px] sm:text-[11px] font-medium text-white shadow-lg">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-neutral-200 text-[10px] sm:text-[10.5px]">Open to Work</span>
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-purple-300 font-semibold tracking-wider uppercase">BSIT '26</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
