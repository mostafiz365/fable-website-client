'use client';

import React from "react";
import { Link } from "@heroui/react";
import { ShieldAlert, ArrowLeft, LockKeyhole } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-white to-[#fbf4f2]/30 dark:from-background dark:to-background animate-fadeIn">
      
      <div className="max-w-md w-full text-center space-y-8 flex flex-col items-center">
        
        {/* ================= PREMIUM ICON BADGE ================= */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
          <div className="absolute inset-0 bg-[#b36b6b]/10 rounded-full animate-ping opacity-75 duration-1000" />
          <div className="absolute inset-2 bg-[#fbf4f2] dark:bg-slate-900 rounded-3xl border border-[#ecd5cf]/40 shadow-inner flex items-center justify-center text-[#b36b6b]">
            <ShieldAlert size={44} strokeWidth={1.5} />
          </div>
          <div className="absolute -bottom-1 -right-1 p-2 bg-[#2c3e50] text-white rounded-xl shadow-md border border-slate-700">
            <LockKeyhole size={16} />
          </div>
        </div>

        {/* ================= TEXT CONTENT ================= */}
        <div className="space-y-3">
          <span className="text-xs font-black uppercase tracking-widest text-[#b36b6b] bg-[#b36b6b]/10 px-3 py-1 rounded-full">
            Error 401: Unauthorized
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-black text-[#2c3e50] dark:text-white tracking-tight pt-2">
            Access Denied
          </h1>
          <p className="text-sm md:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
            Oops! You don&apos;t have permission to access this page. Please sign in with an authorized account or head back to safety.
          </p>
        </div>

        {/* ================= INTERACTIVE BUTTONS (FIXED) ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full pt-4">
          
          {/* Go Back Button */}
          <Link
            href="/"
            variant="light"
            radius="full"
            className="w-full sm:w-1/2 border border-[#ecd5cf]/60 text-[#2c3e50] dark:text-gray-300 font-semibold hover:bg-[#b36b6b]/5 hover:text-[#b36b6b] transition-all duration-300 h-12 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={16} />
            <span>Go to Home</span>
          </Link>

          {/* Login Button */}
          <Link
            href="/signin"
            radius="full"
            className="w-full sm:w-1/2 bg-gradient-to-r from-[#b36b6b] to-[#a25a5a] text-white font-bold shadow-lg shadow-[#b36b6b]/10 hover:shadow-xl hover:shadow-[#b36b6b]/20 hover:-translate-y-0.5 transition-all duration-300 h-12 flex items-center justify-center"
          >
            Sign In Now
          </Link>

        </div>

        {/* ================= FOOTER DECORATION ================= */}
        <div className="pt-8 border-t border-[#ecd5cf]/20 w-full text-center">
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            If you believe this is a mistake, please contact <span className="text-[#b36b6b] font-semibold cursor-pointer hover:underline">Support</span>.
          </p>
        </div>

      </div>

    </div>
  );
}