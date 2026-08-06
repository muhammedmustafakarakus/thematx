import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { PlayCircle, FileText, CheckCircle2, Clock, Calendar, Video } from "lucide-react";
import { getNextLesson } from "@/app/actions/admin";

export default async function StudentDashboardPage() {
  const nextLesson = await getNextLesson();

  return (
    <div className="space-y-8">
      {/* Welcome & Next Class Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-violet-600 text-white p-8 md:p-10 shadow-lg shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10 max-w-xl">
          {nextLesson ? (
            <>
              <h2 className="text-3xl font-heading font-bold mb-4">Sıradaki Canlı Dersin Yaklaşıyor! 🚀</h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                "{nextLesson.title}" dersi <strong className="text-white">{nextLesson.instructor_name}</strong> ile {nextLesson.start_time?.substring(0,5)}'da başlıyor. Hazır mısın?
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href={nextLesson.meet_url || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-600 font-bold hover:bg-emerald-50 transition-colors shadow-lg">
                  <Video className="w-5 h-5" />
                  Google Meet'e Katıl
                </a>
                <Button variant="ghost" href="/student/kayitlar" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                  Geçmiş Kayıtları İzle
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-heading font-bold mb-4">Harika Gidiyorsun! 🚀</h2>
              <p className="text-white/80 text-lg mb-6 leading-relaxed">
                Bu haftaki hedeflerini tamamladın. Yaklaşan yeni bir canlı dersin bulunmuyor. Geçmiş ders kayıtlarını izleyerek tekrar yapabilirsin.
              </p>
              <Button variant="ghost" href="/student/kayitlar" className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                Geçmiş Kayıtları İzle
              </Button>
            </>
          )}
        </div>

        {/* Countdown Module */}
        {nextLesson && (
          <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center animate-pulse" style={{ animationDuration: "3s" }}>
            <p className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Kalan Süre</p>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold font-heading">00</span>
                <span className="text-[10px] text-white/70 uppercase">Saat</span>
              </div>
              <span className="text-3xl font-bold pb-4">:</span>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-extrabold font-heading">45</span>
                <span className="text-[10px] text-white/70 uppercase">Dakika</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Content */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
             Senin İçin Devam Edenler
             <Badge variant="primary" className="text-xs ml-2">2 Aktif</Badge>
          </h3>
          
          <Card className="p-6 border-border bg-white flex flex-col sm:flex-row gap-6 hover:border-primary/30 transition-colors">
            <div className="w-full sm:w-48 h-32 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-inner">
               <span className="text-white font-heading font-bold text-xl text-center px-4">Plus Paket</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start justify-between mb-2">
                 <div>
                   <h4 className="text-lg font-bold text-foreground">YKS Matematik Plus Paket</h4>
                   <p className="text-sm text-muted">Haftalık 2 Canlı Ders + Soru Çözüm</p>
                 </div>
                 <Badge variant="success">Aktif</Badge>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-foreground font-medium">Paket İlerlemesi</span>
                  <span className="text-primary font-bold">%45</span>
                </div>
                <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[45%] rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border bg-white flex flex-col sm:flex-row gap-6 hover:border-primary/30 transition-colors">
            <div className="w-full sm:w-48 h-32 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center shrink-0 shadow-inner">
               <span className="text-white font-heading font-bold text-xl text-center px-4">LGS Yaz Kampı</span>
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-start justify-between mb-2">
                 <div>
                   <h4 className="text-lg font-bold text-foreground">LGS 2025 Hazırlık Kampı</h4>
                   <p className="text-sm text-muted">15 Temmuz - 15 Ağustos</p>
                 </div>
                 <Badge variant="success">Yaklaşıyor</Badge>
              </div>
              <div className="mt-4 flex items-center gap-4">
                 <div className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                    <Calendar className="w-4 h-4 text-primary" />
                    Başlamasına 12 Gün Kaldı
                 </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           <Card className="p-6 border-border bg-white">
             <h3 className="text-lg font-heading font-bold text-foreground mb-4">Yaklaşan Etkinlikler</h3>
             <div className="space-y-4">
               <div className="flex gap-4">
                 <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary shrink-0">
                   <span className="text-xs font-bold uppercase">YAR</span>
                   <span className="text-lg font-extrabold leading-none">12</span>
                 </div>
                 <div>
                   <p className="font-medium text-foreground text-sm">Canlı Soru Çözümü</p>
                   <p className="text-xs text-muted flex items-center gap-1 mt-1">
                     <Clock className="w-3 h-3" /> 19:00 - 20:30
                   </p>
                 </div>
               </div>
               
               <div className="flex gap-4">
                 <div className="flex flex-col items-center justify-center w-12 h-12 rounded-lg bg-surface text-muted shrink-0">
                   <span className="text-xs font-bold uppercase">CUM</span>
                   <span className="text-lg font-extrabold leading-none">14</span>
                 </div>
                 <div>
                   <p className="font-medium text-foreground text-sm">Deneme Sınavı #4</p>
                   <p className="text-xs text-muted flex items-center gap-1 mt-1">
                     <Clock className="w-3 h-3" /> Tüm Gün Açık
                   </p>
                 </div>
               </div>
             </div>
           </Card>

           <Card className="p-6 border-border bg-white">
             <h3 className="text-lg font-heading font-bold text-foreground mb-4">Son Eklenen Dökümanlar</h3>
             <div className="space-y-3">
               <a href="/student/kayitlar" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface transition-colors group">
                 <div className="flex items-center gap-3">
                   <FileText className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                   <span className="text-sm font-medium text-foreground">Trigonometri Özeti.pdf</span>
                 </div>
               </a>
               <a href="/student/kayitlar" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-surface transition-colors group">
                 <div className="flex items-center gap-3">
                   <PlayCircle className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
                   <span className="text-sm font-medium text-foreground">Türev Soru Çözüm Videosu</span>
                 </div>
               </a>
             </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
