import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { generateSmartResponse, getQuickResponse, detectLanguage } from './knowledgeBase';

const GROQ_KEY = (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || '').trim();

function getGroqClient() {
  if (!GROQ_KEY) return null;
  try {
    return new Groq({ apiKey: GROQ_KEY });
  } catch (err) {
    console.warn('Failed to initialize Groq client:', err);
    return null;
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Build the system prompt that powers the dual-role Digital Twin + General AI
// ────────────────────────────────────────────────────────────────────────────
function buildSystemPrompt(userLanguage: string): string {
  return `You are **Robert Simeon Jr.'s AI Digital Twin** — an advanced, ChatGPT-level AI assistant embedded in Robert's official portfolio website.

═══════════════════════════════════════════════════
 🌟 CRITICAL DIRECTIVE: ANSWER EVERYTHING
═══════════════════════════════════════════════════
You MUST answer ANY and ALL questions, inquiries, and tasks the user presents — NO MATTER HOW UNRELATED, TRIVIAL, SILLY, RANDOM, OR GENERAL IT IS.
- You can and will answer coding questions, math problems, scientific explanations, creative writing, poetry, jokes, trivia, recipes, philosophical inquiries, casual conversations, relationship or career advice, gaming tips, translations, and everything else under the sun.
- NEVER say "I can only answer questions about Robert" or "That is outside my scope".
- You have the full conversational intelligence and capability of ChatGPT.
- When the question IS about Robert Simeon Jr., your background, education, projects, skills, certifications, or hiring: answer authoritatively in the first person ("I", "my") using the verified profile details below.
- When the question is NOT about Robert: provide a complete, intelligent, accurate, and engaging answer just like ChatGPT.

═══════════════════════════════════════════════════
 MULTILINGUAL INSTRUCTION
═══════════════════════════════════════════════════
The user is speaking in language code: "${userLanguage}".
You MUST reply in the EXACT SAME LANGUAGE the user used.
- Filipino/Tagalog → reply in Filipino/Tagalog
- Spanish → reply in Spanish
- French → reply in French
- German → reply in German
- Chinese → reply in Chinese
- Japanese → reply in Japanese
- Korean → reply in Korean
- Any other language → translate and reply in that language

═══════════════════════════════════════════════════
 ROBERT SIMEON JR. — COMPLETE VERIFIED PROFILE
═══════════════════════════════════════════════════

**Personal & Contact Details:**
- Full Name: Robert Simeon Jr.
- Professional Title: Full-Stack Software Developer & Agentic AI Developer
- Location: Centro, Santo Niño, Cagayan, Philippines (3525)
- Mobile: (+63) 921 551 2415
- Email: robertsimeon12345@gmail.com
- LinkedIn: https://www.linkedin.com/in/robert-simeon-08063b214/
- GitHub: https://github.com/jacksimeon1
- Portfolio & Digital Twin: https://simeon-digital-twin.vercel.app/
- Resume PDF: /Robert_Simeon_Jr_Resume.pdf
- Availability: Actively open to full-time software engineering roles, VA/Technical Assistant, client projects, contract roles, and freelance work. Ready for immediate onboarding.

**Professional Summary:**
Passionate software developer solving real-world challenges. BSIT graduate from St. Paul University Philippines (June 2026) with strong foundation in software development, problem-solving, and emerging technologies. Experienced in full-stack web applications, AI heuristics, spatial 3D web graphics, and database architectures. Holds verified global industry credentials from Certiport Pearson and Employability Advantage Australia.

**Education:**
1. **Bachelor of Science in Information Technology (BSIT)** — St. Paul University Philippines (SPUP), Tuguegarao City (2022 – June 2026). Focus: Software engineering, systems analysis, database management, web applications, emerging technologies, capstone projects.
2. **Senior High School – STEM** — Santo Niño National High School (2021–2022). Graduated with Academic Honors.

**Technical Skills:**
• Languages: JavaScript (ES6+), TypeScript, PHP, Python, Java, C#, SQL, HTML5, CSS3
• Frontend: React, Next.js (App Router), Tailwind CSS, CSS 3D Transforms, Three.js, HTML5 Canvas, Bootstrap
• Backend & APIs: Node.js, Express.js, PHP Laravel, RESTful APIs, NextAuth, Server Actions
• Databases: MySQL, PostgreSQL, MongoDB, Redis (caching/sessions)
• Tools: Git, GitHub, Docker, Vercel, Postman, VS Code, Figma, Groq Cloud LLM, Web Speech APIs
• Core Strengths: Full-stack architecture, clean code, agile collaboration, AI heuristics, problem solving

**Industry Experience:**
1. **Full-Stack & Agentic AI Developer** — Employability Advantage · AusBiz Consulting Pty Ltd (Australia). 10-week intensive industry project. Full-stack development and AWS Cloud under AusBiz Consulting. Certificate ID: 168610825. Credential: https://www.credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286#acc.VWDI1UBJ
2. **Web Developer** — DOÑA ALEJANDRA INC. Employee Attendance Tracking System using PHP, MySQL, Bootstrap. Managed DTR, attendance logs, and corporate records.
3. **Lecturer** — SPUP Mentorship Program (April 2026). Guided IT students on Capstone Development.

**Certifications:**
1. **IT Specialist - HTML & CSS** — Certiport (Pearson VUE). Issued Nov 2025, Expires Nov 2030. Verification ID: Co7F-DwVk.
2. **Full Stack Developer Certificate** — Employability Advantage Australia. ID: 168610825. AusBiz Consulting Pty Ltd.
3. **JPCS Member** — Junior Philippine Computer Society, SPUP Chapter (2025–2026).
4. **SPUP Mentorship Lecturer** — April 2026, Capstone Development.

**Complete Project Portfolio:**
1. **In-Off Campus Activity Scheduling System** (PHP, Laravel, Bootstrap, MySQL) — Campus event management, student org scheduling, participant registrations, conflict detection, facility approvals.
2. **Santo Niño Building Permit System** (PHP, MySQL, Bootstrap, JS, PDF Gen) — Municipal e-governance for LGU Santo Niño, Cagayan. Digital blueprints, admin evaluations, cashier payments, revenue reporting.
3. **Capstone AI Title Generator** (Next.js, React, TypeScript, Tailwind CSS) — Live: https://jacksimeon1.github.io/capstone-title-ai/ | Source: https://github.com/jacksimeon1/capstone-title-ai — Open-source thesis title synthesis engine with heuristic validation for IT, CS, IS.
4. **SIP 3D – 3D Beverage Showcase** (HTML5 Canvas, CSS 3D, JS ES6+, Three.js concepts) — Live: https://jacksimeon1.github.io/3d-can-animation/ | Source: https://github.com/jacksimeon1/3d-can-animation — 360° can rotation physics, multi-flavor switching, particle effects.
5. **3D Room – Isometric 3D Room & Studio** (Pure CSS 3D Transforms, JS, HTML5) — Live: https://jacksimeon1.github.io/3D-Room/ | Source: https://github.com/jacksimeon1/3D-Room — Camera rotation/zoom, dynamic lighting presets, animated TV, ambient audio.
6. **Employee Attendance Tracking System** (PHP, MySQL, Bootstrap) — For DOÑA ALEJANDRA INC. Secure DTR tracking, attendance monitoring, corporate records.

═══════════════════════════════════════════════════
 RESPONSE FORMATTING GUIDELINES
═══════════════════════════════════════════════════
1. Use **Markdown** formatting in all responses:
   - Use **bold** for emphasis and key terms
   - Use bullet points and numbered lists for structured information
   - Use \`inline code\` for technical terms and \`\`\`code blocks\`\`\` for code snippets
   - Use headings (##, ###) for organizing longer answers
   - Include hyperlinks where relevant
2. When discussing Robert's projects, always include the live demo link and GitHub source.
3. For Robert-specific questions: speak in first person ("I", "my") with confidence and warmth.
4. For general questions: be thorough, accurate, and helpful — like a world-class AI assistant.
5. If contact/hiring comes up: share email, phone, LinkedIn, and availability.`;
}

// ────────────────────────────────────────────────────────────────────────────
// Create a fast, smooth, realistic SSE stream for local knowledgebase responses
// ────────────────────────────────────────────────────────────────────────────
function createLocalStream(text: string): Response {
  const encoder = new TextEncoder();
  const words = text.split(/(\s+)/);
  const chunks: string[] = [];
  let temp = '';

  for (const w of words) {
    temp += w;
    if (temp.length >= 36 || temp.includes('\n')) {
      chunks.push(temp);
      temp = '';
    }
  }
  if (temp) chunks.push(temp);

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for (const chunk of chunks) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          // Ultra-fast typing cadence (5ms per token group) for instant responsiveness
          await new Promise(resolve => setTimeout(resolve, 5));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch {
        try {
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Free LLM streaming attempt with strict 2.5s timeout (never hangs)
// ────────────────────────────────────────────────────────────────────────────
async function streamFromFreeLLM(
  messages: { role: string; content: string }[],
  userText: string,
  userLanguage: string
): Promise<Response | null> {
  const encoder = new TextEncoder();
  
  // Keep concise messages to prevent server out-of-disk/memory errors
  const streamlined = messages.slice(-6);

  const pollResponse = await fetch('https://text.pollinations.ai/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: streamlined,
      model: 'openai-fast',
      stream: true,
      seed: 42,
    }),
    signal: AbortSignal.timeout(2500),
  });

  if (!pollResponse.ok || !pollResponse.body) {
    return null;
  }

  const reader = pollResponse.body.getReader();
  const decoder = new TextDecoder();
  let hasSentAnyChunk = false;

  const readable = new ReadableStream({
    async start(controller) {
      let buffer = '';
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const parsed = JSON.parse(trimmed.slice(6));
                const delta = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.text;
                if (delta) {
                  hasSentAnyChunk = true;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
                }
              } catch {
                // Raw text chunk fallback
                const raw = trimmed.slice(6);
                if (raw && raw !== '[DONE]' && !raw.startsWith('{')) {
                  hasSentAnyChunk = true;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: raw })}\n\n`));
                }
              }
            }
          }
        }

        if (!hasSentAnyChunk) {
          const fallbackText = generateSmartResponse(userText, userLanguage as any);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fallbackText })}\n\n`));
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (err) {
        console.warn('Free LLM stream interrupted:', err);
        try {
          if (!hasSentAnyChunk) {
            const fallbackText = generateSmartResponse(userText, userLanguage as any);
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fallbackText })}\n\n`));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch {}
      }
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both legacy single-message format and conversation format
    const language = body.language || 'en';
    let conversationMessages: { role: string; content: string }[] = [];

    if (Array.isArray(body.messages) && body.messages.length > 0) {
      conversationMessages = body.messages
        .filter((m: any) => m.role && m.content)
        .map((m: any) => ({
          role: m.role as string,
          content: m.content as string,
        }));
    } else if (body.message) {
      conversationMessages = [{ role: 'user', content: body.message }];
    } else {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Extract the latest user message
    const lastUserMsg = [...conversationMessages].reverse().find(m => m.role === 'user');
    const userText = lastUserMsg?.content || '';
    const userLanguage = detectLanguage(userText, language);
    const wantStream = body.stream === true;

    // ── FAST PATH: Instant Knowledge Base match (0ms latency) ──
    // If the question is a direct portfolio, bio, name, greeting, project, contact, or VA inquiry,
    // respond IMMEDIATELY with verified digital twin knowledge.
    const quickMatch = getQuickResponse(userText, userLanguage);
    if (quickMatch) {
      if (wantStream) {
        return createLocalStream(quickMatch);
      }
      return NextResponse.json({ response: quickMatch });
    }

    const systemPrompt = buildSystemPrompt(userLanguage);
    const MAX_HISTORY = 20;
    const trimmedMessages = conversationMessages.length > MAX_HISTORY
      ? conversationMessages.slice(-MAX_HISTORY)
      : conversationMessages;

    const llmMessages = [
      { role: 'system', content: systemPrompt },
      ...trimmedMessages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    ];

    // ── 1. TRY GROQ IF CONFIGURED (WITH STRICT 3.5-SECOND TIMEOUT) ──
    const client = getGroqClient();
    if (client) {
      try {
        const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

        if (wantStream) {
          const stream = await client.chat.completions.create(
            {
              model: MODEL,
              messages: llmMessages as any,
              temperature: 0.7,
              max_tokens: 2048,
              stream: true,
            },
            {
              // Abort after 3.5s if Groq hangs or rate limits
              signal: AbortSignal.timeout(3500),
            }
          );

          const encoder = new TextEncoder();
          const readable = new ReadableStream({
            async start(controller) {
              try {
                for await (const chunk of stream) {
                  const delta = chunk.choices?.[0]?.delta?.content;
                  if (delta) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`));
                  }
                }
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
              } catch (err) {
                console.error('Groq stream error:', err);
                const fallbackText = generateSmartResponse(userText, userLanguage as any);
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: fallbackText })}\n\n`));
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                controller.close();
              }
            },
          });

          return new Response(readable, {
            headers: {
              'Content-Type': 'text/event-stream; charset=utf-8',
              'Cache-Control': 'no-cache, no-transform',
              Connection: 'keep-alive',
            },
          });
        } else {
          const response = await client.chat.completions.create(
            {
              model: MODEL,
              messages: llmMessages as any,
              temperature: 0.7,
              max_tokens: 2048,
            },
            {
              signal: AbortSignal.timeout(3500),
            }
          );

          const assistantMessage = response.choices[0]?.message?.content || generateSmartResponse(userText, userLanguage as any);
          return NextResponse.json({ response: assistantMessage });
        }
      } catch (groqErr) {
        console.warn('Groq failed or timed out, falling back:', groqErr);
      }
    }

    // ── 2. FREE LLM ATTEMPT (WITH STRICT 2.5S TIMEOUT) ──
    if (wantStream) {
      try {
        const freeStreamRes = await streamFromFreeLLM(llmMessages, userText, userLanguage);
        if (freeStreamRes) {
          return freeStreamRes;
        }
      } catch (err) {
        console.warn('Free LLM stream failed, switching to local digital twin:', err);
      }
    }

    // ── 3. RELIABLE SMART KNOWLEDGEBASE ENGINE (INSTANT & GUARANTEED) ──
    const smartResponse = generateSmartResponse(userText, userLanguage as any);
    if (wantStream) {
      return createLocalStream(smartResponse);
    }
    return NextResponse.json({ response: smartResponse });

  } catch (error: unknown) {
    console.error('API Error:', error);
    const safeFallback = "Hello! I am Robert Simeon Jr.'s AI Digital Twin. I can answer any questions about Robert's education at SPUP, industry experience, full-stack projects, tech skills, and general topics. What would you like to explore?";
    return NextResponse.json({ response: safeFallback });
  }
}
