import { useEffect, useRef } from "react";

type RevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useRevealOnScroll(options: RevealOptions = {}) {
  const { threshold = 0.2, rootMargin = "0px" } = options;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      node.dataset.reveal = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLDivElement;
          target.dataset.reveal = "true";
          observer.unobserve(target);
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
