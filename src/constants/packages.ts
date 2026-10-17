export const CATEGORIES = ["9-10. Sınıf", "11. Sınıf", "YKS"];

export const ALL_PACKAGES = [
  // ==========================================
  // BÖLÜM 1: 9-10-11. Sınıflar (Aylık 16 Saat Sistem)
  // ==========================================

  // 9-10. Sınıf
  {
    tier: "LITE",
    name: "9-10. Sınıf LITE",
    subtitle: "(Temel Gelişim Paketi)",
    category: "9-10. Sınıf",
    description: "Maarif Modeline uyumlu, matematik temellerini sağlamlaştırmak isteyen öğrenciler için.",
    isDualPrice: true,
    monthlyPrice: "6.400",
    monthlyOldPrice: "7.500",
    termPrice: "24.480",
    termOldPrice: "28.800",
    features: [
      "✨ Maarif Modeline Uyumlu Müfredat",
      "Kapsamlı Seviye Tespiti",
      "Ayda 16 Saatlik Online Dersler",
      "Maksimum 10 Kişilik Online Sınıflar",
      "İstenilen Her Zaman İzlenebilen Kayıtlı Dersler",
      "Sarmal Tekrar Yöntemiyle Kalıcı Öğrenme",
      "Aktif WhatsApp Soru Çözüm Grubu",
      "Düzenli Ödevlendirme Sistemi",
      "Genel Öğrenci Takibi ve Gözlem",
      "Ders İçi Performans Değerlendirmesi"
    ],
    notIncludedFeatures: [
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi"
    ],
    featured: false,
    limitedCapacity: false,
    cta: "Keşfetmeye Başla",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },
  {
    tier: "PRO",
    name: "9-10. Sınıf PRO",
    subtitle: "(Etkileşimli Grup Eğitimi)",
    category: "9-10. Sınıf",
    description: "Maarif Modeline uyumlu canlı dersler ve özel sınıflarla matematiği garanti altına alın.",
    isDualPrice: true,
    monthlyPrice: "8.500",
    monthlyOldPrice: "10.000",
    termPrice: "32.500",
    termOldPrice: "38.250",
    features: [
      "LITE Paketindeki Tüm Özellikler",
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi",
      "Çalışma Disiplini Oluşturma"
    ],
    notIncludedFeatures: [
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Kişiselleştirilmiş Strateji ve Yol Haritası"
    ],
    featured: true,
    limitedCapacity: true,
    cta: "Maceraya Katıl",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },
  {
    tier: "VIP",
    name: "9-10. Sınıf VIP",
    subtitle: "(VIP Eğitim ve Koçluk)",
    category: "9-10. Sınıf",
    description: "Maarif Modeline uyumlu, birebir koçluk ve kusursuz canlı ders deneyimi.",
    isDualPrice: true,
    monthlyPrice: "11.500",
    monthlyOldPrice: "13.500",
    termPrice: "43.990",
    termOldPrice: "51.750",
    features: [
      "PRO Paketindeki Tüm Özellikler",
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Öğrenciye Özel Birebir Ödevlendirme",
      "Hedef Odaklı Birebir Takip",
      "Kişiselleştirilmiş Strateji ve Yol Haritası",
      "Periyodik İlerleme ve Başarı Raporlaması",
      "Zaman Yönetimi ve Sınav Taktikleri",
      "Veliye düzenli gelişim bilgilendirmesi"
    ],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: true,
    cta: "VIP Kayıt Ol",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },

  // 11. Sınıf
  {
    tier: "LITE",
    name: "11. Sınıf LITE",
    subtitle: "(Temel Gelişim Paketi)",
    category: "11. Sınıf",
    description: "Maarif Modeline uyumlu, 11. sınıf matematiğini sıfırdan zirveye taşıyın.",
    isDualPrice: true,
    monthlyPrice: "6.400",
    monthlyOldPrice: "7.500",
    termPrice: "24.480",
    termOldPrice: "28.800",
    features: [
      "✨ Maarif Modeline Uyumlu Müfredat",
      "Kapsamlı Seviye Tespiti",
      "Ayda 16 Saatlik Online Dersler",
      "Maksimum 10 Kişilik Online Sınıflar",
      "İstenilen Her Zaman İzlenebilen Kayıtlı Dersler",
      "Sarmal Tekrar Yöntemiyle Kalıcı Öğrenme",
      "Aktif WhatsApp Soru Çözüm Grubu",
      "Düzenli Ödevlendirme Sistemi",
      "Genel Öğrenci Takibi ve Gözlem",
      "Ders İçi Performans Değerlendirmesi"
    ],
    notIncludedFeatures: [
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi"
    ],
    featured: false,
    limitedCapacity: false,
    cta: "Keşfetmeye Başla",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },
  {
    tier: "PRO",
    name: "11. Sınıf PRO",
    subtitle: "(Etkileşimli Grup Eğitimi)",
    category: "11. Sınıf",
    description: "Maarif Modeline uyumlu canlı derslerle 11. sınıf matematiğini garanti altına alın.",
    isDualPrice: true,
    monthlyPrice: "8.500",
    monthlyOldPrice: "10.000",
    termPrice: "32.500",
    termOldPrice: "38.250",
    features: [
      "LITE Paketindeki Tüm Özellikler",
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi",
      "Çalışma Disiplini Oluşturma"
    ],
    notIncludedFeatures: [
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Kişiselleştirilmiş Strateji ve Yol Haritası"
    ],
    featured: true,
    limitedCapacity: true,
    cta: "Maceraya Katıl",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },
  {
    tier: "VIP",
    name: "11. Sınıf VIP",
    subtitle: "(VIP Eğitim ve Koçluk)",
    category: "11. Sınıf",
    description: "Maarif Modeline uyumlu, birebir koçluk ve kusursuz canlı ders deneyimi.",
    isDualPrice: true,
    monthlyPrice: "11.500",
    monthlyOldPrice: "13.500",
    termPrice: "43.990",
    termOldPrice: "51.750",
    features: [
      "PRO Paketindeki Tüm Özellikler",
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Öğrenciye Özel Birebir Ödevlendirme",
      "Hedef Odaklı Birebir Takip",
      "Kişiselleştirilmiş Strateji ve Yol Haritası",
      "Periyodik İlerleme ve Başarı Raporlaması",
      "Zaman Yönetimi ve Sınav Taktikleri",
      "Veliye düzenli gelişim bilgilendirmesi"
    ],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: true,
    cta: "VIP Kayıt Ol",
    videoUrl: "https://www.youtube.com/watch?v=vyAY3Lgxz3M"
  },

  // ==========================================
  // BÖLÜM 3: Tek Seferlik (Bütün) Kamp Paketleri (YKS Üst Bölüm)
  // ==========================================
  {
    tier: "KAMP",
    subCategory: "KAMP",
    name: "60 Günde TYT Matematik Kampı",
    subtitle: "(56 Saat - Ana Kamp)",
    category: "YKS",
    description: "56 saatlik yoğun ana kamp programıyla tüm TYT Matematiği 60 günde baştan sona eksiksiz bitiriyoruz.",
    isDualPrice: false,
    price: "24.900",
    oldPrice: "34.000",
    period: "/tek sefer",
    discountBadge: "Popüler",
    features: [
      "56 Saat Canlı ve Etkileşimli Ana Kamp Dersi",
      "Tüm TYT Matematik Konu Anlatımı",
      "Hafta içi 5 gün canlı ders",
      "Maksimum 10 Kişilik Butik Sınıflar",
      "Albatros Yeni Nesil Soru Çözüm Analizi",
      "Günlük Ders Programı (Yol Haritası)",
      "Uzman Öğretmenlerle 7/24 wp soru çözüm grupları",
      "30 dk haftalık rehberlik"
    ],
    notIncludedFeatures: [],
    featured: true,
    limitedCapacity: true,
    cta: "Kampa Katıl",
    videoUrl: "https://www.youtube.com/watch?v=zbPRCFb8qLo"
  },
  {
    tier: "KAMP",
    subCategory: "KAMP",
    name: "21 Günde 0'dan Matematik Kampı",
    subtitle: "(20 Saat - Temel Atma)",
    category: "YKS",
    description: "20 saatlik temel atma kampıyla matematiğe sıfırdan başlayanlar için en temelden zirveye uzanan hızlandırılmış program.",
    isDualPrice: false,
    price: "8.900",
    oldPrice: "12.500",
    period: "/tek sefer",
    discountBadge: "Yeni",
    features: [
      "20 Saat Canlı ve Etkileşimli Temel Atma Dersi",
      "Temel İşlem Yeteneği ve Temel Kavramlar",
      "Yavaş ve Anlaşılır Tempo ile Konu Anlatımı",
      "Maksimum 10 Kişilik Butik Sınıflar",
      "Günlük Ödevlendirme ve Takip (Yol Haritası)",
      "Uzman Öğretmenlerle 7/24 wp soru çözüm grupları",
      "30 dk haftalık rehberlik"
    ],
    notIncludedFeatures: [
      "İleri Seviye Yeni Nesil Sorular (İleriki kamplarda)"
    ],
    featured: false,
    limitedCapacity: true,
    cta: "Kampa Katıl",
    videoUrl: "https://www.youtube.com/watch?v=OfCAZVLKBCo"
  },
  {
    tier: "MATEMATİK",
    subCategory: "KAMP",
    name: "AYT Matematik Kampı",
    subtitle: "",
    category: "YKS",
    description: "",
    isDualPrice: false,
    price: "",
    oldPrice: "",
    period: "",
    discountBadge: "",
    features: [
      "Yakında..."
    ],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: false,
    cta: "Bilgi Al",
    videoUrl: ""
  },
  {
    tier: "GEOMETRİ",
    subCategory: "KAMP",
    name: "TYT-AYT Geometri Kampı",
    subtitle: "",
    category: "YKS",
    description: "",
    isDualPrice: false,
    price: "",
    oldPrice: "",
    period: "",
    discountBadge: "",
    features: [
      "Yakında..."
    ],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: false,
    cta: "Bilgi Al",
    videoUrl: ""
  },

  // ==========================================
  // BÖLÜM 2: YKS Aylık Abonelik & Koçluk (Sürekli Eğitim Sistemi - Kampların Altında)
  // ==========================================
  {
    tier: "LITE",
    subCategory: "ABONELIK",
    name: "YKS LITE",
    subtitle: "(Kendi Hızında Gelişim)",
    category: "YKS",
    includesAllCampsBadge: "Yukarıdaki Tüm YKS Kamplarını İçinde Barındırır",
    description: "60 Günde TYT, 21 Günde 0'dan Matematik, AYT Matematik ve Geometri dahil tüm kampları içinde barındıran aylık gelişim paketi.",
    isDualPrice: true,
    monthlyPrice: "12.500",
    monthlyOldPrice: "14.500",
    termPrice: "47.810",
    termOldPrice: "56.250",
    features: [
      "🔥 Tüm YKS Kamplarını İçinde Barındırır (60 Günde TYT, 21 Günde 0'dan, AYT, Geometri)",
      "✨ TYT-AYT Tam Müfredat Eğitim Sistemi",
      "Kapsamlı Seviye Tespiti",
      "Ayda 16 Saatlik Online Dersler",
      "Maksimum 10 Kişilik Online Sınıflar",
      "İstenilen Her Zaman İzlenebilen Kayıtlı Dersler",
      "Sarmal Tekrar Yöntemiyle Kalıcı Öğrenme",
      "Aktif WhatsApp Soru Çözüm Grubu",
      "Düzenli Ödevlendirme Sistemi",
      "Genel Öğrenci Takibi ve Gözlem",
      "Ders İçi Performans Değerlendirmesi"
    ],
    notIncludedFeatures: [
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi"
    ],
    featured: false,
    limitedCapacity: false,
    cta: "Keşfetmeye Başla",
    videoUrl: "https://www.youtube.com/watch?v=zbPRCFb8qLo"
  },
  {
    tier: "PRO",
    subCategory: "ABONELIK",
    name: "YKS PRO",
    subtitle: "(Etkileşimli Kamp + Grup Desteği)",
    category: "YKS",
    includesAllCampsBadge: "Yukarıdaki Tüm YKS Kamplarını İçinde Barındırır",
    description: "60 Günde TYT, 21 Günde 0'dan Matematik, AYT Matematik ve Geometri dahil tüm kampları içinde barındıran, etkileşimli kamp ve grup destekli ana paket.",
    isDualPrice: true,
    monthlyPrice: "16.500",
    monthlyOldPrice: "19.500",
    termPrice: "63.110",
    termOldPrice: "74.250",
    features: [
      "🔥 Tüm YKS Kamplarını İçinde Barındırır (60 Günde TYT, 21 Günde 0'dan, AYT, Geometri)",
      "YKS LITE Paketindeki Tüm Özellikler",
      "Etkileşimli Kamp + Grup Desteği",
      "Öğrenciye Özel Ödevlendirme",
      "Hedef Odaklı Takip",
      "Detaylı Seviye ve Gelişim Analizi",
      "Çalışma Disiplini Oluşturma"
    ],
    notIncludedFeatures: [
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Kişiselleştirilmiş Strateji ve Yol Haritası"
    ],
    featured: true,
    limitedCapacity: true,
    cta: "Maceraya Katıl",
    videoUrl: "https://www.youtube.com/watch?v=zbPRCFb8qLo"
  },
  {
    tier: "VIP",
    subCategory: "ABONELIK",
    name: "YKS VIP",
    subtitle: "(Tam Kapsamlı Kamp & Birebir Koçluk)",
    category: "YKS",
    includesAllCampsBadge: "Yukarıdaki Tüm YKS Kamplarını İçinde Barındırır",
    description: "60 Günde TYT, 21 Günde 0'dan Matematik, AYT Matematik ve Geometri dahil tüm kampları eksiksiz barındıran, birebir özel koçluk ve VIP takip paketi.",
    isDualPrice: true,
    monthlyPrice: "24.500",
    monthlyOldPrice: "28.500",
    termPrice: "93.710",
    termOldPrice: "110.250",
    features: [
      "🔥 Tüm YKS Kamplarını İçinde Barındırır (60 Günde TYT, 21 Günde 0'dan, AYT, Geometri)",
      "YKS PRO Paketindeki Tüm Özellikler",
      "Tam Kapsamlı Kamp & Birebir YKS Koçluğu",
      "Öncelikli WhatsApp Soru Çözüm Hattı",
      "Öğrenciye Özel Birebir Ödevlendirme",
      "Hedef Odaklı Birebir Takip",
      "Kişiselleştirilmiş Strateji ve Yol Haritası",
      "Periyodik İlerleme ve Başarı Raporlaması",
      "Zaman Yönetimi ve Sınav Taktikleri",
      "Veliye düzenli gelişim bilgilendirmesi"
    ],
    notIncludedFeatures: [],
    featured: false,
    limitedCapacity: true,
    cta: "VIP Kayıt Ol",
    videoUrl: "https://www.youtube.com/watch?v=zbPRCFb8qLo"
  }
];
