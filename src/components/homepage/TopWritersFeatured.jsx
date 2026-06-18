import React from "react";
import { Card, Button } from "@heroui/react";
import { User, MessageSquare, ArrowRight, Share2 } from "lucide-react";

export default function TopWritersFeatured() {
  const featuredWriters = [
    {
      id: 1,
      name: "Adelina Hayes",
      specialty: "Mystery & Fiction",
      badgeText: "Top #1",
      reviews: "1.2k Reviews",
      bio: "Master of plot twists and atmospheric settings. Author of 14 global bestselling digital thrillers.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Julian Vance",
      specialty: "Sci-Fi & Cyberpunk",
      badgeText: "Trending",
      reviews: "940 Reviews",
      bio: "Crafting vivid futuristic worlds and complex AI narratives. Pioneer of modern indie sci-fi sharing.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Evelyn Thorne",
      specialty: "Historical Essayist",
      badgeText: "Elite",
      reviews: "2.1k Reviews",
      bio: "Bringing the forgotten archives of history into deeply engaging, beautifully structured premium ebooks.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <section className="w-full bg-[#fbf4f2] py-20 px-6 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#ecd5cf]/40 rounded-full blur-3xl -top-40 -left-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#b36b6b] mb-2 block">
            The Masterminds
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#2c3e50]">
            Featured <span className="text-[#b36b6b]">Top Writers</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#b36b6b] mx-auto mt-4" />
        </div>

        {/* ================= CARDS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {featuredWriters.map((writer) => (
            <Card 
              key={writer.id}
              className="border-none bg-transparent rounded-2xl overflow-hidden shadow-xl shadow-gray-300/40 group flex flex-col h-full"
            >
              {/* ১. আপার পার্ট: রাইটার পোর্ট্রেট ইমেজ কন্টেইনার */}
              <div className="w-full h-[240px] relative overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={writer.image} 
                  alt={writer.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* ইমেজ ওভারলে ব্যাজ (আপনার আপলোড করা ইমেজের '06 Oct' ব্যাজ থেকে ইন্সপায়ার্ড) */}
                <div className="absolute top-4 right-4 bg-[#b36b6b] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider">
                  {writer.badgeText}
                </div>
              </div>

              {/* ২. লোয়ার পার্ট: ইনফরমেশন ব্লক (ইমেজের মতো সলিড ব্যাকগ্রাউন্ড উইথ কোরাল শেড) */}
              <div className="bg-[#b36b6b] p-6 flex flex-col flex-grow text-white transition-colors duration-300 group-hover:bg-[#a05a5a]">
                
                {/* মেটা ইনফো (Icon + Text লাইন্স) */}
                <div className="flex items-center gap-4 text-xs font-medium text-white/80 mb-3">
                  <span className="flex items-center gap-1">
                    <User size={14} className="text-white" />
                    By Fable Author
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={14} className="text-white" />
                    {writer.reviews}
                  </span>
                </div>

                {/* রাইটার নাম এবং ক্যাটাগরি */}
                <h3 className="text-2xl font-serif font-bold tracking-wide leading-tight mb-1">
                  {writer.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2c3e50] mb-4">
                  {writer.specialty}
                </p>

                {/* শর্ট ড্যাশড ডিভাইডার লাইন (আপনার ইমেজের ড্যাশড লাইন ফলো করা হয়েছে) */}
                <div className="w-full border-t border-dashed border-white/30 my-2" />

                {/* রাইটার শর্ট বায়ো ডেসক্রিপশন */}
                <p className="text-sm text-white/90 font-light leading-relaxed mb-6 flex-grow">
                  {writer.bio}
                </p>

                {/* অ্যাকশন বাটন এবং শেয়ার লেআউট (বাটন স্টাইল ও শেয়ার আইকন প্লেসমেন্ট ইন্সপায়ার্ড) */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <Button 
                    variant="light"
                    className="bg-white hover:bg-gray-50 text-[#b36b6b] font-semibold text-sm px-5 h-10 rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    View Profile <ArrowRight size={14} />
                  </Button>

                  {/* কাস্টম স্কয়ার/রাউন্ডেড আইকন কন্টেইনার */}
                  <div className="w-10 h-10 bg-[#2c3e50] hover:bg-[#2c3e50]/80 rounded-xl flex items-center justify-center text-white cursor-pointer transition-colors shadow-sm">
                    <Share2 size={16} />
                  </div>
                </div>

              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}