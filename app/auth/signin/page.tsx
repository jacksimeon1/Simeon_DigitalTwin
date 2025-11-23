'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Chrome, Mail, ArrowLeft, Lock } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = '/';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Sign-in Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>

        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl animate-slide-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sign In Required</h1>
            <p className="text-slate-400">Access the AI Chat Assistant</p>
          </div>

          {/* Info box */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-200">
              🔒 To access the AI Chat Assistant, please sign in with your Google account. Your information is secure and only used for authentication.
            </p>
          </div>

          {/* Sign-in button */}
          <button
            onClick={() => {
              setIsLoading(true);
              signIn('google', { callbackUrl });
            }}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            <Chrome size={20} className="group-hover:rotate-180 transition-transform" />
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-xs text-slate-500">OR</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Email sign-in alternative */}
          <p className="text-center text-sm text-slate-400">
            Currently only Google Sign-In is available
          </p>

          {/* Features list */}
          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <h3 className="text-sm font-semibold text-white mb-4">After signing in, you can:</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-0.5">✓</span>
                <span>Chat with Robert's AI Assistant powered by Groq</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-0.5">✓</span>
                <span>Use voice input to ask questions naturally</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-0.5">✓</span>
                <span>Listen to AI responses with text-to-speech</span>
              </li>
            </ul>
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-slate-500 mt-8 text-center">
            Your privacy is important. We only collect your name and email for authentication.
          </p>
        </div>

        {/* Footer text */}
        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have a Google account?{' '}
          <a
            href="https://accounts.google.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Create one for free
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
