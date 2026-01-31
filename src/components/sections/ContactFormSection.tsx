"use client";

import { useMemo, useState } from "react";

import { siteContent } from "@/content/site";
import type { FormFieldItem, FormSubmitItem, SectionContent, SectionItem } from "@/content/types";

type ContactFormSectionProps = {
  section: SectionContent;
};

type FormValues = {
  nombre: string;
  empresa: string;
  email: string;
  telefono: string;
  interes: string;
  mensaje: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const isField = (item: SectionItem): item is FormFieldItem =>
  item.kind === "formField";
const isSubmit = (item: SectionItem): item is FormSubmitItem =>
  item.kind === "formSubmit";

const initialValues: FormValues = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  interes: "",
  mensaje: "",
};

export function ContactFormSection({ section }: ContactFormSectionProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);

  const items = useMemo(() => section.items ?? [], [section.items]);
  const fields = items.filter(isField);
  const submitItem = items.find(isSubmit);

  const validate = (nextValues: FormValues) => {
    const nextErrors: FormErrors = {};
    if (!nextValues.nombre.trim()) nextErrors.nombre = "Ingresa tu nombre.";
    if (!nextValues.empresa.trim()) nextErrors.empresa = "Ingresa tu empresa.";
    if (!nextValues.email.trim()) {
      nextErrors.email = "Ingresa un email válido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email)) {
      nextErrors.email = "Email inválido.";
    }
    if (!nextValues.interes.trim()) nextErrors.interes = "Selecciona un interés.";
    return nextErrors;
  };

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitted(true);

    const subject = `Contacto ${values.interes} - ${values.empresa}`;
    const body = [
      `Nombre: ${values.nombre}`,
      `Empresa: ${values.empresa}`,
      `Email: ${values.email}`,
      `Teléfono: ${values.telefono || "No informado"}`,
      `Interés: ${values.interes}`,
      "",
      values.mensaje,
    ].join("\n");

    const mailto = `mailto:${siteContent.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setMailtoUrl(mailto);

    // TODO: conectar submit a un API route o webhook real.
  };

  return (
    <section className="py-20">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <h2 className="text-3xl mb-4">{section.heading}</h2>
          {section.body ? (
            <p className="text-zinc-400 leading-relaxed">{section.body}</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => {
              const id = `contact-${field.name}`;
              const error = errors[field.name];
              const commonClasses =
                "mt-2 w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

              if (field.type === "textarea") {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label htmlFor={id} className="text-sm text-zinc-200">
                      {field.label}
                    </label>
                    <textarea
                      id={id}
                      name={field.name}
                      rows={5}
                      required={field.required}
                      value={values[field.name]}
                      onChange={(event) =>
                        handleChange(field.name, event.target.value)
                      }
                      aria-invalid={Boolean(error)}
                      className={commonClasses}
                      placeholder={field.placeholder}
                    />
                    {error ? (
                      <p className="mt-2 text-sm text-red-400">{error}</p>
                    ) : null}
                  </div>
                );
              }

              if (field.type === "select") {
                return (
                  <div key={field.name} className="md:col-span-2">
                    <label htmlFor={id} className="text-sm text-zinc-200">
                      {field.label}
                    </label>
                    <select
                      id={id}
                      name={field.name}
                      required={field.required}
                      value={values[field.name]}
                      onChange={(event) =>
                        handleChange(field.name, event.target.value)
                      }
                      aria-invalid={Boolean(error)}
                      className={commonClasses}
                    >
                      <option value="">Selecciona una opción</option>
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {error ? (
                      <p className="mt-2 text-sm text-red-400">{error}</p>
                    ) : null}
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label htmlFor={id} className="text-sm text-zinc-200">
                    {field.label}
                  </label>
                  <input
                    id={id}
                    name={field.name}
                    type={field.type}
                    required={field.required}
                    value={values[field.name]}
                    onChange={(event) =>
                      handleChange(field.name, event.target.value)
                    }
                    aria-invalid={Boolean(error)}
                    className={commonClasses}
                    placeholder={field.placeholder}
                  />
                  {error ? (
                    <p className="mt-2 text-sm text-red-400">{error}</p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className="inline-flex px-6 py-3 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors"
          >
            {submitItem?.label ?? "Enviar solicitud"}
          </button>

          {submitted ? (
            <div
              role="status"
              className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-200"
            >
              <p>Gracias por tu interés. Te contactaremos pronto.</p>
              {mailtoUrl ? (
                <a
                  href={mailtoUrl}
                  className="mt-2 inline-flex text-sm underline underline-offset-4"
                >
                  Enviar también por correo
                </a>
              ) : null}
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
