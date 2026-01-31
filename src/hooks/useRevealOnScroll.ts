import { useEffect, useRef } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
  mobileThreshold?: number;
  mobileRootMargin?: string;
};

export function useRevealOnScroll(options: RevealOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = "0px",
    mobileThreshold = 0.1,
    mobileRootMargin = "0px 0px -10% 0px",
  } = options;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      node.dataset.reveal = "true";
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const resolvedThreshold = isMobile ? mobileThreshold : threshold;
    const resolvedRootMargin = isMobile ? mobileRootMargin : rootMargin;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLDivElement;
          target.dataset.reveal = "true";
          observer.unobserve(target);
        });
      },
      { threshold: resolvedThreshold, rootMargin: resolvedRootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
