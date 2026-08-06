import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MessageSquare, Phone, Mail, Calendar as CalendarIcon, Send } from "lucide-react";

export const metadata = {
  title: 'Danışmanım | Thematx',
};

export default function DanismanPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Danışmanım</h2>
        <p className="text-muted">Eğitim koçunuzla iletişime geçin ve görüşme planlayın.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Advisor Profile */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border-border bg-surface text-center">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-surface mb-4">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80" alt="Zeynep Kaya" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-1">Zeynep Kaya</h3>
            <p className="text-sm text-primary font-medium mb-4">Kıdemli Eğitim Koçu & PDR</p>
            
            <div className="space-y-3 text-sm text-left mb-6">
              <a href="mailto:zeynep@thematx.com" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface transition-colors">
                <Mail className="w-4 h-4 text-muted" />
                <span className="font-medium">zeynep@thematx.com</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface transition-colors">
                <Phone className="w-4 h-4 text-muted" />
                <span className="font-medium">+90 555 123 4567</span>
              </a>
            </div>

            <Button className="w-full flex items-center justify-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Görüşme Randevusu Al
            </Button>
          </Card>
        </div>

        {/* Messaging Area (Mock) */}
        <div className="lg:col-span-2">
          <Card className="border-border bg-surface flex flex-col h-[500px]">
            <div className="p-4 border-b border-border bg-surface-alt flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Mesajlar</h3>
                <p className="text-xs text-success font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success block" />
                  Çevrimiçi
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface/30">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Zeynep Kaya" className="w-full h-full object-cover" />
                </div>
                <div className="bg-surface border border-border p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <p className="text-sm text-foreground">Merhaba! Haftalık programını inceledim, Türev konusundaki ilerlemen harika görünüyor. 🎉</p>
                  <span className="text-[10px] text-muted mt-1 block">10:42</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
                <div className="bg-primary p-3 rounded-2xl rounded-br-none shadow-sm text-white">
                  <p className="text-sm">Teşekkür ederim Zeynep hocam! Deneme sınavı öncesi ufak bir tekrar yapacağım.</p>
                  <span className="text-[10px] text-white/70 mt-1 block text-right">11:15</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Zeynep Kaya" className="w-full h-full object-cover" />
                </div>
                <div className="bg-surface border border-border p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <p className="text-sm text-foreground">Süper, cuma günkü denemeden sonra sonuçları değerlendirmek için bir araya gelelim. Randevu oluşturmayı unutma lütfen.</p>
                  <span className="text-[10px] text-muted mt-1 block">11:17</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface">
              <form className="flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Mesajınızı yazın..." 
                  className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm transition-all"
                />
                <Button type="button" size="md" className="shrink-0 px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
