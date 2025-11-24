'use client';

import { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate form submission (replace with actual email service)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Get In Touch
            </h2>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 animate-scale-in border border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                <User className="inline w-4 h-4 mr-2" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                <Mail className="inline w-4 h-4 mr-2" />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400"
                placeholder="john@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="group">
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-400 transition-colors">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-400 resize-none"
                placeholder="Tell me about your project or just say hello..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-slide-up">
              <p className="text-green-700 dark:text-green-300 text-center">
                ✅ Message sent successfully! I'll get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-up">
              <p className="text-red-700 dark:text-red-300 text-center">
                ❌ Failed to send message. Please try again later.
              </p>
            </div>
          )}
        </div>

        {/* Alternative Contact Methods */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Or reach out directly:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:robert.simeon@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              robert.simeon@example.com
            </a>
            <a
              href="https://linkedin.com/in/robert-simeon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
