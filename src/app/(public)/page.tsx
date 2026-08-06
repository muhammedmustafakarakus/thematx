"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ArrowRight,
  Target,
  Users,
  TrendingUp,
  Shield,
  Check,
  Star,
  Play,
  Calendar,
  Clock,
  ChevronDown,
  Sparkles,
  GraduationCap,
  BarChart3,
  HeartHandshake,
  Megaphone,
  MessageCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";

import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import { motion, AnimatePresence } from "framer-motion";
import CustomVideoPlayer from "@/components/ui/CustomVideoPlayer";

const WA_NUMBER = "905068530441";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ======================
   DATA
   ====================== */

const advantages = [
  {
    icon: Target,
    title: "Birebir Odaklı Eğitim",
    description:
      "Her öğrencinin seviyesine ve öğrenme hızına göre kişiselleştirilmiş ders planı.",
  },
  {
    icon: BarChart3,
    title: "Sistemli Gelişim Takibi",
    description:
      "Öğrencinin performansını analiz ederek eksiklerini nokta atışı tespit eden analitik yaklaşım.",
  },
  {
    icon: GraduationCap,
    title: "Yeni Nesil Eğitim",
    description:
      "Ezberden uzak, mantığı kavratan ve analitik düşünme becerisini geliştiren öğretim modeli.",
  },
  {
    icon: HeartHandshake,
    title: "Bütüncül Rehberlik",
    description:
      "Sadece ders başarısı değil, süreç boyunca motivasyon ve hedefe ulaşma konularında yol arkadaşlığı.",
  },
];

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
    tier: "KAMP",
    name: "60 Günde TYT Matematik Kampı",
    subtitle: "(TYT Matematiği baştan sona bitirmek isteyenler için yoğunlaştırılmış yaz kampı.)",
    price: "24.000",
    oldPrice: "35.250",
    discountBadge: null,
    period: "",
    category: "YKS",
    description: "",
    features: [
      "Tüm TYT Matematik Konu Anlatımı",
      "6 hafta boyunca 60 canlı ders",
      "Hafta içi 5 gün canlı ders",
      "Albatros Yeni Nesil Soru Çözüm Analizi",
      "Günlük Ders Programı",
      "Uzman Öğretmenlerle 7/24 Soru Çözüm Desteği"
    ],
    notIncludedFeatures: [],
    featured: true,
    limitedCapacity: true,
    cta: "Hemen Başla",
    videoUrl: "nTgXuRx2cuk"
  },
  {
    tier: "GEOMETRİ",
    name: "TYT-AYT Geometri Canlı Ders",
    subtitle: "",
    price: null,
    oldPrice: null,
    discountBadge: null,
    period: "",
    category: "YKS",
    description: "",
    features: ["Yakında..."],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: false,
    cta: "Hemen Başla",
    videoUrl: null
  },
  {
    tier: "MATEMATİK",
    name: "AYT Matematik Canlı Dersler",
    subtitle: "",
    price: null,
    oldPrice: null,
    discountBadge: null,
    period: "",
    category: "YKS",
    description: "",
    features: ["Yakında..."],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: false,
    cta: "Hemen Başla",
    videoUrl: null
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

const testimonials = [
  {
    name: "Ayşe Y.",
    role: "YKS Öğrencisi Velisi",
    content:
      "Kızım Thematx'e başladığından beri matematiğe karşı tutumu tamamen değişti. Sınav kaygısı azaldı, özgüveni arttı. Puanını 30 puan yükseltti!",
    rating: 5,
  },
  {
    name: "Mehmet K.",
    role: "YKS Öğrencisi",
    content:
      "Premium paket ile aldığım birebir dersler sayesinde AYT matematikte 35 net yaptım. Koçum her an yanımdaydı, motivasyonumu hiç kaybetmedim.",
    rating: 5,
  },
  {
    name: "Fatma D.",
    role: "10. Sınıf Öğrencisi Velisi",
    content:
      "Düzenli takip sistemi sayesinde kızımın okuldaki notları hızla yükseldi. Öğretmenimizin ilgisi ve profesyonelliği gerçekten fark yaratıyor.",
    rating: 5,
  },
  {
    name: "Elif S.",
    role: "KPSS Adayı",
    content:
      "Uzun bir aradan sonra matematiğe baştan başladım. M. Mustafa Hoca'nın pratik yöntemleri sayesinde korkumu yendim ve netlerimi hedeflerime ulaştırdım.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "Thematx nasıl çalışıyor?",
    answer:
      "Thematx'te önce öğrencinin seviyesini belirliyoruz. Ardından kişisel bir çalışma planı oluşturarak canlı online dersler, birebir koçluk ve düzenli takip ile hedefe ulaşıyoruz.",
  },
  {
    question: "Dersler online mı yoksa yüz yüze mi?",
    answer:
      "Tüm derslerimiz online olarak Zoom/Google Meet üzerinden gerçekleştirilmektedir. Bu sayede Türkiye'nin her yerinden derslerimize katılabilirsiniz.",
  },
  {
    question: "Hangi sınıf seviyelerine ders veriyorsunuz?",
    answer:
      "5. sınıftan 12. sınıfa kadar tüm seviyelerde matematik dersi veriyoruz. LGS ve YKS'ye özel hazırlık programlarımız mevcuttur.",
  },
  {
    question: "Ödeme seçenekleriniz nelerdir?",
    answer:
      "Ödemelerinizi güvenle EFT / Havale yöntemi ile gerçekleştirebilirsiniz.",
  },
  {
    question: "İstediğim zaman iptal edebilir miyim?",
    answer:
      "Aylık paketlerimizde herhangi bir taahhüt yoktur. Dönem sonunda yenilemeyerek kolayca ayrılabilirsiniz. Detaylar için iade politikamızı inceleyebilirsiniz.",
  },
];

/* ======================
   HOMEPAGE COMPONENT
   ====================== */

function PackagesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const categoryParam = searchParams.get("category");
  const activeCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : "9-11. Sınıf";

  const handleCategoryChange = (cat: string) => {
    router.replace(`${pathname}?category=${cat}`, { scroll: false });
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const HERO_ANNOUNCEMENTS = [
    {
      titleTop: "60 Günde",
      titleMain: "TYT Matematik",
      titleBottom: "Kampı",
      badge: "🔥 YENİ BAŞLADI",
      desc: "TYT Matematiği baştan sona bitirmek isteyenler için yoğunlaştırılmış yaz kampı.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop",
      link: "/paketler?category=YKS"
    },
    {
      titleTop: "KPSS",
      titleMain: "Son Tekrar",
      titleBottom: "Kampı",
      badge: "🔥 YENİ BAŞLADI",
      desc: "Sınava girmeden önceki en kritik düzlükte netlerini zirveye taşı. Sınırlı kontenjanı kaçırma!",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop",
      link: "/paketler?category=KPSS"
    }
  ];

  const filteredPackages = ALL_PACKAGES.filter(
    pkg => pkg.category === activeCategory
  );

  return (
    <main>
      {/* ===== ANNOUNCEMENT BANNER ===== */}
      <div className="bg-primary text-white py-1.5 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-8 flex items-center gap-1.5 text-xs font-medium"><Sparkles className="w-3.5 h-3.5" /> ✨ Yeni Nesil Matematik Eğitimine Hoş Geldiniz! Thematx ile matematiği sevmeye başlayın.</span>
          <span className="mx-8 flex items-center gap-1.5 text-xs font-medium"><Target className="w-3.5 h-3.5" /> 🎯 Kişiselleştirilmiş Birebir Takip Sistemi ile Hedeflerinize Tam İsabet!</span>
          <span className="mx-8 flex items-center gap-1.5 text-xs font-medium"><Sparkles className="w-3.5 h-3.5" /> ✨ Yeni Nesil Matematik Eğitimine Hoş Geldiniz! Thematx ile matematiği sevmeye başlayın.</span>
          <span className="mx-8 flex items-center gap-1.5 text-xs font-medium"><Target className="w-3.5 h-3.5" /> 🎯 Kişiselleştirilmiş Birebir Takip Sistemi ile Hedeflerinize Tam İsabet!</span>
        </div>
      </div>

      {/* ===== ULTRA PREMIUM HERO BANNER ===== */}
      <section className="relative overflow-hidden pt-24 lg:pt-36 pb-20 lg:pb-32">
        {/* Static Background Mesh Glows (Optimized for scroll performance) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden transform-gpu">
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN - TEXT */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium text-sm mb-8 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>2026-2027 Eğitim Yılı Kayıtları Başladı</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight text-foreground leading-[1.1] mb-6"
              >
                Matematikte <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
                  Zirveye Ulaşın
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-lg sm:text-xl text-muted leading-relaxed mb-10 max-w-2xl"
              >
                Öğrenciye özel çalışma stratejileri, interaktif canlı dersler ve birebir takip sistemiyle matematiği keşfedin; tüm sınavlarda hedeflerinize emin adımlarla ilerleyin.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <a href={waLink("Merhaba, 2027 LGS/YKS kampları için bilgi almak istiyorum.")} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button neon={true} size="lg" className="w-full shadow-glow-lg group">
                    Kayıt Ol & Bilgi Al
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Link href="/paketler" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full bg-surface/50 backdrop-blur-md border border-border">
                    <Play className="w-5 h-5 mr-2" />
                    Paketleri Seç
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - FLOATING WIDGETS */}
            <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
              {/* Floating Teacher Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -15, 0] }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.4 },
                  scale: { duration: 0.8, delay: 0.4, type: "spring" },
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }
                }}
                className="absolute top-[15%] -right-8 lg:top-[15%] lg:-right-32 z-50 group cursor-pointer"
              >
                <div className="relative w-40 h-40 lg:w-56 lg:h-56 flex items-center justify-center">
                  {/* Rotating Text SVG */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute inset-0 w-full h-full text-primary group-hover:text-cyan-500 transition-colors duration-500"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                      <text className="text-[10px] font-bold tracking-[0.25em] uppercase" fill="currentColor">
                        <textPath href="#circlePath" startOffset="0%">
                          MUSTAFA HOCA • MATEMATİK • MUSTAFA HOCA • MATEMATİK • 
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>
                  
                  {/* Center Photo */}
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="absolute w-24 h-24 lg:w-36 lg:h-36 rounded-full overflow-hidden border-[4px] border-surface shadow-2xl z-10 bg-surface-alt flex items-center justify-center"
                  >
                    <img 
                      src="/mustafa-hoca.jpg" 
                      onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop" }}
                      alt="Mustafa Hoca" 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" 
                    />
                  </motion.div>
                  
                  {/* Hover Sparkles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20">
                    <div className="absolute top-0 left-1/2 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
                    <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: "100ms" }} />
                    <div className="absolute top-1/4 right-0 w-3 h-3 bg-primary rounded-full animate-ping" style={{ animationDelay: "200ms" }} />
                  </div>
                </div>
              </motion.div>

              {/* Image Announcement Board (Resimli Duyuru Panosu) - Carousel */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-[320px] h-[400px] lg:w-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl group cursor-pointer border-[4px] border-primary/20 hover:border-primary transition-colors duration-300 z-30"
                onClick={() => router.push(HERO_ANNOUNCEMENTS[currentAnnouncement].link)} 
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentAnnouncement}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={HERO_ANNOUNCEMENTS[currentAnnouncement].image} 
                      alt={HERO_ANNOUNCEMENTS[currentAnnouncement].titleMain} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlays for Poster Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-black/50 to-black/90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    {/* Neon Glow Effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_100px_rgba(16,185,129,0.4)]" />

                    {/* Content */}
                    <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-between">
                      {/* Top Badge */}
                      <div className="flex justify-end">
                        <span className="bg-red-500 text-white text-xs lg:text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]">
                          {HERO_ANNOUNCEMENTS[currentAnnouncement].badge}
                        </span>
                      </div>

                      {/* Main Text */}
                      <div className="flex flex-col gap-3">
                        <h3 className="text-white font-extrabold text-3xl lg:text-5xl leading-tight drop-shadow-2xl">
                          {HERO_ANNOUNCEMENTS[currentAnnouncement].titleTop} <br/>
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">{HERO_ANNOUNCEMENTS[currentAnnouncement].titleMain}</span> <br/>
                          {HERO_ANNOUNCEMENTS[currentAnnouncement].titleBottom}
                        </h3>
                        <p className="text-white/90 text-sm lg:text-base font-medium leading-relaxed max-w-[280px]">
                          {HERO_ANNOUNCEMENTS[currentAnnouncement].desc}
                        </p>
                        
                        {/* Action Button */}
                        <div className="mt-4 flex items-center gap-3 text-primary font-bold text-sm lg:text-base uppercase tracking-wider group-hover:text-white transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                            <Play className="w-4 h-4 fill-current ml-1" />
                          </div>
                          Hemen İncele
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-40">
                  {HERO_ANNOUNCEMENTS.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentAnnouncement ? "w-6 bg-primary" : "w-2 bg-white/50"}`} />
                  ))}
                </div>
              </motion.div>

              {/* Decorative 3D elements inside center */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
                className="absolute z-10"
              >
                <div className="w-64 h-64 bg-primary rounded-2xl opacity-[0.03] rotate-12 blur-xl" />
              </motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
                className="absolute z-10"
              >
                <div className="w-72 h-72 bg-cyan-500 rounded-full opacity-[0.04] -rotate-12 blur-2xl" />
              </motion.div>

            </div>
          </div>
        </Container>
      </section>

      {/* ===== NEDEN BİZ? ===== */}
      <section className="section-padding bg-surface-alt">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4 uppercase tracking-wider font-bold">Neden Thematx?</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-foreground mt-2 mb-6">
              Sıradan Eğitimi Unutun, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">
                Gerçek Potansiyelinizi Keşfedin
              </span>
            </h2>
            <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
              Ezberci sistemlerden uzak, tamamen size özel planlanmış yeni nesil eğitim yaklaşımımız ile 
              matematiği bir zorunluluk olmaktan çıkarıp başarıya giden en güçlü silahınız yapıyoruz.
            </p>
          </div>

          <div id="tanitim" className="w-full max-w-3xl mx-auto mb-16 relative shadow-2xl border border-border/50 rounded-2xl overflow-hidden">
            <CustomVideoPlayer 
              youtubeId="nTgXuRx2cuk"
              startAt={30}
              title="Thematx Tanıtım Videosu"
              className="z-10"
            />
          </div>

          <div className="flex flex-col gap-12 items-center mb-16">
            {/* Features - Bottom Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {advantages.map((adv, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i}
                >
                  <Card hover className="h-full p-6 border-border/50 bg-surface/80 backdrop-blur-sm group hover:border-emerald-200 hover:shadow-xl transition-all duration-500">
                    <div className="w-12 h-12 mb-5 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:shadow-lg shadow-emerald-500/30 transition-all duration-500">
                      <adv.icon className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-foreground mb-2 group-hover:text-emerald-600 transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-medium">
                      {adv.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== PAKETLER ===== */}
      <section id="paketler" className="section-padding bg-surface-alt pt-20 -mt-10">
        <Container>
          <SectionHeading
            badge="Paketler & Fiyatlandırma"
            title="Size En Uygun Programı Seçin"
            description="Farklı ihtiyaçlara ve sınavlara (YKS, KPSS, DGS vb.) yönelik hazırladığımız avantajlı eğitim paketleri."
          />

          {/* Category Tab Bar */}
          <div className="text-center mb-6 mt-12">
            <h3 className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-2">Hangi alanda ders almak istiyorsunuz?</h3>
            <p className="text-muted text-sm md:text-base">Size en uygun programları listelemek için bir kategori seçin.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 mt-4">
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    activeCategory === cat 
                      ? "bg-foreground text-background shadow-lg scale-105" 
                      : "bg-surface text-muted hover:bg-surface-alt hover:text-foreground border border-border"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 ${filteredPackages.length >= 4 ? "lg:grid-cols-4 max-w-[90rem]" : "lg:grid-cols-3 max-w-6xl"} gap-6 lg:gap-8 mx-auto min-h-[400px]`}>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-3xl border p-6 lg:p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group animate-in fade-in zoom-in-95 ${
                    pkg.featured
                      ? "border-primary/60 bg-gradient-to-b from-surface to-primary/5 shadow-xl shadow-primary/10 lg:scale-105 z-10"
                      : "border-border/60 bg-surface/80 backdrop-blur-sm hover:border-primary/30 shadow-lg"
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
                      <h3 className="text-xl font-bold font-heading text-foreground mb-4">
                        {pkg.name}
                      </h3>
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
                    {pkg.price && (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-extrabold font-heading text-foreground tracking-tighter">
                          ₺{pkg.price}
                        </span>
                        <span className="text-sm font-bold text-muted">{pkg.period}</span>
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
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-surface/50 rounded-3xl border border-dashed border-border">
                <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-muted opacity-50" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Bu kategoride paket bulunamadı</h3>
                <p className="text-muted max-w-md mx-auto">Lütfen diğer kategorilere göz atın veya yakında açılacak sınıflarımız için iletişime geçin.</p>
              </div>
            )}
          </div>

          <p className="text-center text-sm text-muted mt-12">
            Tüm paketler aylıktır, taahhüt yoktur.{" "}
            <Link href="/paketler" className="text-primary hover:underline font-medium">
              Tüm paketleri detaylı karşılaştır →
            </Link>
          </p>
        </Container>
      </section>

      {/* ===== BAŞARI HİKAYELERİ ===== */}
      <section className="section-padding bg-surface-alt">
        <Container>
          <SectionHeading
            badge="Başarı Hikayeleri"
            title="Öğrencilerimiz Ne Diyor?"
            description="Thematx ailesiyle hedeflerine ulaşan öğrenci ve velilerimizin yorumları."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <Card key={i} padding="lg" className="relative">
                {/* Quote mark */}
                <div className="absolute top-6 right-6 text-5xl font-serif text-primary/10 leading-none">
                  &ldquo;
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-muted leading-relaxed mb-6">
                  {t.content}
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== SSS ===== */}
      <section className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              badge="SSS"
              title="Sıkça Sorulan Sorular"
              description="Merak ettiklerinize hızlı yanıtlar."
            />

            <Card padding="lg">
              <Accordion>
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} title={faq.question} defaultOpen={i === 0}>
                    {faq.answer}
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <p className="text-center text-sm text-muted mt-6">
              Daha fazla sorunuz mu var?{" "}
              <Link href="/sss" className="text-primary hover:underline font-medium">
                Tüm SSS&apos;leri görüntüleyin →
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="section-padding gradient-cta relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white/3 rounded-full blur-2xl" />
        </div>

        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading text-white tracking-tight leading-tight">
              Matematik Yolculuğuna{" "}
              <span className="text-primary-light">Bugün Başla</span>
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">
              Ücretsiz seviye testiyle başla, sana en uygun paketi birlikte belirleyelim.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Button
                variant="secondary"
                size="lg"
                className="shadow-lg gap-2"
                href={waLink("Merhaba, ücretsiz seviye testi için randevu almak istiyorum.")}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp ile Ulaş
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white/80 hover:text-white hover:bg-white/10"
                href="/paketler"
              >
                Paketleri İncele
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
      <PackagesContent />
    </Suspense>
  );
}
