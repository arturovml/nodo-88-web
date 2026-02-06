import Image from "next/image";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";
import { Reveal } from "@/components/shared/Reveal";
import type { ProcessStep, SectionContent, SectionItem } from "@/content/types";

type ProcessStepsSectionProps = {
  section: SectionContent;
};

const isStep = (item: SectionItem): item is ProcessStep =>
  item.kind === "step";

export function ProcessStepsSection({ section }: ProcessStepsSectionProps) {
  const items = section.items ?? [];
  const steps = items.filter(isStep);
  const processImageSrc = section.processImageSrc?.trim();

  return (
    <section
      id="proceso"
      className="py-24 lg:py-32 bg-zinc-900/50 border-y border-slate-800/60"
    >
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
            {processImageSrc ? (
              <div className="aspect-[16/10] max-h-[340px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/80">
                <Image
                  src={processImageSrc}
                  alt={section.heading}
                  width={1200}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <ImageSlotPlaceholder label="Process image" aspect="16:9" />
            )}
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-slate-800/70 -z-10" />
              )}

              <Reveal
                delay={i * 60}
                className="group bg-zinc-950 border border-zinc-800 rounded-lg p-6 transition duration-300 ease-out hover:border-zinc-700 hover:shadow-[0_10px_24px_rgba(0,0,0,0.25)]"
              >
                <div className="text-5xl mb-6 text-slate-500/80 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  {step.number}
                </div>
                <h3 className="text-lg text-zinc-100 leading-snug mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
