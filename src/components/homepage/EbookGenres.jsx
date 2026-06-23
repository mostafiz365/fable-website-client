import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";
import { getPublishedBooks } from "@/lib/api/books"; // আপনার এপিআই ইমপোর্ট করা হলো
import {
  BookOpen,
  Hourglass,
  FileText,
  Rocket,
  ArrowUpRight,
} from "lucide-react";

export default async function EbookGenres() {
  // ১. এপিআই থেকে সব পাবলিশড বইয়ের ডাটা আনা হচ্ছে
  let allBooks = [];
  try {
    allBooks = (await getPublishedBooks()) || [];
  } catch (error) {
    console.error("Failed to load books for genre counting:", error);
  }

  // ২. জেনার লিস্ট (কাউন্ট ফিল্ডটি এখন ডাইনামিকালি নিচের লজিক থেকে আসবে)
  const genresData = [
    {
      name: "Fiction",
      slug: "fiction",
      description: "Immerse yourself in extraordinary stories and worlds.",
      icon: <BookOpen size={28} strokeWidth={1.5} />,
    },
    {
      name: "History",
      slug: "history",
      description: "Travel back in time and uncover the roots of humanity.",
      icon: <Hourglass size={28} strokeWidth={1.5} />,
    },
    {
      name: "Essay",
      slug: "essay",
      description: "Deep thoughts, personal narratives, and expert opinions.",
      icon: <FileText size={28} strokeWidth={1.5} />,
    },
    {
      name: "Sci-Fi",
      slug: "sci-fi",
      description:
        "Explore the endless possibilities of future and technology.",
      icon: <Rocket size={28} strokeWidth={1.5} />,
    },
  ];

  // ৩. অল বুকস অ্যারে থেকে ফিল্টার করে প্রতিটি জেনারের রিয়েল-টাইম কাউন্ট বের করা
  const genres = genresData.map((genre) => {
    const bookCount = allBooks.filter(
      (book) =>
        book.genre && book.genre.toLowerCase() === genre.slug.toLowerCase(),
    ).length;

    return {
      ...genre,
      count: `${bookCount} Book${bookCount !== 1 ? "s" : ""}`, // ১টি হলে Book, বেশি হলে Books দেখাবে
    };
  });

  return (
    <section className="py-16 md:py-16 px-6 max-w-7xl mx-auto w-full space-y-12 md:space-y-16">
      {/* ================= SECTION HEADER ================= */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#b36b6b]/10 text-[#b36b6b] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mx-auto">
          <span>Categories</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-black text-[#b36b6b] dark:text-white tracking-tight">
          Browse by Genres
        </h2>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
          Select your favorite literary category and start exploring thousands
          of premium digital editions instantly.
        </p>
      </div>

      {/* ================= GENRES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
        {genres.map((genre) => (
          <Link
            key={genre.slug}
            href={'/ebooks'}
            className="block no-underline group"
          >
            <Card className="relative bg-white dark:bg-slate-900/40 border border-[#ecd5cf]/40 p-8 rounded-[28px] shadow-sm group-hover:shadow-xl group-hover:border-[#b36b6b]/30 group-hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left w-full h-full overflow-hidden">
              {/* ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#b36b6b]/5 rounded-full blur-2xl group-hover:bg-[#b36b6b]/10 transition-colors duration-500" />

              {/* আইকন কন্টেইনার */}
              <div className="p-4 rounded-2xl bg-[#fbf4f2] dark:bg-slate-800 text-[#b36b6b] group-hover:bg-[#b36b6b] group-hover:text-white transition-colors duration-300 shadow-inner">
                {genre.icon}
              </div>

              {/* টেক্সট কন্টেন্ট */}
              <div className="mt-6 space-y-2 flex-grow w-full">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-xl font-serif font-bold text-[#2c3e50] dark:text-white group-hover:text-[#b36b6b] transition-colors">
                    {genre.name}
                  </h3>
                  {/* প্রিমিয়াম অ্যারো আইকন অ্যানিমেশন */}
                  <ArrowUpRight
                    size={18}
                    className="text-gray-300 group-hover:text-[#b36b6b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium line-clamp-2">
                  {genre.description}
                </p>
              </div>

              {/* ডাইনামিক বুক কাউন্টার ফুটার */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-slate-800 w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#2c3e50] dark:group-hover:text-gray-300 transition-colors">
                <span>Explore Collection</span>
                <span className="text-[#b36b6b]/80 bg-[#b36b6b]/5 px-2.5 py-1 rounded-md text-[10px]">
                  {genre.count}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
