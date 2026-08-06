"use client";

import React, { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Megaphone, Plus, Trash2, Bell } from "lucide-react";
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from "@/app/actions/admin";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    const data = await getAnnouncements();
    setAnnouncements(data || []);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("is_active", isActive.toString());
      
      const res = await createAnnouncement(formData);
      if (res.success) {
        setIsModalOpen(false);
        setTitle("");
        setContent("");
        setIsActive(true);
        fetchAnnouncements();
      } else {
        alert("Duyuru eklenirken hata oluştu: " + res.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      const res = await deleteAnnouncement(id);
      if (res.success) {
        fetchAnnouncements();
      } else {
        alert("Duyuru silinirken hata oluştu: " + res.error);
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Duyuru Yönetimi</h2>
          <p className="text-sm text-muted">Öğrencilere gösterilecek duyuruları buradan ekleyip silebilirsiniz.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Yeni Duyuru Ekle
        </Button>
      </div>

      <Card className="border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-sm text-muted">
                <th className="py-4 px-6 font-semibold">Başlık</th>
                <th className="py-4 px-6 font-semibold">İçerik Özeti</th>
                <th className="py-4 px-6 font-semibold">Durum</th>
                <th className="py-4 px-6 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {announcements.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 px-6 text-center text-muted">Henüz duyuru bulunmuyor.</td>
                </tr>
              ) : (
                announcements.map((ann) => (
                  <tr key={ann.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary" />
                        <span className="font-bold text-foreground">{ann.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-muted line-clamp-1 max-w-md">{ann.content}</p>
                    </td>
                    <td className="py-4 px-6">
                      {ann.is_active ? (
                        <Badge variant="success">Aktif</Badge>
                      ) : (
                        <Badge variant="default">Pasif</Badge>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button 
                        onClick={() => handleDelete(ann.id)}
                        className="p-2 text-muted hover:text-error transition-colors hover:bg-error/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-lg bg-surface shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Yeni Duyuru</h3>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Başlık</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Duyuru başlığı..." 
                  required
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">İçerik</label>
                <textarea 
                  rows={4} 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Duyuru detayları..." 
                  required
                  className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 p-3 bg-surface border border-border rounded-lg cursor-pointer hover:bg-surface/80 transition-colors">
                <input 
                  type="checkbox" 
                  id="isActive" 
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary/20" 
                />
                <label htmlFor="isActive" className="text-sm font-medium text-foreground cursor-pointer select-none">
                  Bu duyuruyu anında aktif et (öğrenciler görebilir)
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>İptal</Button>
                <Button type="submit" disabled={isSubmitting} className="gap-2">
                  {isSubmitting ? "Kaydediliyor..." : "Duyuruyu Yayınla"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
