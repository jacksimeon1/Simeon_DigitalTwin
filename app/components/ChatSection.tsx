'use client';

import Chatbot from './Chatbot';

export default function ChatSection() {
  return (
    <section id="chat" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
          Chat with Robert's AI Assistant
        </h2>
        <p className="text-center text-slate-600 mb-4">
          Powered by Groq AI with intelligent voice recognition and text-to-speech support
        </p>
        <p className="text-center text-slate-500 text-sm mb-12">
          💬 Type to chat | 🎤 Click the mic to speak | 🔊 AI will speak responses
        </p>

        <div className="h-[600px]">
          <Chatbot />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-blue-600 mb-2">🤖 AI Powered</h3>
            <p className="text-sm text-slate-600">Groq's fastest LLM technology for instant responses</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-purple-600 mb-2">🎤 Voice Input</h3>
            <p className="text-sm text-slate-600">Speak your questions naturally with speech recognition</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-pink-600 mb-2">🔊 Voice Output</h3>
            <p className="text-sm text-slate-600">Listen to AI responses with text-to-speech technology</p>
          </div>
        </div>
      </div>
    </section>
  );
}
