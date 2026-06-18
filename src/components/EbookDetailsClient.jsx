'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, Button, Tooltip } from "@heroui/react";
import { User, DollarSign, Calendar, Tag, ShieldCheck, Bookmark, BookmarkCheck, ShoppingCart, Lock, ArrowUpRight } from "lucide-react";

export default function EbookDetailsClient({ book, currentUser }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
//   const [purchasing, setPurchasing] = useState(false);

  const {
    id,
    _id,
    title = "Untitled Ebook",
    writerName = "Unknown Author",
    writerId = "", // রাইটারের আইডি (ডিজেবল লজিকের জন্য)
    price = 0,
    coverImage = "",
    description = "",
    genre = "General",
    sold = false,
    createdAt,
    purchasedUsers = [] // যারা ইতিমধ্যে কিনেছে তাদের আইডি লিস্ট
  } = book || {};

  const bookId = _id || id;

  // রিকোয়ারমেন্ট লজিকসমূহ:
  const isLoggedIn = !!currentUser;
  const isWriter = currentUser && currentUser.id === writerId;
  const hasPurchased = currentUser && purchasedUsers.includes(currentUser.id);

  // ১. বুকমার্ক টগল হ্যান্ডলার
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // এখানে আপনার বুকমার্ক সেভ করার API কল যোগ করতে পারেন
  };

  // ২. স্ট্রাইপ চেকআউট হ্যান্ডলার
//   const handlePurchase = async () => {
//     if (!isLoggedIn) {
//       // লগইন না থাকলে সাইন-ইন পেজে রিডাইরেক্ট করবে
//       window.location.href = `/signin?callbackUrl=/ebooks/${bookId}`;
//       return;
//     }
    
//     setPurchasing(true);
//     try {
//       // আপনার স্ট্রাইপ রাউটে রিকোয়েস্ট পাঠানো
//       const res = await fetch('/api/checkout/stripe', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookId })
//       });
//       const data = await res.json();
//       if (data.url) {
//         window.location.href = data.url; // স্ট্রাইপ গেটওয়েতে রিডাইরেকশন
//       }
//     } catch (err) {
//       console.error("Stripe integration error:", err);
//     } finally {
//       setPurchasing(false);
//     }
//   };

  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  }) : "Recent Upload";

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      
      {/* ================= LEFT: HIGH-RES COVER IMAGE ================= */}
      <div className="md:col-span-4 sticky top-24">
        <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden border border-[#ecd5cf]/60 shadow-md group bg-[#2c3e50]/5">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              priority
              className="object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">No Cover Image</div>
          )}

          {/* আ্যভেইলেবল নাকি সোল্ড স্ট্যাটাস ব্যাজ */}
          <span className={`absolute top-5 left-5 z-10 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm ${
            sold ? 'bg-[#2c3e50] text-white' : 'bg-emerald-600 text-white'
          }`}>
            {sold ? 'Sold Out' : 'Available'}
          </span>
        </div>
      </div>

      {/* ================= RIGHT: HERO UI COMPOUND CARD DETAILS ================= */}
      <div className="md:col-span-8">
        <Card className="w-full bg-white border border-[#ecd5cf]/40 rounded-[32px] p-2 shadow-sm">
          
          {/* ১. Card.Header: রাইটার মেটা ও বুকমার্ক অ্যাকশন */}
          <Card.Header className="px-6 pt-6 pb-2 flex items-center justify-between">
            <div className="space-y-1">
              {/* রাইটারের নামের ক্লিকএবল লিংক */}
              <Link 
                href={'/dashboard/writer'} 
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b36b6b] hover:text-[#2c3e50] transition-colors group"
              >
                <User size={20} />
                <span className='text-2xl font-semibold'>By {writerName}</span>
                <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1"><Tag size={13} /> {genre}</span>
                <span className="flex items-center gap-1"><Calendar size={13} /> {formattedDate}</span>
              </div>
            </div>

            {/* বুকমার্ক বাটন */}
            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={handleBookmark}
              className={`hover:bg-[#b36b6b]/10 ${isBookmarked ? 'text-[#b36b6b]' : 'text-gray-400'}`}
            >
              {isBookmarked ? <BookmarkCheck size={26} className="fill-current" /> : <Bookmark size={26} />}
            </Button>
          </Card.Header>

          {/* ২. Card.Content: টাইটেল ও কনটেন্ট প্রিভিউ */}
          <Card.Content className="px-6 py-4 space-y-6">
            <div className="space-y-2">
              <Card.Title className="text-3xl md:text-4xl font-serif font-bold text-[#2c3e50] leading-tight">
                {title}
              </Card.Title>
              <Card.Description className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck size={14} /> Verified Premium Digital Edition
              </Card.Description>
            </div>

            {/* বইয়ের ডেসক্রিপশন / প্রিভিউ */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c3e50]/70">Preview Description</h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-[#fbf4f2]/30 p-4 rounded-2xl border border-[#ecd5cf]/20">
                {description || "No description provided for this ebook."}
              </p>
            </div>

            {/* প্রটেক্টেড ফুল কনটেন্ট সেকশন (শুধু পারচেজ করার পর আনলক হবে) */}
            <div className="border border-dashed border-[#ecd5cf] rounded-2xl p-5 bg-[#fbf4f2]/10 relative overflow-hidden">
              {hasPurchased || isWriter ? (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Unlocked Content</span>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    ✨ এখানে আপনার ইবুকের আসল এবং সম্পূর্ণ সিক্রেট পড়ার লিংক অথবা মূল ফাইল ডাউনলোড করার অপশনটি লোড হয়ে গেছে!
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-4 space-y-2">
                  <Lock size={20} className="text-[#b36b6b]" />
                  <p className="text-sm font-medium text-[#2c3e50]">Full Content Locked</p>
                  <p className="text-xs text-gray-400">Please purchase this ebook to unlock and access the full book materials.</p>
                </div>
              )}
            </div>
          </Card.Content>

          {/* ৩. Card.Footer: প্রাইস এবং ডাইনামিক পারচেজ বাটন */}
          <Card.Footer className="px-6 pb-6 pt-4 border-t border-[#ecd5cf]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbf4f2]/40 rounded-b-[24px]">
            {/* প্রাইস এরিয়া */}
            <div className="flex items-center text-[#b36b6b]">
              <DollarSign size={24} className="shrink-0 -mr-1" />
              <span className="text-3xl font-serif font-black tracking-tight">
                {typeof price === 'number' ? price.toFixed(2) : price}
              </span>
              <span className="text-xs text-gray-400 font-sans font-medium ml-1">USD</span>
            </div>

            {/* ডাইনামিক কন্ডিশনাল পারচেজ বাটন */}
            {isWriter ? (
              <Tooltip content="You cannot purchase your own published book" color="danger" closeDelay={100}>
                <div>
                  <Button disabled className="bg-gray-200 text-gray-400 cursor-not-allowed font-medium rounded-xl px-8 h-12">
                    Your Own Book
                  </Button>
                </div>
              </Tooltip>
            ) : hasPurchased ? (
              <Button disabled className="bg-emerald-100 text-emerald-700 font-semibold rounded-xl px-8 h-12 cursor-default">
                Already Purchased
              </Button>
            ) : (
              <Button
                // isLoading={purchasing}
                // onClick={handlePurchase}
                className="bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
              >
                <ShoppingCart size={18} />
                {isLoggedIn ? 'Purchase Now' : 'Login to Purchase'}
              </Button>
            )}
          </Card.Footer>

        </Card>
      </div>

    </div>
  );
}