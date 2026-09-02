import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasUpstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

export async function rateLimit({
  identifier,
  limit = 5,
  windowSeconds = 60,
}: {
  identifier: string;
  limit?: number;
  windowSeconds?: number;
}): Promise<{ success: boolean; remaining: number }> {
  if (redis) {
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      analytics: true,
    });
    const result = await ratelimit.limit(identifier);
    return { success: result.success, remaining: result.remaining };
  }

  // In-Memory Fallback
  const now = Date.now();
  const record = memoryStore.get(identifier);

  if (!record || now > record.expiresAt) {
    memoryStore.set(identifier, {
      count: 1,
      expiresAt: now + windowSeconds * 1000,
    });
    return { success: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}