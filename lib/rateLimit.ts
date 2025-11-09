const store: Map<string, { count: number; reset: number }> = new Map();

export function checkRateLimit(ip: string | null) {
  const key = ip || "anon";
  const max = Number(process.env.RATE_LIMIT_MAX || "10");
  const windowSec = Number(process.env.RATE_LIMIT_WINDOW || "300");
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.reset) {
    const reset = now + windowSec * 1000;
    store.set(key, { count: 1, reset });
    return { limited: false, remaining: max - 1, reset };
  }

  entry.count += 1;
  store.set(key, entry);

  if (entry.count > max) {
    return { limited: true, remaining: 0, reset: entry.reset };
  }

  return { limited: false, remaining: Math.max(0, max - entry.count), reset: entry.reset };
}

export function getRateLimitInfo(ip: string | null) {
  const key = ip || "anon";
  const entry = store.get(key);
  if (!entry) return { remaining: Number(process.env.RATE_LIMIT_MAX || 10), reset: 0 };
  return { remaining: Math.max(0, Number(process.env.RATE_LIMIT_MAX || 10) - entry.count), reset: entry.reset };

}

// Note: in-memory limiter resets on cold start. For production use, replace with a persistent store (Redis/Upstash).
