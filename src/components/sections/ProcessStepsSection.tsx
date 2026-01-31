import Image from "next/image";

import { ImageSlotPlaceholder } from "@/components/shared/ImageSlotPlaceholder";
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
        <div className="max-w-2xl mb-16">
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
        </div>

        <div className="mb-12 max-w-5xl">
          {processImageSrc ? (
            <Image
              src={processImageSrc}
              alt={section.heading}
              width={1200}
              height={800}
              className="w-full h-auto rounded-lg border border-zinc-800 bg-zinc-950/80"
            />
          ) : (
            <ImageSlotPlaceholder label="Process image" aspect="16:9" />
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-slate-800/70 -z-10" />
              )}

              <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-6">
                <div className="text-5xl mb-6 text-slate-500/80">
                  {step.number}
                </div>
                <h3 className="text-lg text-zinc-100 leading-snug mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
