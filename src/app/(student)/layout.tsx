import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, BookOpen, GraduationCap, Calendar, MessageSquare, User, LogOut, Video } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: 'Öğrenci Paneli | The Matx',
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name, avatar_url")
    .eq("id", user.id)
    .single();

  const navItems = [
    { icon: LayoutDashboard, label: "Panel", href: "/student" },
    { icon: BookOpen, label: "Paketlerim", href: "/student/paketlerim" },
    { icon: GraduationCap, label: "Kamplarım", href: "/student/kamplarim" },
    { icon: Calendar, label: "Ders Programı", href: "/student/program" },
    { icon: Video, label: "Ders Kayıtları", href: "/student/kayitlar" },
    { icon: MessageSquare, label: "Danışmanım", href: "/student/danisman" },
    { icon: User, label: "Profilim", href: "/student/profil" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar for Desktop / Bottom Nav for Mobile */}
      <aside className="w-full md:w-64 bg-surface border-b md:border-b-0 md:border-r border-border flex flex-col sticky top-0 z-50 h-16 md:h-screen md:fixed md:inset-y-0 md:left-0">
        <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface relative z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-full overflow-hidden border border-border/20 bg-black flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="The Matx Logo" className="h-full w-full object-cover scale-[1.2]" />
            </div>
            <span className="text-xl font-extrabold font-heading tracking-tight text-foreground hidden sm:inline-block">
              THEMATX
              <span className="text-primary text-sm ml-1">Öğrenci</span>
            </span>
          </Link>
          <div className="md:hidden flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto hidden md:block">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors group"
            >
              <item.icon className="w-5 h-5 text-muted group-hover:text-primary transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation (Bottom bar) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border flex justify-around p-2 z-50">
           {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 p-2 text-muted hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-border hidden md:block">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {profile?.full_name || "Öğrenci"}
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
      <main className="flex-1 md:ml-64 min-w-0 pb-20 md:pb-0">
        <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40">
          <h1 className="text-lg font-heading font-semibold text-foreground">
            Sana Özel Kontrol Paneli
          </h1>
          <div className="flex items-center gap-4">
            <Link href="/paketler" className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors">
              Yeni Paket İncele
            </Link>
          </div>
        </header>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
