'use client';

import React from 'react';
import Image from 'next/image';
import { Card, Button } from "@heroui/react";
import { User, DollarSign, Calendar, ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function BookCard({ ebook }) {
  // অবজেক্ট ডিফেন্সিভ চেকিং এবং ডিফল্ট ভ্যালু সেট
  const {
    _id,
    title = "Untitled Ebook",
    writerName = "Unknown Author",
    price = 0,
    coverImage = "",
    sold = false,
    date = "", // e.g., "06 Oct" অথবা "04 Sep"
  } = ebook || {};

  const finalSrc = coverImage && coverImage.trim() !== "" ? coverImage : null;

  return (
    <Card className="w-full max-w-[380px] bg-[#fbf4f2]/20 border border-[#ecd5cf]/60 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl hover:bg-white hover:border-[#b36b6b] hover:-translate-y-1.5 transition-all duration-500 group cursor-pointer">
      
      {/* ================= CARD IMAGE / THUMBNAIL ================= */}
      <div className="relative h-64 w-full overflow-hidden bg-[#2c3e50]/5">
        {finalSrc ? (
          <Image
            src={finalSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm italic">
            No Cover Available
          </div>
        )}

        {/* ইমেজের ওপর লাইভ "Sold" ব্যাজ */}
        {sold && (
          <span className="absolute top-4 left-4 z-10 bg-[#2c3e50] text-white text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm">
            Sold
          </span>
        )}

        {/* ইমেজের ওপর থিম ম্যাচিং রাউন্ডেড ডেট ব্যাজ (হোভার করলে বর্ডার কালার চেইঞ্জ হবে) */}
        {date && (
          <div className="absolute top-4 right-4 z-10 bg-white border border-[#b36b6b]/20 group-hover:border-[#b36b6b] text-[#b36b6b] rounded-2xl p-2 min-w-[55px] text-center shadow-sm flex flex-col justify-center items-center leading-none transition-colors duration-300">
            <span className="text-lg font-bold block font-serif">{date.split(' ')[0]}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider block mt-0.5">{date.split(' ')[1]}</span>
          </div>
        )}
        
        {/* ইমেজের ওপর একটি ডার্ক ওভারলে ইফেক্ট যা হোভার করলে হালকা হয়ে ছবিকে স্পষ্ট করবে */}
        <div className="absolute inset-0 bg-[#2c3e50]/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* ================= HERO UI COMPAUND ANATOMY ================= */}
      
      {/* ১. Card.Header: রাইটার এবং মেটা ইনফরমেশন */}
      <Card.Header className="px-5 pt-5 pb-1 flex flex-row items-center gap-4 text-gray-500 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <User size={14} className="text-[#b36b6b] shrink-0 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-medium truncate group-hover:text-[#2c3e50] transition-colors duration-300">By {writerName}</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <Calendar size={14} className="text-gray-400" />
          <span>{date || "Recent"}</span>
        </div>
      </Card.Header>

      {/* ২. Card.Content: ইবুক টাইটেল */}
      <Card.Content className="px-5 py-2">
        <Card.Title className="text-xl font-serif font-bold text-[#2c3e50] leading-snug tracking-wide line-clamp-2 min-h-[56px] group-hover:text-[#b36b6b] transition-colors duration-300">
          {title}
        </Card.Title>
        <Card.Description className="text-xs text-gray-400 mt-1 line-clamp-1">
          Premium digital edition available for instant download.
        </Card.Description>
      </Card.Content>

      {/* ৩. Card.Footer: প্রাইস এবং ইন্টারেক্টিভ বাটন সেকশন */}
      <Card.Footer className="px-5 pb-5 pt-4 border-t border-[#ecd5cf]/30 flex items-center justify-between gap-4 bg-[#fbf4f2]/40 group-hover:bg-[#b36b6b]/5 transition-colors duration-500">
        {/* প্রাইস ট্যাগ (হোভার করলে টেক্সট একটু পপ করবে) */}
        <div className="flex items-center text-[#b36b6b] group-hover:scale-105 transition-transform duration-300">
          <DollarSign size={18} className="shrink-0 -mr-0.5" />
          <span className="text-2xl font-serif font-black tracking-tight">
            {typeof price === 'number' ? price.toFixed(2) : price}
          </span>
        </div>

        {/* ইন্টারঅ্যাক্টিভ বাটন: পুরো কার্ড হোভার করলে বাটনটি ডার্ক নেভি ব্লু থিমে রূপান্তর হবে */}
        <Link
          href={`/ebooks/${_id}`}
          className="bg-[#b36b6b] group-hover:bg-[#2c3e50] text-white font-medium text-sm rounded-xl px-5 h-10 shadow-sm shadow-[#b36b6b]/10 group-hover:shadow-md transition-all duration-500 flex items-center gap-2"
        >
          View Details
          <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </Card.Footer>

    </Card>
  );
}