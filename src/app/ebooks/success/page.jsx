import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getUserSession } from '@/lib/core/session'; // আপনার প্রজেক্টের সেশন ম্যানেজার
import { purchaseBook } from '@/lib/actions/purchaseBook';
import { toast } from 'react-toastify';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, customer_details: { email: customerEmail }, metadata } = session;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    const userSession = await getUserSession();
    
    // Stripe মেটাডাটা ও সেশন থেকে আপনার কাঙ্ক্ষিত সব তথ্য রিসিভ করা হচ্ছে
    const bookId = metadata?.book_id || metadata?.bookId;
    const writerId = metadata?.writer_id || metadata?.writerId;
    const bookTitle = metadata?.book_title || metadata?.title || ""; 
    const bookImage = metadata?.cover_image || metadata?.coverImage || ""; 
    
    const userId = userSession?.id || "";
    const name = userSession?.name;
    const priceAmount = (session.amount_total / 100); // সেন্ট থেকে ডলারে কনভার্ট

    const purchaseBookData = {
        bookId,
        writerId,
        bookTitle,
        bookImage,
        userId,
        priceAmount,
        name
    }

    console.log(purchaseBookData);

    // --- পেমেন্ট সফল হলে সরাসরি এই পেজ থেকেই আলাদা ব্যাকএন্ড সার্ভারের API-তে ডাটা পোস্ট করা ---
    if (bookId && userId && writerId) {
        try {
            await purchaseBook(purchaseBookData);

        } catch (err) {
            console.error("Failed to sync purchase with separate backend server:", err);
        }
    }

    return (
      <div className="w-full min-h-[85vh] bg-white flex items-center justify-center px-4 py-12">
        {/* ================= SUCCESS CARD CONTAINER ================= */}
        <div className="w-full max-w-xl bg-[#fbf4f2]/30 border border-[#ecd5cf]/60 rounded-[32px] p-8 md:p-12 text-center shadow-sm relative overflow-hidden animate-fadeIn">
          
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b36b6b]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2c3e50]/5 rounded-full blur-3xl" />

          {/* ১. অ্যানিমেটেড সাকসেস আইকন */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-emerald-100 rounded-full scale-125 opacity-40 animate-ping" />
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200 shadow-inner relative z-10">
              <CheckCircle2 size={40} strokeWidth={2.5} />
            </div>
          </div>

          {/* ২. হেডার টেক্সট */}
          <div className="space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b36b6b]/5 border border-[#b36b6b]/20 text-[#b36b6b] text-xs font-semibold uppercase tracking-widest mx-auto">
              <Sparkles size={12} /> Payment Successful
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-[#2c3e50]">
              Thank You for Your <br />
              <span className="text-[#b36b6b] italic">Purchase!</span>
            </h1>
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium pt-1">
              <ShieldCheck size={14} /> Order Activated & Ebook Unlocked
            </div>
          </div>

          {/* ৩. কনফার্মেশন ও ইমেইল ডিটেইলস বক্স */}
          <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-6 text-sm text-gray-600 space-y-4 shadow-sm mb-10 text-left">
            <p className="leading-relaxed">
              We appreciate your business! Your digital edition has been instantly credited to your account and the restricted content is now fully unlocked.
            </p>
            
            <div className="flex items-start gap-3 bg-[#fbf4f2]/40 border border-[#ecd5cf]/20 p-3.5 rounded-xl">
              <Mail size={18} className="text-[#b36b6b] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#2c3e50]/70 uppercase tracking-wider">Confirmation Sent To</p>
                <p className="font-semibold text-[#2c3e50] break-all">{customerEmail}</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center pt-2">
              Have any questions? Contact us at{' '}
              <a href="mailto:orders@example.com" className="text-[#b36b6b] font-medium hover:underline transition-colors">
                orders@example.com
              </a>
            </p>
          </div>

          {/* ৪. ব্রাউজ ইবুক পেজে ব্যাক যাওয়ার বাটন */}
          <div className="w-full flex justify-center">
            <Link
              href="/ebooks"
              className="group bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
            >
              Back to Browse Ebooks
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </div>
    );
  }
}



// import { stripe } from '@/lib/stripe';
// import { redirect } from 'next/navigation';
// import Link from 'next/link';
// import { CheckCircle2, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

// export default async function Success({ searchParams }) {
//   const { session_id } = await searchParams;

//   if (!session_id)
//     throw new Error('Please provide a valid session_id (`cs_test_...`)');

//   const {
//     status,
//     customer_details: { email: customerEmail }
//   } = await stripe.checkout.sessions.retrieve(session_id, {
//     expand: ['line_items', 'payment_intent']
//   });

//   if (status === 'open') {
//     return redirect('/');
//   }

//   if (status === 'complete') {
//     return (
//       <div className="w-full min-h-[85vh] bg-white flex items-center justify-center px-4 py-12">
//         {/* ================= SUCCESS CARD CONTAINER ================= */}
//         <div className="w-full max-w-xl bg-[#fbf4f2]/30 border border-[#ecd5cf]/60 rounded-[32px] p-8 md:p-12 text-center shadow-sm relative overflow-hidden animate-fadeIn">
          
//           {/* ব্যাকগ্রাউন্ডেড ডেকোরেটিভ গ্লো ইফেক্ট */}
//           <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b36b6b]/5 rounded-full blur-3xl" />
//           <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#2c3e50]/5 rounded-full blur-3xl" />

//           {/* ১. অ্যানিমেটেড সাকসেস আইকন */}
//           <div className="relative inline-flex items-center justify-center mb-6">
//             <div className="absolute inset-0 bg-emerald-100 rounded-full scale-125 opacity-40 animate-ping" />
//             <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200 shadow-inner relative z-10">
//               <CheckCircle2 size={40} strokeWidth={2.5} />
//             </div>
//           </div>

//           {/* ২. হেডার টেক্সট */}
//           <div className="space-y-3 mb-8">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b36b6b]/5 border border-[#b36b6b]/20 text-[#b36b6b] text-xs font-semibold uppercase tracking-widest mx-auto">
//               <Sparkles size={12} /> Payment Successful
//             </div>
//             <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-[#2c3e50]">
//               Thank You for Your <br />
//               <span className="text-[#b36b6b] italic">Purchase!</span>
//             </h1>
//             <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium pt-1">
//               <ShieldCheck size={14} /> Order Activated & Ebook Unlocked
//             </div>
//           </div>

//           {/* ৩. কনফার্মেশন ও ইমেইল ডিটেইলস বক্স */}
//           <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-6 text-sm text-gray-600 space-y-4 shadow-sm mb-10 text-left">
//             <p className="leading-relaxed">
//               We appreciate your business! Your digital edition has been instantly credited to your account and the restricted content is now fully unlocked.
//             </p>
            
//             <div className="flex items-start gap-3 bg-[#fbf4f2]/40 border border-[#ecd5cf]/20 p-3.5 rounded-xl">
//               <Mail size={18} className="text-[#b36b6b] shrink-0 mt-0.5" />
//               <div className="space-y-1">
//                 <p className="text-xs font-bold text-[#2c3e50]/70 uppercase tracking-wider">Confirmation Sent To</p>
//                 <p className="font-semibold text-[#2c3e50] break-all">{customerEmail}</p>
//               </div>
//             </div>

//             <p className="text-xs text-gray-400 text-center pt-2">
//               Have any questions? Contact us at{' '}
//               <a href="mailto:orders@example.com" className="text-[#b36b6b] font-medium hover:underline transition-colors">
//                 orders@example.com
//               </a>
//             </p>
//           </div>

//           {/* ৪. ব্রাউজ ইবুক পেজে ব্যাক যাওয়ার প্রিমিয়াম বাটন */}
//           <div className="w-full flex justify-center">
//             <Link
//               href="/ebooks"
//               className="group bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer"
//             >
//               Back to Browse Ebooks
//               <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
//             </Link>
//           </div>

//         </div>
//       </div>
//     );
//   }
// }