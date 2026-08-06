import React from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Users, Calendar, Video, TrendingUp, Plus, Megaphone, Upload, Tent, BookOpen } from "lucide-react";
import { getAdminStats } from "@/app/actions/admin";

export const metadata = {
  title: 'Dashboard | Thematx Admin',
};

export default async function AdminDashboardPage() {
  const dbStats = await getAdminStats();

  const stats = [
    { label: "Toplam Öğrenci", value: dbStats.students.toString(), icon: Users, change: "+12%", trend: "up" },
    { label: "Planlanan Ders", value: dbStats.lessons.toString(), icon: Calendar, change: "+5%", trend: "up" },
    { label: "Ders Kaydı", value: dbStats.recordings.toString(), icon: Video, change: "-2%", trend: "down" },
    { label: "Aylık Gelir (₺)", value: "245K", icon: TrendingUp, change: "+18%", trend: "up" },
  ];

  const recentSignups = [
    { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", date: "2 saat önce", package: "Plus Paket" },
    { id: 2, name: "Ayşe Kaya", email: "ayse@example.com", date: "5 saat önce", package: "LGS Yaz Kampı" },
    { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", date: "1 gün önce", package: "Başlangıç Paket" },
    { id: 4, name: "Zeynep Çelik", email: "zeynep@example.com", date: "1 gün önce", package: "Premium Paket" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-heading text-foreground mb-2">Hoş Geldiniz 👋</h2>
        <p className="text-muted">İşte Thematx platformunun bugünkü özeti.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6 border-border shadow-sm bg-surface">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted mb-1">{stat.label}</p>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${stat.trend === 'up' ? 'text-success' : 'text-red-500'}`}>
                {stat.change}
              </span>
              <span className="text-muted ml-2">geçen aya göre</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-border shadow-sm bg-surface overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-bold font-heading text-foreground">Son Kayıtlar</h3>
            <button className="text-sm font-medium text-primary hover:underline">Tümünü Gör</button>
          </div>
          <div className="divide-y divide-border">
            {recentSignups.map((user) => (
              <div key={user.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-surface-alt transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user.name}</p>
                    <p className="text-sm text-muted">{user.email}</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user.package}</p>
                  <p className="text-xs text-muted">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border shadow-sm bg-surface p-6">
          <h3 className="text-lg font-bold font-heading text-foreground mb-6">Hızlı İşlemler</h3>
          <div className="space-y-4">
            <Link href="/admin/takvim" className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                <Plus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Yeni Ders Ekle</p>
                <p className="text-xs text-muted">Takvime canlı ders planla</p>
              </div>
            </Link>
            <Link href="/admin/duyurular" className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                <Megaphone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Duyuru Yayınla</p>
                <p className="text-xs text-muted">Öğrencilere bildirim gönder</p>
              </div>
            </Link>
            <Link href="/admin/takvim" className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left group">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                <Upload className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Video Ekle</p>
                <p className="text-xs text-muted">Geçmiş ders kaydı yükle</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>

      {/* Admin Guide */}
      <Card className="border-border shadow-sm bg-surface p-6 sm:p-8 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading text-foreground">Hızlı Başlangıç Rehberi</h3>
            <p className="text-sm text-muted">Admin panelini nasıl kullanacağınızı öğrenin.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <Tent className="w-4 h-4 text-primary" /> Kamplara Video Ekleme
            </h4>
            <p className="text-sm text-muted">
              Sol menüden <strong>Kamp Yönetimi</strong> sayfasına gidin. Kamplarınızı oluştururken veya düzenlerken <code>Video URL</code> alanına YouTube linkinizi (örn: https://youtube.com/watch?v=...) yapıştırın. Öğrenciler bu videoları doğrudan Kamplar sayfasında görecektir.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-primary" /> Duyuru Yayınlama
            </h4>
            <p className="text-sm text-muted">
              Sol menüden <strong>Duyurular</strong> sayfasına gidin. Yeni bir duyuru eklediğiniz an, anasayfanın en üstündeki kayan bantta görünmeye başlar. Süresi dolan duyuruları pasife alabilir veya silebilirsiniz.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" /> Canlı Ders Planlama
            </h4>
            <p className="text-sm text-muted">
              Sol menüden <strong>Takvim</strong> sayfasına gidin. <code>Yeni Ders Ekle</code> butonuna tıklayarak zoom linkini ve ders saatini belirleyin. Öğrencileriniz bu dersleri kendi Öğrenci Panellerindeki Ders Programı bölümünde anında görür.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
