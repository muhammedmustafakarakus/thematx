"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { User, Mail, Phone, Lock, Save, Camera } from "lucide-react";

export default function ProfilPage() {
  const [formData, setFormData] = useState({
    name: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    phone: "+90 532 000 0000",
    school: "Atatürk Fen Lisesi",
    grade: "12. Sınıf"
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Profil Ayarları</h2>
        <p className="text-muted">Kişisel bilgilerinizi ve hesap güvenlik ayarlarınızı yönetin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="p-6 border-border bg-surface flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-surface relative group mb-4">
              <div className="absolute inset-0 bg-primary/10" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <span className="text-5xl font-bold text-primary flex items-center justify-center w-full h-full">A</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">{formData.name}</h3>
            <p className="text-sm text-muted mb-4">{formData.email}</p>
            <Badge variant="primary" className="mb-2">Öğrenci Hesabı</Badge>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 border-border bg-surface">
            <h3 className="text-lg font-bold font-heading text-foreground mb-6 border-b border-border pb-4">Kişisel Bilgiler</h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ad Soyad</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">E-posta</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input 
                      type="email" 
                      disabled
                      value={formData.email}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface/50 border border-border rounded-lg text-sm text-muted cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sınıf</label>
                  <select 
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option>8. Sınıf (LGS)</option>
                    <option>11. Sınıf</option>
                    <option>12. Sınıf</option>
                    <option>Mezun</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="button" className="gap-2">
                  <Save className="w-4 h-4" /> Değişiklikleri Kaydet
                </Button>
              </div>
            </form>
          </Card>

          <Card className="p-6 border-border bg-surface">
            <h3 className="text-lg font-bold font-heading text-foreground mb-6 border-b border-border pb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-muted" /> Güvenlik
            </h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mevcut Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-sm outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Yeni Şifre</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg text-sm outline-none" />
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="button" variant="outline">Şifreyi Güncelle</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Badge component for local use in this file since we are using client component
function Badge({ children, variant = "default", className = "" }: { children: React.ReactNode, variant?: string, className?: string }) {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  const variants: Record<string, string> = {
    default: "bg-surface text-foreground",
    primary: "bg-primary/10 text-primary",
  };
  return <div className={`${baseClasses} ${variants[variant]} ${className}`}>{children}</div>;
}
