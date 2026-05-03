import { captureException } from "@sentry/nextjs";

type LogLevel = "info" | "warn" | "error";

type LogPayload = {
  event: string;
  message: string;
  context?: Record<string, unknown>;
};

function baseLog(level: LogLevel, payload: LogPayload) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    ...payload,
  };

  if (level === "error") {
    console.error(JSON.stringify(logEntry));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(logEntry));
    return;
  }

  console.info(JSON.stringify(logEntry));
}

export function logInfo(payload: LogPayload) {
  baseLog("info", payload);
}

export function logWarn(payload: LogPayload) {
  baseLog("warn", payload);
}

export function logError(payload: LogPayload & { error?: unknown }) {
  baseLog("error", payload);

  if (process.env.SENTRY_DSN) {
    captureException(payload.error ?? new Error(payload.message), {
      tags: { event: payload.event },
      extra: payload.context,
    });
  }
}
