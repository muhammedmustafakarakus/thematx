import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { Users, Target, BookOpen, Clock, Heart, Award, Zap, Smile } from "lucide-react";

export const metadata = {
  title: 'Hakkımızda | Thematx',
  description: 'Matematiğe tutkuyla bağlı ekibimiz hakkında bilgi edinin.',
};

export default function HakkimizdaPage() {
  const stats = [
    { icon: Users, label: "350+", desc: "Öğrenci" },
    { icon: Smile, label: "%97", desc: "Memnuniyet" },
    { icon: Award, label: "6+ Yıl", desc: "Deneyim" },
    { icon: Clock, label: "5.000+", desc: "Ders Saati" },
  ];

  const values = [
    {
      title: "Bireysel Yaklaşım",
      description: "Her öğrencinin öğrenme hızı ve stili farklıdır. Derslerimizi bu farklılıkları gözeterek kişiselleştiriyoruz.",
      icon: Heart,
    },
    {
      title: "Sürekli Gelişim",
      description: "Eğitim metodlarımızı ve teknolojilerimizi çağın gereksinimlerine göre sürekli olarak güncelliyoruz.",
      icon: Zap,
    },
    {
      title: "Şeffaf İletişim",
      description: "Öğrenci ve velilerimizle sürekli etkileşim halinde kalarak gelişim sürecini açıkça paylaşıyoruz.",
      icon: Users,
    },
    {
      title: "Sonuç Odaklılık",
      description: "Belirlenen hedeflere ulaşmak için disiplinli, planlı ve ölçülebilir adımlarla ilerliyoruz.",
      icon: Target,
    },
  ];

  const team = [
    {
      name: "M. Mustafa Karakuş",
      title: "Matematik",
      bio: "Öğrencilere sadece matematiği öğretmeyi değil, analitik düşünmeyi ve problem çözme yeteneğini kazandırmayı hedefleyen yeni nesil eğitimci.",
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Hero / Mission Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden relative">
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight">
              Matematiğe <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-500">Tutkuyla Bağlı</span> Bir Ekip
            </h1>
            <p className="text-xl text-muted leading-relaxed">
              Her öğrencinin matematiği sevebileceğine ve başarabileceğine inanıyoruz. Amacımız sadece formül ezberletmek değil, analitik düşünme becerisini kazandırmaktır.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-8 text-center flex flex-col items-center justify-center border-border shadow-sm hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-heading font-bold text-foreground mb-1">{stat.label}</div>
                <div className="text-muted text-sm font-medium uppercase tracking-wider">{stat.desc}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-surface">
        <Container>
          <SectionHeading 
            title="Değerlerimiz"
            description="Bizi biz yapan, öğrencilerimize yaklaşımımızı şekillendiren temel prensiplerimiz."
            align="center"
          />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-primary">
                  <value.icon size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground">{value.title}</h3>
                <p className="text-muted leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading 
            title="Eğitmenimiz"
            description="Alanında uzman ve öğrenci odaklı eğitim anlayışıyla tanışın."
            align="center"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto justify-center">
            <div className="lg:col-start-2">
              {team.map((member, idx) => (
              <Card key={idx} className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-muted/20 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-muted/30" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-heading font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-primary mb-4">{member.title}</p>
                  <p className="text-sm text-muted">{member.bio}</p>
                </div>
              </Card>
            ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
