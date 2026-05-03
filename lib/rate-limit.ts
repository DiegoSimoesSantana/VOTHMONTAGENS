import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logWarn } from "@/lib/logger";

type WindowRule = {
  limit: number;
  window: string;
};

type RateLimitResult = {
  success: boolean;
  reset: number;
  remaining: number;
};

const inMemoryStore = new Map<string, { count: number; expiresAt: number }>();

function parseWindow(window: string) {
  const match = window.match(/^(\d+)(s|m|h)$/);
  if (!match) return 60_000;

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === "s") return value * 1000;
  if (unit === "m") return value * 60_000;
  return value * 3_600_000;
}

const hasUpstashConfig = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasUpstashConfig ? Redis.fromEnv() : null;

function createLimiter(rule: WindowRule) {
  if (redis) {
    return new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(rule.limit, rule.window),
      analytics: true,
      prefix: "voth-rate-limit",
    });
  }

  return null;
}

async function fallbackLimit(key: string, rule: WindowRule): Promise<RateLimitResult> {
  const now = Date.now();
  const windowMs = parseWindow(rule.window);
  const entry = inMemoryStore.get(key);

  if (!entry || entry.expiresAt <= now) {
    inMemoryStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { success: true, reset: now + windowMs, remaining: rule.limit - 1 };
  }

  if (entry.count >= rule.limit) {
    return { success: false, reset: entry.expiresAt, remaining: 0 };
  }

  entry.count += 1;
  inMemoryStore.set(key, entry);

  return { success: true, reset: entry.expiresAt, remaining: rule.limit - entry.count };
}

async function applyRateLimit(resource: string, identifier: string, rule: WindowRule) {
  const key = `${resource}:${identifier}`;

  try {
    const limiter = createLimiter(rule);

    if (limiter) {
      const result = await limiter.limit(key);
      return {
        success: result.success,
        reset: result.reset,
        remaining: result.remaining,
      } satisfies RateLimitResult;
    }

    return fallbackLimit(key, rule);
  } catch (error) {
    logWarn({
      event: "rate_limit_fallback",
      message: "Falha ao consultar rate limit externo; aplicando fallback em memória.",
      context: {
        resource,
        identifier,
        error: error instanceof Error ? error.message : "Erro desconhecido",
      },
    });

    return fallbackLimit(key, rule);
  }
}

export async function limitLogin(identifier: string) {
  return applyRateLimit("login", identifier, { limit: 5, window: "15m" });
}

export async function limitProjectUpload(identifier: string) {
  return applyRateLimit("project_upload", identifier, { limit: 12, window: "1h" });
}
