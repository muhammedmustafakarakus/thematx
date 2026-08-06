import React from "react";
import Container from "@/components/ui/Container";

export const metadata = {
  title: "Gizlilik Politikası | Thematx",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20 bg-background min-h-screen">
      <Container className="max-w-4xl">
        <div className="bg-surface rounded-3xl p-8 md:p-12 shadow-sm border border-border prose prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground mb-8">Gizlilik Politikası ve KVKK Aydınlatma Metni</h1>
          
          <p className="text-muted text-sm mb-8">Son Güncelleme: 22 Temmuz 2026</p>

          <h2 className="text-xl font-bold mt-8 mb-4">1. Veri Sorumlusu</h2>
          <p>
            Thematx Eğitim Teknolojileri ("Thematx", "Biz", "Şirket"), veri sorumlusu sıfatıyla, kullanıcılarımızın ("Kullanıcı", "Siz", "Öğrenci", "Veli") kişisel verilerinin korunmasına büyük önem vermektedir. İşbu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verilerinizin toplanması, işlenmesi, aktarılması ve korunmasına ilişkin ilkelerimizi açıklamaktadır.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">2. Toplanan Kişisel Veriler</h2>
          <p>
            Platformumuzu (websitemiz ve mobil uygulamamız) kullanırken aşağıdaki verilerinizi toplayabiliriz:
          </p>
          <ul>
            <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (fatura işlemleri için).</li>
            <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres.</li>
            <li><strong>Eğitim Bilgileri:</strong> Öğrencinin sınıf düzeyi, okul bilgisi, deneme sınavı sonuçları, eğitim hedefleri.</li>
            <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, site içi gezinme bilgileri, cihaz bilgileri.</li>
            <li><strong>Görsel/İşitsel Veriler:</strong> Canlı derslerdeki ses ve görüntü kayıtları (Kalite ve eğitim standartları gereği).</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
          <ul>
            <li>Eğitim hizmetlerinin sunulması ve kişiselleştirilmiş çalışma planlarının oluşturulması.</li>
            <li>Paket ödemelerinin (Banka/EFT/Havale) doğrulanması ve faturalandırma işlemlerinin gerçekleştirilmesi.</li>
            <li>Canlı ders katılım linklerinin (Google Meet vb.) ulaştırılması.</li>
            <li>Veli bilgilendirme raporlarının hazırlanması.</li>
            <li>Sistem güvenliğinin sağlanması ve yasal yükümlülüklerin yerine getirilmesi.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">4. Verilerin Aktarımı</h2>
          <p>
            Thematx, kişisel verilerinizi KVKK'nın 8. ve 9. maddelerine uygun olarak;
          </p>
          <ul>
            <li>Ödeme doğrulama ve muhasebe süreçleri kapsamında ilgili bankalar ile,</li>
            <li>Canlı ders altyapısı için Google LLC (Google Meet) ile,</li>
            <li>Gerekli durumlarda yetkili kamu kurum ve kuruluşları ile paylaşabilir.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4">5. İletişim ve Haklarınız</h2>
          <p>
            KVKK'nın 11. maddesi uyarınca veri sahibi olarak; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini veya silinmesini talep etme hakkına sahipsiniz. Taleplerinizi <strong>oficcialthematx@gmail.com</strong> adresi üzerinden bize iletebilirsiniz.
          </p>
        </div>
      </Container>
    </div>
  );
}
