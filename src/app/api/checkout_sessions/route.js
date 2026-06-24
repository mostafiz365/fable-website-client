import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '../../../lib/stripe'
import { BOOK_PRICE_ID } from '@/lib/stripe'
import { getUserSession } from '@/lib/core/session'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')
    
    const user = await getUserSession();
    // ১. ক্লায়েন্ট সাইড (EbookDetailsClient এর ফর্ম) থেকে পাঠানো সব ডেটা রিসিভ করা
    const formData = await request.formData()
    
    const price = formData.get('price');
    const title = formData.get('book_title') || "Untitled Ebook";
    const bookId = formData.get('book_id');
    const bookWriterId = formData.get('writer_id'); // লেখকের আইডি (বইয়ের userId)
    const coverImage = formData.get('cover_image') || "";

    // আপনার স্ট্রাইপ প্রাইস আইডি ম্যাপিং (বইয়ের আইডি দিয়ে প্রাইস আইডি খোঁজা)
    // const priceId = BOOK_PRICE_ID[title]; 

    if (!price) {
      return NextResponse.json({ error: "Price ID not found for this book" }, { status: 400 });
    }


    // ২. স্ট্রাইপ চেকআউট সেশন তৈরি
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Number(price) * 100,
            product_data: {
              name: title,
            }
          },
          quantity: 1,
        },
      ],
       metadata: {
        price: price,
        book_id: bookId,          
        writer_id: bookWriterId,
        userId: user?.id,  
        book_title: title,        
        cover_image: coverImage   
      },
      mode: 'payment',
      success_url: `${origin}/ebooks/success?session_id={CHECKOUT_SESSION_ID}`,

      // 🔥 এবার ভ্যারিয়েবলগুলো উপরে ডিফাইন করায় স্ট্রাইপ সফলভাবে ডেটা পকেটে নিয়ে নেবে!
     
    });

    // কোনো এরর ছাড়া স্ট্রাইপ পেমেন্ট পেজে রিডাইরেক্ট হবে
    return NextResponse.redirect(session.url, 303)

  } catch (err) {
    console.error("Stripe Session Error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}


// import { NextResponse } from 'next/server'
// import { headers } from 'next/headers'

// import { stripe } from '../../../lib/stripe'
// import { BOOK_PRICE_ID } from '@/lib/stripe'
// import { getUserSession } from '@/lib/core/session'

// export async function POST(request) {
//   try {
//     const headersList = await headers()
//     const origin = headersList.get('origin')

//     const formData = await request.formData()
//     const bookId = formData.get('book_title')
//     const priceId = BOOK_PRICE_ID[bookId];

//     const user = await getUserSession();

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//         customer_email: user?.email,
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${origin}/ebooks/success?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect(session.url, 303)
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }