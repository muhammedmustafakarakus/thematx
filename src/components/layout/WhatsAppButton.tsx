"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { AnimatePresence, motion } from "framer-motion";

export default function WhatsAppButton() {
  const [showCallForm, setShowCallForm] = useState(false);

  useEffect(() => {
    const handleOpen = () => setShowCallForm(true);
    window.addEventListener('openCallForm', handleOpen);
    return () => window.removeEventListener('openCallForm', handleOpen);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/_thematx_/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="Instagram'da bizi takip edin"
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full animate-ping opacity-20" />
          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-500 hover:scale-110 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300">
            <InstagramIcon className="w-6 h-6 text-white" />
          </div>
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-foreground text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
              Instagram'da Takip Et
            </div>
          </div>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/905068530441?text=Merhaba%2C%20Thematx%20hakkında%20bilgi%20almak%20istiyorum."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="WhatsApp ile iletişime geçin"
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
          {/* Button */}
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-foreground text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
              WhatsApp Destek
            </div>
          </div>
        </a>

        {/* Sizi Arayalım Button */}
        <button
          onClick={() => setShowCallForm(true)}
          className="group relative"
          aria-label="Sizi Arayalım"
        >
          {/* Button */}
          <div className="relative w-14 h-14 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
            <Phone className="w-6 h-6 text-white" />
          </div>
          {/* Tooltip */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-foreground text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
              Sizi Arayalım
            </div>
          </div>
        </button>
      </div>

      {/* Sizi Arayalım Modal */}
      <AnimatePresence>
        {showCallForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface border border-border shadow-2xl rounded-2xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setShowCallForm(false)}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold font-heading text-foreground mb-2">Sizi Arayalım</h3>
              <p className="text-sm text-muted mb-6">İletişim bilgilerinizi bırakın, eğitim danışmanlarımız size en kısa sürede ulaşsın.</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Talebiniz alındı! En kısa sürede arayacağız."); setShowCallForm(false); }}>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Adınız Soyadınız</label>
                  <input type="text" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" placeholder="Örn: Ali Yılmaz" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Telefon Numaranız</label>
                  <input type="tel" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" placeholder="05XX XXX XX XX" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors mt-2">
                  Arama Talebi Oluştur
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
