"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function IletisimPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const subjectMap: Record<string, string> = {
      kayit: "Kayıt ve Fiyat Bilgisi",
      deneme: "Ücretsiz Deneme Dersi",
      destek: "Destek ve Şikayet",
      diger: "Diğer",
    };
    const subjectText = subjectMap[subject] || "Genel Bilgi";

    const text = `Merhaba, adım ${name}.\n\nKonu: ${subjectText}\n\nMesajım:\n${message}\n\nİletişim Numaram: ${phone}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(`https://wa.me/905068530441?text=${encodeURIComponent(text)}`, '_blank');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-background py-20 lg:py-28">
      <Container>
        <SectionHeading 
          title="Bizimle İletişime Geçin"
          description="Eğitim programlarımız hakkında detaylı bilgi almak veya aklınıza takılan soruları sormak için formu doldurun."
          align="center"
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column: Contact Form */}
          <Card className="p-8 md:p-10 border-border shadow-md">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Mesaj Gönderin</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Ad Soyad</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    placeholder="Adınız ve Soyadınız"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">Telefon</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    required
                    placeholder="0(5XX) XXX XX XX"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">E-posta</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  required
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Konu</label>
                <select 
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                >
                  <option value="">Seçiniz...</option>
                  <option value="kayit">Kayıt ve Fiyat Bilgisi</option>
                  <option value="deneme">Ücretsiz Deneme Dersi</option>
                  <option value="destek">Destek ve Şikayet</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Mesajınız</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  required
                  placeholder="Bize iletmek istediğiniz mesajınızı buraya yazın..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm resize-none"
                ></textarea>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Yönlendiriliyor..." : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Üzerinden Gönder
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Right Column: Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6">
              <Card className="p-6 border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-1">E-posta</h4>
                  <p className="text-muted text-sm mb-2">Bize her zaman yazabilirsiniz.</p>
                  <a href="mailto:oficcialthematx@gmail.com" className="text-primary font-medium hover:underline">oficcialthematx@gmail.com</a>
                </div>
              </Card>

              <Card className="p-6 border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-1">Telefon</h4>
                  <p className="text-muted text-sm mb-2">Danışmanlarımız sizi bekliyor.</p>
                  <a href="tel:+905068530441" className="text-primary font-medium hover:underline">0506 853 04 41</a>
                </div>
              </Card>

              <Card className="p-6 border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-1">Çalışma Saatleri</h4>
                  <p className="text-muted text-sm mb-1">Hafta içi: 09:00 - 20:00</p>
                  <p className="text-muted text-sm">Hafta sonu: 10:00 - 18:00</p>
                </div>
              </Card>

              <Card className="p-6 border-border shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-1">Ofis</h4>
                  <p className="text-muted text-sm">Merkez / Sakarya</p>
                </div>
              </Card>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center shadow-lg">
              <div className="w-16 h-16 bg-surface/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-heading font-bold mb-2">WhatsApp ile hızlı iletişim</h4>
              <p className="text-white/90 mb-6">Aklınızdaki sorulara anında cevap almak için bize WhatsApp üzerinden yazın.</p>
              <Button variant="secondary" className="bg-surface text-green-600 hover:bg-surface/90 w-full md:w-auto">
                WhatsApp'tan Yazın
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
