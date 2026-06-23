import React from 'react';

export default function Loading() {
  // কার্ড এবং টেবিল রো-এর জন্য ডামি অ্যারে তৈরি (লুপ ঘুরানোর জন্য)
  const skeletonCards = Array.from({ length: 4 });
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 animate-pulse w-full">
      
      {/* ================= SECTION 1: EBOOK CARDS SKELETON ================= */}
      <div className="space-y-6">
        {/* সেকশন হেডার স্কেলিটন */}
        <div className="space-y-3">
          <div className="h-4 bg-[#b36b6b]/10 rounded-full w-24" />
          <div className="h-8 bg-[#2c3e50]/10 dark:bg-white/10 rounded-2xl w-64 md:w-80" />
        </div>

        {/* ৪টি গ্রিড কার্ড স্কেলিটন (আপনার ইবুক কার্ডের লেআউট ম্যাচিং) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skeletonCards.map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 border border-[#ecd5cf]/30 rounded-[28px] p-6 space-y-5 shadow-sm relative overflow-hidden"
            >
              {/* ইবুক কভার ইমেজ প্লেসহোল্ডার */}
              <div className="w-full aspect-[3/4] bg-gradient-to-tr from-[#2c3e50]/5 to-[#b36b6b]/5 dark:from-slate-800 dark:to-slate-800 rounded-2xl relative overflow-hidden">
                {/* শিমার ইফেক্ট স্ট্রিপ */}
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* টেক্সট কন্টেন্ট প্লেসহোল্ডার */}
              <div className="space-y-3">
                {/* টাইটেল */}
                <div className="h-5 bg-[#2c3e50]/10 dark:bg-white/10 rounded-xl w-5/6" />
                {/* অথর বা ছোট ডেসক্রিপশন */}
                <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded-lg w-1/2" />
              </div>

              {/* ফুটার/প্রাইস ও বাটন প্লেসহোল্ডার */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-800">
                <div className="h-6 bg-[#b36b6b]/10 rounded-lg w-16" />
                <div className="h-8 bg-[#2c3e50]/5 dark:bg-white/5 rounded-xl w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= SECTION 2: TABLE ROWS SKELETON ================= */}
      <div className="space-y-6">
        {/* সেকশন হেডার */}
        <div className="h-7 bg-[#2c3e50]/10 dark:bg-white/10 rounded-2xl w-48" />

        {/* টেবিল কন্টেইনার */}
        <div className="w-full overflow-hidden border border-[#ecd5cf]/30 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
          {/* টেবিল হেড */}
          <div className="bg-[#fbf4f2]/60 dark:bg-slate-800/50 p-4 grid grid-cols-4 gap-4 border-b border-[#ecd5cf]/30">
            <div className="h-4 bg-[#2c3e50]/10 dark:bg-white/10 rounded-lg w-1/2" />
            <div className="h-4 bg-[#2c3e50]/10 dark:bg-white/10 rounded-lg w-1/3" />
            <div className="h-4 bg-[#2c3e50]/10 dark:bg-white/10 rounded-lg w-1/4" />
            <div className="h-4 bg-[#2c3e50]/10 dark:bg-white/10 rounded-lg w-1/4 justify-self-end" />
          </div>

          {/* ৫টি টেবিল রো স্কেলিটন */}
          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {skeletonRows.map((_, index) => (
              <div key={index} className="p-4 grid grid-cols-4 gap-4 items-center">
                {/* কলাম ১: ইমেজ + টাইটেল মিক্মড */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-14 bg-gray-200 dark:bg-slate-800 rounded-md flex-shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-lg w-3/4" />
                    <div className="h-3 bg-gray-100 dark:bg-slate-800/60 rounded-md w-1/2" />
                  </div>
                </div>
                {/* কলাম ২: জেনার/ক্যাটাগরি */}
                <div className="h-4 bg-gray-100 dark:bg-slate-800 rounded-lg w-1/2" />
                {/* কলাম ৩: স্ট্যাটাস ব্যাজ */}
                <div className="h-6 bg-[#b36b6b]/5 rounded-full w-20" />
                {/* কলাম ৪: অ্যাকশন বাটন */}
                <div className="h-8 bg-[#2c3e50]/5 dark:bg-white/5 rounded-xl w-16 justify-self-end" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}