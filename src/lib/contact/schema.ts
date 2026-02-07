import { z } from "zod";

const normalizeWhitespace = (value: string) => value.trim().replace(/\s+/g, " ");
const normalizeMessage = (value: string) =>
  value.trim().replace(/[^\S\r\n]+/g, " ");

const requiredString = (min: number, max: number) =>
  z.preprocess(
    (value) => (typeof value === "string" ? normalizeWhitespace(value) : value),
    z.string().min(min).max(max),
  );

const optionalString = (max: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const normalized = normalizeWhitespace(value);
      return normalized === "" ? undefined : normalized;
    },
    z.string().max(max).optional(),
  );

export const contactSchema = z.object({
  name: requiredString(2, 80),
  email: z.preprocess(
    (value) => (typeof value === "string" ? normalizeWhitespace(value) : value),
    z.string().email().min(5).max(120),
  ),
  company: optionalString(120),
  phone: optionalString(40),
  message: z.preprocess(
    (value) => (typeof value === "string" ? normalizeMessage(value) : value),
    z.string().min(10).max(2000),
  ),
  source: optionalString(120),
  website: optionalString(120),
});

export type ContactPayload = z.infer<typeof contactSchema>;
