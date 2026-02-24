"use client";

import { useEffect } from "react";

export default function ScrollToTopOnLoad() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hasHistory = typeof window.history !== "undefined";
    const previousScrollRestoration = hasHistory ? window.history.scrollRestoration : null;

    if (hasHistory && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    return () => {
      if (hasHistory && previousScrollRestoration) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, []);

  return null;
}
