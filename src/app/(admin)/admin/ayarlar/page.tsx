"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Sistem Ayarları</h2>
          <p className="text-sm text-muted">Platformun genel ayarlarını ve entegrasyon bilgilerini güncelleyin.</p>
        </div>
        <Button>Değişiklikleri Kaydet</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
           <h3 className="text-lg font-bold text-foreground mb-2">Genel Bilgiler</h3>
           <p className="text-sm text-muted">Sitenin genel bilgileri ve iletişim adresleri.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-surface border-border space-y-4">
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">Site Adı</label>
             <input type="text" defaultValue="Thematx Eğitim" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">İletişim E-posta Adresi</label>
             <input type="email" defaultValue="info@thematx.com" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">Destek Telefonu</label>
             <input type="tel" defaultValue="+90 (555) 123 45 67" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
           <h3 className="text-lg font-bold text-foreground mb-2">Ödeme Ayarları (iyzico)</h3>
           <p className="text-sm text-muted">Online tahsilat için API anahtarları.</p>
        </div>
        <Card className="md:col-span-2 p-6 bg-surface border-border space-y-4">
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">API Key</label>
             <input type="password" defaultValue="sandbox-xxxxxxxxxxxxxxx" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">Secret Key</label>
             <input type="password" defaultValue="sandbox-xxxxxxxxxxxxxxx" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
           <div>
             <label className="block text-sm font-medium text-foreground mb-1.5">Havale/EFT IBAN (Manuel Ödemeler İçin)</label>
             <input type="text" defaultValue="TR00 0000 0000 0000 0000 0000 00" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
           </div>
        </Card>
      </div>
    </div>
  );
}
