'use client';

import dynamic from 'next/dynamic';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import ResumeSection from './components/ResumeSection';
import Footer from './components/Footer';

const ThreeBackground = dynamic(() => import('./components/ThreeBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen relative bg-[var(--surface)] text-[var(--text-primary)] transition-colors duration-300 overflow-x-clip">
      <ThreeBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <ResumeSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

