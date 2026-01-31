import Image from "next/image";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";

interface PageHeroSectionProps {
  title: string;
  description: string;
  eyebrow?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function PageHeroSection({
  title,
  description,
  eyebrow,
  imageSrc,
  imageAlt,
}: PageHeroSectionProps) {
  const resolvedImageSrc = imageSrc?.trim();
  const resolvedImageAlt = imageAlt?.trim() || title;
  const hasImageSlot = imageSrc !== undefined;

  return (
    <section className="pt-32 pb-16 lg:pt-36 lg:pb-20 border-b border-slate-800/60">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          {eyebrow ? (
            <div className="text-xs text-slate-400 tracking-wider uppercase mb-4">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="text-4xl lg:text-5xl text-zinc-100 tracking-tight leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">{description}</p>
        </div>

        {resolvedImageSrc ? (
          <div className="mt-10 max-w-4xl">
            <Image
              src={resolvedImageSrc}
              alt={resolvedImageAlt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg border border-zinc-800 bg-zinc-950/80"
            />
          </div>
        ) : hasImageSlot ? (
          <div className="mt-10 max-w-4xl">
            <ImageSlotPlaceholder label="About image" aspect="4:3" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
