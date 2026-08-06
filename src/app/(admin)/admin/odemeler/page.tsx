"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { CreditCard, TrendingUp, Download, CheckCircle2, XCircle, Clock } from "lucide-react";

const MOCK_PAYMENTS = [
  { id: "TRX-98234", student: "Ahmet Yılmaz", package: "YKS Birebir", amount: "9.500 ₺", date: "2026-07-22 14:30", status: "Başarılı", method: "Kredi Kartı (iyzico)" },
  { id: "TRX-98233", student: "Ayşe Kaya", package: "LGS Plus Kamp", amount: "5.000 ₺", date: "2026-07-21 09:15", status: "Başarılı", method: "Havale/EFT" },
  { id: "TRX-98232", student: "Mehmet Demir", package: "KPSS Matematik", amount: "4.500 ₺", date: "2026-07-20 16:45", status: "Bekliyor", method: "Havale/EFT" },
  { id: "TRX-98231", student: "Zeynep Çelik", package: "ALES/DGS Hız Kampı", amount: "3.000 ₺", date: "2026-07-19 11:20", status: "Başarısız", method: "Kredi Kartı (iyzico)" },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Ödemeler ve Finans</h2>
          <p className="text-sm text-muted">Tüm abonelik, tekil paket ve özel ders ödemelerinizi takip edin.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Excel Olarak İndir
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-muted font-medium mb-1">Bu Ayki Gelir</p>
            <p className="text-2xl font-bold font-heading text-foreground">145.500 ₺</p>
          </div>
        </Card>
        <Card className="p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted font-medium mb-1">Başarılı İşlem</p>
            <p className="text-2xl font-bold font-heading text-foreground">32</p>
          </div>
        </Card>
        <Card className="p-6 bg-surface border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-muted font-medium mb-1">Bekleyen Havale</p>
            <p className="text-2xl font-bold font-heading text-foreground">3</p>
          </div>
        </Card>
      </div>

      <Card className="p-0 border-border bg-surface overflow-hidden">
        <div className="p-4 border-b border-border bg-surface-alt">
          <h3 className="font-bold text-foreground">Son İşlemler</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-alt/30 text-muted font-medium">
              <tr>
                <th className="px-6 py-4">İşlem ID</th>
                <th className="px-6 py-4">Öğrenci</th>
                <th className="px-6 py-4">Paket</th>
                <th className="px-6 py-4">Tutar</th>
                <th className="px-6 py-4">Tarih</th>
                <th className="px-6 py-4">Yöntem</th>
                <th className="px-6 py-4">Durum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_PAYMENTS.map((payment) => (
                <tr key={payment.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-muted">{payment.id}</td>
                  <td className="px-6 py-4 font-bold text-foreground">{payment.student}</td>
                  <td className="px-6 py-4 text-muted">{payment.package}</td>
                  <td className="px-6 py-4 font-extrabold text-foreground">{payment.amount}</td>
                  <td className="px-6 py-4 text-muted text-xs">{payment.date}</td>
                  <td className="px-6 py-4 text-muted text-xs">{payment.method}</td>
                  <td className="px-6 py-4">
                    {payment.status === 'Başarılı' && <Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3" /> Başarılı</Badge>}
                    {payment.status === 'Bekliyor' && <Badge variant="warning" className="gap-1"><Clock className="w-3 h-3" /> Bekliyor</Badge>}
                    {payment.status === 'Başarısız' && <Badge variant="default" className="bg-red-100 text-red-700 border-red-200 gap-1"><XCircle className="w-3 h-3" /> Başarısız</Badge>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
