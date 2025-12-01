# Vercel Upstash Redis Integration Guide

## 🎯 Overview
This guide will help you integrate Vercel Upstash Redis database into your Digital Twin Portfolio for real-time features, caching, or session management.

---

## 📋 Prerequisites
- Vercel account (already have)
- Upstash Redis account (free tier available)
- Your portfolio project ready

---

## 🚀 Step-by-Step Setup

### **Step 1: Create Upstash Redis Database**

1. **Go to Upstash Console**
   - Visit https://console.upstash.com
   - Sign up with your GitHub account (recommended)

2. **Create New Database**
   - Click "Create Database"
   - Choose region closest to your users (recommended: East US)
   - Select "Free" tier (good for development)
   - Click "Create"

3. **Get Connection Details**
   - Once created, go to your database
   - Click "Connect" button
   - Copy the **UPSTASH_REDIS_REST_URL** and **UPSTASH_REDIS_REST_TOKEN**

### **Step 2: Install Required Packages**

```bash
npm install @upstash/redis
# or
yarn add @upstash/redis
```

### **Step 3: Set Up Environment Variables**

1. **In your Vercel Project:**
   - Go to your Vercel dashboard
   - Select your portfolio project
   - Go to "Settings" → "Environment Variables"

2. **Add these variables:**
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
   ```

3. **Also add to local .env file:**
   ```
   UPSTASH_REDIS_REST_URL=your_redis_url_here
   UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
   ```

### **Step 4: Create Redis Client Helper**

Create a new file: `lib/redis.ts`

```typescript
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;
```

### **Step 5: Implement Use Cases**

#### **Use Case 1: Chat Session Storage**
Create: `app/api/chat/session.ts`

```typescript
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
    const messages = await redis.get(`chat:${sessionId}`);
    
    return NextResponse.json({ messages: messages || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 });
  }
}
```

#### **Use Case 2: Visitor Analytics**
Create: `app/api/analytics/track.ts`

```typescript
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
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track analytics' }, { status: 500 });
  }
}
```

#### **Use Case 3: Real-time Notifications**
Create: `app/api/notifications/send.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { userId, message, type } = await req.json();
    
    // Store notification
    const notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false
    };
    
    await redis.lpush(`notifications:${userId}`, JSON.stringify(notification));
    
    // Keep only last 50 notifications per user
    await redis.ltrim(`notifications:${userId}`, 0, 49);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}
```

### **Step 6: Update Chatbot to Use Redis**

Modify your existing chatbot component to use session storage:

```typescript
// In your Chatbot.tsx component
const saveChatSession = async (sessionId: string, messages: Message[]) => {
  try {
    await fetch('/api/chat/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, messages })
    });
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

const loadChatSession = async (sessionId: string) => {
  try {
    const response = await fetch(`/api/chat/session?sessionId=${sessionId}`);
    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Failed to load session:', error);
    return [];
  }
};
```

### **Step 7: Add Analytics Tracking**

Add this to your components for tracking:

```typescript
// Track page visits
useEffect(() => {
  const trackVisit = async () => {
    try {
      await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'page_visit', data: { page: window.location.pathname } })
      });
    } catch (error) {
      console.error('Failed to track visit:', error);
    }
  };
  
  trackVisit();
}, []);

// Track project views
const trackProjectView = async (projectId: string) => {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'project_view', data: { projectId } })
    });
  } catch (error) {
    console.error('Failed to track project view:', error);
  }
};
```

---

## 🔧 Advanced Features

### **Real-time Chat with WebSockets**
Create: `app/api/chat/realtime/route.ts`

```typescript
import { NextRequest } from 'next/server';
import redis from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const { roomId, message, userId } = await req.json();
    
    // Publish message to Redis channel
    await redis.publish(`chat:${roomId}`, JSON.stringify({
      message,
      userId,
      timestamp: new Date().toISOString()
    }));
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

### **Caching API Responses**
```typescript
// Cache expensive operations
const getCachedData = async (key: string, fetcher: () => Promise<any>, ttl: number = 300) => {
  const cached = await redis.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await fetcher();
  await redis.set(key, JSON.stringify(data), { ex: ttl });
  
  return data;
};
```

---

## 🚀 Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Upstash Redis integration"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Vercel will automatically detect new environment variables
   - Your Redis integration will be live

3. **Test in Production**
   - Visit your deployed site
   - Test chat session storage
   - Verify analytics tracking

---

## 📊 Monitoring & Debugging

### **View Redis Data**
```typescript
// Debug endpoint to view Redis data
export async function GET() {
  const keys = await redis.keys('*');
  const data = {};
  
  for (const key of keys.slice(0, 10)) { // Limit to 10 keys
    data[key] = await redis.get(key);
  }
  
  return Response.json(data);
}
```

### **Redis Best Practices**
- Use appropriate expiration times
- Use descriptive key names
- Monitor Redis usage in Upstash console
- Implement error handling for Redis operations

---

## 🎯 Use Case Ideas for Your Portfolio

1. **Chat History**: Store conversation history
2. **Visitor Analytics**: Track page visits and interactions
3. **Project Views**: Count project popularity
4. **Contact Form**: Store form submissions temporarily
5. **Session Management**: User session persistence
6. **Rate Limiting**: Prevent API abuse
7. **Caching**: Cache expensive API calls
8. **Real-time Features**: Live notifications

---

## ❓ Troubleshooting

### **Common Issues:**
1. **Environment Variables Not Found**: Ensure they're set in Vercel and locally
2. **Redis Connection Failed**: Check URL and token are correct
3. **CORS Issues**: Ensure API routes handle CORS properly
4. **Rate Limits**: Upstash free tier has limits

### **Debug Commands:**
```typescript
// Test Redis connection
const testRedis = async () => {
  try {
    await redis.set('test', 'hello');
    const value = await redis.get('test');
    console.log('Redis test:', value); // Should be 'hello'
  } catch (error) {
    console.error('Redis connection failed:', error);
  }
};
```

---

## 🎉 Conclusion

You now have Upstash Redis integrated into your Digital Twin Portfolio! This adds:
- **Real-time capabilities**
- **Performance improvements** through caching
- **Analytics and insights**
- **Session persistence**
- **Scalability** for future features

Start with simple use cases like chat session storage, then gradually add more advanced features as needed!
