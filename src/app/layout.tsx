import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://thematx.com'),
  title: {
    default: "The Matx — Matematik Özel Ders Platformu",
    template: "%s | The Matx",
  },
  description: "LGS, YKS, KPSS ve ALES'e hazırlıkta birebir matematik dersi, canlı online dersler, matematik kampları ve kişisel koçluk. The Matx ile matematikte fark yarat.",
  keywords: [
    "matematik özel ders",
    "LGS hazırlık",
    "YKS matematik",
    "online matematik dersi",
    "canlı ders",
    "matematik kampı",
    "birebir ders",
    "KPSS matematik",
    "ALES matematik",
  ],
  authors: [{ name: "The Matx" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://thematx.com",
    title: "The Matx | Geleceğin Matematik Platformu",
    description: "LGS, YKS, KPSS ve ALES'e hazırlıkta birebir matematik dersi, canlı dersler ve kişisel koçluk.",
    siteName: "The Matx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${plusJakarta.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
