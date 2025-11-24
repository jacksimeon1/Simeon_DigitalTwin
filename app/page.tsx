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
