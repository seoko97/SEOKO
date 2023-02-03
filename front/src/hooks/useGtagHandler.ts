import { useEffect } from "react";
import { useRouter } from "next/router";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface GTagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageView = (url: URL) => {
  if (typeof window.gtag === "undefined") return;

  window.gtag("config", GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

const useGtagHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      pageView(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};

export default useGtagHandler;
