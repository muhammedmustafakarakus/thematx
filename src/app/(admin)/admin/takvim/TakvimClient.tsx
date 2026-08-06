"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { ChevronLeft, ChevronRight, Plus, Clock, Video, Users, Trash2 } from "lucide-react";
import { createLesson, deleteLesson, createRecording } from "@/app/actions/admin";

const DAYS = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function TakvimClient({ initialLessons, initialRecordings }: { initialLessons: any[], initialRecordings: any[] }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"lesson" | "recording">("lesson");
  const [loading, setLoading] = useState(false);

  // Simple date tracking for demo
  const today = new Date();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const d = new Date();
    const day = d.getDay() || 7; 
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
  });

  const getDayDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getDayDates();

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return initialLessons.filter(e => e.lesson_date === dateString);
  };

  const nextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const prevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleCreateLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createLesson(formData);
    setLoading(false);
    setIsModalOpen(false);
    router.refresh();
  };

  const handleCreateRecording = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await createRecording(formData);
    setLoading(false);
    setIsModalOpen(false);
    router.refresh();
  };

  const handleDeleteLesson = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if(confirm("Bu dersi silmek istediğinize emin misiniz?")) {
      await deleteLesson(id);
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Ders & Video Yönetimi</h2>
          <p className="text-sm text-muted">Takvime canlı ders ekleyin veya öğrencilerin izlemesi için geçmiş ders videosu (kayıt) yükleyin.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" onClick={() => { setModalType("recording"); setIsModalOpen(true); }} className="gap-2 shrink-0">
            <Video className="w-4 h-4" /> Video Arşivi Ekle
          </Button>
          <Button onClick={() => { setModalType("lesson"); setIsModalOpen(true); }} className="gap-2 shrink-0">
            <Plus className="w-4 h-4" /> Yeni Canlı Ders
          </Button>
        </div>
      </div>

      {/* Calendar Controls */}
      <Card className="p-4 bg-surface border-border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={prevWeek} className="p-2 hover:bg-surface rounded-lg text-muted transition-colors border border-border">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-foreground min-w-[200px] text-center">
            {weekDates[0].toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })} - {weekDates[6].toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <button onClick={nextWeek} className="p-2 hover:bg-surface rounded-lg text-muted transition-colors border border-border">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            const d = new Date();
            const day = d.getDay() || 7; 
            if (day !== 1) d.setHours(-24 * (day - 1));
            setCurrentWeekStart(d);
          }}>Bu Hafta</Button>
        </div>
      </Card>

      {/* Calendar Grid */}
      <div className="bg-surface border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="grid grid-cols-7 border-b border-border bg-surface-alt">
          {weekDates.map((date, i) => {
            const isToday = date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
            return (
              <div key={i} className={`p-4 text-center border-r last:border-r-0 border-border ${isToday ? 'bg-primary/5' : ''}`}>
                <div className={`text-xs font-bold uppercase mb-1 ${isToday ? 'text-primary' : 'text-muted'}`}>{DAYS[i]}</div>
                <div className={`text-2xl font-heading ${isToday ? 'text-primary font-extrabold' : 'text-foreground font-semibold'}`}>
                  {date.getDate()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 flex-1">
          {weekDates.map((date, i) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
            
            return (
              <div key={i} className={`border-r last:border-r-0 border-border p-2 space-y-2 min-h-[400px] ${isToday ? 'bg-primary/[0.02]' : ''}`}>
                {dayEvents.map(event => (
                  <div key={event.id} className={`group p-3 rounded-xl border flex flex-col gap-2 transition-all hover:shadow-md cursor-pointer relative
                    ${event.lesson_type === 'Birebir' ? 'bg-amber-50 border-amber-200 hover:border-amber-400' : 
                      event.lesson_type === 'Kamp' ? 'bg-violet-50 border-violet-200 hover:border-violet-400' : 
                      'bg-primary-50 border-primary-200 hover:border-primary-400'}`}
                  >
                    <button onClick={(e) => handleDeleteLesson(event.id, e)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <div className="flex items-center justify-between pr-6">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                        ${event.lesson_type === 'Birebir' ? 'bg-amber-200 text-amber-800' : 
                          event.lesson_type === 'Kamp' ? 'bg-violet-200 text-violet-800' : 
                          'bg-primary-200 text-primary-800'}`}>
                        {event.lesson_type}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                        <Clock className="w-3 h-3" /> {event.start_time?.substring(0,5)}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-foreground leading-tight line-clamp-2">{event.title}</p>
                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-black/5">
                      <span className="text-xs font-medium text-muted-foreground">{event.instructor_name}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODALS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-xl bg-surface shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-alt">
              <h3 className="text-lg font-bold text-foreground">{modalType === "lesson" ? "Yeni Ders Ekle" : "Geçmiş Video Ekle"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground">✕</button>
            </div>
            
            {modalType === "lesson" ? (
              <form onSubmit={handleCreateLesson}>
                <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Ders Konusu / Başlık</label>
                    <input name="title" required type="text" placeholder="Örn: Logaritma Soru Çözümü" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Eğitmen</label>
                      <input name="instructor_name" required type="text" placeholder="Örn: Ahmet Hoca" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Ders Türü</label>
                      <select name="lesson_type" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="Grup">Grup Dersi</option>
                        <option value="Birebir">Birebir Özel Ders</option>
                        <option value="Kamp">Kamp</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Tarih</label>
                      <input name="lesson_date" required type="date" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Başlangıç</label>
                      <input name="start_time" required type="time" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Bitiş</label>
                      <input name="end_time" required type="time" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Google Meet / Zoom Linki</label>
                    <input name="meet_url" type="url" placeholder="https://..." className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-border bg-surface-alt flex justify-end gap-3">
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>İptal</Button>
                  <Button type="submit" disabled={loading}>{loading ? "Kaydediliyor..." : "Dersi Kaydet"}</Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleCreateRecording}>
                <div className="p-6 overflow-y-auto space-y-4 max-h-[70vh]">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Video Başlığı</label>
                    <input name="title" required type="text" placeholder="Örn: Limit ve Süreklilik - Konu Anlatımı" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Eğitmen</label>
                      <input name="instructor_name" required type="text" placeholder="Örn: Ayşe Hoca" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Kategori</label>
                      <select name="recording_type" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20">
                        <option value="Canlı Ders Kaydı">Canlı Ders Kaydı</option>
                        <option value="Kamp Kaydı">Kamp Kaydı</option>
                        <option value="Birebir Ders Kaydı">Birebir Ders Kaydı</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Dersin Tarihi</label>
                      <input name="recording_date" required type="date" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-foreground mb-1.5">Video Süresi (Dakika)</label>
                      <input name="duration_mins" required type="number" placeholder="Örn: 45" className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Video Linki (Drive, Youtube vb.)</label>
                    <input name="video_url" required type="url" placeholder="https://..." className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-border bg-surface-alt flex justify-end gap-3">
                  <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>İptal</Button>
                  <Button type="submit" disabled={loading}>{loading ? "Yükleniyor..." : "Videoyu Yayınla"}</Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
