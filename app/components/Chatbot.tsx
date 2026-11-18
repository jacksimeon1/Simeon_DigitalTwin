'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Send, Mic, MicOff, VolumeX, Globe, Bot, Copy, Check, RotateCcw, Sparkles, Trash2, Lightbulb, HelpCircle, X, Search, ArrowRight } from 'lucide-react';
import HydrationSafeButton from './HydrationSafeButton';
import { useLanguage, Language } from '../contexts/LanguageContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timeStr?: string;
  isStreaming?: boolean;
}

const LANGUAGE_LOCALE_MAP: Record<Language, string> = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  tl: 'fil-PH',
};

// ─── Lightweight Markdown → HTML renderer ───
function renderMarkdown(text: string): string {
  let html = text;

  // Escape HTML special chars (but preserve our markdown processing)
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Code blocks: ```lang\n...\n```
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // Inline code: `...`
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');

  // Bold: **...** or __...__
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *...* or _..._ (only match underscores at word boundaries so file paths like /Robert_Simeon_Jr_Resume.pdf are preserved)
  html = html.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');
  html = html.replace(/(?<![\w_])_([^_\n]+)_(?![\w_])/g, '<em>$1</em>');

  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr/>');

  // Blockquote
  html = html.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists (- or •)
  html = html.replace(/^[\-•] (.+)$/gm, '<li>$1</li>');

  // Ordered lists (1. 2. etc)
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> elements in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');

  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bare URLs
  html = html.replace(/(?<!["\w])(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

  // Paragraphs: double newlines
  html = html.replace(/\n\n+/g, '</p><p>');

  // Single newlines (that aren't inside pre/li/h tags) to <br>
  html = html.replace(/(?<!<\/(?:li|h[1-6]|pre|ul|ol|blockquote|hr\/))\n(?!<(?:li|h[1-6]|pre|ul|ol|blockquote|hr))/g, '<br/>');

  // Wrap in paragraph
  html = `<p>${html}</p>`;

  // Clean empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '');

  return html;
}

// ─── Curated Guide Questions Categorized ───
interface GuideQuestionItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
}

interface GuideCategory {
  id: string;
  name: string;
  icon: string;
  badge?: string;
}

const GUIDE_CATEGORIES: GuideCategory[] = [
  { id: 'all', name: 'All Questions', icon: '✨' },
  { id: 'robert', name: "Robert's Profile", icon: '🎓' },
  { id: 'projects', name: 'Featured Projects', icon: '💻' },
  { id: 'skills', name: 'Tech Stack & Skills', icon: '⚡' },
  { id: 'hire', name: 'Hire & Contact', icon: '🤝' },
  { id: 'general', name: 'Ask Anything (AI)', icon: '🌐', badge: 'ChatGPT' },
];

const GUIDE_QUESTIONS: GuideQuestionItem[] = [
  // Robert's Profile
  {
    id: 'rob-1',
    category: 'robert',
    title: 'Who is Robert Simeon Jr.?',
    prompt: 'Who is Robert Simeon Jr.? Give me an overview of his background, education, and career aspirations.',
  },
  {
    id: 'rob-2',
    category: 'robert',
    title: 'Education & SPUP Degree',
    prompt: "Tell me about Robert's Bachelor of Science in Information Technology (BSIT) degree from St. Paul University Philippines.",
  },
  {
    id: 'rob-3',
    category: 'robert',
    title: 'Industry Experience & OJT',
    prompt: 'What industry experience does Robert have with AusBiz Consulting Pty Ltd (Australia) and Doña Alejandra Inc.?',
  },
  {
    id: 'rob-4',
    category: 'robert',
    title: 'Verified Certifications & Licenses',
    prompt: 'What verified global certifications and licenses does Robert hold, including Certiport Pearson and Employability Advantage?',
  },
  {
    id: 'rob-5',
    category: 'robert',
    title: 'High School STEM Academic Honors',
    prompt: "Tell me about Robert's Senior High School STEM education and Academic Honors from Santo Niño National High School.",
  },

  // Featured Projects
  {
    id: 'proj-1',
    category: 'projects',
    title: 'Overview of all 6 projects',
    prompt: 'Give me a complete overview of the 6 software projects Robert has engineered, including tech stacks and links.',
  },
  {
    id: 'proj-2',
    category: 'projects',
    title: '3D Room — Isometric Sanctuary',
    prompt: "Tell me about Robert's 3D Room isometric sanctuary project. How did he build it using pure CSS 3D transforms?",
  },
  {
    id: 'proj-3',
    category: 'projects',
    title: 'SIP 3D — Beverage Showcase',
    prompt: 'Explain the SIP 3D interactive beverage showcase website and its 360-degree can rotation physics.',
  },
  {
    id: 'proj-4',
    category: 'projects',
    title: 'Capstone AI Title Generator',
    prompt: 'How does the Capstone AI Title Generator work and what tech stack does it use to synthesize thesis titles?',
  },
  {
    id: 'proj-5',
    category: 'projects',
    title: 'Santo Niño Building Permit System',
    prompt: 'What is the Santo Niño Building Permit System and how does it modernize municipal governance for LGU Santo Niño?',
  },
  {
    id: 'proj-6',
    category: 'projects',
    title: 'Employee Attendance Tracking System',
    prompt: 'Tell me about the Employee Attendance Tracking System Robert built for DOÑA ALEJANDRA INC.',
  },

  // Skills & Tech Stack
  {
    id: 'skill-1',
    category: 'skills',
    title: 'Full Technical Skills Summary',
    prompt: 'What programming languages, frameworks, databases, and tools does Robert master?',
  },
  {
    id: 'skill-2',
    category: 'skills',
    title: 'Frontend & 3D Web Graphics',
    prompt: "What are Robert's frontend capabilities in Next.js, React, Tailwind CSS, Three.js, and Canvas?",
  },
  {
    id: 'skill-3',
    category: 'skills',
    title: 'Backend, APIs & Databases',
    prompt: 'What backend technologies and databases does Robert work with (Node.js, Laravel, MySQL, MongoDB, Redis)?',
  },
  {
    id: 'skill-4',
    category: 'skills',
    title: 'Agentic AI & LLMs',
    prompt: 'What experience does Robert have with Agentic AI, Groq LLM inference, and AI heuristics?',
  },

  // Hire & Contact
  {
    id: 'hire-1',
    category: 'hire',
    title: 'How to contact or hire Robert',
    prompt: 'How can I contact or hire Robert for a full-time software engineering role or freelance project?',
  },
  {
    id: 'hire-2',
    category: 'hire',
    title: 'Virtual Assistant (VA) capabilities',
    prompt: 'Can Robert work as a Technical Virtual Assistant (VA)? What services and support can he provide?',
  },
  {
    id: 'hire-3',
    category: 'hire',
    title: 'Official Resume & Credentials',
    prompt: "Where can I view and download Robert's official verified resume PDF and check his credentials?",
  },
  {
    id: 'hire-4',
    category: 'hire',
    title: 'Immediate Onboarding Availability',
    prompt: 'What is Robert’s current availability for remote or hybrid software developer positions?',
  },

  // General AI & Coding (Ask Anything!)
  {
    id: 'gen-1',
    category: 'general',
    title: 'Explain Async/Await in JavaScript',
    prompt: 'Explain async/await and Promises in JavaScript with concise, practical code examples.',
  },
  {
    id: 'gen-2',
    category: 'general',
    title: 'SQL vs NoSQL Database Comparison',
    prompt: 'What is the key difference between SQL and NoSQL databases, and when should you choose each?',
  },
  {
    id: 'gen-3',
    category: 'general',
    title: 'Solve a Math Problem Step-by-Step',
    prompt: 'Solve this step-by-step: If a software server handles 2,400 API requests per minute, how many requests will it handle over 3.5 days?',
  },
  {
    id: 'gen-4',
    category: 'general',
    title: 'How to fix a CORS Error in Web Apps',
    prompt: 'Why do CORS errors happen in modern web applications and what are 3 effective ways to resolve them?',
  },
  {
    id: 'gen-5',
    category: 'general',
    title: 'Interview Tips for Junior Developers',
    prompt: 'What are the top 5 tips for acing a technical interview for a full-stack software developer role?',
  },
  {
    id: 'gen-6',
    category: 'general',
    title: 'Quantum Computing Explained Simply',
    prompt: 'Explain quantum computing, qubits, and superposition in simple terms that anyone can understand.',
  },
  {
    id: 'gen-7',
    category: 'general',
    title: 'Write a Funny Coding Poem',
    prompt: 'Write a clever, witty poem about a software engineer tracking down a bug at 2:00 AM.',
  },
  {
    id: 'gen-8',
    category: 'general',
    title: '3 Creative Web App Ideas',
    prompt: 'Give me 3 unique, impressive web application project ideas that would stand out on a portfolio.',
  },
];

// ─── Rotating suggested prompts ───
const SUGGESTED_PROMPTS = [
  // Robert-specific
  { label: '💼 Projects', text: 'What projects has Robert built?' },
  { label: '🎓 Education', text: 'Tell me about Robert\'s education' },
  { label: '🏆 Certifications', text: 'What certifications does Robert have?' },
  { label: '📧 Contact', text: 'How can I contact Robert?' },
  { label: '💡 Skills', text: 'What are Robert\'s technical skills?' },
  { label: '🧑‍💻 Experience', text: 'Tell me about Robert\'s work experience' },
  // General AI
  { label: '⚡ Code Help', text: 'Explain async/await in JavaScript' },
  { label: '🐍 Python', text: 'Write a Python hello world program' },
  { label: '🔧 Debug', text: 'How do I fix a CORS error?' },
  { label: '📝 Career', text: 'Tips for a junior developer interview' },
  { label: '🌐 Web Dev', text: 'Explain the difference between SSR and CSR' },
  { label: '🤖 AI', text: 'How do large language models work?' },
];

export default function Chatbot() {
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('');
  const [mounted, setMounted] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [visiblePrompts, setVisiblePrompts] = useState<typeof SUGGESTED_PROMPTS>([]);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [selectedGuideCategory, setSelectedGuideCategory] = useState<string>('all');
  const [guideSearchQuery, setGuideSearchQuery] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voiceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Rotate suggested prompts on mount
  useEffect(() => {
    const shuffled = [...SUGGESTED_PROMPTS].sort(() => Math.random() - 0.5);
    setVisiblePrompts(shuffled.slice(0, 5));
  }, []);

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
      const hasSpeechRec =
        ('SpeechRecognition' in window) ||
        ('webkitSpeechRecognition' in window);
      const hasSpeechSynth = 'speechSynthesis' in window;
      setHasVoiceSupport(Boolean(hasSpeechRec || hasSpeechSynth));
    }

    return () => {
      if (voiceTimeoutRef.current) {
        clearTimeout(voiceTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Load chat session from Redis
  const loadChatSession = async (sid: string) => {
    try {
      const response = await fetch(`/api/chat/session?sessionId=${sid}`);
      const data = await response.json();
      
      let loadedMessages: Message[] = [];
      if (Array.isArray(data?.messages)) {
        loadedMessages = data.messages;
      } else if (typeof data?.messages === 'string') {
        try {
          const parsed = JSON.parse(data.messages);
          if (Array.isArray(parsed)) loadedMessages = parsed;
        } catch {
          loadedMessages = [];
        }
      }

      if (loadedMessages.length > 0) {
        setMessages(loadedMessages);
      } else {
        setMessages([{
          id: '1',
          text: t('chat.welcome'),
          sender: 'assistant',
          timeStr: getTimeString(),
        }]);
      }
    } catch (error) {
      console.error('Failed to load chat session:', error);
      setMessages([{
        id: '1',
        text: t('chat.welcome'),
        sender: 'assistant',
        timeStr: getTimeString(),
      }]);
    }
  };

  // Save chat session to Redis
  const saveChatSession = async (sid: string, msgs: Message[]) => {
    try {
      await fetch('/api/chat/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, messages: msgs })
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

  const scrollToBottom = useCallback((instant = false) => {
    const container = messagesContainerRef.current;
    if (container) {
      if (instant) {
        container.scrollTop = container.scrollHeight;
      } else {
        container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
      }
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' });
    }
  }, []);

  useEffect(() => {
    const isCurrentlyStreaming = messages[messages.length - 1]?.isStreaming;
    scrollToBottom(Boolean(isCurrentlyStreaming));
  }, [messages, scrollToBottom]);

  // Update welcome message when language changes
  useEffect(() => {
    if (Array.isArray(messages) && messages.length === 1 && messages[0]?.sender === 'assistant') {
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

  // Build conversation history for the LLM (role/content pairs only)
  const buildConversationHistory = (msgs: Message[]) => {
    return msgs
      .filter(m => m.text && m.text !== t('chat.welcome'))
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
  };

  // ─── Send message with streaming ───
  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timeStr: mounted ? getTimeString() : undefined,
    };

    const updatedWithUser = [...messages, userMessage];
    setMessages(updatedWithUser);
    setInput('');
    setLoading(true);

    trackAnalytics('chat_interaction');

    // Create a placeholder streaming message
    const assistantId = (Date.now() + 1).toString();
    const streamingMessage: Message = {
      id: assistantId,
      text: '',
      sender: 'assistant',
      timeStr: mounted ? getTimeString() : undefined,
      isStreaming: true,
    };

    setMessages(prev => [...prev, streamingMessage]);

    try {
      // Build conversation history for the LLM
      const history = buildConversationHistory(updatedWithUser);

      // Abort any previous streaming request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      // Client-side safety timeout of 30 seconds so general AI reasoning requests complete cleanly
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 30000);

      let accumulated = '';

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history,
            language,
            stream: true,
          }),
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('text/event-stream') && response.body) {
          // ── STREAMING MODE ──
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // Parse SSE lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep incomplete line in buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith('data: ')) continue;

              const dataStr = trimmed.slice(6);
              if (dataStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.content) {
                  accumulated += parsed.content;
                  // Update the streaming message with accumulated text
                  setMessages(prev =>
                    prev.map(m =>
                      m.id === assistantId
                        ? { ...m, text: accumulated }
                        : m
                    )
                  );
                  scrollToBottom(true);
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }

          // Finalize the message
          const finalText = accumulated.trim() || 'Hello! I am Robert Simeon Jr.\'s AI Digital Twin. How can I assist you with Robert\'s background, projects, or questions?';
          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, text: finalText, isStreaming: false }
                : m
            )
          );

          // Save to session asynchronously (non-blocking for instant UI readiness)
          const allMsgs = [...updatedWithUser, {
            id: assistantId,
            text: finalText,
            sender: 'assistant' as const,
            timeStr: mounted ? getTimeString() : undefined,
          }];
          if (sessionId) {
            void saveChatSession(sessionId, allMsgs);
          }

          // Speak the response
          if (mounted && 'speechSynthesis' in window) {
            speakText(finalText);
          }
        } else {
          // ── NON-STREAMING FALLBACK ──
          const data = await response.json();
          const finalText = data.response || 'Hello! I am Robert Simeon Jr.\'s AI Digital Twin. How can I assist you today?';

          setMessages(prev =>
            prev.map(m =>
              m.id === assistantId
                ? { ...m, text: finalText, isStreaming: false }
                : m
            )
          );

          const allMsgs = [...updatedWithUser, {
            id: assistantId,
            text: finalText,
            sender: 'assistant' as const,
            timeStr: mounted ? getTimeString() : undefined,
          }];
          if (sessionId) {
            void saveChatSession(sessionId, allMsgs);
          }

          if (mounted && 'speechSynthesis' in window) {
            speakText(finalText);
          }
        }
      } finally {
        clearTimeout(timeoutId);
      }
    } catch (error: any) {
      console.warn('Chat request notice:', error);
      const isTimeout = error?.name === 'AbortError';
      const fallbackText = isTimeout
        ? 'The request took a little too long. Please try asking your question again!'
        : 'I\'m Robert Simeon Jr.\'s AI Digital Twin. How can I assist you today? You can ask about my projects, skills, education, resume, or any general question!';

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, text: m.text || fallbackText, isStreaming: false }
            : m
        )
      );
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  // ─── Regenerate last response ───
  const handleRegenerate = async () => {
    // Find the last user message
    const lastUserIndex = [...messages].map(m => m.sender).lastIndexOf('user');
    if (lastUserIndex === -1) return;

    const lastUserText = messages[lastUserIndex].text;
    // Remove the last assistant message
    const trimmed = messages.slice(0, lastUserIndex + 1);
    setMessages(trimmed);

    // Re-send with the same text
    const userMessage: Message = {
      id: Date.now().toString(),
      text: lastUserText,
      sender: 'user',
      timeStr: mounted ? getTimeString() : undefined,
    };

    // We need to rebuild without the duplicate user message
    const cleaned = trimmed.slice(0, -1); // Remove the last user msg (we'll re-add it)
    setMessages([...cleaned]);
    // Small delay to let state update
    setTimeout(() => {
      handleSend(lastUserText);
    }, 50);
  };

  // ─── Copy to clipboard ───
  const handleCopy = async (text: string, msgId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedId(msgId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // ─── Clear conversation ───
  const handleClearChat = () => {
    setMessages([{
      id: '1',
      text: t('chat.welcome'),
      sender: 'assistant',
      timeStr: getTimeString(),
    }]);
    localStorage.removeItem('chatSessionId');
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    localStorage.setItem('chatSessionId', newSessionId);
  };

  const showVoiceStatus = (message: string, durationMs = 3500) => {
    if (voiceTimeoutRef.current) {
      clearTimeout(voiceTimeoutRef.current);
    }
    setVoiceStatus(message);
    if (durationMs > 0) {
      voiceTimeoutRef.current = setTimeout(() => {
        setVoiceStatus('');
      }, durationMs);
    }
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    // Strip markdown for speech
    const plainText = text
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/```[\s\S]*?```/g, '')
      .replace(/#{1,6} /g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/---/g, '');

    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.lang = LANGUAGE_LOCALE_MAP[language] || 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = async () => {
    // If currently listening, stop recognition
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.warn('Error stopping recognition:', e);
        }
      }
      setIsListening(false);
      showVoiceStatus('');
      return;
    }

    // Cancel any active speech synthesis output
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // Check secure context
    if (
      typeof window !== 'undefined' &&
      !window.isSecureContext &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      showVoiceStatus('Microphone requires a secure HTTPS connection.', 5000);
      return;
    }

    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : null;

    if (!SpeechRecognition) {
      showVoiceStatus('Speech recognition is not supported on this browser. Try Chrome or Safari.', 5000);
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (err: any) {
        console.warn('Microphone permission check error:', err);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          showVoiceStatus('Microphone access denied. Please allow microphone in browser settings.', 5000);
          return;
        }
        if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
          showVoiceStatus('No microphone found on your device.', 5000);
          return;
        }
      }
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = LANGUAGE_LOCALE_MAP[language] || 'en-US';

      const baseInput = input.trim();
      let hasReceivedTranscript = false;

      recognition.onstart = () => {
        setIsListening(true);
        showVoiceStatus('Listening... Speak now', 0);
      };

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res && res[0]) {
            if (res.isFinal) {
              finalTranscript += res[0].transcript;
            } else {
              interimTranscript += res[0].transcript;
            }
          }
        }

        const speech = (finalTranscript + ' ' + interimTranscript).trim();
        if (speech) {
          hasReceivedTranscript = true;
          const combined = baseInput ? `${baseInput} ${speech}` : speech;
          setInput(combined);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          showVoiceStatus('Microphone access blocked. Please allow microphone permissions.', 5000);
        } else if (event.error === 'no-speech') {
          if (!hasReceivedTranscript) {
            showVoiceStatus('No speech detected. Please tap mic and speak again.', 4000);
          }
        } else if (event.error === 'network') {
          showVoiceStatus('Network error with speech recognition service.', 4000);
        } else if (event.error !== 'aborted') {
          showVoiceStatus('Could not capture audio. Please try again.', 4000);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (hasReceivedTranscript) {
          showVoiceStatus('Speech captured!', 2500);
        } else {
          showVoiceStatus('', 0);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      showVoiceStatus('Could not activate microphone. Please try again.', 4000);
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

  // Check if the last message is from the assistant (to show regenerate button)
  const lastMessage = messages[messages.length - 1];
  const showRegenerate = lastMessage?.sender === 'assistant' && !lastMessage?.isStreaming && messages.length > 1;

  // Filter guide questions based on category and search query
  const filteredGuideQuestions = useMemo(() => {
    return GUIDE_QUESTIONS.filter((q) => {
      const matchesCategory = selectedGuideCategory === 'all' || q.category === selectedGuideCategory;
      const matchesSearch =
        guideSearchQuery.trim() === '' ||
        q.title.toLowerCase().includes(guideSearchQuery.toLowerCase()) ||
        q.prompt.toLowerCase().includes(guideSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedGuideCategory, guideSearchQuery]);

  const handleSelectGuideQuestion = (promptText: string) => {
    setShowGuideModal(false);
    handleSend(promptText);
  };

  return (
    <div className="relative flex flex-col h-full bg-white dark:bg-[#0d0d10] text-neutral-800 dark:text-neutral-200">
      {/* Header bar */}
      <div className="bg-neutral-50 dark:bg-[#121216] px-4 sm:px-5 py-3 border-b border-neutral-200 dark:border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-purple-600/20">
            <Sparkles size={15} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>{t('chat.title')}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-500/20">GPT</span>
            </h3>
            <p className="text-[10px] text-neutral-500 dark:text-neutral-400">Ask me anything — Robert&apos;s profile & general AI</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Clear Chat */}
          <HydrationSafeButton
            onClick={handleClearChat}
            className="p-1.5 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={13} />
          </HydrationSafeButton>

          {/* Language Selector */}
          <div className="relative group">
            <HydrationSafeButton
              className="px-2 py-1 text-xs bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.1] border border-neutral-300 dark:border-white/[0.08] rounded-md transition-colors flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300"
              title="Select Language"
            >
              <Globe size={12} className="text-purple-600 dark:text-purple-400" />
              <span className="text-[10px] font-semibold">{t(`lang.${language}`)}</span>
            </HydrationSafeButton>
            
            {/* Language Dropdown */}
            <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-[#16161c] rounded-lg shadow-xl border border-neutral-200 dark:border-white/[0.1] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-1">
              {(['en', 'es', 'fr', 'de', 'zh', 'ja', 'ko', 'tl'] as Language[]).map((lang) => (
                <HydrationSafeButton
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`w-full px-3 py-1.5 text-left text-xs transition-colors ${
                    language === lang ? 'bg-purple-50 dark:bg-purple-600/20 text-purple-700 dark:text-purple-300 font-bold' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {t(`lang.${lang}`)}
                </HydrationSafeButton>
              ))}
            </div>
          </div>
          
          {isListening && (
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-[10px] font-medium animate-pulse border border-rose-200 dark:border-rose-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 animate-ping" />
              <span>Listening...</span>
            </div>
          )}

          {isSpeaking && (
            <div className="flex items-center gap-1 px-2 py-1 rounded bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 text-[10px] font-medium">
              <span className="w-1 h-3 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-pulse delay-150" />
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 bg-neutral-100/50 dark:bg-[#0a0a0d]"
      >
        {(Array.isArray(messages) ? messages : []).map((msg) => {
          // Do not render empty assistant message while waiting for the first stream chunk
          // This prevents the stuck "|" cursor and duplicate bubble above "Thinking..."
          if (msg.sender === 'assistant' && msg.isStreaming && !msg.text) {
            return null;
          }
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
            {/* Bot Avatar */}
            {msg.sender === 'assistant' && (
              <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm mt-0.5">
                <Bot size={14} />
              </div>
            )}

            <div className={`msg-bubble relative group max-w-[82%] sm:max-w-md`}>
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-950/20 font-medium rounded-br-md'
                    : 'bg-white dark:bg-[#15151c] text-neutral-900 dark:text-neutral-200 border border-neutral-200 dark:border-white/[0.08] shadow-sm rounded-bl-md'
                }`}
              >
                {msg.sender === 'assistant' ? (
                  <div
                    className="chat-markdown break-words"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                  />
                ) : (
                  <div
                    className="chat-markdown chat-markdown-user break-words"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                  />
                )}

                {/* Streaming cursor */}
                {msg.isStreaming && (
                  <span className="typing-cursor" />
                )}

                {mounted && msg.timeStr && (
                  <span className={`text-[10px] block mt-1.5 opacity-50 ${msg.sender === 'user' ? 'text-purple-100 text-right' : 'text-neutral-500 dark:text-neutral-400'}`}>
                    {msg.timeStr}
                  </span>
                )}
              </div>

              {/* Copy button for assistant messages */}
              {msg.sender === 'assistant' && msg.text && !msg.isStreaming && (
                <div className="copy-btn absolute -bottom-5 left-0 flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(msg.text, msg.id)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-white/[0.05] transition-colors"
                    title="Copy response"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check size={10} className="text-emerald-500" />
                        <span className="text-emerald-500">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={10} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white shadow-sm mt-0.5 text-[10px] font-bold">
                You
              </div>
            )}
          </div>
          );
        })}

        {/* Streaming "thinking" indicator */}
        {loading && messages[messages.length - 1]?.isStreaming && messages[messages.length - 1]?.text === '' && (
          <div className="flex gap-2.5 justify-start">
            <div className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-sm mt-0.5">
              <Bot size={14} className="animate-pulse" />
            </div>
            <div className="bg-white dark:bg-[#15151c] px-4 py-3 rounded-2xl rounded-bl-md border border-neutral-200 dark:border-white/[0.08] shadow-sm max-w-[200px]">
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
                <span className="font-medium">Thinking...</span>
              </div>
              <div className="thinking-shimmer mt-2 w-full" />
            </div>
          </div>
        )}

        {/* Regenerate button */}
        {showRegenerate && !loading && (
          <div className="flex justify-start pl-9">
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium text-neutral-500 hover:text-purple-600 dark:text-neutral-400 dark:hover:text-purple-400 bg-neutral-100 dark:bg-white/[0.04] hover:bg-purple-50 dark:hover:bg-purple-500/10 border border-neutral-200 dark:border-white/[0.06] transition-colors"
              title="Regenerate response"
            >
              <RotateCcw size={11} />
              <span>Regenerate</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 dark:border-white/[0.08] p-2.5 sm:p-3.5 bg-neutral-50 dark:bg-[#121216]">
        {/* Suggested Prompt Chips */}
        {messages.length <= 2 && (
          <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-nowrap sm:flex-wrap">
            {visiblePrompts.map((prompt, index) => (
              <HydrationSafeButton
                key={index}
                onClick={() => handleSend(prompt.text)}
                className="px-2.5 py-1 text-[10px] font-medium bg-white dark:bg-white/[0.04] hover:bg-purple-50 dark:hover:bg-purple-500/10 text-neutral-700 dark:text-neutral-300 hover:text-purple-700 dark:hover:text-purple-300 border border-neutral-300 dark:border-white/[0.06] hover:border-purple-300 dark:border-purple-500/20 rounded-xl transition-all shadow-xs dark:shadow-none shrink-0"
              >
                {prompt.label}
              </HydrationSafeButton>
            ))}
          </div>
        )}
        
        <div className="flex gap-1.5 sm:gap-2 items-center">
          <div className="flex-1 min-w-0 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={isListening ? 'Listening... Speak into your mic' : 'Ask me anything — coding, math, or Robert...'}
              disabled={loading}
              className="w-full px-3 py-2 sm:px-3.5 sm:py-2.5 text-xs bg-white dark:bg-[#09090c] border border-neutral-300 dark:border-white/[0.1] rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all disabled:opacity-50"
            />
          </div>

          {mounted && hasVoiceSupport && (
            <>
              <HydrationSafeButton
                onClick={toggleListening}
                disabled={loading}
                className={`p-2 sm:p-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-center shrink-0 ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-500/50 shadow-md shadow-rose-600/30'
                    : 'bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.1] border border-neutral-300 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white'
                } disabled:opacity-50`}
                title={isListening ? t('chat.voice.stop') : t('chat.voice.start')}
              >
                {isListening ? <MicOff size={15} /> : <Mic size={15} />}
              </HydrationSafeButton>
              {isSpeaking && (
                <HydrationSafeButton
                  onClick={toggleSpeech}
                  className="p-2 sm:p-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors text-xs flex items-center justify-center shadow-xs shrink-0"
                  title={t('chat.voice.stop_audio')}
                >
                  <VolumeX size={15} />
                </HydrationSafeButton>
              )}
            </>
          )}

          <HydrationSafeButton
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 shadow-md shadow-purple-600/20 hover:shadow-lg hover:shadow-purple-600/30 shrink-0"
          >
            <Send size={13} />
          </HydrationSafeButton>
        </div>

        {voiceStatus ? (
          <p
            className={`text-[10px] mt-1.5 text-center font-medium transition-all ${
              isListening
                ? 'text-purple-600 dark:text-purple-400 animate-pulse'
                : 'text-amber-600 dark:text-amber-400'
            }`}
          >
            {voiceStatus}
          </p>
        ) : (
          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1.5 text-center">
            Answers anything — math, coding, creative tasks & Robert&apos;s full background
          </p>
        )}
      </div>
    </div>
  );
}
