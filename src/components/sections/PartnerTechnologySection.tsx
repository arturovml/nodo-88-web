import Image from "next/image";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";
import type { SectionContent } from "@/content/types";

type PartnerTechnologySectionProps = {
  section: SectionContent;
};

export function PartnerTechnologySection({
  section,
}: PartnerTechnologySectionProps) {
  const logoImageSrc = section.logoImageSrc?.trim();
  const logoAlt = section.logoAlt?.trim() || section.heading;
  const hasLogoSlot = section.logoImageSrc !== undefined;

  return (
    <section className="py-16 lg:py-20 border-b border-slate-800/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="max-w-2xl">
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

          <div className="flex items-center justify-start lg:justify-end">
            {logoImageSrc ? (
              <Image
                src={logoImageSrc}
                alt={logoAlt}
                width={360}
                height={160}
                className="h-auto w-[220px] lg:w-[260px] object-contain rounded-md border border-zinc-800 bg-zinc-950/80 p-4"
              />
            ) : hasLogoSlot ? (
              <div className="w-full max-w-xs">
                <ImageSlotPlaceholder label="Partner logo" aspect="4:3" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
