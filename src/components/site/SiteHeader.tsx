"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Logo } from "@/components/site/Logo";
import { siteContent } from "@/content/site";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3">
              <Logo variant="mark" className="w-9 h-9" />
              <span className="text-xl tracking-tight">{siteContent.siteName}</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {siteContent.nav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href={siteContent.ctas.secondary.href}
                className="px-5 py-2.5 border border-zinc-700 text-zinc-100 text-sm hover:border-zinc-600 hover:bg-zinc-900 transition-colors"
              >
                {siteContent.ctas.secondary.label}
              </Link>
              <Link
                href={siteContent.ctas.primary.href}
                className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-sm hover:bg-zinc-200 transition-colors"
              >
                {siteContent.ctas.primary.label}
              </Link>
            </div>

            <button
              type="button"
              className="md:hidden p-2 text-zinc-400"
              aria-label="Abrir menú"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="md:hidden">
        <div
          className={`fixed inset-0 z-[55] bg-zinc-950/80 backdrop-blur-[2px] transition-opacity ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`fixed right-0 top-0 z-[60] h-full w-80 max-w-[85vw] bg-zinc-950 border-l border-zinc-800/50 p-6 transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm text-zinc-400">Menú</span>
            <button
              type="button"
              className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-5 mb-8">
            {siteContent.nav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base text-zinc-200 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Link
              href={siteContent.ctas.secondary.href}
              className="px-5 py-2.5 border border-zinc-700 text-zinc-100 text-sm hover:border-zinc-600 hover:bg-zinc-900 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              {siteContent.ctas.secondary.label}
            </Link>
            <Link
              href={siteContent.ctas.primary.href}
              className="px-5 py-2.5 bg-zinc-100 text-zinc-950 text-sm hover:bg-zinc-200 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              {siteContent.ctas.primary.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
