import React from "react";
import { Library } from "lucide-react"; // লাইব্রেরি থিমের আইকন
import BookCard from "@/components/BookCard";
import { getUserSession } from "@/lib/core/session";
import { serverApi } from "@/lib/core/test";

const PurchaseEbooksPage = async () => {
  const user = await getUserSession();

  // ডাটা না থাকলে যেন ক্র্যাশ না করে সেজন্য একটি ডিফল্ট খালি অ্যারে রাখা হলো
  const purchaseEbooks = (await serverApi(`/api/purchase/user/${user?.id}`)) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8 animate-fadeIn">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ecd5cf]/30 pb-5 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600/10 rounded-2xl text-emerald-600">
            <Library size={28} className="stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
              My Purchased Library
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
              Your premium collection of ebooks. Lifetime access unlocked.
            </p>
          </div>
        </div>
        
        {/* কাউন্টার ব্যাজ */}
        <div className="bg-emerald-50/60 border border-emerald-200/60 text-emerald-700 font-serif font-bold px-4 py-2 rounded-xl text-sm self-start sm:self-center shadow-sm">
          Total Owned: {purchaseEbooks.length}
        </div>
      </div>

      {/* ================= MAIN CONTENT SECTION ================= */}
      {purchaseEbooks.length > 0 ? (
        // ৩-কলামের সুন্দর রেসপনসিভ গ্রিড (আপনার বুকমার্ক পেজের মতো)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center sm:justify-items-stretch">
          {purchaseEbooks.map((singleBook) => {
            
            {/* 💡 ছোট নোট: আপনার ডাটাবেজের ইমেজ অনুযায়ী অবজেক্টে `bookTitle`, `bookImage` নামে ডাটা সেভ হচ্ছে।
              আপনার গ্লোবাল BookCard যদি `title`, `coverImage` এবং `_id` এক্সপেক্ট করে, 
              তাহলে ডাটা মিসম্যাচ এড়াতে নিচে অবজেক্টটি ম্যাপ করে দেওয়া হলো যেন BookCard কোনোভাবেই ব্রেক না করে।
            */}
            const formattedBook = {
              ...singleBook,
              _id: singleBook.bookId || singleBook._id || singleBook.id,
              title: singleBook.bookTitle || singleBook.title,
              coverImage: singleBook.bookImage || singleBook.coverImage,
              price: singleBook.priceAmount
            };

            return (
              <BookCard 
                key={singleBook._id || singleBook.id} 
                ebook={formattedBook} 
              />
            );
          })}
        </div>
      ) : (
        // লাইব্রেরি খালি থাকলে দেখানোর জন্য একটি দৃষ্টিনন্দন এম্পটি স্টেট
        <div className="w-full min-h-[40vh] flex flex-col items-center justify-center p-8 text-center bg-[#fbf4f2]/20 border border-dashed border-[#ecd5cf]/60 rounded-[32px] max-w-md mx-auto mt-10">
          <Library size={48} className="text-[#b36b6b]/40 mb-3 stroke-[1.5]" />
          <h3 className="text-lg font-serif font-bold text-[#2c3e50]">Your Library is Empty</h3>
          <p className="text-xs text-gray-400 max-w-xs mt-1">
            You have not purchased any premium ebooks yet. Explore our store to unlock full book materials.
          </p>
        </div>
      )}
      
    </div>
  );
};

export default PurchaseEbooksPage;