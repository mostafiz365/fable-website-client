"use client";

import React, { useState, useMemo } from "react";
import { Input, Select, ListBox, Card } from "@heroui/react";
import { Search, SlidersHorizontal, ArrowUpDown, BookX } from "lucide-react";
import BookCard from "./BookCard";

export default function BrowseEbooksClient({ initialBooks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // ১. ডাটাবেজ থেকে ইউনিক জেনারে বা ক্যাটাগরি ডাইনামিকালি বের করা
  const genres = useMemo(() => {
    const allGenres = initialBooks.map((b) => b.genre).filter(Boolean);
    return ["all", ...new Set(allGenres)];
  }, [initialBooks]);

  // ২. সার্চ, ফিল্টার এবং সর্ট লজিক এপ্লাই
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...initialBooks];

    // সার্চ ফিল্টার (বইয়ের টাইটেল দিয়ে)
    if (searchQuery.trim() !== "") {
      result = result.filter((book) =>
        book.title?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // জেনারে ফিল্টার
    if (selectedGenre !== "all") {
      result = result.filter((book) => book.genre === selectedGenre);
    }

    // প্রাইস সর্টিং লজিক
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [initialBooks, searchQuery, selectedGenre, sortBy]);

  return (
    <div className="space-y-10">
      {/* ================= UNIQUE FLOATING SEARCH & FILTER BAR ================= */}
      <div className="bg-[#fbf4f2]/60 border border-[#ecd5cf]/50 p-6 rounded-[28px] backdrop-blur-md shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* সার্চ ইনপুট ফিল্ড */}

        <div className="md:col-span-5 flex flex-col gap-2">
    <label className="text-xs font-semibold text-[#2c3e50]/70 uppercase tracking-wider pl-1">
        Search Ebooks
    </label>
    <Input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // ক্যামেলকেস (startContent) বদলে ছোট হাতের অক্ষরে (startcontent) দেওয়া হলো যেন React এরর না দেয়
        startcontent={<Search size={18} className="text-[#b36b6b]" />}
        className="w-full bg-white/80 rounded-2xl border border-[#ecd5cf]/40 focus-within:border-[#b36b6b] transition-all"
    />
</div>
        {/* <div className="md:col-span-5 flex flex-col gap-2">
                    <label className="text-xs font-semibold text-[#2c3e50]/70 uppercase tracking-wider pl-1">Search Ebooks</label>
                    <Input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        startContent={<Search size={18} className="text-[#b36b6b]" />}
                        className="w-full bg-white/80 rounded-2xl border border-[#ecd5cf]/40 focus-within:border-[#b36b6b] transition-all"
                    />
                </div> */}


        {/* Hero UI v3.1.0 কম্পাউন্ড সিলেক্ট - জেনারে ফিল্টার */}
        <div className="md:col-span-4 flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#2c3e50]/70 uppercase tracking-wider pl-1">
            Filter by Genre
          </label>
          <Select onSelectionChange={(key) => setSelectedGenre(String(key))}>
            <Select.Trigger className="bg-white/80 rounded-2xl border border-[#ecd5cf]/40 h-10 px-3 flex items-center justify-between text-sm text-[#2c3e50]">
              <Select.Value placeholder="All Genres" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-white border border-[#ecd5cf]/40 rounded-2xl shadow-xl mt-1 p-1">
              <ListBox>
                {genres.map((genre) => (
                  <ListBox.Item
                    key={genre}
                    id={genre}
                    className="capitalize px-3 py-2 rounded-xl text-sm text-[#2c3e50] data-[hover=true]:bg-[#b36b6b]/10 data-[hover=true]:text-[#b36b6b] cursor-pointer transition-colors"
                  >
                    {genre === "all" ? "All Genres" : genre}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Hero UI v3.1.0 কম্পাউন্ড সিলেক্ট - প্রাইস সর্ট */}
        <div className="md:col-span-3 flex flex-col gap-2">
          <label className="text-xs font-semibold text-[#2c3e50]/70 uppercase tracking-wider pl-1">
            Sort By Price
          </label>
          <Select onSelectionChange={(key) => setSortBy(String(key))}>
            <Select.Trigger className="bg-white/80 rounded-2xl border border-[#ecd5cf]/40 h-10 px-3 flex items-center justify-between text-sm text-[#2c3e50]">
              <Select.Value placeholder="Default Sorting" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-white border border-[#ecd5cf]/40 rounded-2xl shadow-xl mt-1 p-1">
              <ListBox>
                <ListBox.Item
                  id="default"
                  className="px-3 py-2 rounded-xl text-sm data-[hover=true]:bg-[#b36b6b]/10 data-[hover=true]:text-[#b36b6b] cursor-pointer"
                >
                  Default Sorting
                </ListBox.Item>
                <ListBox.Item
                  id="price-low"
                  className="px-3 py-2 rounded-xl text-sm data-[hover=true]:bg-[#b36b6b]/10 data-[hover=true]:text-[#b36b6b] cursor-pointer"
                >
                  Price: Low to High
                </ListBox.Item>
                <ListBox.Item
                  id="price-high"
                  className="px-3 py-2 rounded-xl text-sm data-[hover=true]:bg-[#b36b6b]/10 data-[hover=true]:text-[#b36b6b] cursor-pointer"
                >
                  Price: High to Low
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      {/* ================= RESULTS COUNTER & FEEDBACK ================= */}
      <div className="flex items-center justify-between border-b border-[#ecd5cf]/30 pb-4">
        <p className="text-sm font-medium text-[#2c3e50]/80">
          Showing{" "}
          <span className="font-bold text-[#b36b6b]">
            {filteredAndSortedBooks.length}
          </span>{" "}
          premium ebooks
        </p>
      </div>

      {/* ================= EBOOKS GRID LAYOUT ================= */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="text-center py-20 bg-[#fbf4f2]/10 border-2 border-dashed border-[#ecd5cf]/40 rounded-[32px] flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-[#b36b6b]/5 text-[#b36b6b] rounded-2xl flex items-center justify-center mb-4 border border-[#ecd5cf]/50">
            <BookX size={28} />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2c3e50]">
            No match found
          </h3>
          <p className="text-gray-400 text-sm max-w-sm mt-1">
            We could not find any ebook matching your search or filters. Try
            checking your spelling or adjusting options.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {filteredAndSortedBooks.map((singleBook) => (
            <BookCard
              key={singleBook._id || singleBook.id}
              ebook={singleBook}
            />
          ))}
        </div>
      )}
    </div>
  );
}
