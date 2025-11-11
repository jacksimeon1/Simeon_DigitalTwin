'use client';

import { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">RSJ</span>
            </div>
            <span className="hidden sm:inline font-semibold text-slate-900">Robert Simeon Jr.</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="text-slate-600 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="#projects" className="text-slate-600 hover:text-blue-600 transition">
              Projects
            </Link>
            <Link href="#skills" className="text-slate-600 hover:text-blue-600 transition">
              Skills
            </Link>
            <Link href="#chat" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition">
              Chat with AI
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-600 hover:text-blue-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <Link href="#about" className="block py-2 text-slate-600 hover:text-blue-600">
              About
            </Link>
            <Link href="#projects" className="block py-2 text-slate-600 hover:text-blue-600">
              Projects
            </Link>
            <Link href="#skills" className="block py-2 text-slate-600 hover:text-blue-600">
              Skills
            </Link>
            <Link href="#chat" className="block py-2 text-blue-600 font-semibold">
              Chat with AI
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
