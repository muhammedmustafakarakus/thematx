"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function CheckoutForm({ productId, productType }: { productId: string, productType: string }) {
  const [formHtml, setFormHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, productType }),
        });

        const data = await response.json();

        if (!response.ok || data.status === "failure") {
          throw new Error(data.errorMessage || data.error || "Ödeme formu başlatılamadı.");
        }

        if (data.checkoutFormContent) {
          setFormHtml(data.checkoutFormContent);
        } else {
          throw new Error("Form verisi alınamadı.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForm();
  }, [productId, productType]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full">
        <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-6" />
        <h4 className="text-lg font-bold text-foreground mb-2">İyzico Güvenli Ödeme Formu Yükleniyor...</h4>
        <p className="text-sm text-muted max-w-sm mx-auto">Lütfen bekleyin, güvenli ödeme noktasına bağlanılıyor.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-full">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mb-6 text-2xl">!</div>
        <h4 className="text-lg font-bold text-foreground mb-2">Hata Oluştu</h4>
        <p className="text-sm text-red-600 max-w-sm mx-auto mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="text-primary font-medium hover:underline">Tekrar Dene</button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Iyzico form script execution area */}
      <div id="iyzipay-checkout-form" className="w-full rounded-xl overflow-hidden min-h-[400px]"></div>
      {/* Inject HTML string safely */}
      {formHtml && (
        <div dangerouslySetInnerHTML={{ __html: formHtml + `<script>if(typeof iyziInit !== 'undefined') iyziInit();</script>` }} />
      )}
    </div>
  );
}
