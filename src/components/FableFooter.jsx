import { Link } from "@heroui/react";

export default function FableFooter() {
  return (
    <footer className="w-full bg-[#2c3e50] text-white pt-12 pb-6">
      {/* ================= TOP SECTION: NAVIGATION LINKS & CONTACT ================= */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-600/50">
        
        {/* Explore Us Column */}
        <div>
          <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#b36b6b]">
            Explore Us
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> Features
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> Browse Ebooks
              </Link>
            </li>
          </ul>
        </div>

        {/* Support & Privacy Column */}
        <div>
          <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#b36b6b]">
            Support & Legal
          </h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-300 text-sm hover:text-[#b36b6b] transition-colors flex items-center gap-1">
                <span className="text-[#b36b6b] text-xs">&gt;</span> Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div>
          <h4 className="text-lg font-bold mb-4 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[2px] after:bg-[#b36b6b]">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-slate-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-[#b36b6b] mt-0.5">📍</span>
              <span>Willow Creek, # 32/65 Colorado, USA</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b36b6b]">✉️</span>
              <a href="mailto:Example@Ebokz.Com" className="hover:text-[#b36b6b] transition-colors">
                Example@Ebokz.Com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#b36b6b]">📞</span>
              <span>+(006) 1365 000 29</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ================= BOTTOM SECTION: SOCIALS & COPYRIGHT ================= */}
      <div className="max-w-[1280px] mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Social Media Icons (Dummy Links with Image Style) */}
        <div className="flex items-center gap-3">
          <a href="#" className="w-9 h-9 rounded-full bg-[#b36b6b] hover:bg-[#b36b6b]/80 transition-colors flex items-center justify-center font-bold text-sm text-white">
            f
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#b36b6b] hover:bg-[#b36b6b]/80 transition-colors flex items-center justify-center font-bold text-sm text-white">
            𝕏
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#b36b6b] hover:bg-[#b36b6b]/80 transition-colors flex items-center justify-center font-bold text-sm text-white">
            📸
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-[#b36b6b] hover:bg-[#b36b6b]/80 transition-colors flex items-center justify-center font-bold text-sm text-white">
            🌐
          </a>
        </div>

        {/* Copyright Information */}
        <div className="text-center sm:text-right text-xs text-slate-400">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-[#b36b6b] font-medium">Fable</span>. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}