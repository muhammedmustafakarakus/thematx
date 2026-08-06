import React from "react";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Kullanım Koşulları | Thematx",
};

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-20 bg-background min-h-screen">
      <Container className="max-w-4xl">
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-sm border border-border prose prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-8">Kullanım Koşulları ve Mesafeli Satış Sözleşmesi</h1>
          
          <p className="text-muted text-sm mb-8">Son Güncelleme: 22 Temmuz 2026</p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Taraflar</h2>
          <p>
            İşbu sözleşme, Thematx Eğitim Teknolojileri ("Hizmet Veren") ile www.thematx.com platformuna ("Site") üye olan veya eğitim paketi satın alan Kullanıcı/Öğrenci/Veli ("Kullanıcı") arasında akdedilmiştir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Sözleşmenin Konusu</h2>
          <p>
            İşbu sözleşmenin konusu, Kullanıcı'nın Site üzerinden satın aldığı canlı matematik dersleri, video kayıtları, danışmanlık hizmetleri ve kamp programlarının ("Hizmet") sunulmasına ilişkin şartların belirlenmesidir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Hizmet Kullanımı ve Kurallar</h2>
          <ul>
            <li>Kullanıcı, satın aldığı paket içeriğinde belirtilen canlı derslere tam zamanında katılmakla yükümlüdür.</li>
            <li>Birebir ders iptalleri, dersin başlangıç saatinden en geç 24 saat önce platform üzerinden veya danışman öğretmene bildirilmelidir. Aksi takdirde ders işlenmiş sayılır.</li>
            <li>Grup derslerinde, kullanıcının kişisel sebeplerle katılamadığı derslerin telafisi yapılmaz. Kullanıcı ilgili dersin video kaydına sistem üzerinden (Ders Kayıtları) ulaşabilir.</li>
            <li>Site içerisindeki materyaller (pdf, video, sunum) Thematx'in fikri mülkiyetindedir, kopyalanamaz ve üçüncü şahıslarla paylaşılamaz.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Ödeme ve İşleyiş</h2>
          <ul>
            <li>Ödemeler, Thematx'e ait resmi banka hesaplarına EFT veya Havale yoluyla peşin olarak yapılmaktadır. Kredi kartı veya taksit seçeneği bulunmamaktadır.</li>
            <li>Aylık paketler taahhütsüzdür. Eğitime devam edilecek her yeni dönem/ay öncesinde öğrenci/veli tarafından ödemenin yenilenmesi gerekmektedir. (Sistemden otomatik çekim yapılmaz).</li>
            <li>Paket ücretleri Site'de belirtilen tutarlardır ve aksi belirtilmedikçe tüm vergiler dahildir.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">5. İptal ve İade Şartları</h2>
          <p>
            Kullanıcı, satın aldığı eğitim paketinin ilk canlı dersine veya kamp programının ilk gününe katılmadan önce iptal talebinde bulunursa %100 iade hakkına sahiptir. Hizmet ifasına başlandıktan sonra cayma hakkı kural olarak kullanılamaz ancak Thematx müşteri memnuniyeti kapsamında kullanılmayan ders saatlerinin iadesi konusunda inisiyatif alabilir.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">6. Uyuşmazlıkların Çözümü</h2>
          <p>
            İşbu sözleşmenin uygulanmasından doğabilecek uyuşmazlıklarda, T.C. İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
        </div>
      </Container>
    </div>
  );
}
