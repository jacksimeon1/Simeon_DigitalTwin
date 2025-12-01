import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { type, data } = await req.json();
    
    // Track page visits
    if (type === 'page_visit') {
      const today = new Date().toISOString().split('T')[0];
      await redis.incr(`analytics:visits:${today}`);
    }
    
    // Track chat interactions
    if (type === 'chat_interaction') {
      await redis.incr('analytics:chats');
    }
    
    // Track project views
    if (type === 'project_view') {
      await redis.incr(`analytics:project:${data.projectId}`);
    }
    
    // Track contact form submissions
    if (type === 'contact_submission') {
      await redis.incr('analytics:contacts');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to track analytics:', error);
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    
    if (type === 'visits') {
      const today = new Date().toISOString().split('T')[0];
      const visits = await redis.get(`analytics:visits:${today}`);
      return NextResponse.json({ visits: parseInt(visits || '0') });
    }
    
    if (type === 'chats') {
      const chats = await redis.get('analytics:chats');
      return NextResponse.json({ chats: parseInt(chats || '0') });
    }
    
    if (type === 'contacts') {
      const contacts = await redis.get('analytics:contacts');
      return NextResponse.json({ contacts: parseInt(contacts || '0') });
    }
    
    return NextResponse.json({ error: 'Invalid analytics type' }, { status: 400 });
  } catch (error) {
    console.error('Failed to retrieve analytics:', error);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}
