import { Laptop, Smartphone, Tablet, Tv } from "lucide-react";

import type { SectionContent } from "@/content/types";

type CompatibleDevicesSectionProps = {
  section: SectionContent;
};

export function CompatibleDevicesSection({
  section,
}: CompatibleDevicesSectionProps) {
  const devices = section.bullets ?? [];
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "teléfonos móviles": Smartphone,
    "telefonos moviles": Smartphone,
    tablets: Tablet,
    computadoras: Laptop,
    televisores: Tv,
  };

  return (
    <section className="py-12 lg:py-16 border-b border-slate-800/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
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

        <div className="mt-8 lg:mt-10 grid gap-4 lg:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {devices.map((device) => {
            const normalized = device.toLowerCase().trim();
            const Icon = iconMap[normalized];

            return (
            <div
              key={device}
              className="flex items-center gap-3 border border-zinc-800/70 bg-zinc-950/50 rounded-lg px-4 py-4"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-800/70 bg-slate-900/70 text-slate-200">
                {Icon ? (
                  <Icon className="h-5 w-5 text-slate-200" aria-hidden="true" />
                ) : null}
              </span>
              <span className="text-sm text-zinc-200 leading-relaxed">
                {device}
              </span>
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
}
