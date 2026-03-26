"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setClarityTags } from "@/src/lib/analytics";
import { getAnalyticsPageContext } from "@/src/lib/analytics-page-context";

export default function AnalyticsRouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }

    setClarityTags(getAnalyticsPageContext(pathname));
  }, [pathname]);

  return null;
}
