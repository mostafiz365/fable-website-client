'use client';
import React from "react";
import { Button } from "@heroui/react";
import { ArrowRight } from "@gravity-ui/icons";

// Swiper React components এবং styles ইমপোর্ট
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

// Swiper এর প্রয়োজনীয় CSS ফাইলসমূহ
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function FableHero() {
  // প্রফেশনাল ইবুক প্ল্যাটফর্মের ৩টি রিয়েল লাইভ ইলাস্ট্রেশন এবং বুক আর্ট স্লাইড ডেটা
  const slidesData = [
    {
      id: 1,
      title: "The Most Biggest Bookstore In The World",
      subtitle: "Welcome to Fable Platform",
      desc: "We deliver digital books all over the world. Explore 10,000+ curated premium ebooks, academic papers, and indie novels in one unified shared environment.",
      cta: "Explore More",
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop", // ক্লাসিক বুক সেলফ ও ওপেন বুক আর্ট
    },
    {
      id: 2,
      title: "Share Your Stories With Millions Globally",
      subtitle: "Empowering Modern Authors",
      desc: "Don't just read—publish and share your own creations. Fable makes it seamless to upload your drafts, build a loyal fanbase, and discover trending literature.",
      cta: "Start Sharing",
      image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop", // মডার্ন ডিজিটাল রিডিং ও স্টাডি আর্ট
    },
    {
      id: 3,
      title: "Your Absolute Ultimate Digital Pocket Library",
      subtitle: "Read Anytime, Anywhere",
      desc: "Access your dashboard, synched bookmarks, and favorite authors across any device. Dive into thrillers, sci-fi, classics, and romance smoothly on the go.",
      cta: "Browse Library",
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1000&auto=format&fit=crop", // রিল্যাক্সড বুক রিডিং ও নান্দনিক ব্যাকগ্রাউন্ড
    },
  ];

  return (
    <section className="w-full bg-[#fbf4f2] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={"fade"} // স্মুথ প্রিমিয়াম লুকের জন্য ফেড ইফেক্ট
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        className="w-full min-h-[500px] md:h-[620px]"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="max-w-[1280px] mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between gap-8 py-12 md:py-0">
              
              {/* Left Content Column */}
              <div className="flex-1 text-left flex flex-col justify-center max-w-xl z-10 order-2 md:order-1">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#b36b6b] mb-3 block">
                  {slide.subtitle}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2c3e50] leading-tight mb-4">
                  {/* Title এর ভেতরের 'Bookstore' বা 'Stories' বা 'Library' কে কাস্টম কালার দেওয়া */}
                  {slide.title.includes("Bookstore") ? (
                    <>The Most Biggest <span className="text-[#b36b6b] underline decoration-wavy decoration-1 underline-offset-8">{`Bookstore`}</span> In The World</>
                  ) : slide.title.includes("Stories") ? (
                    <>Share Your <span className="text-[#b36b6b] underline decoration-wavy decoration-1 underline-offset-8">{`Stories`}</span> With Millions Globally</>
                  ) : (
                    <>Your Absolute Ultimate <span className="text-[#b36b6b] underline decoration-wavy decoration-1 underline-offset-8">{`Library`}</span></>
                  )}
                </h1>
                <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed mb-8 max-w-lg">
                  {slide.desc}
                </p>
                <div>
                  <Button
                    size="lg"
                    className="bg-[#b36b6b] hover:bg-[#a05a5a] text-white font-medium px-8 h-14 rounded-xl shadow-lg shadow-[#b36b6b]/20 transition-all flex items-center gap-2"
                    endContent={<ArrowRight size={16} />}
                  >
                    {slide.cta}
                  </Button>
                </div>
              </div>

              {/* Right Image/Art Column */}
              <div className="flex-1 w-full h-[300px] md:h-[480px] flex items-center justify-center relative order-1 md:order-2">
                {/* ব্যাকগ্রাউন্ডের নান্দনিক অর্গানিক শেপস (আপনার আপলোড করা ইমেজের থিম অনুসারে) */}
                <div className="absolute w-[70%] h-[70%] bg-[#ecd5cf]/40 rounded-full blur-3xl -top-10 -right-10 pointer-events-none" />
                <div className="absolute w-[50%] h-[50%] bg-[#b36b6b]/5 rounded-bl-[100px] bottom-0 left-0 pointer-events-none" />

                {/* মেইন প্রিমিয়াম লাইভ ইমেজ ফ্রেম */}
                <div className="w-full h-full max-w-[450px] md:max-w-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-400/40 border-4 border-white transform md:rotate-1 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transform scale-100 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* কাস্টম সোয়াইপার পেজিনেশন স্টাইল ইঞ্জেকশন (গ্লোবাল বা কাস্টম ক্লাসে দেওয়া ভালো) */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #b36b6b !important;
          width: 12px !important;
          border-radius: 6px !important;
        }
        .swiper-pagination-bullet {
          background: #2c3e50;
        }
      `}</style>
    </section>
  );
}