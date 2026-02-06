import Image from "next/image";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";
import { Reveal } from "@/components/shared/Reveal";
import type { FeatureItem, SectionContent, SectionItem } from "@/content/types";

const iconMap = {
  shield: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l7 3v6c0 4.1-2.9 7.8-7 9-4.1-1.2-7-4.9-7-9V6l7-3z" />
    </svg>
  ),
  database: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="7" ry="3" />
      <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
      <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  ),
  trend: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 17l6-6 4 4 7-7" />
      <path d="M14 5h6v6" />
    </svg>
  ),
  chart: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-8" />
      <path d="M3 20h18" />
    </svg>
  ),
};

type FeaturesGridSectionProps = {
  section: SectionContent;
};

const isFeature = (item: SectionItem): item is FeatureItem =>
  item.kind === "feature";

export function FeaturesGridSection({ section }: FeaturesGridSectionProps) {
  const items = section.items ?? [];
  const features = items.filter(isFeature);
  const servicesImageSrc = section.servicesImageSrc?.trim();

  return (
    <section id="servicios" className="py-24 lg:py-32 border-t border-slate-800/60">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center mb-12">
          <Reveal className="max-w-2xl">
            {section.subheading ? (
              <div className="text-xs text-slate-400 tracking-wider uppercase mb-4">
                {section.subheading}
              </div>
            ) : null}
            <h2 className="text-4xl lg:text-5xl text-zinc-100 tracking-tight leading-tight mb-6">
              {section.heading}
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {section.body}
            </p>
          </Reveal>

          <Reveal className="w-full" delay={80}>
            {servicesImageSrc ? (
              <div className="aspect-[16/10] max-h-[340px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
                <Image
                  src={servicesImageSrc}
                  alt={section.heading}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <ImageSlotPlaceholder label="Services image" aspect="16:9" />
            )}
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Reveal
              key={feature.title}
              delay={index * 60}
              className="group bg-zinc-900 border border-zinc-800 rounded-lg p-8 transition duration-300 ease-out hover:border-zinc-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-indigo-600 border border-violet-500/60 rounded-lg flex items-center justify-center mb-6 text-white transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xl text-zinc-100 leading-snug mb-4">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
