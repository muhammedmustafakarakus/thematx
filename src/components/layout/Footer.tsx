import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Container from "@/components/ui/Container";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const footerLinks = {
  platform: [
    { label: "Paketler", href: "/paketler" },
    { label: "Kamplar", href: "/kamplar" },
    { label: "Blog", href: "/blog" },
    { label: "SSS", href: "/sss" },
  ],
  company: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "İletişim", href: "/iletisim" },
    { label: "Gizlilik Politikası", href: "/gizlilik" },
    { label: "Kullanım Koşulları", href: "/kosullar" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-5 group">
                <img src="/logo.jpg" alt="The Matx Logo" className="h-16 w-16 rounded-full object-cover object-center bg-black border border-border/20 shadow-sm transition-transform duration-300 group-hover:scale-105" />
                <span className="font-heading font-extrabold text-xl tracking-tight text-background">
                  THEMATX
                </span>
              </Link>
              <p className="text-background/60 text-sm leading-relaxed mb-6">
                LGS ve YKS&apos;ye hazırlıkta birebir matematik dersi, canlı dersler ve kişisel koçluk ile matematikte fark yaratın.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/_thematx_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.youtube.com/@oficcialthematx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-background/40 mb-5">
                Platform
              </h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-background/40 mb-5">
                Kurumsal
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-background/40 mb-5">
                İletişim
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/60">oficcialthematx@gmail.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/60">0506 853 04 41</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-background/60">Sakarya, Türkiye</span>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-background/40">
              © {new Date().getFullYear()} Thematx. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-background/40">
              Thematx ile matematikte fark yarat.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
