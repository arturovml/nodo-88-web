import { Resend } from "resend";

import type { ContactPayload } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);
const siteName = process.env.CONTACT_FROM_NAME ?? "Nodo 88";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const toOptionalLabel = (value?: string) => value ?? "No informado";

const formatTextBody = (payload: ContactPayload) => {
  return [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Teléfono: ${toOptionalLabel(payload.phone)}`,
    `Empresa: ${toOptionalLabel(payload.company)}`,
    `Source: ${toOptionalLabel(payload.source)}`,
    "",
    "Mensaje:",
    payload.message,
  ].join("\n");
};

const formatHtmlBody = (payload: ContactPayload) => {
  const messageHtml = escapeHtml(payload.message).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
      <h2 style="margin: 0 0 16px; font-size: 18px;">Nuevo contacto</h2>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Nombre</td>
          <td style="padding: 6px 0;">${escapeHtml(payload.name)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Email</td>
          <td style="padding: 6px 0;">${escapeHtml(payload.email)}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Teléfono</td>
          <td style="padding: 6px 0;">${escapeHtml(toOptionalLabel(payload.phone))}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Empresa</td>
          <td style="padding: 6px 0;">${escapeHtml(toOptionalLabel(payload.company))}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-weight: 600;">Source</td>
          <td style="padding: 6px 0;">${escapeHtml(toOptionalLabel(payload.source))}</td>
        </tr>
      </table>
      <div>
        <div style="font-weight: 600; margin-bottom: 6px;">Mensaje</div>
        <div style="white-space: pre-wrap;">${messageHtml}</div>
      </div>
    </div>
  `;
};

export const sendContactEmail = async (payload: ContactPayload) => {
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!fromEmail || !toEmail) {
    throw new Error("Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL.");
  }

  const subject = `Nuevo contacto — ${siteName} (${payload.source ?? "web"})`;

  return resend.emails.send({
    from: `${siteName} <${fromEmail}>`,
    to: toEmail,
    replyTo: payload.email,
    subject,
    text: formatTextBody(payload),
    html: formatHtmlBody(payload),
  });
};
