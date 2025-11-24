'use client';

import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ChatSection from './components/ChatSection';
import ContactForm from './components/ContactForm';
import ResumeSection from './components/ResumeSection';
import Footer from './components/Footer';
import ParticleEffects from './components/ParticleEffects';
import MatrixRain from './components/MatrixRain';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 relative">
      <ParticleEffects />
      <MatrixRain />
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Projects />
        <Skills />
        <ResumeSection />
        <ContactForm />
        <ChatSection />
      </main>
      <Footer />
    </div>
  );
}
