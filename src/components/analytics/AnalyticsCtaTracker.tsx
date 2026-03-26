"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { setClarityTags, trackEvent } from "@/src/lib/analytics";
import { getAnalyticsPageContext } from "@/src/lib/analytics-page-context";

type InteractiveElement = HTMLElement & {
  dataset: DOMStringMap;
  href?: string;
};

function normalizePathFromUrl(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    return `${url.pathname}${url.search}`;
  } catch {
    return value;
  }
}

function inferDestination(href: string) {
  if (!href) return "unknown";
  if (href.startsWith("tel:")) return "phone_call";
  if (href.includes("wa.me")) return "whatsapp";
  if (href.includes("vagaro.com")) return "booking_page";
  if (href.includes("/pricing")) return "booking_page";
  if (href.includes("/contact-us")) return "contact_page";
  if (href.includes("/treatment")) return "treatment_page";
  return normalizePathFromUrl(href);
}

function inferCtaName(element: InteractiveElement, href: string) {
  if (element.dataset.ctaName) {
    return element.dataset.ctaName;
  }

  const label = (element.textContent ?? "").trim().toLowerCase();

  if (href.startsWith("tel:")) return "call_now";
  if (href.includes("wa.me")) return "whatsapp";
  if (label.includes("before") && label.includes("after")) return "before_after";
  if (label.includes("book consultation")) return "book_consultation";
  if (label.includes("book")) return "online_booking";
  if (label.includes("contact")) return "contact";
  if (label.includes("view treatment")) return "view_treatment";
  if (label.includes("pricing")) return "pricing";

  return "";
}

function inferCtaLocation(
  element: InteractiveElement,
  pathname: string,
  fallbackPageType: string,
) {
  if (element.dataset.ctaLocation) {
    return element.dataset.ctaLocation;
  }

  if (pathname === "/") return "homepage";
  if (pathname === "/pricing") return "pricing_page";
  if (pathname === "/contact-us") return "contact_page";
  if (pathname === "/treatment") return "treatment_hub";
  if (pathname.startsWith("/blog/")) return "blog_post";
  if (pathname.startsWith("/forms/")) return "consultation_form";
  if (pathname.startsWith("/guidelines/")) return "treatment_guidelines";
  return fallbackPageType;
}

export default function AnalyticsCtaTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const element = target.closest("a,button") as InteractiveElement | null;
      if (!element) {
        return;
      }

      const href =
        element.getAttribute("href") ??
        (typeof element.href === "string" ? element.href : "");
      const ctaName = inferCtaName(element, href);
      if (!ctaName) {
        return;
      }

      const pageContext = getAnalyticsPageContext(pathname || "/");
      const ctaLocation = inferCtaLocation(element, pathname || "/", pageContext.pageType);
      const treatmentName = element.dataset.treatmentName || pageContext.treatmentName || "";
      const pageType = element.dataset.pageType || pageContext.pageType;
      const destination = inferDestination(href);

      trackEvent("cta_click", {
        cta_name: ctaName,
        cta_location: ctaLocation,
        destination,
        page_type: pageType,
        treatment_name: treatmentName,
      });

      if (destination === "booking_page") {
        trackEvent("booking_click", {
          treatment_name: treatmentName,
          cta_location: ctaLocation,
          page_type: pageType,
        });
      }

      if (destination === "whatsapp") {
        trackEvent("whatsapp_click", {
          page_type: pageType,
          cta_location: ctaLocation,
          treatment_name: treatmentName,
        });
      }

      if (destination === "phone_call") {
        trackEvent("call_click", {
          page_type: pageType,
          cta_location: ctaLocation,
          treatment_name: treatmentName,
        });
      }

      setClarityTags({ cta_name: ctaName });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
