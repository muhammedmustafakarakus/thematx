"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

const faqs = [
  {
    category: "Genel & Sınıf Seviyeleri",
    questions: [
      {
        q: "Thematx nedir?",
        a: "Thematx, 9. sınıftan itibaren lise öğrencilerine ve YKS (TYT-AYT) adaylarına kişiselleştirilmiş matematik eğitimi, butik canlı dersler, yoğunlaştırılmış kamplar ve birebir koçluk sunan yeni nesil online matematik eğitim platformudur."
      },
      {
        q: "Hangi sınıf seviyeleriyle çalışıyorsunuz? LGS eğitiminiz var mı?",
        a: "Hayır, LGS (ortaokul) grubumuz bulunmamaktadır. Thematx olarak yalnızca 9. sınıftan itibaren eğitim veriyoruz: 9. Sınıf, 10. Sınıf, 11. Sınıf (Maarif Modeline uyumlu programlar) ile 12. Sınıf ve Mezun öğrencilere yönelik YKS (TYT - AYT - Geometri) hazırlık programlarımız mevcuttur."
      },
      {
        q: "Eğitim sisteminiz nasıl işliyor?",
        a: "Öğrencimiz kayıt olduğunda öncelikle kapsamlı bir seviye tespiti yapılır ve kendi seviyesine uygun maksimum 12 kişilik butik online sınıfa yerleştirilir. Haftalık düzenli canlı dersler, sarmal tekrar yöntemi, düzenli ödevlendirme ve seçilen pakete (LITE, PRO, VIP) göre soru çözüm desteği ve birebir takip ile süreç yürütülür."
      }
    ]
  },
  {
    category: "9-10-11. Sınıf Paketleri (Maarif Modeli)",
    questions: [
      {
        q: "9, 10 ve 11. sınıf paketlerinizde ders saatleri ve içerik nasıldır?",
        a: "9-10. sınıf ve 11. sınıf paketlerimiz yeni Maarif Modeline %100 uyumludur. Ayda 16 saat canlı ve etkileşimli online ders işlenir. Sınıflarımız maksimum 12 kişiliktir ve işlenen tüm derslerin kayıtlarına sınırsız erişim sağlanır."
      },
      {
        q: "LITE, PRO ve VIP paketleri arasındaki farklar nelerdir?",
        a: "LITE paketi temel gelişim paketimizdir; ayda 16 saat canlı ders, kayıtlı ders videoları, sarmal tekrar ve genel takip içerir. PRO paketi en çok tercih edilen ana paketimizdir; LITE özelliklerine ek olarak öğrencilerle beraber soru çözüm grubu, öğrenciye özel ödevlendirme, hedef odaklı takip ve detaylı gelişim analizi sunar. VIP paketi ise üst düzey birebir ilgi isteyenler için uzman öğretmenlerle WhatsApp ile anında soru çözümü (sadece VIP), birebir koçluk, kişiselleştirilmiş yol haritası ve veliye düzenli gelişim bilgilendirmesi içerir."
      }
    ]
  },
  {
    category: "YKS (TYT-AYT) Kampları & Abonelik Sistemi",
    questions: [
      {
        q: "Tek seferlik YKS kamplarınız nelerdir?",
        a: "Matematiğe sıfırdan başlayanlar için '21 Günde 0'dan Matematik Kampı (20 Saat - Temel Atma)' ve tüm TYT konularını baştan sona bitirdiğimiz '60 Günde TYT Matematik Kampı (56 Saat - Ana Kamp)' programlarımız mevcuttur. Ayrıca AYT Matematik ve TYT-AYT Geometri kamplarımız da programımızda yer almaktadır."
      },
      {
        q: "YKS LITE, PRO ve VIP aylık abonelik paketleri kampları da kapsıyor mu?",
        a: "Evet! YKS LITE, YKS PRO ve YKS VIP aylık abonelik ve koçluk paketlerimiz; 60 Günde TYT Matematik Kampı, 21 Günde 0'dan Matematik Kampı, AYT Matematik Kampı ve TYT-AYT Geometri Kampı dahil tüm YKS kamplarımızın tamamını içinde barındırır."
      },
      {
        q: "12. sınıf ve Mezun öğrenciler için ayrı planlama yapılıyor mu?",
        a: "Evet, kayıt esnasında sınıf durumunuz (12. Sınıf veya Mezun) ve alanınız (Sayısal, Eşit Ağırlık, Sözel, Dil) alınarak çalışma programınız ve yol haritanız buna göre kişiselleştirilir."
      }
    ]
  },
  {
    category: "Canlı Dersler, Kayıtlar & Soru Çözüm",
    questions: [
      {
        q: "Canlı dersleri kaçırırsam ne olur?",
        a: "İşlenen tüm canlı derslerimiz yüksek kalitede kaydedilir. Öğrencilerimiz kaçırdıkları veya tekrar etmek istedikleri ders kayıtlarını istedikleri her zaman sınırsız olarak izleyebilirler."
      },
      {
        q: "Çözemediğim soruları nasıl sorabilirim?",
        a: "Uzman öğretmenlerimizle 'WhatsApp ile Anında Soru Çözümü' ayrıcalığı yalnızca VIP paket öğrencilerimize özeldir. PRO ve Kamp paketlerimizde ise öğrencilerin birlikte yardımlaşıp soru paylaşımı yapabildiği 'Öğrencilerle Beraber Soru Çözüm Grubu' bulunmaktadır."
      },
      {
        q: "Birebir özel ders imkânınız var mı?",
        a: "Evet, grup derslerimiz ve kamplarımızın yanı sıra tamamen öğrenciye özel planlanan birebir özel ders seçeneğimiz de mevcuttur. Üst menüdeki 'Birebir Ders' butonundan başvuru yapabilirsiniz."
      }
    ]
  },
  {
    category: "Ödeme ve Kayıt",
    questions: [
      {
        q: "Aylık ve Dönemlik ödeme seçenekleriniz nasıl çalışıyor?",
        a: "Aylık paketlerimizde herhangi bir taahhüt yoktur. Dilerseniz ödemelerinizi aylık olarak yapabilir, dilerseniz 4,5 aylık 'Dönemlik' ödeme seçeneğini tercih ederek anında %15 indirim avantajından yararlanabilirsiniz."
      },
      {
        q: "Ödemeyi nasıl yapabilirim?",
        a: "İlgilendiğiniz paketi seçip kayıt formunu doldurduktan sonra eğitim danışmanlarımız WhatsApp üzerinden sizinle iletişime geçer. Ödemelerinizi güvenle EFT / Havale yöntemi ile gerçekleştirebilirsiniz."
      }
    ]
  }
];

export default function SssPage() {
  return (
    <main className="min-h-screen bg-background py-20 lg:py-28">
      <Container>
        <div className="max-w-3xl mx-auto space-y-16">
          <SectionHeading 
            title="Sıkça Sorulan Sorular"
            description="9-10-11. sınıf Maarif Modeli paketlerimiz, YKS kamplarımız, abonelik sistemimiz ve ders işleyişimiz hakkında merak edilen tüm sorular."
            align="center"
          />

          <div className="space-y-12">
            {faqs.map((group, gIdx) => (
              <div key={gIdx} className="space-y-6">
                <h3 className="text-2xl font-heading font-bold text-foreground border-b border-border pb-2">
                  {group.category}
                </h3>
                <Accordion className="space-y-4">
                  {group.questions.map((faq, fIdx) => (
                    <AccordionItem 
                      key={fIdx} 
                      title={faq.q}
                      defaultOpen={gIdx === 0 && fIdx === 0}
                    >
                      <p className="text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center bg-surface p-8 rounded-2xl border border-border shadow-sm">
            <h4 className="text-xl font-heading font-bold text-foreground mb-4">Başka sorularınız mı var?</h4>
            <p className="text-muted mb-8">Aradığınız cevabı bulamadıysanız, eğitim danışmanlarımız size yardımcı olmaktan mutluluk duyacaktır.</p>
            <Button 
              size="lg" 
              variant="primary"
              href="https://wa.me/905068530441?text=Merhaba%2C%20Thematx%20e%C4%9Fitim%20paketleri%20hakk%C4%B1nda%20sorum%20var."
            >
              WhatsApp ile İletişime Geçin
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
