"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Search, MoreVertical, Mail, Phone, ExternalLink, Filter } from "lucide-react";

const MOCK_STUDENTS = [
  { id: 1, name: "Ahmet Yılmaz", email: "ahmet@example.com", phone: "555-000-1122", package: "YKS Birebir", status: "Aktif", joined: "2026-06-15", progress: 65 },
  { id: 2, name: "Ayşe Kaya", email: "ayse@example.com", phone: "555-111-2233", package: "LGS Plus Kamp", status: "Aktif", joined: "2026-07-01", progress: 30 },
  { id: 3, name: "Mehmet Demir", email: "mehmet@example.com", phone: "555-222-3344", package: "KPSS Matematik", status: "Donduruldu", joined: "2026-05-10", progress: 45 },
  { id: 4, name: "Zeynep Çelik", email: "zeynep@example.com", phone: "555-333-4455", package: "ALES/DGS Hız Kampı", status: "Aktif", joined: "2026-07-15", progress: 10 },
  { id: 5, name: "Burak Şahin", email: "burak@example.com", phone: "555-444-5566", package: "YKS Birebir", status: "İptal", joined: "2026-03-20", progress: 85 },
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Öğrenciler</h2>
          <p className="text-sm text-muted">Platforma kayıtlı tüm öğrencileri görüntüleyin ve yönetin.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" /> Filtrele
          </Button>
          <Button>Yeni Öğrenci Ekle</Button>
        </div>
      </div>

      <Card className="p-0 border-border bg-surface overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between bg-surface-alt">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input 
              type="text" 
              placeholder="İsim veya e-posta ile ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
          <span className="text-sm text-muted font-medium">{filteredStudents.length} Öğrenci Bulundu</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt/50 text-muted font-medium">
              <tr>
                <th className="px-6 py-4">Öğrenci</th>
                <th className="px-6 py-4">İletişim</th>
                <th className="px-6 py-4">Paket / Eğitim</th>
                <th className="px-6 py-4">Kayıt Tarihi</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">İlerleme</th>
                <th className="px-6 py-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-surface/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-foreground">{student.name}</p>
                        <p className="text-xs text-muted">ID: #{1000 + student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-foreground"><Mail className="w-3 h-3 text-muted" /> {student.email}</div>
                      <div className="flex items-center gap-1.5 text-foreground"><Phone className="w-3 h-3 text-muted" /> {student.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-foreground">{student.package}</span>
                  </td>
                  <td className="px-6 py-4 text-muted">
                    {new Date(student.joined).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={student.status === 'Aktif' ? 'success' : student.status === 'Donduruldu' ? 'warning' : 'default'} className={student.status === 'İptal' ? 'bg-surface text-muted border-border' : ''}>
                      {student.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-border rounded-full h-1.5 max-w-[60px]">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-muted">%{student.progress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-1.5 text-muted hover:text-primary rounded hover:bg-primary/10 transition-colors" title="Profile Git">
                         <ExternalLink className="w-4 h-4" />
                       </button>
                       <button className="p-1.5 text-muted hover:text-foreground rounded hover:bg-surface transition-colors">
                         <MoreVertical className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-muted">
                    Aranan kriterlere uygun öğrenci bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
