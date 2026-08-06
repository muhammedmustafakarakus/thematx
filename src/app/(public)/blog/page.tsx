import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock3, ChevronRight, BookOpen } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = {
  title: 'Blog & Matematik İpuçları | Thematx',
  description: 'Matematik öğrenimi, sınavlara hazırlık ve motivasyon üzerine faydalı yazılar.',
};

const POSTS = [
  {
    slug: 'geometride-temel-kavramlar',
    title: 'Geometride Temel Kavramlar ve Soru Çözüm Teknikleri',
    excerpt: 'Geometri çözerken görme yeteneğinizi geliştirecek ipuçları ve temel kuralların doğru kullanımı hakkında bilmeniz gereken her şey.',
    date: '15 Tem 2025',
    readTime: '6 dk okuma',
    category: 'YKS',
  },
  {
    slug: 'yks-matematik-calisma-plani',
    title: 'YKS Matematik Çalışma Planı Nasıl Yapılır?',
    excerpt: 'Hedefinize ulaşmak için adım adım uygulayabileceğiniz, verimli ve sürdürülebilir bir TYT-AYT matematik çalışma programı hazırlama rehberi.',
    date: '10 Tem 2025',
    readTime: '8 dk okuma',
    category: 'YKS',
  },
  {
    slug: 'olasilik-sik-yapilan-hatalar',
    title: 'Olasılık Konusunda Sık Yapılan 10 Hata',
    excerpt: 'Öğrencilerin en çok zorlandığı olasılık ve permütasyon kombinasyon konularında düşülen yaygın hatalar ve çözüm yöntemleri.',
    date: '5 Tem 2025',
    readTime: '5 dk okuma',
    category: 'Genel',
  },
  {
    slug: 'fonksiyonlar-sifirdan-ileri-seviyeye',
    title: 'Fonksiyonlar: Sıfırdan İleri Seviyeye',
    excerpt: 'Matematiğin kalbi olan fonksiyonlar konusunu temelden alıp zirveye taşıyacak çalışma stratejileri ve püf noktalar.',
    date: '28 Haz 2025',
    readTime: '10 dk okuma',
    category: 'YKS',
  },
  {
    slug: 'sinav-kaygisiyla-basa-cikma',
    title: 'Sınav Kaygısıyla Başa Çıkma Yöntemleri',
    excerpt: 'Sınav anında stresinizi yönetmek, odaklanmanızı artırmak ve potansiyelinizi tam olarak yansıtmak için psikolojik taktikler.',
    date: '20 Haz 2025',
    readTime: '4 dk okuma',
    category: 'Motivasyon',
  },
  {
    slug: 'turev-integral-gunluk-hayat',
    title: 'Türev ve İntegral: Günlük Hayattan Örnekler',
    excerpt: 'Soyut gelen calculus konularının aslında doğada ve yaşamımızda nasıl karşılık bulduğunu keşfederek öğrenmeyi kolaylaştırın.',
    date: '15 Haz 2025',
    readTime: '7 dk okuma',
    category: 'YKS',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background pb-24">
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <SectionHeading 
            badge="Blog"
            title="Blog & Matematik İpuçları"
            description="Öğrenme sürecinizi hızlandıracak rehberler, sınav taktikleri ve motivasyon kaynakları."
            align="center"
          />
        </Container>
      </section>

      <section className="py-8">
        <Container>
          {/* Featured Post */}
          <Link href="/blog/lgs-matematikte-basarinin-5-altin-kurali" className="block mb-16">
            <Card hover className="overflow-hidden border-border group">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="w-full h-64 md:h-auto relative overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" alt="LGS Matematikte Başarının 5 Altın Kuralı" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Badge variant="primary" className="w-fit mb-4">LGS</Badge>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                    LGS Matematikte Başarının 5 Altın Kuralı
                  </h2>
                  <p className="text-muted mb-6 line-clamp-3 text-lg">
                    Yeni nesil sorularla başa çıkmanın yolları, zaman yönetimi taktikleri ve sınav anında dikkat edilmesi gereken en kritik noktalar. LGS'ye hazırlanan her öğrencinin mutlaka uygulaması gereken stratejiler.
                  </p>
                  <div className="flex items-center text-sm text-muted mb-8 space-x-6">
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> 20 Tem 2025</span>
                    <span className="flex items-center gap-2"><Clock3 className="w-4 h-4"/> 5 dk okuma</span>
                  </div>
                  <div className="inline-flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform">
                    Devamını Oku <ChevronRight className="w-5 h-5 ml-1" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          {/* Grid of Posts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug}>
                <Card hover className="h-full flex flex-col overflow-hidden border-border group">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&q=80&auto=format&fit=crop&crop=entropy&sig=${post.slug}`} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary" className="shadow-lg backdrop-blur-md bg-white/90 text-primary border-none">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border mt-auto">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> {post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock3 className="w-3.5 h-3.5"/> {post.readTime}</span>
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
