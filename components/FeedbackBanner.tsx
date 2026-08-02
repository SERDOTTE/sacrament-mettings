"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FeedbackBannerProps {
  message: string;
  tone: "success" | "error";
  autoHideMs?: number;
}

export default function FeedbackBanner({
  message,
  tone,
  autoHideMs = 5000,
}: FeedbackBannerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(true);
  const hasCleanedUrl = useRef(false);

  const cleanFeedbackQueryParams = useCallback(() => {
    if (hasCleanedUrl.current) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    nextSearchParams.delete("status");
    nextSearchParams.delete("action");

    const nextQuery = nextSearchParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    hasCleanedUrl.current = true;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams]);

  const dismissBanner = useCallback(() => {
    setIsVisible(false);
    cleanFeedbackQueryParams();
  }, [cleanFeedbackQueryParams]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dismissBanner();
    }, autoHideMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [autoHideMs, dismissBanner]);

  if (!isVisible) {
    return null;
  }

  const toneClasses =
    tone === "success"
      ? "border-green-200 bg-green-50 text-green-800"
      : "border-red-200 bg-red-50 text-red-800";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`mb-4 flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm font-semibold ${toneClasses}`}
    >
      <p>{message}</p>
      <button
        type="button"
        onClick={dismissBanner}
        className="rounded px-2 py-0.5 text-xs font-bold hover:bg-black/10"
        aria-label="Dismiss message"
      >
        Close
      </button>
    </div>
  );
}
