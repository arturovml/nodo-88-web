import { NextResponse } from "next/server";

import { contactSchema } from "@/lib/contact/schema";
import { checkRateLimit } from "@/lib/contact/rateLimit";
import { sendContactEmail } from "@/lib/contact/sendEmail";

// Vercel provides client IP via x-forwarded-for or x-real-ip headers.
const getClientIp = (request: Request) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return request.headers.get("x-real-ip") ?? "unknown";
};

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR" },
      { status: 400 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR" },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "VALIDATION_ERROR" },
      { status: 400 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "RATE_LIMIT" },
      {
        status: 429,
        headers: rateLimit.retryAfterSec
          ? { "Retry-After": rateLimit.retryAfterSec.toString() }
          : undefined,
      },
    );
  }

  try {
    await sendContactEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed", {
      source: data.source ?? "web",
      ip,
      timestamp: new Date().toISOString(),
    });
    return NextResponse.json(
      { ok: false, error: "EMAIL_SEND_FAILED" },
      { status: 500 },
    );
  }
}
