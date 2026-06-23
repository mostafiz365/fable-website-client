import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#fbf4f2]/80 to-white/90 backdrop-blur-md dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      
      <div className="relative flex flex-col items-center justify-center space-y-8">
        
        {/* ================= PREMIUM BRANDED LOADER ================= */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          
          {/* ১. আউটার গ্লোবাল স্পিনার (ব্র্যান্ড কালার থিম) */}
          <div className="absolute inset-0 rounded-full border-[3px] border-[#b36b6b]/10 border-t-[#b36b6b] border-r-[#2c3e50] animate-spin duration-1000 ease-in-out" />
          
          {/* ২. মিডল পালসেটিং গ্লো রিং */}
          <div className="absolute w-20 h-20 rounded-full border border-[#b36b6b]/20 animate-ping opacity-40 duration-1500" />
          
          {/* ৩. সেন্ট্রাল কাস্টম বুক-লিফ অ্যানিমেশন (ইউনিক বুকস্টোর থিম) */}
          <div className="relative text-[#b36b6b] flex flex-col items-center justify-center">
            <svg 
              className="w-8 h-8 animate-bounce" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
        </div>

        {/* ================= TEXT WITH LUXURY TYPOGRAPHY ================= */}
        <div className="text-center space-y-1">
          <h3 className="text-lg md:text-xl font-serif font-black tracking-widest text-[#2c3e50] dark:text-white uppercase">
            Curating Experience
          </h3>
          <div className="flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b36b6b] animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b36b6b] animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#b36b6b] animate-bounce"></span>
          </div>
        </div>

      </div>

      {/* ব্যাকগ্রাউন্ড ডেকোরেটিভ ওয়াটারমার্ক এলিমেন্ট */}
      <div className="absolute bottom-8 text-center pointer-events-none opacity-20">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 font-sans">
          Premium Digital Library
        </p>
      </div>

    </div>
  );
}