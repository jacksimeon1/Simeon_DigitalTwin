import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function GET(req: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's visits
    const todayVisits = await redis.get(`analytics:visits:${today}`);
    
    // Get total chats
    const totalChats = await redis.get('analytics:chats');
    
    // Get total contacts
    const totalContacts = await redis.get('analytics:contacts');
    
    // Get project views (all projects)
    const projectKeys = await redis.keys('analytics:project:*');
    const projectViews: Record<string, number> = {};
    
    for (const key of projectKeys.slice(0, 10)) { // Limit to 10 projects
      const projectId = key.split(':')[2];
      const views = await redis.get(key);
      projectViews[projectId] = parseInt(views || '0');
    }
    
    // Get weekly visits
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const visits = await redis.get(`analytics:visits:${dateStr}`);
      weeklyData.push({
        date: dateStr,
        visits: parseInt(visits || '0')
      });
    }
    
    return NextResponse.json({
      todayVisits: parseInt(todayVisits || '0'),
      totalChats: parseInt(totalChats || '0'),
      totalContacts: parseInt(totalContacts || '0'),
      projectViews,
      weeklyData
    });
  } catch (error) {
    console.error('Failed to retrieve analytics dashboard:', error);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}
