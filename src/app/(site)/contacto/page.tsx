import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { PageHeroSection } from "@/components/sections/PageHeroSection";
import { contactoPageContent, getSectionById } from "@/content/pages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${contactoPageContent.title} | Nodo 88`,
  description:
    "Agenda una demo o solicita una cotización. Cuéntanos tu operación y te ayudamos a evaluar la mejor solución para tu modelo.",
};

export default function ContactPage() {
  const hero = getSectionById(contactoPageContent, "hero");
  const form = getSectionById(contactoPageContent, "form");

  return (
    <>
      <PageHeroSection
        title={hero.heading}
        description={hero.body ?? contactoPageContent.description ?? ""}
        eyebrow={hero.subheading}
      />
      <ContactFormSection section={form} />
    </>
  );
}
