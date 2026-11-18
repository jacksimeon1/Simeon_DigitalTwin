'use client';

import { Sparkles, Mic, Volume2, Lock, Bot } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Chatbot from './Chatbot';
import HydrationSafeButton from './HydrationSafeButton';

export default function ChatSection() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const isSignedIn = !!session?.user;

  return (
    <section id="chat" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      {/* Glow highlight behind chat */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3 tracking-wide shadow-sm">
            <Bot size={13} className="text-purple-600 dark:text-purple-400" />
            <span>AI DIGITAL TWIN</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
            Interactive AI Conversation
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto text-xs leading-relaxed">
            Trained on Robert Simeon Jr.'s knowledge base, projects, technical experience, and background.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
            <span className="flex items-center gap-1.5"><Sparkles size={11} className="text-purple-600 dark:text-purple-400" /> Ultra-fast Inference</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Mic size={11} className="text-indigo-600 dark:text-indigo-400" /> Speech Recognition</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Volume2 size={11} className="text-emerald-600 dark:text-emerald-400" /> Audio Playback</span>
          </div>
        </div>

        {/* Chat Content */}
        {isLoading ? (
          <div className="h-[520px] flex items-center justify-center rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111115]/80 shadow-sm dark:shadow-none">
            <div className="text-center">
              <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin mx-auto mb-3" />
              <p className="text-xs text-neutral-600 dark:text-neutral-400">Initializing digital twin session...</p>
            </div>
          </div>
        ) : isSignedIn ? (
          <div className="h-[540px] mb-8 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111115]/80 backdrop-blur-md overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-purple-950/20">
            <Chatbot />
          </div>
        ) : (
          <div className="h-[460px] flex items-center justify-center rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111115]/80 backdrop-blur-md p-6 shadow-sm dark:shadow-none">
            <div className="max-w-sm w-full text-center">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center mx-auto mb-4 text-purple-600 dark:text-purple-400">
                <Lock size={20} />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Sign In to Start Chatting
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                Authenticate with Google or proceed as a Guest for immediate instant access to the AI digital assistant.
              </p>

              <div className="space-y-2.5">
                <HydrationSafeButton
                  onClick={() => signIn('guest', { callbackUrl: '/#chat' })}
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-md shadow-purple-600/20 flex items-center justify-center gap-2"
                >
                  <Sparkles size={13} />
                  <span>Instant Guest Access</span>
                </HydrationSafeButton>

                <HydrationSafeButton
                  onClick={() => signIn('google', { callbackUrl: '/#chat' })}
                  className="w-full py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/[0.1] text-neutral-800 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Sign in with Google</span>
                </HydrationSafeButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
