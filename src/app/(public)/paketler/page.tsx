"use client";

import { useState, useEffect, Suspense } from "react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { CustomVideoPlayer } from "@/components/ui";
import { Check, BookOpen, Play, X, ChevronRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ALL_PACKAGES, CATEGORIES } from "@/constants/packages";

const WA_NUMBER = "905068530441";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export function PaketlerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "9-10. Sınıf";
  
  const [billingCycle, setBillingCycle] = useState<"monthly" | "term">("monthly");
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<any>(null);

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

          {/* Billing Cycle Toggle */}
          {(activeCategory === "9-10. Sınıf" || activeCategory === "11. Sınıf") && (
            <div className="flex justify-center mb-10">
              <div className="bg-surface border border-border p-1 rounded-2xl inline-flex items-center shadow-sm relative">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                    billingCycle === "monthly" 
                      ? "text-white shadow-md" 
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {billingCycle === "monthly" && (
                    <motion.div
                      layoutId="billingTogglePaketler"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Aylık</span>
                </button>
                <button
                  onClick={() => setBillingCycle("term")}
                  className={`relative px-6 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                    billingCycle === "term" 
                      ? "text-white shadow-md" 
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {billingCycle === "term" && (
                    <motion.div
                      layoutId="billingTogglePaketler"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Dönemlik <span className="hidden sm:inline">(4,5 ay)</span></span>
                  <span className="relative z-10 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full ml-1 animate-pulse">
                    %15 İndirim
                  </span>
                </button>
              </div>
            </div>
          )}

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
                    {(pkg.isDualPrice ? (billingCycle === "monthly" ? pkg.monthlyOldPrice : pkg.termOldPrice) : pkg.oldPrice) && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg text-muted font-bold line-through">
                          {pkg.isDualPrice ? (billingCycle === "monthly" ? pkg.monthlyOldPrice : pkg.termOldPrice) : pkg.oldPrice}₺
                        </span>
                        {(pkg as any).discountBadge && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                            {(pkg as any).discountBadge}
                          </span>
                        )}
                        {(pkg.isDualPrice && billingCycle === "term") && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                            %15 İndirim
                          </span>
                        )}
                      </div>
                    )}
                    {(pkg.isDualPrice || pkg.price) && (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-extrabold font-heading text-foreground tracking-tighter">
                          ₺{pkg.isDualPrice ? (billingCycle === "monthly" ? pkg.monthlyPrice : pkg.termPrice) : pkg.price}
                        </span>
                        <span className="text-sm font-bold text-muted">
                          {pkg.isDualPrice ? (billingCycle === "monthly" ? "/ay" : "/dönem") : pkg.period}
                        </span>
                      </div>
                    )}
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
                    {["9-10. Sınıf", "11. Sınıf", "YKS"].includes(pkg.category) ? (
                      <Button
                        onClick={() => setSelectedPackageForModal(pkg)}
                        neon={pkg.cta === "Maceraya Katıl" || pkg.cta === "VIP Kayıt Ol"}
                        variant={pkg.featured ? "primary" : "outline"}
                        size="lg"
                        className="w-full gap-2 font-bold text-base h-12 shadow-md"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {pkg.cta || "Bilgi Al"}
                      </Button>
                    ) : (
                      <a 
                        href={waLink(`Merhaba, ${pkg.name} (₺${pkg.price}${pkg.period}) paketi ile kayıt olmak istiyorum.`)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block"
                      >
                        <Button
                          neon={pkg.cta === "Maceraya Katıl" || pkg.cta === "VIP Kayıt Ol"}
                          variant={pkg.featured ? "primary" : "outline"}
                          size="lg"
                          className="w-full gap-2 font-bold text-base h-12 shadow-md"
                        >
                          <MessageCircle className="w-5 h-5" />
                          {pkg.cta || "Bilgi Al"}
                        </Button>
                      </a>
                    )}
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

      {/* Branch Selection Modal */}
      <AnimatePresence>
        {selectedPackageForModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface border border-border shadow-2xl rounded-2xl p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedPackageForModal(null)}
                className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-xl font-bold font-heading text-foreground mb-2">
                {selectedPackageForModal.category === "9-10. Sınıf" ? "Kayıt Bilgileri" : selectedPackageForModal.category === "11. Sınıf" ? "Alanınızı & Bilgilerinizi Girin" : "Bilgilerinizi Girin"}
              </h3>
              <p className="text-sm text-muted mb-6">
                {selectedPackageForModal.name} paketi için bilgilerinizi doldurun, sizi WhatsApp üzerinden yönlendireceğiz.
              </p>
              
              <form 
                className="space-y-4" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const isim = formData.get("isim") as string;
                  const rol = formData.get("rol") as string;
                  const telefon = formData.get("telefon") as string;
                  const lise = formData.get("lise") as string;
                  const activePrice = selectedPackageForModal.isDualPrice 
                    ? (billingCycle === "monthly" ? selectedPackageForModal.monthlyPrice : selectedPackageForModal.termPrice)
                    : selectedPackageForModal.price;
                  const activePeriod = selectedPackageForModal.isDualPrice 
                    ? (billingCycle === "monthly" ? "/ay" : "/dönem")
                    : selectedPackageForModal.period;
                  const priceText = activePrice ? ` (₺${activePrice}${activePeriod})` : "";
                  
                  let extraInfo = "";
                  if (selectedPackageForModal.category === "9-10. Sınıf") {
                    const sinif = formData.get("sinif") as string;
                    extraInfo = `Sınıf: ${sinif}. `;
                  } else if (selectedPackageForModal.category === "11. Sınıf" || selectedPackageForModal.category === "YKS") {
                    const alan = formData.get("alan") as string;
                    extraInfo = `Alan: ${alan}. `;
                  }
                  
                  const liseText = lise ? `Okunan Lise: ${lise}. ` : "";
                  const message = `Merhaba, ${selectedPackageForModal.name}${priceText} paketi ile ilgileniyorum.\n\n${extraInfo}İsim: ${isim}\n${rol} olarak başvuruyorum.\n${liseText}Telefon: ${telefon}\n\nKayıt ve detaylı bilgi almak istiyorum.`;
                  window.open(waLink(message), "_blank");
                  setSelectedPackageForModal(null); 
                }}
              >
                {/* 9-10. Sınıf: Sınıf Seçimi */}
                {selectedPackageForModal.category === "9-10. Sınıf" && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sınıfınız</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="sinif" value="9. Sınıf" defaultChecked className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">9. Sınıf</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="sinif" value="10. Sınıf" className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">10. Sınıf</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* 11. Sınıf & YKS: Alan Seçimi */}
                {(selectedPackageForModal.category === "11. Sınıf" || selectedPackageForModal.category === "YKS") && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Alanınız</label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="alan" value="Sayısal" defaultChecked className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">Sayısal</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="alan" value="Eşit Ağırlık" className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">Eşit Ağırlık</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="alan" value="Sözel" className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">Sözel</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-border rounded-xl cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                        <input type="radio" name="alan" value="Dil" className="w-4 h-4 text-primary accent-primary" />
                        <span className="text-sm font-medium text-foreground">Dil</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* İsim Soyisim */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">İsim Soyisim</label>
                  <input type="text" name="isim" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" placeholder="Örn: Ali Yılmaz" />
                </div>

                {/* Veli / Öğrenci */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Kimsiniz?</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rol" value="Veli" defaultChecked className="w-4 h-4 text-primary accent-primary" />
                      <span className="text-sm text-foreground">Veliyim</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="rol" value="Öğrenci" className="w-4 h-4 text-primary accent-primary" />
                      <span className="text-sm text-foreground">Öğrenciyim</span>
                    </label>
                  </div>
                </div>

                {/* Okunan Lise */}
                {(selectedPackageForModal.category === "9-10. Sınıf" || selectedPackageForModal.category === "11. Sınıf") && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Okunan Lise</label>
                    <input type="text" name="lise" className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" placeholder="Lise adını yazın" />
                  </div>
                )}

                {/* İletişim Bilgisi */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Telefon Numarası</label>
                  <input type="tel" name="telefon" required className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-foreground" placeholder="05XX XXX XX XX" />
                </div>

                <button type="submit" className="w-full py-2.5 bg-primary hover:bg-primary-600 text-white font-medium rounded-lg transition-colors mt-4">
                  WhatsApp'tan Gönder
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
