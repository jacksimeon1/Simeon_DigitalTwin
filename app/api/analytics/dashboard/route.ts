import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

interface ProjectView {
  projectId: string;
  views: number;
}

interface WeeklyData {
  date: string;
  visits: number;
}

export async function GET(req: NextRequest) {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    // Get today's visits
    const todayVisitsResult = await redis.get(`analytics:visits:${today}`);
    const todayVisits = parseInt((todayVisitsResult as string) || '0');
    
    // Get total chats
    const totalChatsResult = await redis.get('analytics:chats');
    const totalChats = parseInt((totalChatsResult as string) || '0');
    
    // Get total contacts
    const totalContactsResult = await redis.get('analytics:contacts');
    const totalContacts = parseInt((totalContactsResult as string) || '0');
    
    // Get project views (all projects)
    const projectKeys = await redis.keys('analytics:project:*');
    const projectViews: ProjectView[] = [];
    
    for (const key of projectKeys.slice(0, 10)) { // Limit to 10 projects
      const projectId = key.split(':')[2];
      const viewsResult = await redis.get(key);
      const views = parseInt((viewsResult as string) || '0');
      projectViews.push({ projectId, views });
    }
    
    // Get weekly visits
    const weeklyData: WeeklyData[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const visitsResult = await redis.get(`analytics:visits:${dateStr}`);
      const visits = parseInt((visitsResult as string) || '0');
      weeklyData.push({ date: dateStr, visits });
    }
    
    return NextResponse.json({
      todayVisits,
      totalChats,
      totalContacts,
      projectViews,
      weeklyData
    });
  } catch (error) {
    console.error('Failed to retrieve analytics dashboard:', error);
    return NextResponse.json({ error: 'Failed to retrieve analytics' }, { status: 500 });
  }
}
