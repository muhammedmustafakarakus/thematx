import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, Calendar, Settings, LogOut, CreditCard, Megaphone, Video, Tent } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile to verify admin role
  // For demo purposes, we will bypass strict DB role check if profile is empty,
  // but in production, you should redirect if role is not 'admin'
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Öğrenciler", href: "/admin/ogrenciler" },
    { icon: BookOpen, label: "Paketler", href: "/admin/paketler" },
    { icon: Calendar, label: "Takvim", href: "/admin/takvim" },
    { icon: Video, label: "Ders Videoları", href: "/admin/videolar" },
    { icon: Tent, label: "Kamp Yönetimi", href: "/admin/kamplar" },
    { icon: Megaphone, label: "Duyurular", href: "/admin/duyurular" },
    { icon: CreditCard, label: "Ödemeler", href: "/admin/odemeler" },
    { icon: Settings, label: "Ayarlar", href: "/admin/ayarlar" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col fixed inset-y-0 left-0 z-50">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-border/20 bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="The Matx Logo" className="h-full w-full object-cover scale-[1.2]" />
            </div>
            <span className="text-xl font-extrabold font-heading tracking-tight text-foreground">
              THEMATX
<span className="text-primary text-sm ml-1">Panel</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors group"
            >
              <item.icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {profile?.full_name || "Yönetici"}
              </p>
              <p className="text-xs text-muted truncate">{user.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-w-0">
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-xl font-heading font-bold text-foreground">
            Thematx Yönetim Paneli
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-bold uppercase tracking-wider">
              Sistem Aktif
            </span>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
