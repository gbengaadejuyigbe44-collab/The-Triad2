// ── In-memory rate limiter ────────────────────────────────────────────────────
// Vercel functions are stateless per-instance, so this limits per cold start.
// For production scale, swap the Map for a Redis/Upstash store.
// At current user volumes this is fully sufficient.

type RateLimitEntry = { count: number; resetAt: number }

const store = new Map<string, RateLimitEntry>()

// Clean up expired entries every 100 calls
let callCount = 0
function maybeCleanup() {
  if (++callCount % 100 !== 0) return
  const now = Date.now()
  store.forEach((v, k) => { if (now > v.resetAt) store.delete(k) })
}

/**
 * Returns true if the request is allowed, false if rate limited.
 * @param key      Unique key — typically userId or IP
 * @param max      Max requests allowed in the window
 * @param windowMs Time window in milliseconds (default 1 hour)
 */
export function checkRateLimit(key: string, max: number, windowMs = 3_600_000): boolean {
  maybeCleanup()
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= max) return false
  entry.count++
  return true
}

export function rateLimitResponse() {
  return new Response(
    JSON.stringify({ error: 'Too many requests. Please try again later.' }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '3600',
      },
    }
  )
}
