import { getFeaturedBooks } from '@/lib/api/books';
import React from 'react';
import BookCard from './BookCard';
import { Link } from "@heroui/react";
import { ArrowRight, Sparkles } from "lucide-react";

const FeaturedBook = async () => {
  const books = await getFeaturedBooks();

  return (
    <section className="py-16 md:py-16 px-6 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
      
      {/* ================= SECTION HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ecd5cf]/30 pb-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#b36b6b]/10 text-[#b36b6b] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
            <Sparkles size={12} className="animate-pulse" />
            <span>Curated Collection</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-[#b36b6b] dark:text-white tracking-tight">
            Featured Ebooks
          </h2>
          <p className="text-sm text-gray-500 max-w-md leading-relaxed">
            Discover our handpicked premium digital editions written by extraordinary independent authors.
          </p>
        </div>

        {/* ডেকোরেটিভ কাউন্টার */}
        <div className="hidden md:block text-right">
          <span className="text-5xl font-serif font-black text-[#b36b6b] block">
            {String(books.length).padStart(2, '0')}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Special Releases
          </span>
        </div>
      </div>

      {/* ================= BOOKS GRID ================= */}
      {books.length === 0 ? (
        <div className="text-center py-12 text-gray-400 italic bg-[#fbf4f2]/20 rounded-3xl border border-dashed border-[#ecd5cf]/60">
          No featured books available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book._id || book.id} ebook={book} />
          ))}
        </div>
      )}

      {/* ================= VIEW ALL BUTTON ================= */}
      <div className="flex items-center justify-center pt-4">
        <Link
          href="/ebooks"
          radius="full"
          className="bg-gradient-to-r from-[#b36b6b] to-[#a25a5a] text-white font-bold px-8 h-12 shadow-lg shadow-[#b36b6b]/10 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group tracking-wide text-sm"
        >
          <span>View All Books</span>
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
      
    </section>
  );
};

export default FeaturedBook;