"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Plus, Edit2, Trash2, Tag, Check, CheckCircle2 } from "lucide-react";

const CATEGORIES = ["LGS", "YKS", "KPSS", "ALES", "DGS"];

const INITIAL_PACKAGES = [
  { id: 1, name: "LGS Plus Kamp", price: "5.000", period: "/ay", category: "LGS", status: "Aktif", popular: true },
  { id: 2, name: "TYT-AYT Maraton", price: "6.000", period: "/ay", category: "YKS", status: "Aktif", popular: true },
  { id: 3, name: "KPSS Matematik", price: "4.500", period: "/ay", category: "KPSS", status: "Aktif", popular: false },
];

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [newPrice, setNewPrice] = useState("");
  const [newFeatures, setNewFeatures] = useState("");
  const [newPopular, setNewPopular] = useState(false);

  function handleDelete(id: number) {
    if (confirm("Bu paketi silmek istediğinize emin misiniz?")) {
      setPackages(packages.filter(p => p.id !== id));
    }
  }

  function handleSave() {
    if (!newName || !newPrice) {
      alert("Lütfen paket adı ve fiyatını giriniz.");
      return;
    }

    const newPkg = {
      id: Date.now(),
      name: newName,
      price: newPrice,
      period: "/ay",
      category: newCategory,
      status: "Aktif",
      popular: newPopular
    };

    setPackages([...packages, newPkg]);
    setIsModalOpen(false);

    // Reset state
    setNewName("");
    setNewCategory(CATEGORIES[0]);
    setNewPrice("");
    setNewFeatures("");
    setNewPopular(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold font-heading text-foreground mb-1">Eğitim Paketleri</h2>
          <p className="text-sm text-muted">Sınav kategorilerine göre paket fiyatlandırmalarını ve içeriklerini yönetin.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 shrink-0">
          <Plus className="w-4 h-4" /> Yeni Paket Ekle
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {CATEGORIES.slice(0, 4).map((cat) => (
          <Card key={cat} className="p-4 border-border bg-surface flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-muted font-medium">{cat} Paketleri</p>
                <p className="text-xl font-bold text-foreground">
                  {packages.filter(p => p.category === cat).length} Adet
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-sm text-muted">
                <th className="py-4 px-6 font-semibold">Paket Adı</th>
                <th className="py-4 px-6 font-semibold">Kategori</th>
                <th className="py-4 px-6 font-semibold">Fiyat</th>
                <th className="py-4 px-6 font-semibold">Durum</th>
                <th className="py-4 px-6 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{pkg.name}</span>
                      {pkg.popular && (
                        <Badge variant="primary" className="text-[10px] py-0 px-1.5 h-5">Popüler</Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="default" className="bg-surface border-border text-muted">
                      {pkg.category}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-bold text-foreground">₺{pkg.price}</span>
                    <span className="text-xs text-muted">{pkg.period}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                      {pkg.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-muted hover:text-primary transition-colors hover:bg-primary/10 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(pkg.id)} className="p-2 text-muted hover:text-error transition-colors hover:bg-error/10 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-alt">
              <h3 className="text-lg font-bold text-foreground">Yeni Paket Ekle</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-foreground">✕</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Paket Adı</label>
                  <input 
                    type="text" 
                    placeholder="Örn: YKS Maraton" 
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Sınav Kategorisi</label>
                  <div className="relative">
                    <select 
                      className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 appearance-none text-foreground font-medium"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    >
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <ChevronDownIcon className="w-4 h-4 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Aylık Fiyat (₺)</label>
                  <input 
                    type="number" 
                    placeholder="Örn: 5000" 
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-foreground" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Özellikler (Virgülle ayırın)</label>
                  <textarea 
                    rows={3} 
                    placeholder="Haftada 2 canlı ders, Ödev takibi, Sınav simülasyonu..." 
                    className="w-full px-4 py-2 bg-surface border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 resize-none text-foreground"
                    value={newFeatures}
                    onChange={(e) => setNewFeatures(e.target.value)}
                  ></textarea>
                </div>

                <div className="col-span-2 flex items-center gap-3 p-3 bg-surface border border-border rounded-lg mt-2 cursor-pointer hover:bg-surface-alt transition-colors">
                  <input 
                    type="checkbox" 
                    id="popular" 
                    className="w-5 h-5 rounded text-primary focus:ring-primary/20" 
                    checked={newPopular}
                    onChange={(e) => setNewPopular(e.target.checked)}
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-foreground cursor-pointer select-none">
                    Bu paketi "En Çok Tercih Edilen" olarak işaretle (Ortada vurgulanır)
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border bg-surface-alt flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>İptal</Button>
              <Button onClick={handleSave} className="gap-2">
                <CheckCircle2 className="w-4 h-4" /> Paketi Kaydet
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// Inline chevron icon since it's not imported at top
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );
}
