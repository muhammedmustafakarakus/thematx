"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";

const faqs = [
  {
    category: "Genel",
    questions: [
      {
        q: "Thematx nedir?",
        a: "Thematx, her seviyeden öğrenciye kişiselleştirilmiş matematik eğitimi sunan yenilikçi bir özel ders platformudur. Amacımız matematiği sevdirmek ve kalıcı öğrenmeyi sağlamaktır."
      },
      {
        q: "Hangi sınıf seviyelerine ders veriyorsunuz?",
        a: "İlkokul, ortaokul ve lise seviyelerindeki tüm öğrencilere, ayrıca LGS, YKS (TYT-AYT) gibi merkezi sınavlara hazırlanan öğrencilere yönelik dersler vermekteyiz."
      }
    ]
  },
  {
    category: "Dersler",
    questions: [
      {
        q: "Dersler nasıl işleniyor?",
        a: "Derslerimiz interaktif dijital tahta kullanılarak, öğrenci ile birebir etkileşim halinde işlenmektedir. Her öğrencinin seviyesine özel bir müfredat takip edilir."
      },
      {
        q: "Ders saatleri nasıl belirleniyor?",
        a: "Ders saatleri, öğrencinin okul programı ve eğitmenin uygunluk durumuna göre esnek bir şekilde, karşılıklı anlaşılarak planlanır."
      },
      {
        q: "Grup dersleri kaç kişilik?",
        a: "Verimliliği en üst düzeyde tutmak amacıyla grup derslerimiz maksimum 6 öğrenci ile sınırlandırılmıştır."
      }
    ]
  },
  {
    category: "Ödeme ve İade",
    questions: [
      {
        q: "Ödeme seçenekleriniz nelerdir?",
        a: "Ödemelerinizi güvenle EFT / Havale yöntemi ile gerçekleştirebilirsiniz."
      },
      {
        q: "İptal ve iade politikanız nedir?",
        a: "Memnun kalmadığınız takdirde, kullanılmamış derslerinizin ücreti herhangi bir kesinti yapılmadan iade edilmektedir."
      }
    ]
  },
  {
    category: "Teknik",
    questions: [
      {
        q: "Hangi platformları kullanıyorsunuz?",
        a: "Derslerimizi altyapısı güçlü olan Zoom veya Google Meet üzerinden, yüksek görüntü ve ses kalitesiyle gerçekleştiriyoruz."
      },
      {
        q: "İnternet bağlantım kesilirse ne olur?",
        a: "Bağlantı sorunları nedeniyle işlenemeyen veya yarım kalan dersleriniz, hakkınız kaybolmadan sizin için uygun olan başka bir güne telafi olarak planlanır."
      },
      {
        q: "Ders kayıtları paylaşılıyor mu?",
        a: "Öğrencinin ve velinin onayı dahilinde dersler kaydedilebilir ve sonrasında tekrar edebilmesi için öğrenciyle paylaşılabilir."
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
            description="Sistemimiz, ders işleyişimiz ve ödeme koşullarımız hakkında en çok merak edilen konuları sizin için derledik."
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
            <Button size="lg" variant="primary">
              İletişime Geçin
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
