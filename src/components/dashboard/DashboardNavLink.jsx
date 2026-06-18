"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// সব প্রয়োজনীয় আইকন ক্লায়েন্ট সাইডে ইমপোর্ট করা হলো
import { House, Magnifier, Bookmark, CirclePlus, Books } from "@gravity-ui/icons";
import { Building2, HistoryIcon, LayoutDashboard, Briefcase, CreditCard, User, User2, Edit } from "lucide-react";
import { BiPurchaseTag } from "react-icons/bi";
import { GrTransaction } from "react-icons/gr";

// একটি আইকন ম্যাপ তৈরি করা হলো যাতে নাম ধরে কল করা যায়
const iconMap = {
  House,
  Magnifier,
  CirclePlus,
  Bookmark,
  HistoryIcon,
  BiPurchaseTag,
  User2,
  LayoutDashboard,
  User,
  Building2,
  Briefcase,
  CreditCard,
  Books,
  Edit,
  GrTransaction
};

export default function DashboardNavLink({ item }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  // ব্যাকএন্ডের স্ট্রিং নাম অনুযায়ী আইকন কম্পোনেন্টটি খুঁজে বের করা হচ্ছে
  const IconComponent = iconMap[item.icon];

  return (
    <Link
      className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group relative ${
        isActive 
          ? "bg-[#b36b6b]/10 text-[#b36b6b]" 
          : "text-[#2c3e50] hover:bg-[#b36b6b]/5 hover:text-[#b36b6b]"
      }`}
      href={item.href}
    >
      <div 
        className={`absolute left-0 top-1/4 h-1/2 w-[3px] rounded-r-full bg-[#b36b6b] transition-transform duration-200 ${
          isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
        }`} 
      />
      
      {/* যদি আইকন খুঁজে পাওয়া যায় তবেই রেন্ডার হবে */}
      {IconComponent && (
        <IconComponent 
          className={`size-5 transition-colors ${
            isActive ? "text-[#b36b6b]" : "text-gray-400 group-hover:text-[#b36b6b]"
          }`} 
        />
      )}
      
      <span className="tracking-wide">{item.label}</span>
    </Link>
  );
}