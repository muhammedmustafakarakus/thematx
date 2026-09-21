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
        {/* Math-related Animated Background */}
        <div className="fixed inset-0 z-[-10] overflow-hidden pointer-events-none bg-background">
          <div 
            className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-30 mix-blend-luminosity animate-[ken-burns_30s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2000&auto=format&fit=crop")',
            }}
          />
          {/* Subtle gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        </div>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
