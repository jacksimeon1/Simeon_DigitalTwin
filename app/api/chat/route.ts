import { Groq } from 'groq-sdk';
import { NextRequest, NextResponse } from 'next/server';

// Prefer a server-only key for security (set GROQ_API_KEY in Vercel env vars).
// For local development the existing NEXT_PUBLIC_GROQ_API_KEY will be used as a fallback.
const GROQ_KEY = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

if (!GROQ_KEY) {
  console.warn('No GROQ API key found. Set GROQ_API_KEY (server-only) or NEXT_PUBLIC_GROQ_API_KEY for local dev.');
}

const client = new Groq({
  apiKey: GROQ_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemPrompt = `You are an AI assistant representing Robert Simeon Jr., a 4th year Information Technology student at SPUP (St. Paul University Philippines).

**About Robert:**
- Name: Robert Simeon Jr.
- Year: 4th Year
- Course: Information Technology (IT)
- School: SPUP (St. Paul University Philippines)
- Focus: Information systems, software development, and enterprise solutions
- Key Project: In-Off Campus Activity Scheduling Information System

**Your Role:**
- You represent Robert's digital twin portfolio
- Be friendly, professional, and engaging
- Answer questions about Robert's projects, skills, achievements, and experiences
- Discuss his technical capabilities and interests
- Provide insights into his educational background and career goals
- Maintain a conversational, helpful tone
- Keep responses concise but informative (2-4 sentences typically)
- If asked about something not in the portfolio, acknowledge the question warmly

**Key Values:**
- Be authentic and personable
- Show enthusiasm for technology and learning
- Be honest about skills and experiences
- Help potential employers/collaborators understand Robert's capabilities`;

    // Try to call Groq model; if it's decommissioned or unavailable,
    // respond with a safe fallback so the frontend remains functional.
    try {
      const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
      const response = await client.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      });

      const assistantMessage = response.choices[0]?.message?.content || 'No response generated';
      return NextResponse.json({ response: assistantMessage });
    } catch (e: any) {
      // If the model was decommissioned or the request fails, provide a helpful fallback response
      console.error('Groq call failed:', e?.message || e);

      const errMsg = e?.error?.code === 'model_decommissioned' || (typeof e?.message === 'string' && e.message.includes('decommissioned'))
        ? 'The configured AI model is currently unavailable. I can still help — here is a concise summary based on the portfolio: Robert Simeon Jr. is a 4th year Information Technology student at St. Paul University Philippines (SPUP) focusing on information systems and software development. Key project: In-Off Campus Activity Scheduling Information System. Ask me about his projects or skills.'
        : 'I could not reach the AI service right now. Please try again in a moment.';

      return NextResponse.json({ response: errMsg });
    }
  } catch (error: unknown) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
