"use client"; // এরর বাউন্ডারি অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে

import React, { useEffect } from "react";
import { RefreshCw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // আপনি চাইলে এখানে Sentry, LogRocket বা আপনার কাস্টম লগার এপিআই-তে এরর লগ করতে পারেন
    console.error("Runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden bg-gradient-to-b from-[#fbf4f2]/30 to-white dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      
      {/* ================= BACKGROUND DECORATIVE GLOWS ================= */}
      <div className="absolute -left-20 top-20 w-72 h-72 bg-[#b36b6b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 bottom-20 w-96 h-96 bg-[#2c3e50]/5 dark:bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10 flex flex-col items-center">
        
        {/* ================= PREMIUM ERROR ILLUSTRATION ================= */}
        <div className="relative flex flex-col items-center justify-center text-[#b36b6b]">
          <div className="p-6 bg-white dark:bg-slate-900 border border-[#ecd5cf]/50 rounded-[32px] shadow-lg relative animate-pulse">
            <AlertTriangle size={56} strokeWidth={1.2} className="text-[#b36b6b]" />
          </div>
          {/* নিচে হালকা শ্যাডো ইফেক্ট */}
          <div className="w-16 h-1.5 bg-[#2c3e50]/10 dark:bg-black/40 rounded-full blur-sm mt-3" />
        </div>

        {/* ================= ERROR MESSAGES ================= */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#b36b6b]/10 text-[#b36b6b] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <span>System Alert</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50] dark:text-white tracking-tight">
            Something went wrong.
          </h2>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
            An unexpected error occurred while rendering this digital shelf. Please reload the experience or head back home.
          </p>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-2">
          {/* প্রিমিয়াম রিলোড/রিসেট বাটন */}
          <button
            onClick={() => reset()} // নেক্সট-জেএস এরর বাউন্ডারি রিসেট ফাংশন (পেজ ট্রাই-রিলোড করবে)
            className="w-full sm:w-auto px-8 h-12 rounded-full bg-[#b36b6b] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2c3e50] shadow-md shadow-[#b36b6b]/20 hover:shadow-[#2c3e50]/20 hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            Reload Experience
          </button>

          {/* হোমপেজ লিংক বাটন */}
          <Link
            href="/"
            className="w-full sm:w-auto px-6 h-12 rounded-full border border-[#2c3e50]/20 dark:border-white/20 text-[#2c3e50] dark:text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#2c3e50]/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            <Home size={16} />
            Go Home
          </Link>
        </div>

      </div>

      {/* ফুটার ওয়াটারমার্ক */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none opacity-20">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 font-sans">
          Secured Core Library
        </p>
      </div>
    </div>
  );
}