import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Users, Clock, MapPin, CheckCircle2, ChevronRight, User, AlertCircle, PlayCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Kamp Detayı - ${params.slug} | Thematx`,
    description: 'Matematik kampı program detayları ve kayıt bilgileri.',
  };
}

const WA_NUMBER = "905068530441";
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

function extractYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return match ? match[1] : null;
}

export default async function CampDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient();
  const { data: camp } = await supabase.from('camps').select('*').eq('slug', params.slug).single();

  if (!camp) {
    notFound();
  }

  const isFull = camp.capacity_registered >= camp.capacity_total;
  const youtubeId = camp.video_url ? extractYouTubeId(camp.video_url) : null;

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-90"></div>
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold mb-6">
              {camp.title}
            </h1>
            <p className="text-white/80 text-lg lg:text-xl mb-8 leading-relaxed">
              {camp.description}
            </p>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{camp.date_range}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{camp.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{camp.location}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="-mt-8">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Main Content */}
            <div className="w-full lg:w-2/3 space-y-8">
              
              {/* Promo Video */}
              {youtubeId && (
                <Card className="bg-surface shadow-md border-border overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
                      <PlayCircle className="w-6 h-6 text-primary" /> Kamp Tanıtım Videosu
                    </h2>
                  </div>
                  <div className="aspect-video w-full bg-black">
                    <iframe 
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${youtubeId}`} 
                      title="Kamp Tanıtım Videosu" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </Card>
              )}
              
              {/* Kamp Hakkında */}
              <Card className="p-8 bg-surface shadow-sm border-border">
                <h2 className="text-2xl font-bold font-heading text-foreground mb-6">Kamp Hakkında</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p>{camp.description}</p>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-1/3 sticky top-32">
              <Card className="p-6 bg-surface shadow-xl border-border">
                <div className="text-center mb-6">
                  <div className="text-sm text-muted mb-1">Kamp Ücreti</div>
                  <div className="text-4xl font-bold font-heading text-foreground">₺{camp.price}</div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm py-3 border-b border-border">
                    <span className="text-muted flex items-center gap-2"><Calendar className="w-4 h-4"/> Başlangıç</span>
                    <span className="font-medium text-foreground">{camp.date_range.split('-')[0]?.trim()}</span>
                  </div>
                  <div className="flex justify-between text-sm py-3 border-b border-border">
                    <span className="text-muted flex items-center gap-2"><Clock className="w-4 h-4"/> Süre</span>
                    <span className="font-medium text-foreground">{camp.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm py-3 border-b border-border">
                    <span className="text-muted flex items-center gap-2"><Users className="w-4 h-4"/> Kontenjan</span>
                    <span className="font-medium text-foreground">{camp.capacity_registered} / {camp.capacity_total}</span>
                  </div>
                  
                  <div className="w-full bg-surface-alt h-2 rounded-full overflow-hidden border border-border">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-error' : 'bg-success'}`}
                      style={{ width: `${(camp.capacity_registered / camp.capacity_total) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-center text-muted">
                    {isFull ? 'Maalesef bu kamp için kontenjanımız dolmuştur.' : `Son ${camp.capacity_total - camp.capacity_registered} kişilik kontenjan!`}
                  </p>
                </div>

                <Button 
                  variant={isFull ? "outline" : "primary"} 
                  size="lg" 
                  className="w-full shadow-lg shadow-primary/20"
                  disabled={isFull}
                  href={isFull ? "#" : waLink(`Merhaba, ${camp.title} kampı hakkında bilgi almak ve kayıt olmak istiyorum.`)}
                >
                  {isFull ? 'Kontenjan Dolu' : 'Hemen Bilgi Al'}
                </Button>
                
                <p className="text-xs text-center text-muted mt-4">
                  Kayıt işlemleri ve detaylı bilgi için WhatsApp üzerinden iletişime geçebilirsiniz.
                </p>
              </Card>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
}
