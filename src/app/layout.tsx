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
  description: "YKS'ye hazırlıkta ve Maarif Modeline uyumlu birebir matematik dersi, canlı online dersler, matematik kampları ve kişisel koçluk. Thematx ile matematikte fark yarat.",
  keywords: [
    "matematik özel ders",
    "LGS hazırlık",
    "YKS matematik",
    "online matematik dersi",
    "canlı ders",
    "matematik kampı",
    "birebir ders",
    "ALES matematik",
  ],
  authors: [{ name: "The Matx" }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://thematx.com",
    title: "The Matx | Geleceğin Matematik Platformu",
    description: "YKS'ye hazırlıkta ve Maarif Modeline uyumlu birebir matematik dersi, canlı dersler ve kişisel koçluk.",
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
      <body className="min-h-full flex flex-col antialiased relative">
        {/* Animated Background Mesh Glows */}
        <div className="fixed inset-0 z-[-10] bg-background pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[100px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/10 blur-[150px] animate-blob animation-delay-4000" />
        </div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
