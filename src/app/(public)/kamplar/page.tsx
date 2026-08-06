import { Metadata } from 'next';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { createClient } from '@/utils/supabase/server';
import CampListClient from './CampListClient';

export const metadata: Metadata = {
  title: 'Matematik Kampları | Thematx',
  description: 'Sınavlara hazırlık için yoğunlaştırılmış matematik kampları.',
};

export default async function CampsPage() {
  const supabase = await createClient();
  const { data: camps } = await supabase.from('camps').select('*').eq('is_active', true).order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-background pb-20">
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <SectionHeading 
            badge="Kamplar"
            title="Yoğun Matematik Kampları"
            description="Sınavlara hazırlık sürecinde eksiklerinizi kapatmak ve netlerinizi artırmak için özel olarak hazırlanmış yoğun kamp programlarımıza katılın."
            align="center"
          />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <CampListClient camps={camps || []} />
        </Container>
      </section>
    </main>
  );
}
