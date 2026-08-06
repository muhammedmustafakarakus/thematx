"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Sun, Moon, LayoutDashboard } from "lucide-react";
import Container from "@/components/ui/Container";
import { useTheme } from "@/components/ThemeProvider";
import BirebirDersModal from "@/components/ui/BirebirDersModal";

const navLinks = [
  { label: "Ana Sayfa", href: "/" },
  { label: "9-11. Sınıflar", href: "/paketler?category=9-11. Sınıf" },
  { label: "YKS", href: "/paketler?category=YKS" },
  { label: "KPSS", href: "/paketler?category=KPSS" },
  { label: "DGS", href: "/paketler?category=DGS" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? "bg-background/90 backdrop-blur-xl shadow-sm border-b border-border/50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <Container>
          <nav className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center gap-3 group w-auto">
              <img 
                src="/logo.jpg" 
                alt="Thematx Logo" 
                className="w-14 h-14 rounded-full object-cover object-center bg-black border border-primary/20 shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground">
                Thematx
              </span>
            </Link>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 justify-center flex-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (pathname === '/paketler' && typeof window !== 'undefined' && window.location.search.includes(link.href.split('?')[1]));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (pathname === link.href && link.href === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
                    className={`px-5 py-2.5 text-sm font-medium transition-all rounded-full ${
                      isActive 
                        ? "bg-surface-alt text-foreground" 
                        : "text-muted hover:text-foreground hover:bg-surface/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 text-sm font-medium transition-all rounded-full text-muted hover:text-foreground hover:bg-surface/50"
              >
                Birebir Ders
              </button>
            </div>

            {/* Right: Actions */}
            <div className="hidden lg:flex items-center justify-end gap-5 w-auto">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-foreground transition-colors"
                aria-label="Tema Değiştir"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <a
                href="https://wa.me/905068530441?text=Merhaba%2C%20Thematx%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary-600 transition-colors rounded-full shadow-lg shadow-primary/25"
              >
                İletişime Geç
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 text-muted hover:text-foreground transition-colors"
                aria-label="Tema Değiştir"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-foreground bg-surface-alt rounded-lg transition-colors"
                aria-label="Menüyü aç"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
        </Container>

        {/* Mobile Menu Dropdown */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-surface border-b border-border transition-all duration-300 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === '/paketler' && typeof window !== 'undefined' && window.location.search.includes(link.href.split('?')[1]));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (pathname === link.href && link.href === "/") {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className={`block px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive ? "bg-surface-alt text-foreground" : "text-muted hover:bg-surface-alt/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsModalOpen(true);
              }}
              className="w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors text-muted hover:bg-surface-alt/50 hover:text-foreground"
            >
              Birebir Ders
            </button>
            <div className="pt-4 mt-2 border-t border-border flex flex-col gap-3">
              <a
                href="https://wa.me/905068530441?text=Merhaba%2C%20Thematx%20hakkında%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-3 text-sm font-medium text-white text-center bg-primary rounded-xl"
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </header>

      <BirebirDersModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
