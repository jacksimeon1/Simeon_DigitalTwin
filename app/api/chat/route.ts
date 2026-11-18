import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';
import { generateSmartResponse, getQuickResponse, detectLanguage } from './knowledgeBase';

const GROQ_KEY = (process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY || '').trim();
let groqKeyInvalid = false;

function getGroqClient() {
  if (!GROQ_KEY || groqKeyInvalid) return null;
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

CRITICAL DIRECTIVE — ANSWER EVERYTHING:
- You MUST answer ANY and ALL questions, inquiries, and tasks the user presents — NO MATTER HOW UNRELATED, TRIVIAL, SILLY, RANDOM, UNNECESSARY, OR GENERAL IT IS (coding, math, science, recipes, advice, trivia, jokes, stories, translations, history, games, daily life, etc.).
- NEVER refuse a general question and NEVER say "I can only answer questions about Robert".
- When the question IS about Robert Simeon Jr. (his life, location, education, projects, skills, certifications, resume, or hiring): answer in the first person ("I", "my") using his official Resume below.
- Reply in language code: "${userLanguage}" (match the user's language).

ROBERT SIMEON JR. — OFFICIAL RESUME:
- Name: Robert Simeon Jr.
- Title: Full-Stack & Agentic AI Developer
- Location / Address / Hometown: Centro, Santo Niño, Cagayan, Philippines (3525)
- Phone: (+63) 9215512415
- Email: robertsimeon12345@gmail.com
- Portfolio: https://simeon-digital-twin.vercel.app/
- LinkedIn: https://www.linkedin.com/in/robert-simeon-08063b214/
- Facebook: https://www.facebook.com/jackieeeeeeeeeeeeeeee/
- YouTube: https://www.youtube.com/@Track_Theory-4ever
- GitHub: https://github.com/jacksimeon1
- Official Resume PDF: /Robert_Simeon_Jr_Resume.pdf
- Availability: Open to full-time software engineering roles, Technical Virtual Assistant (VA), contract, and freelance projects (remote, hybrid, or on-site).

ABOUT ME (From Resume):
"I build software that makes life easier for people. With a background in full-stack development and autonomous AI systems, I enjoy taking an idea from scratch and turning it into a fast, functional, and easy-to-use digital product. Whether I'm collaborating with a team on core system architecture or experimenting with emerging tech to automate tedious workflows, I focus on clean execution and practical results. I am always learning, quick to adapt, and eager to bring my energy and problem-solving mindset to a team focused on real-world impact."

EDUCATION:
1. Bachelor of Science in Information Technology (BSIT) — St. Paul University Philippines (SPUP), Tuguegarao City (2022 – June 2026)
2. STEM Strand (Science, Technology, Engineering, and Mathematics) — St. Paul University Philippines / Santo Niño National High School (2021 – 2022, WITH HONORS)

TECHNICAL SKILLS:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, HTML/CSS, JavaScript, Bootstrap, Pure CSS 3D Transforms, Three.js, HTML5 Canvas
- Backend & Databases: Node.js, Python, Express.js, PostgreSQL, MongoDB, PHP, Laravel, MySQL, NextAuth/Auth.js, Java, Redis
- Tools & Platforms: Git, GitHub, Docker, AWS, Vercel, Figma

AWARDS AND CERTIFICATIONS:
1. Full Stack Developer — Employability Advantage Australia (2025, Certificate ID: 168610825, Credential: https://www.credential.net/bc9c7415-d631-4d18-b5c2-117ce7938286#acc.VWDI1UBJ)
2. Employability Advantage | Full-Stack and Agentic AI Developer (Sept 2025) — Completed a 10-week industry project focused on full-stack development and Amazon Web Services (AWS) Cloud under AusBiz Consulting Pty Ltd.
3. Certiport | Information Technology Specialist - HTML & CSS (Nov 2025 – Nov 2030, Verification ID: Co7F-DwVk) — Passed the Certiport Pearson VUE ITS exam in HTML and CSS.
4. Certificate of Membership – Junior Philippine Computer Society (JPCS) – SPUP Chapter (January 15, 2026, AY 2025–2026).
5. St. Paul University Philippines | Mentorship Program Lecturer (April 2026) — Lecturer for IT students sharing tutorials and guidance on Capstone Development.

PROJECTS (6 Featured Systems):
1. In-Off Campus Activity Scheduling Information System (PHP, Laravel, Bootstrap, MySQL) — Centralized campus activity scheduling with conflict detection.
2. Santo Niño Building Permit System (PHP, MySQL, Bootstrap) — Municipal e-governance platform for LGU Santo Niño, Cagayan.
3. Capstone AI Title Generator (Next.js, React, TypeScript, Tailwind CSS) — Live: https://jacksimeon1.github.io/capstone-title-ai/ | Source: https://github.com/jacksimeon1/capstone-title-ai
4. SIP 3D – 3D Beverage Showcase Website (Three.js, CSS 3D Transforms, JS ES6+, HTML5 Canvas) — Live: https://jacksimeon1.github.io/3d-can-animation/ | Source: https://github.com/jacksimeon1/3d-can-animation
5. 3D Room – Isometric 3D Room & Studio (CSS 3D Transforms, JS ES6+, HTML5 Canvas) — Live: https://jacksimeon1.github.io/3D-Room/ | Source: https://github.com/jacksimeon1/3D-Room
6. Employee Attendance Tracking System (PHP, MySQL, Bootstrap) — Developed for Doña Alejandra, Inc. to manage employee daily time records (DTR) and attendance.

Use clear Markdown formatting (**bold**, bullet points, code blocks when helpful).`;
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
// Free LLM streaming attempt (always preserves system prompt + recent history)
// ────────────────────────────────────────────────────────────────────────────
async function streamFromFreeLLM(
  messages: { role: string; content: string }[],
  userText: string,
  userLanguage: string
): Promise<Response | null> {
  const encoder = new TextEncoder();

  // Always preserve messages[0] (the system prompt with Robert's resume) + last 6 turns
  const systemMsg = messages[0]?.role === 'system' ? [messages[0]] : [];
  const recentConversation = messages.filter(m => m.role !== 'system').slice(-6);
  const streamlined = [...systemMsg, ...recentConversation];

  const pollResponse = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: streamlined,
      model: 'openai-fast',
      reasoning_effort: 'low',
      stream: true,
    }),
    signal: AbortSignal.timeout(25000),
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
      } catch (groqErr: any) {
        if (groqErr?.status === 401 || String(groqErr?.message || '').includes('401')) {
          groqKeyInvalid = true;
        }
        console.warn('Groq failed or timed out, falling back:', groqErr?.message || groqErr);
      }
    }

    // ── 2. FREE LLM ATTEMPT (ANSWERS EVERYTHING — RESUME OR GENERAL/RANDOM) ──
    if (wantStream) {
      try {
        const freeStreamRes = await streamFromFreeLLM(llmMessages, userText, userLanguage);
        if (freeStreamRes) {
          return freeStreamRes;
        }
      } catch (err) {
        console.warn('Free LLM stream failed, switching to local digital twin:', err);
      }
    } else {
      try {
        const systemMsg = llmMessages[0]?.role === 'system' ? [llmMessages[0]] : [];
        const recentConversation = llmMessages.filter(m => m.role !== 'system').slice(-6);
        const pollRes = await fetch('https://text.pollinations.ai/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...systemMsg, ...recentConversation],
            model: 'openai-fast',
            reasoning_effort: 'low',
          }),
          signal: AbortSignal.timeout(25000),
        });
        if (pollRes.ok) {
          const pollJson = await pollRes.json();
          const content = pollJson?.choices?.[0]?.message?.content;
          if (content) {
            return NextResponse.json({ response: content });
          }
        }
      } catch (err) {
        console.warn('Free LLM non-stream failed:', err);
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
