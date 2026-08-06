import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { MapPin, Calendar, Users, Video } from "lucide-react";

export const metadata = {
  title: 'Kamplarım | Thematx',
};

export default function KamplarimPage() {
  const camps = [
    {
      id: 1,
      name: "LGS Yaz Kampı 2025",
      date: "15 Tem - 15 Ağu",
      type: "Online & Canlı",
      instructor: "Ahmet Hoca",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80",
      status: "Yaklaşıyor"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Kamplarım</h2>
          <p className="text-muted">Kayıtlı olduğunuz yoğunlaştırılmış kamp programları.</p>
        </div>
        <Button variant="outline" href="/kamplar">Yeni Kamp İncele</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {camps.map((camp) => (
          <Card key={camp.id} className="border-border bg-surface overflow-hidden flex flex-col group">
            <div className="h-48 relative overflow-hidden">
              <img 
                src={camp.image} 
                alt={camp.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-4 right-4">
                <Badge variant="primary" className="shadow-lg backdrop-blur-md bg-surface/90 text-primary border-none">
                  {camp.status}
                </Badge>
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-foreground mb-4">{camp.name}</h3>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{camp.date}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Video className="w-4 h-4 text-primary" />
                  <span>{camp.type} (Google Meet)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Eğitmen: {camp.instructor}</span>
                </div>
              </div>

              <Button className="w-full flex justify-center items-center gap-2">
                Kamp Detayları & Dokümanlar
              </Button>
            </div>
          </Card>
        ))}

        {camps.length === 0 && (
          <div className="col-span-full py-12 text-center bg-surface rounded-2xl border border-dashed border-border">
            <MapPin className="w-12 h-12 text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-foreground mb-2">Henüz bir kampa kayıtlı değilsiniz</h3>
            <p className="text-muted mb-4">Tatil dönemlerindeki yoğunlaştırılmış kamplarımızı inceleyin.</p>
            <Button variant="primary" href="/kamplar">Kamplara Göz At</Button>
          </div>
        )}
      </div>
    </div>
  );
}
