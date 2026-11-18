import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { sessionId, messages } = await req.json();
    
    // Store chat session in Redis
    await redis.set(`chat:${sessionId}`, JSON.stringify(messages), {
      ex: 3600 // Expire in 1 hour
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save chat session:', error);
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }
    
    // Retrieve chat session from Redis
    const rawMessages = await redis.get(`chat:${sessionId}`);
    
    let messages = [];
    if (typeof rawMessages === 'string') {
      try {
        messages = JSON.parse(rawMessages);
      } catch {
        messages = [];
      }
    } else if (Array.isArray(rawMessages)) {
      messages = rawMessages;
    }
    
    return NextResponse.json({ messages: Array.isArray(messages) ? messages : [] });
  } catch (error) {
    console.error('Failed to retrieve chat session:', error);
    return NextResponse.json({ error: 'Failed to retrieve session', messages: [] }, { status: 500 });
  }
}
