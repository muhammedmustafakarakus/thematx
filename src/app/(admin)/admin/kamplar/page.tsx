"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Tent, Plus, Trash2, Video, X } from "lucide-react";
import { createCamp, deleteCamp, getCamps } from "@/app/actions/admin";

export default function AdminKamplarPage() {
  const router = useRouter();
  const [camps, setCamps] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadCamps();
  }, []);

  async function loadCamps() {
    const data = await getCamps();
    setCamps(data || []);
  }

  async function handleDelete(id: string) {
    if (!confirm("Bu kampı silmek istediğinize emin misiniz?")) return;
    
    setIsLoading(true);
    const res = await deleteCamp(id);
    if (res.success) {
      await loadCamps();
      router.refresh();
    } else {
      alert("Hata: " + res.error);
    }
    setIsLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await createCamp(formData);
    
    if (res.success) {
      setIsModalOpen(false);
      await loadCamps();
      router.refresh();
    } else {
      alert("Hata: " + res.error);
    }
    
    setIsLoading(false);
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Tent className="w-6 h-6 text-primary" />
            Kamp Yönetimi
          </h1>
          <p className="text-white/60 text-sm mt-1">Sistemdeki kampları yönetin ve yeni kamplar oluşturun.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Yeni Kamp Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {camps.map((camp) => (
          <Card key={camp.id} className="p-5 flex flex-col gap-4 bg-surface border-white/5 relative group">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg text-white line-clamp-1" title={camp.title}>{camp.title}</h3>
              <button 
                onClick={() => handleDelete(camp.id)}
                disabled={isLoading}
                className="text-red-400 hover:text-red-300 transition-colors p-1"
                title="Kampı Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex justify-between">
                <span>Tarih:</span>
                <span className="text-white">{camp.date_range}</span>
              </div>
              <div className="flex justify-between">
                <span>Süre:</span>
                <span className="text-white">{camp.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>Konum:</span>
                <span className="text-white">{camp.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Kontenjan:</span>
                <Badge variant="secondary">
                  {camp.capacity_registered} / {camp.capacity_total}
                </Badge>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-primary">{camp.price}</span>
              {camp.video_url && (
                <a href={camp.video_url} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors" title="Tanıtım Videosu">
                  <Video className="w-5 h-5" />
                </a>
              )}
            </div>
          </Card>
        ))}

        {camps.length === 0 && (
          <div className="col-span-full py-12 text-center text-white/50 bg-surface/50 rounded-lg border border-white/5 border-dashed">
            Henüz kamp bulunmuyor. Yeni bir kamp ekleyerek başlayabilirsiniz.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <Card className="w-full max-w-2xl bg-surface border-white/10 p-6 relative shadow-2xl my-auto">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-xl font-bold text-white mb-6">Yeni Kamp Ekle</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Başlık *</label>
                  <input required name="title" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: YKS 2025 Yaz Kampı" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm text-white/70">Tarih Aralığı *</label>
                  <input required name="date_range" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: 15 Temmuz - 15 Ağustos" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Süre *</label>
                  <input required name="duration" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: 4 Hafta" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Konum *</label>
                  <input required name="location" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: Online (Zoom)" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Ücret *</label>
                  <input required name="price" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: 5000 TL" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Video URL (Opsiyonel)</label>
                  <input name="video_url" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" placeholder="Örn: https://youtube.com/..." />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Toplam Kontenjan</label>
                  <input type="number" name="capacity_total" defaultValue="20" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/70">Kayıtlı Kişi</label>
                  <input type="number" name="capacity_registered" defaultValue="0" className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/70">Açıklama *</label>
                <textarea required name="description" rows={4} className="w-full bg-black/40 border border-white/10 rounded-md p-2.5 text-white focus:border-primary outline-none resize-none" placeholder="Kamp detayları..." />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  İptal
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Kaydediliyor...' : 'Kampı Ekle'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
