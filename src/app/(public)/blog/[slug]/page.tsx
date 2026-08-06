import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock3, User, ChevronLeft, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: 'LGS Matematikte Başarının 5 Altın Kuralı | Thematx Blog',
    description: 'Yeni nesil LGS matematik sorularını çözerken uygulamanız gereken en kritik 5 altın kural.',
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Article Header */}
      <article>
        <header className="pt-32 pb-16 bg-surface border-b border-border">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted hover:text-primary transition-colors mb-8">
                <ChevronLeft className="w-4 h-4 mr-1" /> Blog'a Dön
              </Link>
              
              <Badge variant="primary" className="mb-6">LGS</Badge>
              
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
                LGS Matematikte Başarının 5 Altın Kuralı
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">Enes T.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>20 Temmuz 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="w-4 h-4" />
                  <span>5 dk okuma</span>
                </div>
              </div>
            </div>
          </Container>
        </header>

        {/* Cover Image Placeholder */}
        <Container className="my-8">
          <div className="max-w-4xl mx-auto">
            <div className="w-full h-[400px] rounded-3xl bg-gradient-to-r from-violet-500 to-primary flex items-center justify-center shadow-lg">
              <span className="text-white/30 font-heading text-2xl font-bold tracking-widest uppercase">Görsel Alanı</span>
            </div>
          </div>
        </Container>

        {/* Article Body */}
        <Container>
          <div className="max-w-3xl mx-auto py-8">
            <div className="prose prose-lg prose-slate max-w-none text-muted">
              <p className="lead text-xl text-foreground font-medium mb-8">
                LGS matematik, öğrencilerin en çok zorlandığı ancak doğru stratejiyle en yüksek farkı yaratabilecekleri derstir. Yeni nesil sorular ezberi değil, analiz ve sentez yapabilme becerisini ölçer. İşte bu süreçte başarıyı getiren 5 altın kural!
              </p>

              <h2 className="text-2xl font-heading font-bold text-foreground mt-12 mb-6">1. Okuduğunu Anlama ve Görselleştirme</h2>
              <p>
                Yeni nesil matematik soruları aslında yarı yarıya birer paragraf sorusudur. Soruyu hızlıca çözmeye çalışmak yerine, önce metni doğru anlamak gerekir. Metni okurken önemli verilerin altını çizin ve zihninizde ya da kağıt üzerinde şekle dökün.
              </p>

              <blockquote className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl my-8 italic text-foreground font-medium">
                "Problemi doğru anlamak, problemi çözmenin yarısıdır."
              </blockquote>

              <h2 className="text-2xl font-heading font-bold text-foreground mt-12 mb-6">2. Temel İşlem Becerilerini Hızlandırma</h2>
              <p>
                Yeni nesil sorunun mantığını kursanız bile işlemlerde yavaşsanız süre yetiştiremeyebilirsiniz. Pratik işlem yapabilmek, üslü ve köklü sayılarda hakimiyet çok önemlidir.
              </p>
              <ul className="space-y-3 my-6 list-disc list-inside">
                <li>Günlük 20 adet klasik işlem sorusu çözerek elinizi hızlandırın.</li>
                <li>Çarpım tablosu ve temel kare/küp ezberlerinizi taze tutun.</li>
                <li>İşlem hatası yaptığınız soruları "dikkatsizlik" diyerek geçmeyin, nedenini araştırın.</li>
              </ul>

              <h2 className="text-2xl font-heading font-bold text-foreground mt-12 mb-6">3. Turlama Tekniğini Kullanma</h2>
              <p>
                LGS'de takıldığınız bir soruda 3-4 dakikadan fazla harcamak, yapabileceğiniz 2-3 soruyu kaçırmanıza neden olur. Soruyu işaretleyin ve geçin, sınavın sonunda zihniniz daha açık bir şekilde tekrar o soruya dönebilirsiniz.
              </p>

              <h2 className="text-2xl font-heading font-bold text-foreground mt-12 mb-6">4. Yanlış Sorular Defteri Tutma</h2>
              <p>
                Gelişim, doğru yaptığınız sorulardan değil, yanlış yaptığınız sorulardan gelir. Denemelerde yapamadığınız veya boş bıraktığınız her soruyu kesip bir deftere yapıştırın. Belirli aralıklarla bu defteri tekrar çözün.
              </p>

              <h2 className="text-2xl font-heading font-bold text-foreground mt-12 mb-6">5. Düzenli ve Gerçekçi Deneme Çözümü</h2>
              <p>
                Sınav kondisyonu kazanmak çok önemlidir. Son 2 ay kala haftada en az 2 gün, son 1 ay kala ise her gün gerçek sınav saatinde branş veya genel deneme çözün.
              </p>
            </div>

            {/* Author Bio */}
            <Card className="mt-16 p-8 bg-surface border-border flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-violet-500 shrink-0 flex items-center justify-center text-white text-3xl font-bold">
                ET
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">Enes T.</h3>
                <p className="text-muted mb-4">
                  Kıdemli Matematik Eğitmeni. Yıllardır yüzlerce öğrencinin LGS ve YKS maratonunda başarıya ulaşmasına rehberlik etmektedir.
                </p>
              </div>
            </Card>

          </div>
        </Container>
      </article>

      {/* Related Posts */}
      <section className="py-16 mt-16 bg-surface border-t border-border">
        <Container>
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-2">İlginizi Çekebilir</h2>
              <p className="text-muted">Bu yazıyla ilgili diğer blog yazılarımıza göz atın.</p>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center text-primary font-medium hover:text-primary-dark transition-colors">
              Tüm Yazılar <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Link href="#" key={i}>
                <Card hover className="h-full border-border group overflow-hidden">
                  <div className="h-40 bg-background border-b border-border flex items-center justify-center p-6">
                    <span className="text-muted font-medium">Görsel</span>
                  </div>
                  <div className="p-6">
                    <Badge variant="default" className="mb-3 bg-surface border-border">Rehberlik</Badge>
                    <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      Sınav Öncesi Son Taktikler
                    </h3>
                    <div className="flex items-center text-xs text-muted">
                      <span>12 Haz 2025</span>
                      <span className="mx-2">•</span>
                      <span>4 dk okuma</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
