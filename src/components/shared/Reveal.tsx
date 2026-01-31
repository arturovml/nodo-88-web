"use client";

import type { ReactNode } from "react";

import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRevealOnScroll();

  return (
    <div
      ref={ref}
      data-reveal="false"
      style={{ transitionDelay: `${delay}ms` }}
      className={`opacity-0 translate-y-2 transition duration-300 ease-out data-[reveal=true]:opacity-100 data-[reveal=true]:translate-y-0 motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}
