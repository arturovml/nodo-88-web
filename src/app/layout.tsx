import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nodo88.com.mx";

export const metadata: Metadata = {
  metadataBase: new URL(metadataBase),
  title: "Nodo 88 | Soluciones tecnológicas para control y riesgo operativo",
  description:
    "Nodo 88 implementa soluciones tecnológicas para control de dispositivos financiados, reducción de riesgo operativo y optimización de modelos de cobranza.",
  openGraph: {
    title: "Nodo 88 | Soluciones tecnológicas para control y riesgo operativo",
    description:
      "Nodo 88 implementa soluciones tecnológicas para control de dispositivos financiados, reducción de riesgo operativo y optimización de modelos de cobranza.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodo 88 | Soluciones tecnológicas para control y riesgo operativo",
    description:
      "Nodo 88 implementa soluciones tecnológicas para control de dispositivos financiados, reducción de riesgo operativo y optimización de modelos de cobranza.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
