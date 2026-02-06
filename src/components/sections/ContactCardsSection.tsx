import Link from "next/link";

import type { ContactCardItem, SectionContent, SectionItem } from "@/content/types";

type ContactCardsSectionProps = {
  section: SectionContent;
};

const isContactCard = (item: SectionItem): item is ContactCardItem =>
  item.kind === "contact";

export function ContactCardsSection({ section }: ContactCardsSectionProps) {
  const items = section.items ?? [];
  const cards = items.filter(isContactCard);
  const brandCtaLabels = new Set(["Reserva una demo", "Cotiza aquí"]);
  const gradientCtaClasses =
    "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500";
  const primaryNeutralClasses =
    "bg-zinc-100 text-zinc-950 hover:bg-zinc-200";
  const secondaryNeutralClasses =
    "border border-zinc-700 text-zinc-100 hover:border-zinc-600 hover:bg-zinc-900";
  const getCtaClassName = (label: string, variant: "primary" | "secondary") => {
    const base = "inline-flex px-6 py-3 transition-colors";
    if (brandCtaLabels.has(label)) {
      return `${base} ${gradientCtaClasses}`;
    }
    return variant === "primary"
      ? `${base} ${primaryNeutralClasses}`
      : `${base} ${secondaryNeutralClasses}`;
  };

  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        {(section.heading || section.body) ? (
          <div className="max-w-2xl mb-12 space-y-3">
            {section.heading ? (
              <h2 className="text-2xl text-zinc-100 leading-tight">
                {section.heading}
              </h2>
            ) : null}
            {section.body ? (
              <p className="text-zinc-400 leading-relaxed">{section.body}</p>
            ) : null}
          </div>
        ) : null}
        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-zinc-900 border border-zinc-800 rounded-lg p-8"
            >
              <h3 className="text-2xl text-zinc-100 leading-tight mb-4">
                {card.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                {card.description}
              </p>
              <Link
                href={card.cta.href}
                className={getCtaClassName(card.cta.label, card.cta.variant)}
              >
                {card.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
