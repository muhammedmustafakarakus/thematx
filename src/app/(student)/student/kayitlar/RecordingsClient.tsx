"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { PlayCircle, Clock, Calendar, Search, BookOpen, Video } from "lucide-react";

export default function RecordingsClient({ initialRecordings }: { initialRecordings: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const filteredRecordings = initialRecordings.filter(rec => 
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    rec.instructor_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-violet-600 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-surface/5 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold font-heading tracking-tight mb-2">Geçmiş Ders Kayıtları</h1>
            <p className="text-white/80 max-w-xl">Kaçırdığınız veya tekrar izlemek istediğiniz derslerin video kayıtlarına buradan ulaşabilirsiniz.</p>
          </div>
          <div className="w-full md:w-auto relative group">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white transition-colors" />
            <input 
              type="text" 
              placeholder="Ders veya eğitmen ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-72 bg-surface/10 border border-white/20 text-white placeholder:text-white/50 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-surface/20 focus:border-white/40 transition-all backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRecordings.map((rec) => (
          <Card key={rec.id} hover className="overflow-hidden group flex flex-col h-full bg-surface border-border">
            {/* Thumbnail Area */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={rec.thumbnail} 
                alt={rec.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/20 group-hover:bg-foreground/40 transition-colors flex items-center justify-center">
                <button 
                  onClick={() => setSelectedVideo(rec.id)}
                  className="w-14 h-14 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center text-white scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-xl border border-white/30 hover:bg-surface/30"
                >
                  <PlayCircle className="w-8 h-8 fill-white/20" />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-foreground/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Clock className="w-3 h-3" /> {rec.duration_mins} dk
              </div>
              <div className="absolute top-2 left-2">
                <Badge variant="primary" className="bg-primary/90 text-white border-none backdrop-blur-md shadow-sm">
                  {rec.recording_type}
                </Badge>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-foreground font-heading line-clamp-2 mb-3 group-hover:text-primary transition-colors">{rec.title}</h3>
              
              <div className="mt-auto space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(rec.recording_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted">
                  <BookOpen className="w-4 h-4" />
                  <span>Eğitmen: {rec.instructor_name}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredRecordings.length === 0 && (
          <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted opacity-50" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Sonuç bulunamadı</h3>
            <p className="text-muted">Arama kriterlerinize uygun ders kaydı bulunmamaktadır.</p>
          </div>
        )}
      </div>

      {/* Video Player Modal (Mockup) */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-surface/10 hover:bg-surface/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
            >
              ✕
            </button>
            <div className="aspect-video w-full bg-surface-alt flex flex-col items-center justify-center text-muted">
              <Video className="w-16 h-16 mb-4 opacity-50 animate-pulse" />
              <p className="font-medium text-lg">Video Yükleniyor...</p>
              <p className="text-sm opacity-70 mt-2">(Bu alana YouTube Iframe veya harici video player entegre edilecek)</p>
            </div>
            <div className="p-6 bg-surface">
              <h3 className="text-xl font-bold font-heading text-foreground">{initialRecordings.find(r => r.id === selectedVideo)?.title}</h3>
              <p className="text-muted mt-2">Ders Tarihi: {initialRecordings.find(r => r.id === selectedVideo)?.recording_date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
