import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { sitio } from "@/data/sitio";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(sitio.url),
  title: { default: "NEO · Construimos futuro | Edificios en Santa Fe", template: "%s | NEO" },
  description: sitio.descripcion,
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: { type: "website", siteName: "NEO", locale: "es_AR", images: ["/og-imagen.jpg"] },
};

export const viewport: Viewport = { themeColor: "#212121" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preload" href="/fonts/outfit-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  );
}
