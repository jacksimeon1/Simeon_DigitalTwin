'use client';

import { Sparkles, Mic, Volume2 } from 'lucide-react';
import Chatbot from './Chatbot';

export default function ChatSection() {
  return (
    <section id="chat" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-3xl animate-bounce">✨</span>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Interactive Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Chat with Robert's AI Assistant
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-3 text-lg">
            Powered by <span className="font-semibold text-blue-600 dark:text-blue-400">Groq AI</span> with intelligent voice recognition and text-to-speech support
          </p>
          <p className="text-center text-slate-500 dark:text-slate-400 text-sm flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2">💬 <span>Type to chat</span></span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-2">🎤 <span>Speak naturally</span></span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-2">🔊 <span>Listen to responses</span></span>
          </p>
        </div>

        {/* Chatbot */}
        <div className="h-[600px] mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <Chatbot />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.3s'}}>
          {[
            {
              icon: Sparkles,
              title: 'AI Powered',
              description: "Groq's fastest LLM technology for instant responses",
              color: 'from-blue-600 to-cyan-600',
              iconColor: 'text-blue-600',
              bgColor: 'bg-blue-50 dark:bg-blue-900/20'
            },
            {
              icon: Mic,
              title: 'Voice Input',
              description: 'Speak your questions naturally with speech recognition',
              color: 'from-purple-600 to-pink-600',
              iconColor: 'text-purple-600',
              bgColor: 'bg-purple-50 dark:bg-purple-900/20'
            },
            {
              icon: Volume2,
              title: 'Voice Output',
              description: 'Listen to AI responses with text-to-speech technology',
              color: 'from-pink-600 to-rose-600',
              iconColor: 'text-pink-600',
              bgColor: 'bg-pink-50 dark:bg-pink-900/20'
            }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group p-6 rounded-2xl ${feature.bgColor} border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer animate-slide-up`}
                style={{animationDelay: `${0.4 + idx * 0.1}s`}}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 text-lg">{feature.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/20 dark:to-purple-600/20 border border-blue-200/50 dark:border-blue-500/20 text-center animate-slide-up" style={{animationDelay: '0.6s'}}>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <span className="font-semibold">Start chatting now!</span> Ask me about my projects, skills, experience, or anything else you'd like to know.
          </p>
          <div className="text-sm text-slate-500 dark:text-slate-400">
            💡 Pro tip: Try asking about my "In-Off Campus Activity Scheduling System" project!
          </div>
        </div>
      </div>
    </section>
  );
}
