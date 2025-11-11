# Robert Simeon Jr. - Digital Twin Portfolio

## 🎯 Overview

This is a modern, AI-powered digital twin portfolio website for **Robert Simeon Jr.**, a 4th year Computer Science student at **SPUP (Sacramentum Praesentis Universitatis Philippinarum)**.

The portfolio showcases projects, skills, and achievements with an **intelligent AI chatbot** powered by **Groq API** and voice assistant capabilities.

## ✨ Features

### 🤖 AI Chatbot with Groq Integration
- **Groq API** for lightning-fast responses
- **Intelligent context understanding** about Robert's portfolio
- **Real-time chat interface** with typing indicators
- Personalized system prompt for authentic representation

### 🎤 Voice Assistant Features
- **Speech-to-Text (STT)**: Speak your questions using the microphone button
- **Text-to-Speech (TTS)**: AI responds with spoken audio
- **Web Speech API** integration for cross-browser support
- Easy toggle controls for voice features

### 📱 Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Dark mode support** for better accessibility
- **Smooth animations** and transitions
- **Touch-friendly interface**

### 🎨 Modern UI/UX
- **Gradient backgrounds** and glassmorphism effects
- **Animated blobs** for visual interest
- **Smooth scrolling** between sections
- **Professional color scheme** (Blue/Purple/Pink)

### 📋 Portfolio Sections
1. **Hero Section**: Eye-catching introduction with call-to-action buttons
2. **Projects**: Showcase of featured projects with descriptions and technologies
3. **Skills**: Technical expertise and competencies
4. **Chat Section**: AI assistant interaction area
5. **Navigation**: Easy access to all sections
6. **Footer**: Quick links and contact information

## 🚀 Tech Stack

### Frontend
- **Next.js 16.0.1** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless functions
- **Groq SDK** - AI/LLM integration

### APIs & Services
- **Groq API** - Fast language model for AI responses
  - Model: `mixtral-8x7b-32768`
  - API Key: Stored in `.env.local`
- **Web Speech API** - Browser-native speech recognition and synthesis

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Node.js** - Runtime environment

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone or navigate to the project**:
   ```bash
   cd "c:\Users\Robert Simeon Jr\Desktop\online ojt\portfolio-twin"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - The `.env.local` file is already configured with your Groq API key
   - File: `.env.local`
   ```env
   NEXT_PUBLIC_GROQ_API_KEY=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
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   - Local: http://localhost:3000
   - Network: http://10.170.184.15:3000

## 📂 Project Structure

```
portfolio-twin/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Groq API integration
│   ├── components/
│   │   ├── Chatbot.tsx           # AI chatbot with voice features
│   │   ├── ChatSection.tsx        # Chat section layout
│   │   ├── Hero.tsx              # Hero section with greeting
│   │   ├── Navigation.tsx         # Top navigation bar
│   │   ├── Projects.tsx           # Projects showcase
│   │   ├── Skills.tsx            # Skills display
│   │   └── Footer.tsx            # Footer section
│   ├── globals.css               # Global styles with animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── public/                       # Static assets
├── .env.local                    # Environment variables (Groq API key)
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── eslint.config.mjs             # ESLint configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                      # This file
```

## 🎮 Usage Guide

### Chat with AI
1. Navigate to the "Chat with AI Assistant" section
2. **Type a message** in the input field and press Enter or click Send
3. **Ask anything** about Robert's projects, skills, or background

### Using Voice Features
1. **Speech Input**:
   - Click the 🎤 microphone button
   - Start speaking (browser will listen)
   - Click again or wait for auto-stop
   - Your speech will appear in the input field

2. **Speech Output**:
   - AI responses are automatically spoken aloud
   - Click the 🔊 volume button to stop playback
   - Volume controls available in browser settings

### Navigation
- **About** - Jump to hero section
- **Projects** - View featured projects
- **Skills** - See technical skills
- **Chat with AI** - Go to chatbot section

## 🔧 API Integration

### Groq API Configuration

**File**: `app/api/chat/route.ts`

```typescript
// Groq client initialization
const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

// Model used: mixtral-8x7b-32768
// Temperature: 0.7 (balanced creativity and consistency)
// Max tokens: 1024 (reasonable response length)
```

### System Prompt
The AI is configured with a detailed system prompt that:
- Identifies Robert as a 4th year SPUP student
- Understands his background and interests
- Responds professionally and authentically
- Maintains focus on portfolio-related topics

## 🎨 Customization

### Update Personal Information
Edit the following files to customize:
- `app/components/Hero.tsx` - Name and introduction
- `app/components/Navigation.tsx` - Logo and navigation
- `app/components/Footer.tsx` - Footer information
- `app/api/chat/route.ts` - AI system prompt

### Change Colors
- Edit Tailwind classes in component files
- Primary colors: Blue (`from-blue-600 to-purple-600`)
- Accent: Pink (`to-pink-600`)

### Add Projects
Edit `app/components/Projects.tsx`:
```typescript
const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Description here',
    tags: ['Tech1', 'Tech2'],
    link: 'https://...',
    github: 'https://...',
  },
];
```

### Add Skills
Edit `app/components/Skills.tsx`:
```typescript
const skillCategories = [
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', ...],
  },
];
```

## 🚀 Building for Production

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Deploy options**:
   - **Vercel** (recommended): `vercel deploy`
   - **Netlify**: Connect GitHub repository
   - **Other hosting**: Ensure Node.js support

## ⚙️ Available Scripts

```bash
# Development server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📱 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Voice Features**:
- Speech Recognition: Chrome, Edge (Android+iOS)
- Text-to-Speech: All modern browsers

## 🔐 Security Notes

- ⚠️ **API Key Management**: The Groq API key should ideally be stored as a server-side secret in production
- Current setup uses `NEXT_PUBLIC_` prefix for client-side access
- For production: Move to server environment variables only

## 📝 Environment Variables

| Variable | Value | Type |
|----------|-------|------|
| `NEXT_PUBLIC_GROQ_API_KEY` | Your Groq API key | Public |
| `GROQ_API_KEY` | Your Groq API key | Private (optional) |

## 🐛 Troubleshooting

### Chatbot not responding
- Check `.env.local` has valid Groq API key
- Verify network connection
- Check browser console for errors

### Voice features not working
- Ensure HTTPS (required for microphone access)
- Check browser microphone permissions
- Try Chrome or Edge for best compatibility

### Styling issues
- Clear `.next` cache: `rm -r .next` (Windows: `rmdir /s /q .next`)
- Rebuild project: `npm run build`

### Build errors
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [React Documentation](https://react.dev)

## 📄 License

This project is personal portfolio and owned by **Robert Simeon Jr.**

## 👤 About Robert Simeon Jr.

- **Year**: 4th Year
- **School**: SPUP (Sacramentum Praesentis Universitatis Philippinarum)
- **Focus**: Full-stack development, AI integration, digital experiences
- **Interests**: Technology innovation, intelligent solutions, web development

## 🤝 Contact

- **Email**: [Add your email]
- **GitHub**: [Add your GitHub URL]
- **LinkedIn**: [Add your LinkedIn URL]

---

**Built with ❤️ using Next.js, React, and Groq AI**

*Last Updated: November 2024*
