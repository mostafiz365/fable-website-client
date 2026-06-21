import { Link } from "@heroui/react";
import { MapPin, Mail, Phone, Twitter, Instagram, Globe, ArrowRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function FableFooter() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#2c3e50] to-[#1a2632] text-white pt-16 pb-8 border-t border-[#ecd5cf]/10">
      
      {/* ================= TOP SECTION: NAVIGATION LINKS & CONTACT ================= */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pb-12 border-b border-slate-700/40">
        
        {/* ১. Explore Us Column */}
        <div className="space-y-5">
          <h4 className="text-base font-serif font-black uppercase tracking-wider text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2.5px] after:bg-[#b36b6b]">
            Explore Us
          </h4>
          <ul className="flex flex-col gap-3.5">
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">About Us</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">Features</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">Browse Ebooks</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* ২. Support & Privacy Column */}
        <div className="space-y-5">
          <h4 className="text-base font-serif font-black uppercase tracking-wider text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2.5px] after:bg-[#b36b6b]">
            Support & Legal
          </h4>
          <ul className="flex flex-col gap-3.5">
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">Contact Us</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">Privacy Policy</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="text-slate-400 text-sm hover:text-[#b36b6b] transition-all duration-300 flex items-center gap-2 group">
                <ArrowRight size={14} className="text-[#b36b6b] opacity-70 group-hover:translate-x-1 transition-transform" /> 
                <span className="group-hover:translate-x-0.5 transition-transform">Terms & Conditions</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* ৩. Contact Info Column */}
        <div className="space-y-5">
          <h4 className="text-base font-serif font-black uppercase tracking-wider text-white relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-[2.5px] after:bg-[#b36b6b]">
            Contact Info
          </h4>
          <ul className="flex flex-col gap-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3 group">
              <div className="p-2 bg-slate-800 rounded-lg text-[#b36b6b] group-hover:bg-[#b36b6b] group-hover:text-white transition-all duration-300 mt-0.5 shrink-0 shadow-inner">
                <MapPin size={15} />
              </div>
              <span className="leading-relaxed group-hover:text-slate-300 transition-colors">Willow Creek, # 32/65 Colorado, USA</span>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-800 rounded-lg text-[#b36b6b] group-hover:bg-[#b36b6b] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Mail size={15} />
              </div>
              <a href="mailto:Example@Ebokz.Com" className="hover:text-[#b36b6b] transition-colors font-medium break-all">
                Example@Ebokz.Com
              </a>
            </li>
            <li className="flex items-center gap-3 group">
              <div className="p-2 bg-slate-800 rounded-lg text-[#b36b6b] group-hover:bg-[#b36b6b] group-hover:text-white transition-all duration-300 shrink-0 shadow-inner">
                <Phone size={15} />
              </div>
              <span className="font-medium group-hover:text-slate-300 transition-colors">+(006) 1365 000 29</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ================= BOTTOM SECTION: SOCIALS & COPYRIGHT ================= */}
      <div className="max-w-7xl mx-auto px-6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Social Media Icons (Modern Minimal Style) */}
        <div className="flex items-center gap-3">
          <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#b36b6b] text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-700/50 hover:border-transparent hover:shadow-md hover:-translate-y-0.5">
            <FaFacebook size={16} strokeWidth={2.2} />
          </a>
          <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#b36b6b] text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-700/50 hover:border-transparent hover:shadow-md hover:-translate-y-0.5">
            <FaTwitter size={16} strokeWidth={2.2} />
          </a>
          <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#b36b6b] text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-700/50 hover:border-transparent hover:shadow-md hover:-translate-y-0.5">
            <FaInstagram size={16} strokeWidth={2.2} />
          </a>
          <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-[#b36b6b] text-slate-300 hover:text-white transition-all duration-300 flex items-center justify-center border border-slate-700/50 hover:border-transparent hover:shadow-md hover:-translate-y-0.5">
            <Globe size={16} strokeWidth={2.2} />
          </a>
        </div>

        {/* Copyright Information */}
        <div className="text-center sm:text-right text-xs text-slate-500 tracking-wide font-medium">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-[#b36b6b] font-bold font-serif uppercase tracking-wider">Fable</span>. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}