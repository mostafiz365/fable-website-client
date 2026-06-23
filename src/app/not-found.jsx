import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-b from-[#fbf4f2]/30 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      
      {/* ================= BACKGROUND DECORATIVE GLOWS ================= */}
      <div className="absolute -left-20 top-20 w-72 h-72 bg-[#b36b6b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 w-96 h-96 bg-[#2c3e50]/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl w-full text-center space-y-10 relative z-10 flex flex-col items-center">
        
        {/* ================= PREMIUM 404 ILLUSTRATION ================= */}
        <div className="relative w-full max-w-[280px] h-48 flex items-center justify-center">
          {/* বিগ বোল্ড ও লাক্সারি '404' ওয়াটারমার্ক */}
          <h1 className="absolute inset-0 flex items-center justify-center text-[130px] md:text-[150px] font-serif font-black text-[#2c3e50]/5 dark:text-white/5 tracking-tighter select-none">
            404
          </h1>
          
          {/* ইউনিক ওপেন বুক ও ফ্লোটিং পেজ ইলাস্ট্রেশন */}
          <div className="relative flex flex-col items-center justify-center text-[#b36b6b] drop-shadow-xl animate-bounce duration-2000">
            <div className="p-6 bg-white dark:bg-slate-900 border border-[#ecd5cf]/50 rounded-[32px] shadow-lg relative">
              <BookOpen size={64} strokeWidth={1.2} className="text-[#b36b6b]" />
              
              {/* ফ্লোটিং কোয়েশ্চেন মার্ক / হারিয়ে যাওয়া পাতা ইফেক্ট */}
              <span className="absolute -top-2 -right-2 bg-[#2c3e50] text-white dark:bg-[#b36b6b] text-xs font-black font-serif w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-pulse">
                ?
              </span>
            </div>
            
            {/* বইয়ের নিচের শ্যাডো অ্যানিমেশন */}
            <div className="w-16 h-2 bg-[#2c3e50]/10 dark:bg-black/40 rounded-full blur-sm mt-4 animate-scale" />
          </div>
        </div>

        {/* ================= ERROR MESSAGES ================= */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#b36b6b]/10 text-[#b36b6b] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <span>Lost in the Library</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-black text-[#2c3e50] dark:text-white tracking-tight">
            Page Not Found
          </h2>
          
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            The literary masterpiece or digital edition you are searching for seems to have been misplaced, or the shelf has moved. Let us get you back on track.
          </p>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
          {/* ব্যাক বাটন (স্মার্ট ইউজার এক্সপেরিয়েন্স) */}
          {/* <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 h-12 rounded-full border border-[#2c3e50]/20 dark:border-white/20 text-[#2c3e50] dark:text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2c3e50]/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Go Back
          </button> */}

          {/* প্রিমিয়াম হোম বাটন */}
          <Link 
            href="/"
            className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#b36b6b] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2c3e50] shadow-md shadow-[#b36b6b]/20 hover:shadow-[#2c3e50]/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>

      </div>

      {/* ফুটার ওয়াটারমার্ক */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-20">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
          Premium Reading Platform
        </p>
      </div>
    </div>
  );
}