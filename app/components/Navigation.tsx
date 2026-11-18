'use client';

import { useState, useEffect, useRef } from 'react';
import { Sparkles, LogOut, Sun, Moon, Menu, X, Bot, Minus } from 'lucide-react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from '../ThemeProvider';
import HydrationSafeButton from './HydrationSafeButton';
import Chatbot from './Chatbot';

function UserAvatar({ src, name }: { src?: string | null; name?: string | null }) {
  const [imageError, setImageError] = useState(false);
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || 'U';

  if (!src || imageError) {
    return (
      <span
        className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shadow-xs ring-1 ring-purple-500/50 select-none shrink-0"
        title={name || 'Signed in'}
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name || 'User'}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => setImageError(true)}
      className="w-6 h-6 rounded-full ring-1 ring-purple-500/50 object-cover shrink-0"
      title={name || 'Signed in'}
    />
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(window.scrollY / totalScroll, 1));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for #chat links or hash changes to trigger the floating chat
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#chat') {
        setChatOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);

    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href="#chat"]');
      if (target) {
        e.preventDefault();
        setChatOpen(true);
      }
    };
    document.addEventListener('click', handleClick);

    if (window.location.hash === '#chat') {
      setChatOpen(true);
    }

    return () => {
      window.removeEventListener('hashchange', handleHash);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  // Close floating chat on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setChatOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Global Section Scroll Progress Glow Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-neutral-900/10 dark:bg-white/[0.05]">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-75 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 pointer-events-none transition-all duration-300">
        {/* Floating Centered Pill Navbar */}
        <nav
          className={`pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-300 max-w-[calc(100vw-1rem)] ${
            scrolled
              ? 'shadow-xl shadow-black/10 dark:shadow-black/50 border-neutral-300/80 dark:border-white/15 bg-white/95 dark:bg-[#0c0c11]/90 backdrop-blur-2xl scale-[0.98]'
              : 'shadow-lg shadow-black/5 dark:shadow-black/30 border-neutral-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0e0e14]/85 backdrop-blur-xl'
          }`}
        >
          {/* Centered Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-0.5 sm:gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-[13px] font-medium tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-white px-2.5 sm:px-3 py-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* AI Chatbot Button in Navbar */}
          <HydrationSafeButton
            onClick={() => setChatOpen(!chatOpen)}
            className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              chatOpen
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 scale-[1.02]'
                : 'text-purple-700 dark:text-purple-300 hover:text-white bg-purple-50 hover:bg-purple-600 dark:bg-purple-500/10 dark:hover:bg-purple-600 border border-purple-500/25 hover:border-transparent hover:shadow-md hover:shadow-purple-600/20'
            }`}
            aria-label="Toggle AI Digital Twin Chat"
            title="Chat with Robert's AI Digital Twin"
          >
            <Bot size={14} className={chatOpen ? 'text-white' : 'text-purple-600 dark:text-purple-400'} />
            <span className="font-semibold hidden xs:inline">AI Twin</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </HydrationSafeButton>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center">
            <HydrationSafeButton
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </HydrationSafeButton>
          </div>

          {/* Vertical Divider */}
          <div className="w-px h-4 bg-neutral-300 dark:bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

          {/* Sign In / User Profile */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {session?.user ? (
              <div className="flex items-center gap-1.5 pl-1">
                <UserAvatar src={session.user.image} name={session.user.name} />
                <HydrationSafeButton
                  onClick={() => signOut()}
                  className="p-1.5 rounded-full text-neutral-500 hover:text-red-500 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={14} />
                </HydrationSafeButton>
              </div>
            ) : (
              <HydrationSafeButton
                onClick={() => signIn()}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white shadow-md shadow-purple-600/25 hover:shadow-purple-600/40 hover:scale-[1.03] active:scale-95 transition-all duration-200"
              >
                <Sparkles size={12} className="text-purple-200" />
                <span>Sign In</span>
              </HydrationSafeButton>
            )}

            {/* Theme Toggle Button */}
            <HydrationSafeButton
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-neutral-100 dark:hover:bg-white/10 transition-all duration-200"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={15} className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon size={15} className="text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
              )}
            </HydrationSafeButton>
          </div>
        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="pointer-events-auto mt-2 w-[calc(100vw-2rem)] max-w-xs p-3 rounded-2xl border border-neutral-200/90 dark:border-white/10 bg-white/95 dark:bg-[#0e0e14]/95 backdrop-blur-2xl shadow-2xl animate-slide-down flex flex-col gap-1.5 text-center md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-purple-600 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.08] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <HydrationSafeButton
              onClick={() => {
                setMobileOpen(false);
                setChatOpen(true);
              }}
              className="py-2.5 px-3 text-xs font-semibold text-purple-600 dark:text-purple-400 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-500/20 flex items-center justify-center gap-2 hover:bg-purple-100 dark:hover:bg-purple-500/20 transition-all"
            >
              <Bot size={15} />
              <span>Chat with AI Digital Twin</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </HydrationSafeButton>
          </div>
        )}
      </header>

      {/* Persistent Floating Bottom-Right Launcher Button */}
      {!chatOpen && (
        <HydrationSafeButton
          onClick={() => setChatOpen(true)}
          className="fixed bottom-4 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-2xl shadow-purple-950/40 hover:shadow-purple-600/50 hover:scale-[1.04] active:scale-95 transition-all duration-300 border border-white/20 group cursor-pointer"
          aria-label="Open AI Digital Twin Chat"
          title="Chat with Robert's AI Digital Twin"
        >
          <div className="relative">
            <Bot size={17} className="text-white group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="hidden sm:inline font-bold tracking-wide">Chat with AI Twin</span>
          <span className="sm:hidden font-bold">AI Twin</span>
        </HydrationSafeButton>
      )}

      {/* AI Chatbot Floating Window docked at Bottom-Right on Desktop, Bottom Sheet on Mobile */}
      {chatOpen && (
        <>
          {/* Backdrop overlay on mobile */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 md:hidden pointer-events-auto"
            onClick={() => setChatOpen(false)}
          />

          <div
            ref={chatWindowRef}
            className="fixed inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-4 sm:right-5 sm:left-auto w-full sm:w-[440px] md:w-[470px] h-[82dvh] sm:h-[560px] max-h-[calc(100dvh-4.5rem)] z-50 flex flex-col rounded-t-2xl sm:rounded-2xl border border-neutral-200/90 dark:border-white/15 bg-white dark:bg-[#0c0c11] backdrop-blur-2xl shadow-2xl shadow-purple-950/40 overflow-hidden animate-slide-up pointer-events-auto"
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-10 h-1 bg-neutral-300 dark:bg-white/20 rounded-full mx-auto my-1.5 sm:hidden shrink-0" />
            {/* Control Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-100/90 dark:bg-[#15151c] border-b border-neutral-200 dark:border-white/10 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-neutral-900 dark:text-white">Robert's AI Digital Twin</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 font-semibold">
                  Online
                </span>
              </div>

              <div className="flex items-center gap-1">
                <HydrationSafeButton
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/10 transition-colors"
                  aria-label="Minimize Chat"
                  title="Minimize"
                >
                  <Minus size={15} />
                </HydrationSafeButton>
                <HydrationSafeButton
                  onClick={() => setChatOpen(false)}
                  className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-white/10 transition-colors"
                  aria-label="Close Chat"
                  title="Close (Esc)"
                >
                  <X size={15} />
                </HydrationSafeButton>
              </div>
            </div>

            {/* Chat Content Body */}
            <div className="flex-1 overflow-hidden relative">
              {session?.user ? (
                <Chatbot />
              ) : (
                <div className="h-full flex items-center justify-center p-6 text-center">
                  <div className="max-w-xs w-full">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center mx-auto mb-3 text-purple-600 dark:text-purple-400">
                      <Bot size={22} />
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-1.5">
                      Sign In to Chat
                    </h4>
                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed mb-5">
                      Authenticate with Google or proceed as a Guest for immediate instant access to the AI digital assistant.
                    </p>

                    <div className="space-y-2">
                      <HydrationSafeButton
                        onClick={() => signIn('guest')}
                        className="w-full py-2.5 px-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Sparkles size={13} />
                        <span>Instant Guest Access</span>
                      </HydrationSafeButton>

                      <HydrationSafeButton
                        onClick={() => signIn('google')}
                        className="w-full py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-neutral-300 dark:border-white/[0.1] text-neutral-800 dark:text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
          </div>
        </>
      )}
    </>
  );
}
