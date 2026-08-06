import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Video, User, ChevronLeft, ChevronRight } from "lucide-react";

export const metadata = {
  title: 'Ders Programım | Thematx',
};

export default function ProgramPage() {
  const schedule = [
    { day: "Pazartesi", date: "15", active: false, events: [] },
    { day: "Salı", date: "16", active: false, events: [] },
    { day: "Çarşamba", date: "17", active: true, events: [
      { time: "19:00 - 20:30", title: "Türev ve Uygulamaları", type: "Canlı Ders", instructor: "Ahmet Y." }
    ]},
    { day: "Perşembe", date: "18", active: false, events: [] },
    { day: "Cuma", date: "19", active: false, events: [
      { time: "16:00 - 18:00", title: "Deneme Sınavı #4", type: "Sınav", instructor: "Sistem" }
    ]},
    { day: "Cumartesi", date: "20", active: false, events: [] },
    { day: "Pazar", date: "21", active: false, events: [
      { time: "10:00 - 11:30", title: "Birebir Koçluk Görüşmesi", type: "Rehberlik", instructor: "Zeynep K." }
    ]},
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Ders Programım</h2>
          <p className="text-muted">Haftalık canlı ders ve etüt programınız.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-border hover:bg-surface transition-colors">
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <span className="font-medium text-sm px-2">Bu Hafta</span>
          <button className="p-2 rounded-lg border border-border hover:bg-surface transition-colors">
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {schedule.map((day, i) => (
          <div key={i} className="flex flex-col">
            <div className={`text-center py-3 rounded-t-xl border-t border-x border-border ${day.active ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>
              <span className={`block text-xs font-bold uppercase mb-1 ${day.active ? 'text-white/80' : ''}`}>{day.day}</span>
              <span className="text-2xl font-heading font-extrabold">{day.date}</span>
            </div>
            <div className={`flex-1 p-2 border border-border rounded-b-xl min-h-[150px] bg-surface ${day.active ? 'border-primary/30 shadow-sm' : ''}`}>
              {day.events.length > 0 ? (
                <div className="space-y-2">
                  {day.events.map((event, j) => (
                    <div key={j} className="p-3 rounded-lg border border-border/50 bg-surface-alt hover:border-primary/30 transition-colors cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{event.type}</span>
                        {event.type === 'Canlı Ders' && <Video className="w-3 h-3 text-red-500 animate-pulse" />}
                      </div>
                      <p className="text-xs font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{event.title}</p>
                      <p className="text-[10px] text-muted flex items-center gap-1 mb-1">
                        <User className="w-3 h-3" /> {event.instructor}
                      </p>
                      <p className="text-[10px] font-medium text-foreground">{event.time}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs text-muted/50 font-medium">Etkinlik yok</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
