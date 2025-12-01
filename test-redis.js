// Test Redis Connection
// Run this with: node test-redis.js

const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: 'https://moved-badger-37600.upstash.io',
  token: 'AZLgAAIncDJmMWE0ZmJkOTY1YzY0MzdlOTE0MzI3NzM3M2EzMWJhOHAyMzc2MDA',
});

async function testRedis() {
  try {
    console.log('Testing Redis connection...');
    
    // Test write
    await redis.set('test-key', 'Hello from Redis!');
    console.log('✅ Write successful');
    
    // Test read
    const value = await redis.get('test-key');
    console.log('✅ Read successful:', value);
    
    // Test analytics write
    await redis.incr('analytics:visits:test');
    console.log('✅ Analytics write successful');
    
    console.log('🎉 Redis is working perfectly!');
    
  } catch (error) {
    console.error('❌ Redis connection failed:', error);
  }
}

testRedis();
