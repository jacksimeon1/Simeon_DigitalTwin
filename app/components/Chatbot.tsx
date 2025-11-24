'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, VolumeX, Globe } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timeStr?: string;
}

const getWelcomeMessage = (lang: string) => {
    const messages = {
      en: "Hi! 👋 I'm Robert's AI assistant. I can tell you about my projects, skills in web development and game development, my HTML/CSS certification, and my experience as a 4th year IT student at SPUP. What would you like to know?",
      es: "¡Hola! 👋 Soy el asistente de IA de Robert. Puedo decirte sobre mis proyectos, habilidades en desarrollo web y de juegos, mi certificación HTML/CSS, y mi experiencia como estudiante de 4to año de TI en SPUP. ¿Qué te gustaría saber?",
      fr: "Salut ! 👋 Je suis l'assistant IA de Robert. Je peux vous parler de mes projets, compétences en développement web et jeux, ma certification HTML/CSS, et mon expérience en tant qu'étudiant de 4ème année en TI à SPUP. Que souhaitez-vous savoir ?",
      de: "Hallo! 👋 Ich bin Roberts KI-Assistent. Ich kann dir über meine Projekte, Fähigkeiten in Web- und Spielentwicklung, meine HTML/CSS-Zertifizierung und meine Erfahrung als 4. IT-Student an der SPUP erzählen. Was möchtest du wissen?",
      it: "Ciao! 👋 Sono l'assistente IA di Robert. Posso parlarti dei miei progetti, competenze nello sviluppo web e di giochi, la mia certificazione HTML/CSS, e la mia esperienza da studente di 4° anno in IT alla SPUP. Cosa vorresti sapere?",
      pt: "Olá! 👋 Sou o assistente de IA do Robert. Posso falar sobre meus projetos, habilidades em desenvolvimento web e de jogos, minha certificação HTML/CSS, e minha experiência como estudante de 4º ano de TI na SPUP. O que gostaria de saber?",
      nl: "Hallo! 👋 Ik ben Roberts AI-assistent. Ik kan je vertellen over mijn projecten, vaardigheden in web- en game-ontwikkeling, mijn HTML/CSS-certificering, en mijn ervaring als 4e-jaar IT-student aan SPUP. Wat wil je weten?",
      sv: "Hej! 👋 Jag är Roberts AI-assistent. Jag kan berätta om mina projekt, färdigheter i webb- och spelutveckling, min HTML/CSS-certifiering, och min erfarenhet som 4:e-års IT-student vid SPUP. Vad vill du veta?",
      no: "Hei! 👋 Jeg er Roberts AI-assistent. Jeg kan fortelle deg om prosjektene mine, ferdigheter i web- og spillutvikling, min HTML/CSS-sertifisering, og min erfaring som 4. års IT-student ved SPUP. Hva vil du vite?",
      da: "Hej! 👋 Jeg er Roberts AI-assistent. Jeg kan fortælle dig om mine projekter, færdigheder i web- og spiludvikling, min HTML/CSS-certificering, og min erfaring som 4. års IT-student på SPUP. Hvad vil du vide?",
      fi: "Hei! 👋 Olen Robertin AI-avustaja. Voin kertoa projekteistani, taidoistani web- ja pelikehityksessä, HTML/CSS-sertifikaatistani ja kokemuksestani 4. vuoden IT-opiskelijana SPUP:ssa. Mitä haluaisit tietää?",
      pl: "Cześć! 👋 Jestem asystentem AI Roberta. Mogę opowiedzieć o moich projektach, umiejętnościach w tworzeniu stron i gier, mojej certyfikacji HTML/CSS, i moich doświadczeniach jako studenta 4. roku informatyki na SPUP. Co chciałbyś wiedzieć?",
      cs: "Ahoj! 👋 Jsem AI asistent Roberta. Můžu ti říct o svých projektech, dovednostech ve vývoji webu a her, mé HTML/CSS certifikaci a mých zkušenostech jako 4. ročník IT studenta na SPUP. Co bys chtěl vědět?",
      hu: "Szia! 👋 Én vagy Robert AI asszisztense. Mesélhetek a projektemről, a web- és játékfejlesztési készségeimről, a HTML/CSS tanúsítványomról és a 4. éves IT hallgatói tapasztalataimról a SPUP-on. Mit szeretnél tudni?",
      ro: "Salut! 👋 Sunt asistentul AI al lui Robert. Pot să îți povestesc despre proiectele mele, abilitățile mele în dezvoltare web și de jocuri, certificarea mea HTML/CSS, și experiența mea ca student de 4 ani IT la SPUP. Ce ai dori să afli?",
      bg: "Здравейте! 👋 Аз съм AI асистентът на Робърт. Мога да ви разкажа за проектите си, уменията си в уеб и игрална разработка, моята HTML/CSS сертификация и опита си като 4-ти курсист по IT в СПУП. Какво бихте ли да научите?",
      hr: "Bok! 👋 Ja sam Robertov AI asistent. Mogu vam reći o mojim projektima, vještinama u web i razvoju igara, mojoj HTML/CSS certifikaciji i mojem iskustvu kao 4. godine IT studenta na SPUP-u. Što biste željeli znati?",
      sk: "Ahoj! 👋 Som AI asistent Roberta. Môžem ti povedať o svojich projektoch, zručnostiach vo vývoji webu a hier, mojej HTML/CSS certifikácii a mojich skúsenostiach ako 4. ročník IT študenta na SPUP. Čo by si chcel vedieť?",
      sl: "Živjo! 👋 Jaz sem Robertov AI asistent. Lahko povem o svojih projektih, veščinah v razvoju spletnih strani in iger, moji HTML/CSS certificaciji in mojih izkušnjah kot 4. letni IT študent na SPUP. Kaj bi želel vedeti?",
      et: "Tere! 👋 Ma olen Roberti AI-assistent. Ma võin rääkida oma projektidest, veebi- ja mänguarenduse oskustest, oma HTML/CSS sertifikaadist ja oma kogemustest 4. aasta IT üliõpilasena SPUP-is. Mida sa teada tahaksid?",
      lv: "Sveiki! 👋 Es esmu Roberta AI asistents. Es varu pastāstīt par saviem projektiem, prasmēm tīmekļa un spēļu izstrādē, manu HTML/CSS sertifikāciju un manu pieredzi kā 4. kursa IT studentam SPUP. Ko jūs gribētu zināt?",
      lt: "Sveiki! 👋 Aš esu Roberto AI asistentas. Aš galiu papasakoti apie savus projektus, įgūdžius web ir žaidimų kūrime, savo HTML/CSS sertifikatą ir savo patirtį kaip 4-o kurso IT studento SPUP. Ką norėtumėte sužinoti?",
      mt: "Hi! 👋 I am l-assistent AI ta' Robert. Nista' ngħidlek dwar il-proġetti tiegħu, l-abilitajiet tiegħu fl-iżvilupp web u tal-logħob, iċ-ċertifikazzjoni HTML/CSS tiegħu, u l-esperjenza tiegħu bħala student ta' 4 senka IT fl-SPUP. X'tixtieq taf?",
      ga: "Dia dhuit! 👋 Is é cúntóir AI Robert atá annam. Is féidir liom a rádh faoi mo thionscadail, scileanna sa forbhairt gréasáin agus cluichí, mo theastas HTML/CSS, agus mo thaithí mar mhac léinn 4ú bliana IT ag SPUP. Cad ba mhaith leis a bheith agat ar eolas?",
      cy: "Helo! 👋 Dw i'n gynorthwydd AI Robert. Dw i'n gallu dweud am fy mhrojectau, sgiliau mewn datblygiad gwe a gemau, fy nghymhwyster HTML/CSS, a'm profiad fel myfyriwr 4ydd flwyddyn IT yn SPUP. Beth hoffech chi wybod?",
      eu: "Kaixo! 👋 Roberten AI laguntzailea naiz. Nire proiektuez, web eta joko garapeneko gaitasunez, HTML/CSS ziurtagiriari eta 4. urteko ikasle gisa SPUPen dudan esperientziari buruz har dezaket. Nahi duzu jakin?",
      ca: "Hola! 👋 Soc l'assistent IA de Robert. Puc parlar-te dels meus projectes, habilitats en desenvolupament web i de jocs, la meva certificació HTML/CSS, i la meva experiència com a estudiant de 4t any d'IT a la SPUP. Què t'agradaria saber?",
      gl: "Ola! 👋 Son o asistente IA de Robert. Podo dicir sobre os meus proxectos, habilidades en desenvolvemento web e de xogos, a miña certificación HTML/CSS, e a miña experiencia como estudante de 4º ano de TI na SPUP. Qué gustaría saber?",
      is: "Halló! 👋 Ég er Robert AI aðstoðarmaðurinn. Ég get segð þér frá verkefnum mínum, hæfileikum í vef- og leikjaþróun, HTML/CSS réttindum mínum og reynslu míni sem 4. árs IT nemi við SPUP. Hvað viltu vita?",
      ja: "こんにちは！👋 ロバートのAIアシスタントです。私のプロジェクト、ウェブ開発とゲーム開発のスキル、HTML/CSS認定証、そしてSPUPの4年生IT学生としての経験についてお話しできます。何を知りたいですか？"
    };
    return messages[lang as keyof typeof messages] || messages.en;
  };

export default function Chatbot() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getWelcomeMessage('en'),
      sender: 'assistant',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false);
  const [mounted, setMounted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize on client only to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);

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

    // Fill timestamps for initial message after mount
    setMessages((prev) =>
      prev.map((m) =>
        m.timeStr
          ? m
          : {
              ...m,
              timeStr: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            }
      )
    );
  }, []);

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
        text: getWelcomeMessage(selectedLanguage),
        sender: 'assistant',
      }]);
    }
  }, [selectedLanguage]);

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

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, language: selectedLanguage }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'assistant',
        timeStr: mounted ? getTimeString() : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

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
              Robert's AI Assistant
            </h3>
            <p className="text-sm text-blue-100 mt-1">Powered by Groq AI with Voice Support</p>
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

      {/* Language Selector */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-slate-800">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
          <span className="text-sm text-slate-600 dark:text-slate-400">Language:</span>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="px-3 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="nl">Nederlands</option>
            <option value="sv">Svenska</option>
            <option value="no">Norsk</option>
            <option value="da">Dansk</option>
            <option value="fi">Suomi</option>
            <option value="pl">Polski</option>
            <option value="cs">Čeština</option>
            <option value="hu">Magyar</option>
            <option value="ro">Română</option>
            <option value="bg">Български</option>
            <option value="hr">Hrvatski</option>
            <option value="sk">Slovenčina</option>
            <option value="sl">Slovenščina</option>
            <option value="et">Eesti</option>
            <option value="lv">Latviešu</option>
            <option value="lt">Lietuvių</option>
            <option value="mt">Malti</option>
            <option value="ga">Gaeilge</option>
            <option value="cy">Cymraeg</option>
            <option value="eu">Euskara</option>
            <option value="ca">Català</option>
            <option value="gl">Galego</option>
            <option value="is">Íslenska</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-800 rounded-b-2xl">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything or use voice..."
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white disabled:bg-slate-100 dark:disabled:bg-slate-900 disabled:cursor-not-allowed transition-all hover:border-blue-300 dark:hover:border-blue-500"
            />
            {input && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">{input.length}</span>
            )}
          </div>

          {mounted && hasVoiceSupport && (
            <>
              <button
                onClick={toggleListening}
                disabled={loading}
                className={`px-4 py-3 rounded-xl transition-all font-medium flex items-center gap-2 transform hover:scale-105 active:scale-95 ${
                  isListening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/50 animate-pulse'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                } disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              {isSpeaking && (
                <button
                  onClick={toggleSpeech}
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/50 flex items-center gap-2 animate-pulse"
                  title="Stop audio playback"
                >
                  <VolumeX size={18} />
                </button>
              )}
            </>
          )}

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 font-medium group"
          >
            <Send size={18} className="group-hover:translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>

        {/* Helper text */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
          Tip: Press Enter to send or use the microphone to speak
        </p>
      </div>
    </div>
  );
}
