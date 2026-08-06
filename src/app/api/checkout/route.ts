import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import Iyzipay from 'iyzipay';

// Config requires your Sandbox API keys from Iyzico
const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
  secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
  uri: 'https://sandbox-api.iyzipay.com'
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Verify Authentication
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse Request Body
    const body = await request.json();
    const { productId, productType } = body; // kamp or paket

    // 3. Fetch product details from DB and validate price
    // ... logic here ...
    const price = "5000.0"; // mock price
    const productName = "YKS Plus Paket"; // mock name

    // 4. Create Iyzico Checkout Form Request
    const iyzicoRequest = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: '123456789',
      price: price,
      paidPrice: price,
      currency: Iyzipay.CURRENCY.TRY,
      basketId: 'B67832',
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/checkout/callback`,
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: user.id,
        name: 'John',
        surname: 'Doe',
        gsmNumber: '+905350000000',
        email: user.email,
        identityNumber: '74300864791',
        lastLoginDate: '2025-07-22 15:12:09',
        registrationDate: '2025-07-22 15:12:09',
        registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        ip: '85.34.78.112',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34732'
      },
      shippingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34732'
      },
      billingAddress: {
        contactName: 'Jane Doe',
        city: 'Istanbul',
        country: 'Turkey',
        address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
        zipCode: '34732'
      },
      basketItems: [
        {
          id: productId,
          name: productName,
          category1: 'Education',
          category2: productType,
          itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
          price: price
        }
      ]
    };

    // 5. Initialize Checkout Form
    return new Promise<NextResponse>((resolve) => {
      iyzipay.checkoutFormInitialize.create(iyzicoRequest as any, function (err, result) {
        if (err) {
          console.error("Iyzico Error:", err);
          resolve(NextResponse.json({ error: 'Ödeme sistemi başlatılamadı' }, { status: 500 }));
        } else {
          // Returns checkoutFormContent (script tag to render form) and token
          resolve(NextResponse.json(result));
        }
      });
    });

  } catch (error: any) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
