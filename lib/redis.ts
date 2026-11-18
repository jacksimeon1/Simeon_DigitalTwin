import { Redis } from '@upstash/redis';

let redis: Redis;

const isConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
);

if (isConfigured) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });
} else {
  // In-memory fallback for local development when Upstash is not configured
  const memoryStore = new Map<string, any>();

  redis = new Proxy({} as Redis, {
    get: (_target, prop: string) => {
      if (prop === 'get') {
        return async (key: string) => memoryStore.get(key) ?? null;
      }
      if (prop === 'set') {
        return async (key: string, value: any) => {
          memoryStore.set(key, value);
          return 'OK';
        };
      }
      if (prop === 'incr') {
        return async (key: string) => {
          const current = Number(memoryStore.get(key) || 0) + 1;
          memoryStore.set(key, current);
          return current;
        };
      }
      if (prop === 'keys') {
        return async (_pattern?: string) => Array.from(memoryStore.keys());
      }
      return async () => null;
    },
  });
}

export default redis;

