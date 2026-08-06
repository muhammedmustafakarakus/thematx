import React from "react";
import { Metadata } from "next";
import { ShieldCheck, CreditCard, Loader2 } from "lucide-react";
import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CheckoutForm from "./CheckoutForm";

// Mock data fetcher
async function getProductDetails(type: string, slug: string) {
  // In a real app, fetch from Supabase
  if (type === "paket") {
    return {
      title: "YKS Matematik Plus Paket",
      price: 5000,
      interval: "Aylık",
      features: ["Haftada 2 Canlı Ders", "Ödev Takibi", "Veli Bilgilendirme"],
    };
  }
  return {
    title: "LGS Yaz Kampı 2025",
    price: 15000,
    interval: "Tek Çekim",
    features: ["30 Gün Yoğun Program", "Sınav Simülasyonları", "Birebir Koçluk"],
  };
}

export async function generateMetadata({ params }: { params: { type: string, slug: string } }): Promise<Metadata> {
  return {
    title: `Güvenli Ödeme | Thematx`,
  };
}

export default async function CheckoutPage({ params }: { params: { type: string, slug: string } }) {
  const product = await getProductDetails(params.type, params.slug);

  return (
    <main className="min-h-screen bg-surface pt-32 pb-20">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Güvenli Ödeme Noktası</h1>
              <p className="text-muted mt-2">İyzico güvencesiyle 256-bit şifrelenmiş ödeme adımı</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-success bg-success/10 px-4 py-2 rounded-full w-fit mx-auto md:mx-0">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-sm font-bold">%100 Güvenli Ödeme</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary (Left side on desktop) */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="p-6 border-border bg-white shadow-sm sticky top-24">
                <h3 className="text-lg font-heading font-bold text-foreground mb-4">Sipariş Özeti</h3>
                
                <div className="pb-4 border-b border-border mb-4">
                  <Badge variant="primary" className="mb-2">
                    {params.type === 'paket' ? 'Abonelik' : 'Kamp Programı'}
                  </Badge>
                  <h4 className="text-xl font-bold text-foreground">{product.title}</h4>
                </div>

                <ul className="space-y-3 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border flex items-end justify-between">
                  <span className="text-muted font-medium">Toplam Tutar</span>
                  <div className="text-right">
                    <span className="text-3xl font-heading font-extrabold text-foreground">₺{product.price.toLocaleString('tr-TR')}</span>
                    {product.interval !== 'Tek Çekim' && (
                      <span className="text-sm text-muted block">/{product.interval}</span>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Payment Form Area (Right side on desktop) */}
            <div className="lg:col-span-2">
              <Card className="p-0 border-border bg-white shadow-sm overflow-hidden h-full min-h-[400px] flex flex-col">
                <div className="p-6 border-b border-border bg-surface-alt flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                     <CreditCard className="w-5 h-5" />
                   </div>
                   <div>
                     <h3 className="text-lg font-heading font-bold text-foreground">Ödeme Bilgileri</h3>
                     <p className="text-xs text-muted">Kart bilgilerinizi girerek işlemi tamamlayın</p>
                   </div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center p-0 md:p-6 text-center w-full">
                  <CheckoutForm productId={params.slug} productType={params.type} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
