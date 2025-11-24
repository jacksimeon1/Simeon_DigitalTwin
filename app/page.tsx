'use client';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ChatSection from './components/ChatSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Test element to verify dark mode */}
      <div className="fixed top-20 right-4 z-50 p-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white rounded-lg">
        <p>Theme Test</p>
        <p className="text-xs">This should change colors</p>
      </div>
      
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Projects />
        <Skills />
        <ChatSection />
      </main>
      <Footer />
    </div>
  );
}
