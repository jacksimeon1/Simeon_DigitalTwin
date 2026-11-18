'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { ArrowLeft, Lock, Sparkles, User, AlertCircle, Check } from 'lucide-react';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const rawCallbackUrl = searchParams.get('callbackUrl') || '/';
  const callbackUrl = rawCallbackUrl.includes('/auth/signin') ? '/' : rawCallbackUrl;

  const [isLoading, setIsLoading] = useState(false);
  const [guestName, setGuestName] = useState('');

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await signIn('guest', {
        name: guestName.trim() || 'Guest Visitor',
        callbackUrl,
        redirect: false,
      });

      if (res?.ok) {
        const destination = res.url || callbackUrl || '/';
        window.location.replace(destination);
      } else {
        console.error('Guest sign-in failed:', res?.error);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Guest sign-in error:', err);
      window.location.replace(callbackUrl || '/');
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" style={{ background: '#09090b' }}>
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Sign-in Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Back button */}
        <button
          onClick={() => router.push('/')}
          className="mb-6 inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>

        <div className="rounded-xl border border-white/[0.08] bg-[#111115]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl shadow-purple-950/20">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-400">
              <Lock size={18} />
            </div>
            <h1 className="text-lg font-bold text-white mb-1">Authentication Required</h1>
            <p className="text-xs text-neutral-400">Connect to access the AI Digital Twin</p>
          </div>

          {/* OAuth Error Notification */}
          {error && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-5 text-left">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="text-amber-400 shrink-0 mt-0.5" size={16} />
                <div className="text-[11px] text-amber-200 leading-relaxed">
                  <p className="font-semibold text-amber-300">Sign-in Notice</p>
                  <p>
                    If Google sign-in was interrupted, you can use <strong>Instant Guest Access</strong> below immediately without keys.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Guest Access Form */}
          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-[11px] font-medium text-neutral-300 mb-1.5 flex items-center gap-1.5">
                <User size={13} className="text-neutral-400" />
                <span>Your Name (Optional)</span>
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Recruiter, Visitor, Peer"
                className="w-full bg-[#09090c] border border-white/[0.1] rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/40 transition-colors"
              />
            </div>

            <button
              onClick={handleGuestSignIn}
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-600/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>{isLoading ? 'Connecting...' : 'Continue as Guest (Instant Access)'}</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider">or sign in with</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Google Sign-in button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-200 hover:text-white border border-white/[0.1] text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Unlocked features */}
          <div className="mt-6 pt-5 border-t border-white/[0.06]">
            <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
              Available in Session:
            </p>
            <ul className="space-y-1.5 text-[11px] text-neutral-400">
              <li className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400" />
                <span>Full Groq-powered AI conversational assistant</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400" />
                <span>Voice input & speech synthesis support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check size={12} className="text-emerald-400" />
                <span>Multi-language translation presets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white bg-[#09090b]">Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
