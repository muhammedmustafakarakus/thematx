import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { BookOpen, CheckCircle2, Clock, PlayCircle } from "lucide-react";

export const metadata = {
  title: 'Paketlerim | Thematx',
};

export default function PaketlerimPage() {
  const packages = [
    {
      id: 1,
      name: "YKS Matematik Plus Paket",
      status: "Aktif",
      progress: 45,
      features: ["Haftada 2 Canlı Ders", "Ödev Takibi", "Veli Bilgilendirme Raporu"],
      nextClass: "Türev ve Uygulamaları",
      nextClassTime: "Yarın, 19:00",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80"
    }
  ];

  const pastPackages = [
    {
      id: 2,
      name: "TYT Matematik Temel Atma",
      status: "Tamamlandı",
      progress: 100,
      features: ["Tüm konular işlendi", "Sertifika Alındı"],
      image: "https://images.unsplash.com/photo-1596496181848-3091d4878b24?w=500&q=80"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Paketlerim</h2>
        <p className="text-muted">Satın aldığınız ve devam eden eğitim paketleriniz.</p>
      </div>

      <div className="grid gap-6">
        <h3 className="text-lg font-bold font-heading text-foreground">Aktif Paketler</h3>
        {packages.map((pkg) => (
          <Card key={pkg.id} className="p-6 border-border bg-surface flex flex-col md:flex-row gap-6 overflow-hidden relative">
            <div className="w-full md:w-64 h-48 md:h-auto rounded-xl overflow-hidden shrink-0 relative">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="success" className="mb-2 backdrop-blur-md bg-success/80 text-white border-none">{pkg.status}</Badge>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-foreground">{pkg.name}</h4>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted">
                    <BookOpen className="w-4 h-4" />
                    <span>{pkg.features.join(" • ")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface p-4 rounded-xl mb-4 border border-border">
                <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Sıradaki Ders: {pkg.nextClass}
                </p>
                <p className="text-xs text-muted ml-6">{pkg.nextClassTime}</p>
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">İlerleme Durumu</span>
                  <span className="text-primary font-bold">%{pkg.progress}</span>
                </div>
                <div className="w-full h-2.5 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${pkg.progress}%` }} />
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-3">
                <Button>Ders İçeriklerine Git</Button>
                <Button variant="outline">Geçmiş Kayıtlar</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 mt-12 opacity-75">
        <h3 className="text-lg font-bold font-heading text-foreground">Tamamlanan Paketler</h3>
        {pastPackages.map((pkg) => (
          <Card key={pkg.id} className="p-6 border-border bg-surface flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 relative grayscale">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-foreground">{pkg.name}</h4>
                <Badge variant="default" className="bg-surface text-muted">Tamamlandı</Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted mb-4">
                 <CheckCircle2 className="w-4 h-4 text-success" />
                 <span>Tüm sertifika gereksinimleri karşılandı</span>
              </div>
              <Button variant="outline" size="sm" className="w-fit">Sertifikayı İndir</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
