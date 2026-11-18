'use client';

import { useState } from 'react';
import { Mail, Send, User, MessageSquare, Check, AlertCircle, ExternalLink } from 'lucide-react';
import HydrationSafeButton from './HydrationSafeButton';
import HydrationSafeInput from './HydrationSafeInput';
import HydrationSafeTextarea from './HydrationSafeTextarea';
import ScrollReveal from './ScrollReveal';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/robertsimeon12345@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Inquiry from ${formData.name}`,
          _replyto: formData.email,
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const result = await response.json().catch(() => ({}));

      // Check if FormSubmit one-time activation is required
      if (
        result?.message &&
        typeof result.message === 'string' &&
        result.message.toLowerCase().includes('activation')
      ) {
        setSubmitStatus('success');
        setStatusMessage(
          'Message recorded! FormSubmit sent a one-time activation email to robertsimeon12345@gmail.com. Check your Gmail inbox/spam and click "Activate Form" once to enable instant delivery.'
        );
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      if (result?.success === 'true' || result?.success === true || response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Message sent successfully! Robert will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      throw new Error(result?.message || 'Failed to send message');
    } catch (error: unknown) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      const err = error as { message?: string };
      setStatusMessage(
        err?.message ||
          'Submission encountered an issue. You can click "Open in Email App" below to email directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const mailtoUrl = `mailto:robertsimeon12345@gmail.com?subject=${encodeURIComponent(
    formData.name ? `Portfolio Inquiry from ${formData.name}` : 'Portfolio Project Inquiry'
  )}&body=${encodeURIComponent(
    `Name: ${formData.name || ''}\nEmail: ${formData.email || ''}\n\nMessage:\n${formData.message || ''}`
  )}`;

  return (
    <section id="contact" className="py-10 sm:py-12 px-3.5 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent text-[var(--text-primary)] transition-colors duration-300">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-6 sm:mb-7">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] font-semibold mb-2 tracking-wide shadow-xs">
              <Mail size={12} className="text-purple-600 dark:text-purple-400" />
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight mb-2">
              Contact & Inquiries
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto text-xs leading-relaxed">
              Have a project opportunity, job offer, or question? Send a message directly or open in your email client.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Form Card */}
        <ScrollReveal animation="blur-focus" duration={0.8} delay={0.15}>
          <div className="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#111116] shadow-lg dark:shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                    <User size={12} className="text-neutral-500 dark:text-neutral-400" />
                    Your Name
                  </label>
                  <HydrationSafeInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#09090c] border border-neutral-300 dark:border-white/[0.1] rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors"
                    placeholder="e.g. Alex Johnson"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                    <Mail size={12} className="text-neutral-500 dark:text-neutral-400" />
                    Email Address
                  </label>
                  <HydrationSafeInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#09090c] border border-neutral-300 dark:border-white/[0.1] rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1 flex items-center gap-1.5">
                  <MessageSquare size={12} className="text-neutral-500 dark:text-neutral-400" />
                  Message
                </label>
                <HydrationSafeTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 text-xs bg-neutral-50 dark:bg-[#09090c] border border-neutral-300 dark:border-white/[0.1] rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors resize-none"
                  placeholder="Share project requirements, timeline, or discussion topics..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-0.5">
                <HydrationSafeButton
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-lg transition-all duration-200 shadow-sm shadow-purple-600/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>Send Message</span>
                    </>
                  )}
                </HydrationSafeButton>

                <a
                  href={mailtoUrl}
                  className="inline-flex items-center justify-center gap-1.5 py-2 sm:py-2.5 px-3.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-lg border border-neutral-300 dark:border-white/10 transition-all duration-200"
                  title="Open draft in your email app"
                >
                  <ExternalLink size={12} />
                  <span>Open in Email App</span>
                </a>
              </div>
            </form>

            {/* Status feedback */}
            {submitStatus === 'success' && (
              <div className="mt-3 p-2.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-lg flex items-start gap-2 text-emerald-800 dark:text-emerald-300 text-xs font-medium leading-relaxed">
                <Check size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{statusMessage || 'Message received! Robert will get back to you shortly.'}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-3 p-2.5 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 rounded-lg flex items-start gap-2 text-rose-800 dark:text-rose-300 text-xs font-medium leading-relaxed">
                <AlertCircle size={15} className="text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>{statusMessage || 'Submission failed. You can email directly at robertsimeon12345@gmail.com'}</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Direct Email Link */}
        <div className="mt-4 text-center text-xs text-neutral-600 dark:text-neutral-400 px-2">
          Or reach out directly via{' '}
          <a
            href="mailto:robertsimeon12345@gmail.com"
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 underline underline-offset-2 transition-colors font-medium break-all"
          >
            robertsimeon12345@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
