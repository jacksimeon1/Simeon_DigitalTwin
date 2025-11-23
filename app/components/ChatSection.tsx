'use client';

import { Sparkles, Mic, Volume2, Lock } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Chatbot from './Chatbot';

export default function ChatSection() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isSignedIn = !!session?.user;

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

        {/* Chat Content */}
        {isLoading ? (
          <div className="h-[600px] flex items-center justify-center animate-slide-up">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">Loading...</p>
            </div>
          </div>
        ) : isSignedIn ? (
          <>
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
          </>
        ) : (
          // Sign-in prompt
          <div className="h-[600px] flex items-center justify-center animate-slide-up">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 max-w-md w-full shadow-2xl border border-slate-100 dark:border-slate-700">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Chat Requires Sign-In
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                  To access the AI Chat Assistant and enjoy voice features, please sign in with your Google account.
                </p>

                <button
                  onClick={() => signIn('google', { callbackUrl: '#chat' })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group mb-4"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Don't have a Google account?{' '}
                  <a
                    href="https://accounts.google.com/signup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Create one
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
