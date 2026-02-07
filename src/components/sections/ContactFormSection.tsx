"use client";

import { useMemo, useState } from "react";
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
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type SubmitStatus = "idle" | "loading" | "success" | "error";

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
  website: "",
};

export function ContactFormSection({ section }: ContactFormSectionProps) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const microcopy = section.microcopy ?? [];
  const nextSteps = section.nextSteps ?? [];
  const nextStepsHeading = section.nextStepsHeading;

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
    if (!nextValues.mensaje.trim() || nextValues.mensaje.trim().length < 10) {
      nextErrors.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
    }
    return nextErrors;
  };

  const handleChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("loading");
    setSubmitError(null);

    const message = values.interes
      ? `Interés: ${values.interes}\n\n${values.mensaje}`
      : values.mensaje;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.nombre,
          email: values.email,
          company: values.empresa || undefined,
          phone: values.telefono || undefined,
          message,
          source: "contacto",
          website: values.website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.ok) {
        const errorCode = data?.error ?? "UNKNOWN";
        const errorMessages: Record<string, string> = {
          VALIDATION_ERROR: "Revisa los campos e intenta nuevamente.",
          RATE_LIMIT: "Demasiados intentos, intenta más tarde.",
          EMAIL_SEND_FAILED:
            "No pudimos enviar el mensaje. Intenta nuevamente.",
        };
        setSubmitError(
          errorMessages[errorCode] ?? "Ocurrió un error inesperado.",
        );
        setStatus("error");
        return;
      }

      setValues(initialValues);
      setErrors({});
      setStatus("success");
    } catch {
      setSubmitError("Ocurrió un error inesperado.");
      setStatus("error");
    }
  };

  return (
    <section className="py-24 lg:py-28">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className="mb-12 space-y-3">
          <h2 className="text-3xl text-zinc-100 leading-tight">
            {section.heading}
          </h2>
          {section.body ? (
            <p className="text-zinc-400 leading-relaxed">{section.body}</p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => handleChange("website", event.target.value)}
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {fields.map((field) => {
              const id = `contact-${field.name}`;
              const error = errors[field.name];
              const commonClasses =
                "mt-2 w-full rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

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
            className="inline-flex px-6 py-3 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 transition-colors disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Enviando..."
              : submitItem?.label ?? "Enviar solicitud"}
          </button>

          {status === "success" ? (
            <div
              role="status"
              className="rounded-md border border-violet-500/30 bg-violet-500/10 px-4 py-3 text-violet-200"
            >
              <p>Gracias por tu interés. Te contactaremos pronto.</p>
            </div>
          ) : null}
          {status === "error" && submitError ? (
            <div
              role="alert"
              className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200"
            >
              <p>{submitError}</p>
            </div>
          ) : null}
        </form>

        {(microcopy.length > 0 || nextSteps.length > 0) ? (
          <div className="mt-10 border-t border-zinc-800/60 pt-8 space-y-6">
            {microcopy.length > 0 ? (
              <div className="space-y-2 text-sm text-zinc-400">
                {microcopy.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            {nextSteps.length > 0 ? (
              <div className="space-y-4">
                {nextStepsHeading ? (
                  <div className="text-xs text-slate-400 tracking-wider uppercase">
                    {nextStepsHeading}
                  </div>
                ) : null}
                <div className="grid gap-3 md:grid-cols-3">
                  {nextSteps.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-lg border border-zinc-800/70 bg-zinc-950/60 px-4 py-3"
                    >
                      <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-2">
                        Paso {index + 1}
                      </div>
                      <div className="text-sm text-zinc-200 leading-relaxed">
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
