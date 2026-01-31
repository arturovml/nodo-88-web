import Image from "next/image";
import Link from "next/link";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";
import { Reveal } from "@/components/shared/Reveal";
import type {
  CtaItem,
  HeroChart,
  HeroMetric,
  HeroStatus,
  SectionContent,
  SectionItem,
} from "@/content/types";

type HeroSectionProps = {
  section: SectionContent;
};

const isMetric = (item: SectionItem): item is HeroMetric =>
  item.kind === "metric";
const isStatus = (item: SectionItem): item is HeroStatus =>
  item.kind === "status";
const isChart = (item: SectionItem): item is HeroChart =>
  item.kind === "chart";
const isCta = (item: SectionItem): item is CtaItem =>
  item.kind === "cta";

export function HeroSection({ section }: HeroSectionProps) {
  const items = section.items ?? [];
  const metrics = items.filter(isMetric);
  const statuses = items.filter(isStatus);
  const chart = items.find(isChart);
  const ctas = items.filter(isCta);
  const primaryCta = ctas.find((cta) => cta.variant === "primary") ?? ctas[0];
  const secondaryCta = ctas.find((cta) => cta.variant === "secondary") ?? ctas[1];
  const heroImageSrc = section.heroImageSrc?.trim();

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal className="max-w-xl">
            {section.subheading ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full mb-8">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                <span className="text-xs text-slate-400 tracking-wide uppercase">
                  {section.subheading}
                </span>
              </div>
            ) : null}

            <h1 className="text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
              {section.heading}
            </h1>

            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              {section.body}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {primaryCta ? (
                <Link
                  href={primaryCta.href}
                  className="px-8 py-4 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors text-center"
                >
                  {primaryCta.label}
                </Link>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="px-8 py-4 border border-zinc-700 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-900 transition-colors text-center"
                >
                  {secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </Reveal>

          <div className="relative">
            <div className="bg-zinc-900 border border-zinc-800 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] rounded-lg p-8 lg:p-12">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="bg-zinc-950/80 border border-zinc-800/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] rounded p-4 min-w-0"
                    >
                      <div className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-500 mb-2 break-words">
                        {metric.label}
                      </div>
                      <div className="text-xl sm:text-2xl text-zinc-100">
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-950/80 border border-zinc-800/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] rounded p-6">
                  <div className="flex items-end justify-between h-32 gap-2">
                    {(chart?.bars ?? []).map((height, i) => (
                      <div
                        key={`${height}-${i}`}
                        className="flex-1 bg-transparent border border-emerald-400/60 shadow-[0_0_10px_rgba(16,185,129,0.12)] rounded-sm"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-zinc-500 mt-4">
                    {chart?.label}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {statuses.map((item) => (
                    <div
                      key={item.label}
                      className="bg-zinc-950/80 border border-zinc-800/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] rounded p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.tone === "success"
                              ? "bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.6)]"
                              : "bg-zinc-500"
                          }`}
                        />
                        <span className="text-[11px] uppercase tracking-widest text-zinc-500">
                          {item.label}
                        </span>
                      </div>
                      <div className="text-sm text-zinc-100">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt={section.heading}
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-lg border border-zinc-800 bg-zinc-950/80"
                />
              ) : (
                <ImageSlotPlaceholder label="Hero image" aspect="16:9" />
              )}
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-zinc-800/20 rounded-lg -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
