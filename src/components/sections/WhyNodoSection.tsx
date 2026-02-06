"use client";

import { useEffect, useRef } from "react";

import type { SectionContent } from "@/content/types";

type WhyNodoSectionProps = {
  section: SectionContent;
};

export function WhyNodoSection({ section }: WhyNodoSectionProps) {
  const bullets = section.bullets ?? [];
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-animate]"),
    );

    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.visible = "true";
          observer.unobserve(target);
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 lg:py-20 border-b border-slate-800/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {section.subheading ? (
            <div className="text-xs text-slate-400 tracking-wider uppercase mb-4">
              {section.subheading}
            </div>
          ) : null}
          <h2 className="text-3xl lg:text-4xl text-zinc-100 tracking-tight leading-tight mb-4">
            {section.heading}
          </h2>
          {section.body ? (
            <p className="text-lg text-zinc-400 leading-relaxed">
              {section.body}
            </p>
          ) : null}
        </div>

        <div ref={listRef} className="mt-10 max-w-3xl mx-auto space-y-4">
          {bullets.map((bullet, index) => (
            <div
              key={bullet}
              data-animate
              data-visible="false"
              style={{ transitionDelay: `${index * 80}ms` }}
              className="flex items-start gap-3 border border-zinc-800/70 bg-zinc-950/50 rounded-lg px-4 py-3 opacity-0 translate-y-2 transition duration-500 ease-out data-[visible=true]:opacity-100 data-[visible=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none"
            >
              <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-violet-500/50 text-violet-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12l4 4L19 6" />
                </svg>
              </span>
              <span className="text-sm text-zinc-200 leading-relaxed">
                {bullet}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
