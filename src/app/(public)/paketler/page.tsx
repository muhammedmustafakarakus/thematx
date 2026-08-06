"use client";

import { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CustomVideoPlayer } from "@/components/ui";
import { Check, BookOpen, Play, X, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WA_NUMBER = "905068530441";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const ALL_PACKAGES = [
  // 9-11. Sınıflar Packages
  {
    tier: "LITE",
    name: "9-11. Sınıf LITE",
    subtitle: "(Temel Gelişim Paketi)",
    price: "2.500", 
    oldPrice: null,
    discountBadge: null,
    period: "/ay", 
    category: "9-11. Sınıf", 
    description: "Matematik temellerini sağlamlaştırmak ve eksiksiz ilerlemek isteyen öğrenciler için.",
    features: [
      "Yapay Zeka Destekli Seviye Tespiti", 
      "Haftalık Performans Değerlendirmesi", 
      "Thematx Özel Konu Anlatım Videoları", 
      "Tüm Ders Kayıtlarına Sınırsız Erişim",
      "Gelişmiş Hafıza ve Tekrar Sistemi",
      "7/24 Eğitmene Soru Sorma İmkânı",
      "Detaylı Veli Gelişim Portalı"
    ],
    notIncludedFeatures: [
      "Etkileşimli Canlı Grup Dersleri",
      "Birebir Profesyonel Koçluk",
      "Öğrenciye Özel Günlük Program"
    ],
    featured: false, 
    limitedCapacity: false,
    cta: "Keşfetmeye Başla",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "PRO",
    name: "9-11. Sınıf PRO",
    subtitle: "(Etkileşimli Grup Eğitimi)",
    price: "4.250", 
    oldPrice: "5.000",
    discountBadge: "%15 İndirim",
    period: "/ay", 
    category: "9-11. Sınıf", 
    description: "Canlı dersler ve özel sınıflarla lise matematiğini garanti altına alın.",
    features: [
      "LITE Paketindeki Tüm Özellikler",
      "Aylık 12 Saat İnteraktif Canlı Ders",
      "Maksimum 10 Kişilik Butik Sınıflar",
      "Öğrenciye Özel Günlük Çalışma Planı",
      "Platform İçi Ekstra Kaynaklara Erişim",
      "Çözülemeyen Sorulara Anında Yanıt",
      "Thematx Özel Hızlandırma Taktikleri"
    ],
    notIncludedFeatures: [
      "Birebir PDR Koçluğu (Psikolojik Destek)",
      "Birebir Soru Çözüm Analizleri"
    ],
    featured: true, 
    limitedCapacity: true,
    cta: "Maceraya Katıl",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "VIP",
    name: "9-11. Sınıf VIP",
    subtitle: "(VIP Eğitim ve Koçluk)",
    price: "7.000", 
    oldPrice: "8.500",
    discountBadge: "%17 Özel İndirim",
    period: "/ay", 
    category: "9-11. Sınıf", 
    description: "Sürekli motivasyon, birebir koçluk ve kusursuz canlı ders deneyimi.",
    features: [
      "PRO Paketindeki Tüm Özellikler",
      "Uzman Rehberlikle Birebir PDR Desteği",
      "Koçla Haftalık Strateji ve Planlama",
      "Eğitim Koçu ile 7/24 İletişim",
      "Haftalık Düzenli Veli Bilgilendirme",
      "Öğrenciye Özel Analitik Çözüm Sistemi"
    ],
    notIncludedFeatures: [],
    featured: false, 
    limitedCapacity: true,
    cta: "VIP Kayıt Ol",
    videoUrl: "nTgXuRx2cuk"
  },

  // YKS Packages
  {
    tier: "LITE",
    name: "YKS LITE",
    subtitle: "(Temel Kamp ve Analiz)",
    price: "2.800", 
    oldPrice: null,
    discountBadge: null,
    period: "/ay", 
    category: "YKS", 
    description: "YKS hazırlığına sistemli, ölçülebilir ve eksiksiz bir başlangıç yapın.",
    features: [
      "Akıllı Algoritma ile Çalışma Programı", 
      "Haftalık Türkiye Geneli Online Deneme", 
      "Kazanım Bazlı Eksik Tespit Analizi", 
      "YKS'ye Özel Yeni Nesil Video İçerikler",
      "Gelişmiş Tekrar Sistemi ile Net Artışı",
      "Eğitmene Anında Soru Gönderme",
      "Veli İçin Otonom Başarı Takibi"
    ],
    notIncludedFeatures: [
      "İnteraktif Grup Dersleri",
      "Birebir Profesyonel Rehberlik",
      "Özel YKS Strateji Planlaması"
    ],
    featured: false, 
    limitedCapacity: false,
    cta: "Hedefe Adım At",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "PRO",
    name: "YKS PRO",
    subtitle: "(Yoğun Canlı Kamp)",
    price: "5.000", 
    oldPrice: "6.250",
    discountBadge: "%20 Erken Kayıt",
    period: "/ay", 
    category: "YKS", 
    description: "Yeni nesil canlı dersler ve yoğunlaştırılmış deneme kampları ile öne geçin.",
    features: [
      "LITE Paketindeki Tüm Özellikler",
      "Aylık 16 Saat YKS Odaklı Canlı Ders",
      "10 Kişilik Özel İlgi Odaklı Sınıflar",
      "YKS'ye Özel Kişiselleştirilmiş Program",
      "Platform İçi Tüm Sınavlara Erişim",
      "Hızlı Soru Çözüm Taktikleri",
      "Sınav Kaygısı ve Zaman Yönetimi Seminerleri"
    ],
    notIncludedFeatures: [
      "Birebir PDR Koçluğu (Psikolojik Destek)",
      "VIP Birebir Takip"
    ],
    featured: true, 
    limitedCapacity: true,
    cta: "Yerinizi Ayırtın",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "VIP",
    name: "YKS VIP",
    subtitle: "(VIP YKS Koçluğu)",
    price: "8.000", 
    oldPrice: "9.500",
    discountBadge: "Sınırlı Fırsat",
    period: "/ay", 
    category: "YKS", 
    description: "Hedefi yüksek olanlara: Tüm canlı dersler + kesintisiz kişisel YKS koçu.",
    features: [
      "PRO Paketindeki Tüm Özellikler",
      "Sertifikalı YKS Koçu ile Birebir Destek",
      "Haftalık Yüzyüze/Online Motivasyon Görüşmesi",
      "Koçla Anlık Mesajlaşma Hattı",
      "Veliler İçin Haftalık İlerleme Raporu",
      "Nokta Atışı Birebir Soru Çözüm Etütleri"
    ],
    notIncludedFeatures: [],
    featured: false, 
    limitedCapacity: true,
    cta: "VIP Kontenjanı",
    videoUrl: "nTgXuRx2cuk"
  },

  // KPSS Packages
  {
    tier: "KAMP",
    name: "KPSS Son Tekrar Kampı",
    subtitle: "(Sınav Öncesi Kamp)",
    price: "2.000", oldPrice: null, discountBadge: "Yeni", period: "/tek sefer", category: "KPSS", 
    description: "Sınav öncesi tüm konuların genel tekrarı ve deneme çözümleri.",
    features: ["Tüm KPSS konularının yoğun tekrarı", "Günde 4 saat kamp programı", "Son dakika çıkabilecek soru tahminleri", "Zaman yönetimi teknikleri"],
    notIncludedFeatures: [], featured: true, limitedCapacity: true, cta: "Kampa Katıl",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "LITE",
    name: "KPSS LITE",
    subtitle: "(Temel KPSS)",
    price: "2.500", oldPrice: null, discountBadge: null, period: "/ay", category: "KPSS", 
    description: "Temel KPSS matematik eğitimi ve konu anlatımı.",
    features: ["Konu anlatım videoları", "Haftalık deneme sınavı", "Grup içi soru çözümü"],
    notIncludedFeatures: ["İnteraktif canlı ders", "Birebir koçluk"], featured: false, limitedCapacity: false, cta: "Hedefe Adım At",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "PRO",
    name: "KPSS PRO",
    subtitle: "(KPSS Maraton)",
    price: "3.750", oldPrice: null, discountBadge: null, period: "/ay", category: "KPSS", 
    description: "Çıkmış soru taktikleri ve pratik yöntemlerle KPSS matematiğini fulleyin.",
    features: ["LITE Paketindeki Tüm Özellikler", "Haftada 3 saat KPSS canlı dersi", "ÖSYM tarzı çıkmış soru analizleri", "Matematik temelini hızlandırma teknikleri"],
    notIncludedFeatures: ["VIP Birebir Takip"], featured: false, limitedCapacity: true, cta: "Yerinizi Ayırtın",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "VIP",
    name: "KPSS VIP",
    subtitle: "(VIP KPSS Koçluğu)",
    price: "6.000", oldPrice: null, discountBadge: null, period: "/ay", category: "KPSS", 
    description: "Hedefi yüksek olanlara: Tüm canlı dersler + kesintisiz kişisel KPSS koçu.",
    features: ["PRO Paketindeki Tüm Özellikler", "Birebir özel ders ve etütler", "Özel sınav strateji danışmanlığı", "Kesintisiz rehberlik"],
    notIncludedFeatures: [], featured: false, limitedCapacity: true, cta: "VIP Kontenjanı",
    videoUrl: "nTgXuRx2cuk"
  },

  // DGS Packages
  {
    tier: "LITE",
    name: "DGS LITE",
    subtitle: "(Temel DGS)",
    price: "2.500", oldPrice: null, discountBadge: null, period: "/ay", category: "DGS", 
    description: "DGS matematiği için sağlam bir başlangıç yapın.",
    features: ["Konu anlatım videoları", "Haftalık DGS denemeleri", "Grup destek hattı"],
    notIncludedFeatures: ["Canlı soru çözüm saati", "VIP koçluk"], featured: false, limitedCapacity: false, cta: "Hedefe Adım At",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "PRO",
    name: "DGS PRO",
    subtitle: "(Sayısal Mantık)",
    price: "3.500", oldPrice: null, discountBadge: null, period: "/ay", category: "DGS", 
    description: "Sayısal mantık ağırlıklı, problem çözme hızınızı ikiye katlayan program.",
    features: ["LITE Paketindeki Tüm Özellikler", "Haftada 3 saat DGS canlı dersi", "İleri seviye sayısal mantık taktikleri", "Zaman yönetimi ve deneme çözümleri"],
    notIncludedFeatures: ["VIP Koçluk"], featured: true, limitedCapacity: true, cta: "Yerinizi Ayırtın",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "VIP",
    name: "DGS VIP",
    subtitle: "(VIP DGS Koçluğu)",
    price: "5.500", oldPrice: null, discountBadge: null, period: "/ay", category: "DGS", 
    description: "Birebir odaklanma ile Türkiye derecesi hedefleyen DGS adayları için.",
    features: ["PRO Paketindeki Tüm Özellikler", "Birebir özel ders ve etütler", "Özel sınav strateji danışmanlığı", "Kesintisiz rehberlik"],
    notIncludedFeatures: [], featured: false, limitedCapacity: true, cta: "VIP Kontenjanı",
    videoUrl: "nTgXuRx2cuk"
  }
];

const CATEGORIES = ["9-11. Sınıf", "YKS", "KPSS", "DGS"];

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Suspense } from "react";


export function PaketlerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "9-11. Sınıf";

  const handleCategoryChange = (cat: string) => {
    router.replace(`${pathname}?category=${cat}`, { scroll: false });
  };

  const filteredPackages = ALL_PACKAGES.filter(
    pkg => pkg.category === activeCategory
  );
  return (
    <>
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <Container className="relative">
          <SectionHeading 
            badge="Fiyatlandırma"
            title="Size Uygun Paketi Seçin"
            description="Öğrenme hedeflerinize ve bütçenize en uygun paketi seçerek başarıya giden yolda ilk adımı atın."
            align="center"
          />

          {/* Category Tab Bar */}
          <div className="text-center mb-6 mt-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-2">Hangi alanda ders almak istiyorsunuz?</h3>
            <p className="text-muted text-sm md:text-base">Size en uygun programları listelemek için bir kategori seçin.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-lg scale-105 border-primary" 
                      : "bg-surface text-muted hover:bg-surface-alt hover:text-foreground border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className={`mt-16 grid grid-cols-1 md:grid-cols-2 ${filteredPackages.length >= 4 ? "lg:grid-cols-4 max-w-[90rem]" : "lg:grid-cols-3 max-w-6xl"} gap-8 mx-auto items-center min-h-[400px]`}>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg, idx) => (
                <Card 
                  key={idx} 
                  className={`relative flex flex-col p-8 rounded-3xl border transition-all duration-500 animate-in fade-in zoom-in-95 hover:-translate-y-2 hover:shadow-2xl group ${
                    pkg.featured 
                      ? 'border-primary/60 shadow-xl shadow-primary/10 md:scale-105 z-10 bg-gradient-to-b from-surface to-primary/5' 
                      : 'border-border/60 shadow-lg hover:border-primary/30 bg-surface/80 backdrop-blur-sm'
                  }`}
                >
                  {pkg.featured && (
                    <>
                      <div className="absolute inset-0 bg-primary/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <span className="px-6 py-1.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-primary to-blue-600 shadow-lg shadow-primary/30 whitespace-nowrap">
                          {pkg.cta || "En Çok Tercih Edilen"}
                        </span>
                      </div>
                    </>
                  )}
                  
                  {(pkg as any).tier && (
                    <div className="text-center mb-6 flex flex-col items-center">
                      {(pkg as any).limitedCapacity && (
                        <div className="mb-4 relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-100 shadow-sm border border-emerald-200">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                          </span>
                          Sınırlı Kontenjan
                        </div>
                      )}
                      <h3 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">
                        {pkg.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground mt-1">{(pkg as any).subtitle}</p>
                    </div>
                  )}

                  {!((pkg as any).tier) && (
                    <div className="text-center mb-6 flex flex-col items-center">
                      {(pkg as any).limitedCapacity && (
                        <div className="mb-4 relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-100 shadow-sm border border-emerald-200">
                          <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                          </span>
                          Sınırlı Kontenjan
                        </div>
                      )}
                      <h3 className="text-2xl font-heading font-bold text-foreground mb-4">{pkg.name}</h3>
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center mb-6">
                    {(pkg as any).oldPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-muted font-bold line-through">{(pkg as any).oldPrice}₺</span>
                        {(pkg as any).discountBadge && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            {(pkg as any).discountBadge}
                          </span>
                        )}
                      </div>
                    )}
                  <div className="flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold font-heading text-foreground tracking-tighter">
                        ₺{pkg.price}
                      </span>
                      <span className="text-sm font-bold text-muted">{pkg.period}</span>
                    </div>
                  </div>

                  {/* Tanıtım Videosu - Doğrudan Oynatıcı */}
                  {(pkg as any).videoUrl && (
                    <CustomVideoPlayer 
                      youtubeId="nTgXuRx2cuk"
                      startAt={30}
                      title={`${pkg.name} Tanıtım`}
                      className="mb-6 z-10"
                    />
                  )}

                  {/* Description Box */}
                  <div className="bg-surface-alt rounded-2xl p-5 mb-8 border border-border/50 text-sm text-foreground font-medium text-center z-10 relative group-hover:border-primary/30 transition-colors duration-500 shadow-sm">
                    {pkg.description}
                  </div>

                  <div className="flex-1">
                    <ul className="space-y-4 mb-8 text-left">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0 bg-blue-500/10 p-0.5 rounded-full">
                            <Check className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm text-foreground font-medium leading-tight">{feature}</span>
                        </li>
                      ))}
                      
                      {(pkg as any).notIncludedFeatures?.map((feature: string, j: number) => (
                        <li key={`not-${j}`} className="flex items-start gap-3 opacity-50">
                          <div className="mt-0.5 shrink-0 p-0.5">
                            <X className="w-4 h-4 text-muted" />
                          </div>
                          <span className="text-sm text-muted leading-tight line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-4">
                    <a 
                      href={waLink(`Merhaba, ${pkg.name} (₺${pkg.price}${pkg.period}) paketi ile kayıt olmak istiyorum.`)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        neon={pkg.cta === "Maceraya Katıl" || pkg.cta === "VIP Kayıt Ol"}
                        variant={pkg.featured ? "primary" : "outline"}
                        className="w-full gap-2 font-bold"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {pkg.cta || "Bilgi Al"}
                      </Button>
                    </a>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-surface/50 rounded-3xl border border-dashed border-border">
                <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-muted opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Bu kategoride paket bulunamadı</h3>
                <p className="text-muted max-w-md mx-auto">Lütfen diğer kategorilere göz atın veya yakında açılacak sınıflarımız için iletişime geçin.</p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-violet-600 text-white text-center">
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Hangi paket size uygun?</h2>
            <p className="text-white/80 text-lg">
              Eğitim danışmanlarımızla görüşerek hedeflerinize ve seviyenize en uygun çalışma programını birlikte belirleyelim.
            </p>
            <div className="pt-4">
              <Button 
                variant="ghost" 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                onClick={() => window.open('https://wa.me/905068530441?text=Merhaba,%20paketler%20hakkında%20ücretsiz%20danışmanlık%20almak%20istiyorum.', '_blank')}
              >
                Ücretsiz Danışmanlık Alın
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}

export default function PaketlerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <PaketlerContent />
    </Suspense>
  );
}
