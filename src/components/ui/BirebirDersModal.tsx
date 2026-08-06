"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface BirebirDersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BirebirDersModal({ isOpen, onClose }: BirebirDersModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    type: "Öğrenciyim", // Veliyim veya Öğrenciyim
    category: "YKS",
    package: "LITE",
    grade: "12. Sınıf",
    phone: "",
    kvkk: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kvkk) {
      alert("Lütfen KVKK metnini onaylayınız.");
      return;
    }
    const message = `Merhaba, Birebir Ders için iletişime geçiyorum.
Ad Soyad: ${formData.name}
Rol: ${formData.type}
Kategori: ${formData.category}
Paket: ${formData.package}
Sınıf: ${formData.grade}
Telefon: ${formData.phone}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905068530441?text=${encodedMessage}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-surface rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative border border-border">
        {/* Header */}
        <div className="flex justify-between items-start p-6 pb-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 bg-primary/10 rounded">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
              </span>
              <span className="text-xs font-bold text-foreground">Formu Doldurun</span>
            </div>
            <h2 className="text-2xl font-black font-heading text-foreground leading-tight">
              Size En Uygun Thematx Paketini Beraber Netleştirelim
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-muted hover:text-foreground transition-colors rounded-full hover:bg-surface-alt">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pb-4">
          <p className="text-sm text-muted">
            Matematikte yaşanan zorlukları, odaklanma problemlerini ve çalışma disiplini eksikliğini kalıcı olarak aşmak için mevcut durumu analiz edip, en doğru yol haritasını birlikte çizelim.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
          <div>
            <input 
              type="text" 
              required
              placeholder="Ad Soyad"
              className="w-full px-4 py-3 bg-surface-alt border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                value="Veliyim" 
                className="w-4 h-4 text-primary bg-surface-alt border-border focus:ring-primary focus:ring-2"
                checked={formData.type === "Veliyim"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
              <span className="text-sm text-foreground">Veliyim</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                value="Öğrenciyim" 
                className="w-4 h-4 text-primary bg-surface-alt border-border focus:ring-primary focus:ring-2"
                checked={formData.type === "Öğrenciyim"}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
              <span className="text-sm text-foreground">Öğrenciyim</span>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select 
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-sm"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="9-11. Sınıf">9-11. Sınıf</option>
              <option value="YKS">YKS</option>
              <option value="KPSS">KPSS</option>
              <option value="DGS">DGS</option>
            </select>
            <select 
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-sm"
              value={formData.package}
              onChange={(e) => setFormData({ ...formData, package: e.target.value })}
            >
              <option value="LITE">LITE Paketi</option>
              <option value="PRO">PRO Paketi</option>
              <option value="VIP">VIP Paketi</option>
            </select>
          </div>
          
          {!["KPSS", "DGS"].includes(formData.category) && (
            <div>
              <select 
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none text-sm"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              >
                <option value="9. Sınıf">9. Sınıf</option>
                <option value="10. Sınıf">10. Sınıf</option>
                <option value="11. Sınıf">11. Sınıf</option>
                <option value="12. Sınıf">12. Sınıf</option>
                <option value="Mezun">Mezun</option>
              </select>
            </div>
          )}

          <div>
            <input 
              type="tel" 
              required
              placeholder="Telefon Numarası"
              className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <p className="text-xs text-muted mt-1">Başında 0 olacak şekilde 11 hane giriniz</p>
          </div>

          <div className="flex items-start gap-2 mt-2">
            <input 
              type="checkbox" 
              id="kvkk"
              className="w-4 h-4 mt-1 text-primary bg-surface border-border rounded focus:ring-primary focus:ring-2"
              checked={formData.kvkk}
              onChange={(e) => setFormData({ ...formData, kvkk: e.target.checked })}
            />
            <label htmlFor="kvkk" className="text-sm text-foreground">
              <a href="#" className="text-primary hover:underline font-medium">KVKK</a> metnini okudum ve kabul ediyorum.
            </label>
          </div>

          <Button type="submit" variant="primary" className="w-full py-4 text-base font-bold shadow-lg mt-2">
            Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
