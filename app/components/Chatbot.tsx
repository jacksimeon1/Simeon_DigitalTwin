'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, VolumeX, Globe } from 'lucide-react';
import HydrationSafeButton from './HydrationSafeButton';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timeStr?: string;
}

export default function Chatbot() {
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sessionId, setSessionId] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize on client only to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Generate or retrieve session ID
    const savedSessionId = localStorage.getItem('chatSessionId');
    const newSessionId = savedSessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    if (!savedSessionId) {
      localStorage.setItem('chatSessionId', newSessionId);
    }

    // Load chat session from Redis
    loadChatSession(newSessionId);

    // Detect voice support
    if (typeof window !== 'undefined') {
      const support =
        ('speechSynthesis' in window) ||
        ('SpeechRecognition' in window) ||
        ('webkitSpeechRecognition' in window);
      setHasVoiceSupport(Boolean(support));

      // Setup speech recognition
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.language = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('');
          setInput(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  // Load chat session from Redis
  const loadChatSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/session?sessionId=${sessionId}`);
      const data = await response.json();
      
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        // Set welcome message if no session exists
        setMessages([{
          id: '1',
          text: t('chat.welcome'),
          sender: 'assistant',
          timeStr: getTimeString(),
        }]);
      }
    } catch (error) {
      console.error('Failed to load chat session:', error);
      // Set welcome message on error
      setMessages([{
        id: '1',
        text: t('chat.welcome'),
        sender: 'assistant',
        timeStr: getTimeString(),
      }]);
    }
  };

  // Save chat session to Redis
  const saveChatSession = async (sessionId: string, messages: Message[]) => {
    try {
      await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, messages })
      });
    } catch (error) {
      console.error('Failed to save chat session:', error);
    }
  };

  // Track analytics events
  const trackAnalytics = async (type: string, data?: any) => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data })
      });
    } catch (error) {
      console.error('Failed to track analytics:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'assistant') {
      setMessages([{
        id: '1',
        text: t('chat.welcome'),
        sender: 'assistant',
      }]);
    }
  }, [language, t]);

  const getTimeString = () => {
    return new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timeStr: mounted ? getTimeString() : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Track chat interaction
    trackAnalytics('chat_interaction');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, language }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timeStr: mounted ? getTimeString() : undefined,
      };

      const updatedMessages = [...messages, userMessage, assistantMessage];
      setMessages(updatedMessages);

      // Save chat session to Redis
      if (sessionId) {
        await saveChatSession(sessionId, updatedMessages);
      }

      // Speak the response
      if (mounted && 'speechSynthesis' in window) {
        speakText(data.response);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'assistant',
        timeStr: mounted ? getTimeString() : undefined,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header with gradient and animation */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 border-b-2 border-purple-400/30">
        <div className="flex items-center justify-between">
          <div className="animate-slide-left">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <span className="text-xl animate-bounce">🤖</span>
              {t('chat.title')}
            </h3>
            <p className="text-sm text-blue-100 mt-1">{t('chat.subtitle')}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative group">
              <HydrationSafeButton
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
                title="Select Language"
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{t(`lang.${language}`)}</span>
              </HydrationSafeButton>
              
              {/* Language Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-2">
                  {(['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'tl'] as Language[]).map((lang) => (
                    <HydrationSafeButton
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`w-full px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-sm ${
                        language === lang ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {t(`lang.${lang}`)}
                    </HydrationSafeButton>
                  ))}
                </div>
              </div>
            </div>
            
            {isSpeaking && (
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 h-4 bg-white rounded-full animate-pulse"
                    style={{animationDelay: `${i * 0.1}s`}}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all hover:shadow-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none shadow-md hover:shadow-lg'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-md rounded-bl-none border border-slate-100 dark:border-slate-700'
              }`}
            >
              <p className="text-sm break-words leading-relaxed">{msg.text}</p>
              {mounted && msg.timeStr && (
                <span className={`text-xs block mt-2 opacity-60 ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {msg.timeStr}
                </span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start animate-slide-up">
            <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-md rounded-2xl rounded-bl-none px-4 py-3 border border-slate-100 dark:border-slate-700">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 rounded-b-2xl">
        {/* Quick Question Buttons */}
        <div className="mb-3 flex flex-wrap gap-2">
          {[
            'quick.projects',
            'quick.skills', 
            'quick.education',
            'quick.contact',
            'quick.available'
          ].map((key, index) => (
            <HydrationSafeButton
              key={index}
              onClick={() => setInput(t(key))}
              className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {t(key)}
            </HydrationSafeButton>
          ))}
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed transition-all hover:border-blue-300 dark:hover:border-blue-500"
            />
            {input && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{input.length}</span>
            )}
          </div>

          {mounted && hasVoiceSupport && (
            <>
              <HydrationSafeButton
                onClick={toggleListening}
                disabled={loading}
                className={`px-4 py-3 rounded-xl transition-all font-medium flex items-center gap-2 transform hover:scale-105 active:scale-95 ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse'
                    : 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 hover:bg-blue-600'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                title={isListening ? t('chat.voice.stop') : t('chat.voice.start')}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </HydrationSafeButton>
              {isSpeaking && (
                <HydrationSafeButton
                  onClick={toggleSpeech}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/50 flex items-center gap-2 animate-pulse"
                  title={t('chat.voice.stop_audio')}
                >
                  <VolumeX size={18} />
                </HydrationSafeButton>
              )}
            </>
          )}

          <HydrationSafeButton
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 font-medium group"
          >
            <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">{t('chat.send')}</span>
          </HydrationSafeButton>
        </div>

        {/* Helper text */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
          {t('chat.helper')}
        </p>
      </div>
    </div>
  );
}
