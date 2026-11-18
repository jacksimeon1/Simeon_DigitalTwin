'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'ko' | 'tl';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Chatbot UI
    'chat.title': "Robert's AI Assistant",
    'chat.subtitle': 'Powered by Groq AI with Voice Support',
    'chat.placeholder': 'Ask me anything or use voice...',
    'chat.send': 'Send',
    'chat.welcome': "Hi! 👋 I'm Robert Simeon Jr.'s AI assistant. I can tell you about my projects, skills, education, and experiences. Here are some things you can ask me:\n\n• Tell me about your projects\n• What are your technical skills?\n• What's your educational background?\n• How can I contact you?\n• Are you available for work?\n\nFeel free to ask anything else!",
    'chat.typing': 'Typing...',
    'chat.voice.start': 'Start voice input',
    'chat.voice.stop': 'Stop listening',
    'chat.voice.stop_audio': 'Stop audio playback',
    'chat.helper': 'Tip: Press Enter to send or use the microphone to speak',
    
    // Quick questions
    'quick.projects': 'Tell me about your projects',
    'quick.skills': 'What are your skills?',
    'quick.education': 'Educational background',
    'quick.contact': 'Contact information',
    'quick.available': 'Available for work?',
    
    // Language names
    'lang.en': 'English',
    'lang.es': 'Español',
    'lang.fr': 'Français',
    'lang.de': 'Deutsch',
    'lang.zh': '中文',
    'lang.ja': '日本語',
    'lang.ko': '한국어',
    'lang.tl': 'Filipino',
    
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'Bachelor of Science in Information Technology graduate from St. Paul University Philippines (Graduated June 2026)',
    'robert.location': 'Philippines',
    'robert.graduation': 'Graduated: June 2026',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  es: {
    // Chatbot UI
    'chat.title': "Asistente IA de Robert",
    'chat.subtitle': 'Impulsado por Groq AI con Soporte de Voz',
    'chat.placeholder': 'Pregúntame cualquier cosa o usa la voz...',
    'chat.send': 'Enviar',
    'chat.welcome': "¡Hola! 👋 Soy el asistente de IA de Robert Simeon Jr. Puedo decirte sobre mis proyectos, habilidades, educación y experiencias. Aquí hay algunas cosas que puedes preguntarme:\n\n• Háblame de tus proyectos\n• ¿Cuáles son tus habilidades técnicas?\n• ¿Cuál es tu formación educativa?\n• ¿Cómo puedo contactarte?\n• ¿Estás disponible para trabajar?\n\n¡Siéntete libre de preguntar cualquier otra cosa!",
    'chat.typing': 'Escribiendo...',
    'chat.voice.start': 'Iniciar entrada de voz',
    'chat.voice.stop': 'Dejar de escuchar',
    'chat.voice.stop_audio': 'Detener reproducción de audio',
    'chat.helper': 'Consejo: Presiona Enter para enviar o usa el micrófono para hablar',
    
    // Quick questions
    'quick.projects': 'Háblame de tus proyectos',
    'quick.skills': '¿Cuáles son tus habilidades?',
    'quick.education': 'Formación educativa',
    'quick.contact': 'Información de contacto',
    'quick.available': '¿Disponible para trabajar?',
    
    // Language names
    'lang.en': 'Inglés',
    'lang.es': 'Español',
    'lang.fr': 'Francés',
    'lang.de': 'Alemán',
    'lang.zh': 'Chino',
    'lang.ja': 'Japonés',
    'lang.ko': 'Coreano',
    'lang.tl': 'Filipino',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'Licenciatura en Ciencias de la Información (BSIT) graduado de St. Paul University Philippines (junio 2026)',
    'robert.graduation': 'Graduado: junio 2026',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  fr: {
    // Chatbot UI
    'chat.title': "Assistant IA de Robert",
    'chat.subtitle': 'Alimenté par Groq AI avec Support Vocal',
    'chat.placeholder': 'Demandez-moi n\'importe quoi ou utilisez la voix...',
    'chat.send': 'Envoyer',
    'chat.welcome': "Salut ! 👋 Je suis l'assistant IA de Robert Simeon Jr. Je peux vous parler de mes projets, compétences, formation et expériences. Voici quelques choses que vous pouvez me demander :\n\n• Parlez-moi de vos projets\n• Quelles sont vos compétences techniques ?\n• Quelle est votre formation ?\n• Comment puis-je vous contacter ?\n• Êtes-vous disponible pour travailler ?\n\nN'hésitez pas à me demander autre chose !",
    'chat.typing': 'Écriture...',
    'chat.voice.start': 'Commencer la saisie vocale',
    'chat.voice.stop': 'Arrêter d\'écouter',
    'chat.voice.stop_audio': 'Arrêter la lecture audio',
    'chat.helper': 'Astuce : Appuyez sur Entrée pour envoyer ou utilisez le microphone pour parler',
    
    // Quick questions
    'quick.projects': 'Parlez-moi de vos projets',
    'quick.skills': 'Quelles sont vos compétences ?',
    'quick.education': 'Formation',
    'quick.contact': 'Coordonnées',
    'quick.available': 'Disponible pour travailler ?',
    
    // Language names
    'lang.en': 'Anglais',
    'lang.es': 'Espagnol',
    'lang.fr': 'Français',
    'lang.de': 'Allemand',
    'lang.zh': 'Chinois',
    'lang.ja': 'Japonais',
    'lang.ko': 'Coréen',
    'lang.tl': 'Filipino',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'Diplômé en Technologie de l\'Information (BSIT) de l\'Université de St. Paul Philippines (juin 2026)',
    'robert.graduation': 'Diplômé : juin 2026',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  de: {
    // Chatbot UI
    'chat.title': 'Roberts KI-Assistent',
    'chat.subtitle': 'Angetrieben von Groq AI mit Sprachunterstützung',
    'chat.placeholder': 'Frag mich alles oder verwende Sprache...',
    'chat.send': 'Senden',
    'chat.welcome': "Hallo! 👋 Ich bin Roberts KI-Assistent. Ich kann dir über meine Projekte, Fähigkeiten, Ausbildung und Erfahrungen erzählen. Hier sind einige Dinge, die du mich fragen kannst:\n\n• Erzähl mir von deinen Projekten\n• Was sind deine technischen Fähigkeiten?\n• Was ist dein Bildungshintergrund?\n• Wie kann ich dich kontaktieren?\n• Bist du verfügbar für Arbeit?\n\nFühl dich frei, alles andere zu fragen!",
    'chat.typing': 'Tippe...',
    'chat.voice.start': 'Spracheingabe starten',
    'chat.voice.stop': 'Hören aufhören',
    'chat.voice.stop_audio': 'Audio-Wiedergabe stoppen',
    'chat.helper': 'Tipp: Drücke Enter zum Senden oder benutze das Mikrofon zum Sprechen',
    
    // Quick questions
    'quick.projects': 'Erzähl mir von deinen Projekten',
    'quick.skills': 'Was sind deine Fähigkeiten?',
    'quick.education': 'Ausbildung',
    'quick.contact': 'Kontaktinformationen',
    'quick.available': 'Verfügbar für Arbeit?',
    
    // Language names
    'lang.en': 'Englisch',
    'lang.es': 'Spanisch',
    'lang.fr': 'Französisch',
    'lang.de': 'Deutsch',
    'lang.zh': 'Chinesisch',
    'lang.ja': 'Japanisch',
    'lang.ko': 'Koreanisch',
    'lang.tl': 'Filipino',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'Bachelor of Science in Information Technology Absolvent der St. Paul University Philippines (Juni 2026)',
    'robert.graduation': 'Abschluss: Juni 2026',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  zh: {
    // Chatbot UI
    'chat.title': '罗伯特的AI助手',
    'chat.subtitle': '由Groq AI驱动，支持语音',
    'chat.placeholder': '问我任何问题或使用语音...',
    'chat.send': '发送',
    'chat.welcome': "你好！👋 我是Robert Simeon Jr.的AI助手。我可以告诉你关于我的项目、技能、教育和经历。以下是一些你可以问我的问题：\n\n• 告诉我你的项目\n• 你的技术技能是什么？\n• 你的教育背景是什么？\n• 如何联系你？\n• 你是否有空工作？\n\n随时问我任何其他问题！",
    'chat.typing': '输入中...',
    'chat.voice.start': '开始语音输入',
    'chat.voice.stop': '停止聆听',
    'chat.voice.stop_audio': '停止音频播放',
    'chat.helper': '提示：按Enter发送或使用麦克风说话',
    
    // Quick questions
    'quick.projects': '告诉我你的项目',
    'quick.skills': '你的技能是什么？',
    'quick.education': '教育背景',
    'quick.contact': '联系信息',
    'quick.available': '有空工作吗？',
    
    // Language names
    'lang.en': '英语',
    'lang.es': '西班牙语',
    'lang.fr': '法语',
    'lang.de': '德语',
    'lang.zh': '中文',
    'lang.ja': '日语',
    'lang.ko': '韩语',
    'lang.tl': '菲律宾语',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': '圣保罗大学菲律宾分校信息技术学士学位毕业生（2026年6月毕业）',
    'robert.graduation': '毕业时间：2026年6月',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  ja: {
    // Chatbot UI
    'chat.title': 'ロバートのAIアシスタント',
    'chat.subtitle': 'Groq AI搭載、音声サポート付き',
    'chat.placeholder': '何でも聞いてください、または音声を使用...',
    'chat.send': '送信',
    'chat.welcome': "こんにちは！👋 私はRobert Simeon Jr.のAIアシスタントです。私のプロジェクト、スキル、教育、経験についてお話しできます。以下は私に尋ねられることの一部です：\n\n• プロジェクトについて教えて\n• 技術スキルは何ですか？\n• 教育背景は何ですか？\n• どのように連絡できますか？\n• 仕事は可能ですか？\n\n何でも自由に質問してください！",
    'chat.typing': '入力中...',
    'chat.voice.start': '音声入力を開始',
    'chat.voice.stop': '聞くのを停止',
    'chat.voice.stop_audio': '音声再生を停止',
    'chat.helper': 'ヒント：Enterキーで送信またはマイクで話してください',
    
    // Quick questions
    'quick.projects': 'プロジェクトについて教えて',
    'quick.skills': 'スキルは何ですか？',
    'quick.education': '教育背景',
    'quick.contact': '連絡先情報',
    'quick.available': '仕事は可能ですか？',
    
    // Language names
    'lang.en': '英語',
    'lang.es': 'スペイン語',
    'lang.fr': 'フランス語',
    'lang.de': 'ドイツ語',
    'lang.zh': '中国語',
    'lang.ja': '日本語',
    'lang.ko': '韓国語',
    'lang.tl': 'フィリピノ語',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'セント・ポール大学フィリピン校情報技術学士課程卒業（2026年6月卒業）',
    'robert.graduation': '卒業：2026年6月',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  ko: {
    // Chatbot UI
    'chat.title': '로버트의 AI 어시스턴트',
    'chat.subtitle': 'Groq AI 기반, 음성 지원',
    'chat.placeholder': '무엇이든 물어보거나 음성을 사용하세요...',
    'chat.send': '전송',
    'chat.welcome': "안녕하세요! 👋 저는 Robert Simeon Jr.의 AI 어시스턴트입니다. 제 프로젝트, 기술, 교육, 경험에 대해 말씀드릴 수 있습니다. 다음은 저에게 물어볼 수 있는 것들입니다:\n\n• 프로젝트에 대해 말해주세요\n• 기술 기술은 무엇인가요?\n• 교육 배경은 무엇인가요?\n• 어떻게 연락할 수 있나요?\n• 일할 수 있나요?\n\n다른 어떤 것이든 자유롭게 물어보세요!",
    'chat.typing': '입력 중...',
    'chat.voice.start': '음성 입력 시작',
    'chat.voice.stop': '듣기 중지',
    'chat.voice.stop_audio': '오디오 재생 중지',
    'chat.helper': '팁: Enter를 눌러 전송하거나 마이크로 말하세요',
    
    // Quick questions
    'quick.projects': '프로젝트에 대해 말해주세요',
    'quick.skills': '기술 기술은 무엇인가요?',
    'quick.education': '교육 배경',
    'quick.contact': '연락처 정보',
    'quick.available': '일할 수 있나요?',
    
    // Language names
    'lang.en': '영어',
    'lang.es': '스페인어',
    'lang.fr': '프랑스어',
    'lang.de': '독일어',
    'lang.zh': '중국어',
    'lang.ja': '일본어',
    'lang.ko': '한국어',
    'lang.tl': '필리핀어',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': '세인트 폴 대학교 필리핀 정보기술학사(BSIT) 졸업 (2026년 6월)',
    'robert.graduation': '졸업: 2026년 6월',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
  
  tl: {
    // Chatbot UI
    'chat.title': 'AI Assistant ni Robert',
    'chat.subtitle': 'Pinapatakbo ng Groq AI na may Voice Support',
    'chat.placeholder': 'Magtanong ka ng ano man o gamitin ang boses...',
    'chat.send': 'Ipadala',
    'chat.welcome': "Kamusta! 👋 Ako ang AI assistant ni Robert Simeon Jr. Maaari kong sabihin sa iyo tungkol sa aking mga proyekto, skills, edukasyon, at karanasan. Narito ang ilang bagay na pwede mong itanong sa akin:\n\n• Sabihin mo sa akin tungkol sa iyong mga proyekto\n• Ano ang iyong mga technical skills?\n• Ano ang iyong educational background?\n• Paano kita makontak?\n• Available ka ba para sa trabaho?\n\nBasta magtanong ka ng ano pa!",
    'chat.typing': 'Nagtatype...',
    'chat.voice.start': 'Simulan ang voice input',
    'chat.voice.stop': 'Huwag makinig',
    'chat.voice.stop_audio': 'Itigil ang audio playback',
    'chat.helper': 'Tip: Pindutin ang Enter para magpadala o gamitin ang microphone para magsalita',
    
    // Quick questions
    'quick.projects': 'Sabihin mo sa akin tungkol sa iyong mga proyekto',
    'quick.skills': 'Ano ang iyong mga skills?',
    'quick.education': 'Educational background',
    'quick.contact': 'Contact information',
    'quick.available': 'Available ba para sa trabaho?',
    
    // Language names
    'lang.en': 'English',
    'lang.es': 'Espanyol',
    'lang.fr': 'Pranses',
    'lang.de': 'Aleman',
    'lang.zh': 'Tsino',
    'lang.ja': 'Hapon',
    'lang.ko': 'Koreano',
    'lang.tl': 'Filipino',
    
    // Robert's info translations
    'robert.name': 'Robert Simeon Jr.',
    'robert.education': 'Nagtapos ng Bachelor of Science in Information Technology sa St. Paul University Philippines (Nagtapos noong Hunyo 2026)',
    'robert.location': 'Pilipinas',
    'robert.graduation': 'Nagtapos: Hunyo 2026',
    'robert.email': 'robertsimeon12345@gmail.com',
    'robert.phone': '09215512415',
    'robert.linkedin': 'linkedin.com/in/robert-simeon-08063b214/',
    'robert.github': 'github.com/jacksimeon1',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const langTranslations = translations[language];
    const enTranslations = translations['en'];
    
    return (langTranslations && langTranslations[key as keyof typeof langTranslations]) || 
           (enTranslations && enTranslations[key as keyof typeof enTranslations]) || 
           key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return { language: 'en' as Language, setLanguage: () => {}, t: (key: string) => key };
  }
  return context;
}
