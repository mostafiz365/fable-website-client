import React from "react";
import Image from "next/image";
import { Card, Chip, Button } from "@heroui/react";
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Settings, 
  AlertCircle,
  FileText
} from "lucide-react";
import { getUserSession } from "@/lib/core/session";

const ProfileManagementPage = async () => {
  let user = null;
  let sessionError = false;

  try {
    // সেফ সেশন ফেচিং
    user = await getUserSession();
    console.log("Profile User Data:", user);
    
    if (!user) {
      sessionError = true;
    }
  } catch (error) {
    console.error("Failed to load user profile session:", error);
    sessionError = true;
  }

  // সেশন ফেইলুর বা ইউজার না থাকলে এম্পটি/লগইন স্টেট
  if (sessionError || !user) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <div className="p-4 bg-red-50 text-red-500 rounded-full mb-4">
          <AlertCircle size={40} />
        </div>
        <h3 className="text-xl font-serif font-bold text-[#2c3e50]">Access Denied</h3>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          Please log in to your account to view and manage your profile details.
        </p>
      </div>
    );
  }

  // ডেট ফরম্যাটিং (যেমন: Jun 20, 2026)
  const lastUpdate = user.updatedAt 
    ? new Date(user.updatedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fadeIn">
      
      {/* MAIN PROFILE CARD CONTAINER */}
      <Card className="w-full bg-white border border-[#ecd5cf]/30 rounded-[32px] overflow-hidden shadow-sm">
        
        {/* 1. VISUAL HERO BANNER */}
        <div className="relative h-40 md:h-48 w-full bg-gradient-to-r from-[#b36b6b] via-[#c98383] to-[#2c3e50]/90">
          {/* ব্যাকগ্রাউন্ডের হালকা জ্যামিতিক ডিজাইন বা ওভারলে */}
          <div className="absolute inset-0 bg-[#fbf4f2]/10 backdrop-blur-[2px]" />
          
          {/* রাইট সাইড গিয়ার বাটন সাজানোর জন্য */}
          <div className="absolute top-4 right-4 z-10">
            <Button 
              isIconOnly 
              variant="flat" 
              className="bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-xl hover:bg-white/30"
            >
              <Settings size={18} />
            </Button>
          </div>
        </div>

        {/* 2. USER AVATAR & PRIMARY INFO (OVERLAPPING BANNER) */}
        <div className="px-6 md:px-10 pb-8 relative">
          
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-16 sm:-mt-20 mb-6">
            {/* প্রোফাইল ইমেজ অ্যাভাটার */}
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-[28px] overflow-hidden border-4 border-white bg-white shadow-md shrink-0">
              <Image
                src={user.image || "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}
                alt={user.name || "User Avatar"}
                fill
                className="object-cover"
              />
            </div>

            {/* নাম ও মেইন রোল */}
            <div className="space-y-1.5 mb-2">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
                  {user.name || "Anonymous User"}
                </h2>
                {/* রোল ব্যাজ ডাইনামিক কালার */}
                <Chip
                  className={`text-xs font-bold uppercase tracking-wider px-2 h-6 border ${
                    user.role === "writer"
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : "bg-emerald-50 text-emerald-700 border-emerald-200"
                  }`}
                  size="sm"
                  radius="sm"
                >
                  {user.role || "Reader"}
                </Chip>
              </div>
              <p className="text-xs md:text-sm text-gray-400 font-medium">
                Member Account ID: <span className="font-mono text-gray-500">{user.id}</span>
              </p>
            </div>
          </div>

          <hr className="border-[#ecd5cf]/30 my-6" />

          {/* 3. DETAILED INFORMATION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* ইমেইল এড্রেস কার্ড */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fbf4f2]/30 border border-[#ecd5cf]/20">
              <div className="p-3 bg-white rounded-xl text-[#b36b6b] border border-[#ecd5cf]/30 shadow-sm">
                <Mail size={20} className="stroke-[1.8]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</span>
                <p className="text-sm md:text-base font-medium text-[#2c3e50] break-all">
                  {user.email || "No email provided"}
                </p>
              </div>
            </div>

            {/* ইমেইল ভেরিফিকেশন স্ট্যাটাস কার্ড */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fbf4f2]/30 border border-[#ecd5cf]/20">
              <div className="p-3 bg-white rounded-xl border border-[#ecd5cf]/30 shadow-sm text-gray-500">
                <ShieldCheck size={20} className="stroke-[1.8]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Status</span>
                <div className="flex items-center gap-1.5 pt-0.5">
                  {user.emailVerified ? (
                    <>
                      <CheckCircle2 size={16} className="text-emerald-600" />
                      <span className="text-sm font-bold text-emerald-600">Verified Profile</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-amber-500" />
                      <span className="text-sm font-bold text-amber-500">Pending Verification</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* লাস্ট আপডেট টাইম কার্ড */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#fbf4f2]/30 border border-[#ecd5cf]/20 md:col-span-2">
              <div className="p-3 bg-white rounded-xl text-[#2c3e50]/70 border border-[#ecd5cf]/30 shadow-sm">
                <Clock size={20} className="stroke-[1.8]" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Activity Update</span>
                <p className="text-sm text-gray-600 font-medium">
                  Your profile metadata was last synchronized on <span className="font-serif font-bold text-[#2c3e50]">{lastUpdate}</span>
                </p>
              </div>
            </div>

          </div>

          {/* 4. FOOTER MOTIVATIONAL BANNER */}
          <div className="mt-8 p-5 bg-[#2c3e50] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 bg-white/10 rounded-xl hidden sm:block">
                <FileText size={22} className="text-[#ecd5cf]" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm md:text-base text-[#ecd5cf]">
                  Premium Library Access Active
                </h4>
                <p className="text-xs text-gray-300">
                  Manage your credentials, secure your account settings, and checkout secure invoices.
                </p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-[#b36b6b] hover:bg-[#965656] text-white font-bold text-xs px-4 rounded-xl shadow-md transition-all shrink-0 w-full sm:w-auto"
            >
              Edit Profile
            </Button>
          </div>

        </div>
      </Card>

    </div>
  );
};

export default ProfileManagementPage;