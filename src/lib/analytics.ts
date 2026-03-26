"use client";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParams = Record<string, AnalyticsValue>;
type ClarityTagValue = string | number | boolean | null | undefined;
type ClarityTags = Record<string, ClarityTagValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function normalizeParams(params: AnalyticsParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (!isBrowser() || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, normalizeParams(params));
}

export function setClarityTags(tags: ClarityTags = {}) {
  if (!isBrowser() || typeof window.clarity !== "function") {
    return;
  }

  for (const [key, value] of Object.entries(tags)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    window.clarity("set", key, String(value));
  }
}
