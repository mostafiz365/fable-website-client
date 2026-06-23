"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, Button, Tooltip } from "@heroui/react";
import {
  User,
  DollarSign,
  Calendar,
  Tag,
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  ShoppingCart,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import { saveBookmark } from "@/lib/actions/bookmark";
import { toast } from "react-toastify";

export default function EbookDetailsClient({ book, currentUser }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  

  // আপনার ডাটাবেজ স্ট্রাকচার অনুযায়ী ফিল্ডগুলো নেওয়া হলো
  const {
    _id,
    id,
    title = "Untitled Ebook",
    writerName = "Unknown Author",
    userId: bookWriterId = "", // আপনার দেওয়া ডাটা অনুযায়ী এই userId-ই হলো লেখকের আইডি
    price = 0,
    coverImage = "",
    description = "",
    genre = "General",
    sold = false,
    createdAt,
    purchasedUsers = [], // ইতিমধ্যে যারা পারচেজ করেছে তাদের আইডি অ্যারে
  } = book || {};

  const bookId = _id || id;
  const isLoggedIn = !!currentUser;

  // ১. চেক করা হচ্ছে কারেন্ট লগইন থাকা ইউজার নিজেই এই বইয়ের লেখক কিনা
  const isWriter =
    currentUser &&
    bookWriterId &&
    String(currentUser.id) === String(bookWriterId);

  // ②. চেক করা হচ্ছে কারেন্ট ইউজার অলরেডি বইটি কিনেছে কিনা
  const hasPurchased =
    currentUser && purchasedUsers.map(String).includes(String(currentUser.id));

  // বুকমার্ক ডাটা অবজেক্ট (আপনার এক্সিস্টিং লজিক)
  const bookmarkData = {
    bookId: bookId,
    title,
    writerName,
    price,
    coverImage,
    genre,
    userId: currentUser?.id,
  };

  const handleBookmark = async () => {
    if (!isLoggedIn) {
      toast.info("Please login to bookmark this book!");
      return;
    }

    setIsBookmarked(!isBookmarked);

    try {
      await saveBookmark(bookmarkData);
      toast.success("Bookmarked successfully");
    } catch (error) {
      console.error("Bookmark saving failed:", error);
      setIsBookmarked(false);
    }
  };

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Recent Upload";

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
            <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
              No Cover Image
            </div>
          )}

          <span
            className={`absolute top-5 left-5 z-10 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm ${
              sold ? "bg-[#2c3e50] text-white" : "bg-emerald-600 text-white"
            }`}
          >
            {sold ? "Sold Out" : "Available"}
          </span>
        </div>
      </div>

      {/* ================= RIGHT: HERO UI COMPOUND CARD DETAILS ================= */}
      <div className="md:col-span-8">
        <Card className="w-full bg-white border border-[#ecd5cf]/40 rounded-[32px] p-2 shadow-sm">
          {/* ১. Card.Header */}
          <Card.Header className="px-6 pt-6 pb-2 flex items-center justify-between">
            <div className="space-y-1">
              <Link
                href={"/dashboard/writer"}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b36b6b] hover:text-[#2c3e50] transition-colors group"
              >
                <User size={20} />
                <span className="text-2xl font-semibold">By {writerName}</span>
                <ArrowUpRight
                  size={20}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
                <span className="flex items-center gap-1">
                  <Tag size={13} /> {genre}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> {formattedDate}
                </span>
              </div>
            </div>

            <Button
              isIconOnly
              variant="light"
              radius="full"
              onClick={handleBookmark}
              className={`hover:bg-[#b36b6b]/10 ${isBookmarked ? "text-[#b36b6b]" : "text-gray-400"}`}
            >
              {isBookmarked ? (
                <BookmarkCheck size={26} className="fill-current" />
              ) : (
                <Bookmark size={26} />
              )}
            </Button>
          </Card.Header>

          {/* ২. Card.Content */}
          <Card.Content className="px-6 py-4 space-y-6">
            <div className="space-y-2">
              <Card.Title className="text-3xl md:text-4xl font-serif font-bold text-[#2c3e50] leading-tight">
                {title}
              </Card.Title>
              <Card.Description className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <ShieldCheck size={14} /> Verified Premium Digital Edition
              </Card.Description>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c3e50]/70">
                Preview Description
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-[#fbf4f2]/30 p-4 rounded-2xl border border-[#ecd5cf]/20">
                {description || "No description provided for this ebook."}
              </p>
            </div>

            {/* কন্ডিশনাল সিক্রেট কন্টেন্ট লক/আনলক লজিক */}
            <div className="border border-dashed border-[#ecd5cf] rounded-2xl p-5 bg-[#fbf4f2]/10 relative overflow-hidden">
              {hasPurchased || isWriter ? (
                <div className="space-y-2 animate-fadeIn">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
                    Unlocked Content
                  </span>
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">
                    ✨ এখানে আপনার ইবুকের আসল এবং সম্পূর্ণ সিক্রেট পড়ার লিংক বা
                    ডাউনলোডেবল রিসোর্স ফাইলটি লোড হয়েছে! আপনি এটি আজীবন
                    অ্যাক্সেস করতে পারবেন।
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center py-4 space-y-2">
                  <Lock size={20} className="text-[#b36b6b]" />
                  <p className="text-sm font-medium text-[#2c3e50]">
                    Full Content Locked
                  </p>
                  <p className="text-xs text-gray-400">
                    Please purchase this ebook to unlock and access the full
                    book materials.
                  </p>
                </div>
              )}
            </div>
          </Card.Content>

          {/* ৩. Card.Footer */}
          <Card.Footer className="px-6 pb-6 pt-4 border-t border-[#ecd5cf]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbf4f2]/40 rounded-b-[24px]">
            <div className="flex items-center text-[#b36b6b]">
              <DollarSign size={24} className="shrink-0 -mr-1" />
              <span className="text-3xl font-serif font-black tracking-tight">
                {typeof price === "number" ? price.toFixed(2) : price}
              </span>
              <span className="text-xs text-gray-400 font-sans font-medium ml-1">
                USD
              </span>
            </div>

            {/* বাটন ডিজেবল ও পারচেজ কন্ট্রোল লজিক (লগইন কন্ডিশন আপগ্রেড) */}
            {isWriter ? (
              <Tooltip
                content="You cannot purchase your own published book"
                color="danger"
                closeDelay={100}
              >
                <div>
                  <Button
                    isDisabled
                    className="bg-gray-200 text-gray-400 cursor-not-allowed font-medium rounded-xl px-8 h-12"
                  >
                    Your Own Book
                  </Button>
                </div>
              </Tooltip>
            ) : hasPurchased ? (
              <Button
                isDisabled
                className="bg-emerald-100 text-emerald-700 font-semibold rounded-xl px-8 h-12 cursor-not-allowed"
              >
                Already Purchased
              </Button>
            ) : isLoggedIn ? (
              /* ইউজার লগইন থাকলে Stripe পেমেন্ট ফর্মে সাবমিট হবে */
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="book_title" value={title} />
                <input type="hidden" name="book_id" value={bookId} />
                <input type="hidden" name="writer_id" value={bookWriterId} />
                <input type="hidden" name="price" value={price} />
                <input type="hidden" name="cover_image" value={coverImage} />

                <Button
                  type="submit"
                  role="link"
                  className="bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
                >
                  <ShoppingCart size={18} />
                  Purchase Now
                </Button>
              </form>
            ) : (
              /* ইউজার লগইন না থাকলে সরাসরি Sign In পেজে রিডাইরেক্ট করবে */
              <Link
                href="/signin"
                className="bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
              >
                <ShoppingCart size={18} />
                Login to Purchase
              </Link>
            )}
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}


// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Card, Button, Tooltip } from "@heroui/react";
// import {
//   User,
//   DollarSign,
//   Calendar,
//   Tag,
//   ShieldCheck,
//   Bookmark,
//   BookmarkCheck,
//   ShoppingCart,
//   Lock,
//   ArrowUpRight,
// } from "lucide-react";
// import { saveBookmark } from "@/lib/actions/bookmark";

// export default function EbookDetailsClient({ book, currentUser }) {
//   const [isBookmarked, setIsBookmarked] = useState(false);
  

//   // আপনার ডাটাবেজ স্ট্রাকচার অনুযায়ী ফিল্ডগুলো নেওয়া হলো
//   const {
//     _id,
//     id,
//     title = "Untitled Ebook",
//     writerName = "Unknown Author",
//     userId: bookWriterId = "", // আপনার দেওয়া ডাটা অনুযায়ী এই userId-ই হলো লেখকের আইডি
//     price = 0,
//     coverImage = "",
//     description = "",
//     genre = "General",
//     sold = false,
//     createdAt,
//     purchasedUsers = [], // ইতিমধ্যে যারা পারচেজ করেছে তাদের আইডি অ্যারে
//   } = book || {};

//   const bookId = _id || id;
//   const isLoggedIn = !!currentUser;

//   // ১. চেক করা হচ্ছে কারেন্ট লগইন থাকা ইউজার নিজেই এই বইয়ের লেখক কিনা
//   const isWriter =
//     currentUser &&
//     bookWriterId &&
//     String(currentUser.id) === String(bookWriterId);

//   // ②. চেক করা হচ্ছে কারেন্ট ইউজার অলরেডি বইটি কিনেছে কিনা
//   const hasPurchased =
//     currentUser && purchasedUsers.map(String).includes(String(currentUser.id));

//   // বুকমার্ক ডাটা অবজেক্ট (আপনার এক্সিস্টিং লজিক)
//   const bookmarkData = {
//     bookId: bookId,
//     title,
//     writerName,
//     price,
//     coverImage,
//     genre,
//     userId: currentUser?.id,
//   };

//   const handleBookmark = async () => {
//     if (!isLoggedIn) {
//       alert("Please login to bookmark this book!");
//       return;
//     }

//     setIsBookmarked(!isBookmarked);

//     try {
//       await saveBookmark(bookmarkData);
//       alert("Bookmarked successfully");
//     } catch (error) {
//       console.error("Bookmark saving failed:", error);
//       setIsBookmarked(false);
//     }
//   };

//   const formattedDate = createdAt
//     ? new Date(createdAt).toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "short",
//         year: "numeric",
//       })
//     : "Recent Upload";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
//       {/* ================= LEFT: HIGH-RES COVER IMAGE ================= */}
//       <div className="md:col-span-4 sticky top-24">
//         <div className="relative aspect-[3/4] w-full rounded-[32px] overflow-hidden border border-[#ecd5cf]/60 shadow-md group bg-[#2c3e50]/5">
//           {coverImage ? (
//             <Image
//               src={coverImage}
//               alt={title}
//               fill
//               priority
//               className="object-cover group-hover:scale-102 transition-transform duration-500"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 italic">
//               No Cover Image
//             </div>
//           )}

//           <span
//             className={`absolute top-5 left-5 z-10 text-[11px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-sm ${
//               sold ? "bg-[#2c3e50] text-white" : "bg-emerald-600 text-white"
//             }`}
//           >
//             {sold ? "Sold Out" : "Available"}
//           </span>
//         </div>
//       </div>

//       {/* ================= RIGHT: HERO UI COMPOUND CARD DETAILS ================= */}
//       <div className="md:col-span-8">
//         <Card className="w-full bg-white border border-[#ecd5cf]/40 rounded-[32px] p-2 shadow-sm">
//           {/* ১. Card.Header */}
//           <Card.Header className="px-6 pt-6 pb-2 flex items-center justify-between">
//             <div className="space-y-1">
//               <Link
//                 href={"/dashboard/writer"}
//                 className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#b36b6b] hover:text-[#2c3e50] transition-colors group"
//               >
//                 <User size={20} />
//                 <span className="text-2xl font-semibold">By {writerName}</span>
//                 <ArrowUpRight
//                   size={20}
//                   className="opacity-0 group-hover:opacity-100 transition-opacity"
//                 />
//               </Link>

//               <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-1">
//                 <span className="flex items-center gap-1">
//                   <Tag size={13} /> {genre}
//                 </span>
//                 <span className="flex items-center gap-1">
//                   <Calendar size={13} /> {formattedDate}
//                 </span>
//               </div>
//             </div>

//             <Button
//               isIconOnly
//               variant="light"
//               radius="full"
//               onClick={handleBookmark}
//               className={`hover:bg-[#b36b6b]/10 ${isBookmarked ? "text-[#b36b6b]" : "text-gray-400"}`}
//             >
//               {isBookmarked ? (
//                 <BookmarkCheck size={26} className="fill-current" />
//               ) : (
//                 <Bookmark size={26} />
//               )}
//             </Button>
//           </Card.Header>

//           {/* ২. Card.Content */}
//           <Card.Content className="px-6 py-4 space-y-6">
//             <div className="space-y-2">
//               <Card.Title className="text-3xl md:text-4xl font-serif font-bold text-[#2c3e50] leading-tight">
//                 {title}
//               </Card.Title>
//               <Card.Description className="text-xs text-emerald-600 font-medium flex items-center gap-1">
//                 <ShieldCheck size={14} /> Verified Premium Digital Edition
//               </Card.Description>
//             </div>

//             <div className="space-y-2">
//               <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c3e50]/70">
//                 Preview Description
//               </h4>
//               <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line bg-[#fbf4f2]/30 p-4 rounded-2xl border border-[#ecd5cf]/20">
//                 {description || "No description provided for this ebook."}
//               </p>
//             </div>

//             {/* কন্ডিশনাল সিক্রেট কন্টেন্ট লক/আনলক লজিক */}
//             <div className="border border-dashed border-[#ecd5cf] rounded-2xl p-5 bg-[#fbf4f2]/10 relative overflow-hidden">
//               {hasPurchased || isWriter ? (
//                 <div className="space-y-2 animate-fadeIn">
//                   <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
//                     Unlocked Content
//                   </span>
//                   <p className="text-sm text-gray-700 leading-relaxed font-medium">
//                     ✨ এখানে আপনার ইবুকের আসল এবং সম্পূর্ণ সিক্রেট পড়ার লিংক বা
//                     ডাউনলোডেবল রিসোর্স ফাইলটি লোড হয়েছে! আপনি এটি আজীবন
//                     অ্যাক্সেস করতে পারবেন।
//                   </p>
//                 </div>
//               ) : (
//                 <div className="flex flex-col items-center justify-center text-center py-4 space-y-2">
//                   <Lock size={20} className="text-[#b36b6b]" />
//                   <p className="text-sm font-medium text-[#2c3e50]">
//                     Full Content Locked
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Please purchase this ebook to unlock and access the full
//                     book materials.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </Card.Content>

//           {/* ৩. Card.Footer */}
//           <Card.Footer className="px-6 pb-6 pt-4 border-t border-[#ecd5cf]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbf4f2]/40 rounded-b-[24px]">
//             <div className="flex items-center text-[#b36b6b]">
//               <DollarSign size={24} className="shrink-0 -mr-1" />
//               <span className="text-3xl font-serif font-black tracking-tight">
//                 {typeof price === "number" ? price.toFixed(2) : price}
//               </span>
//               <span className="text-xs text-gray-400 font-sans font-medium ml-1">
//                 USD
//               </span>
//             </div>

//             {/* বাটন ডিজেবল ও পারচেজ কন্ট্রোল লজিক */}
//             {isWriter ? (
//               <Tooltip
//                 content="You cannot purchase your own published book"
//                 color="danger"
//                 closeDelay={100}
//               >
//                 <div>
//                   <Button
//                     isDisabled
//                     className="bg-gray-200 text-gray-400 cursor-not-allowed font-medium rounded-xl px-8 h-12"
//                   >
//                     Your Own Book
//                   </Button>
//                 </div>
//               </Tooltip>
//             ) : hasPurchased ? (
//               <Button
//                 isDisabled
//                 className="bg-emerald-100 text-emerald-700 font-semibold rounded-xl px-8 h-12 cursor-not-allowed"
//               >
//                 Already Purchased
//               </Button>
//             ) : (
//               <form action="/api/checkout_sessions" method="POST">
//                 <input type="hidden" name="book_title" value={title} />

//                 {/* Stripe Checkout-এ ট্র্যাকিংয়ের জন্য পাঠানো হিডেন ফিল্ডস */}
//                 <input type="hidden" name="book_id" value={bookId} />
//                 <input type="hidden" name="writer_id" value={bookWriterId} />
//                 <input type="hidden" name="price" value={price} />
//                 <input type="hidden" name="cover_image" value={coverImage} />

//                 <section>
//                   <Button
//                     type="submit"
//                     role="link"
//                     className="bg-[#b36b6b] hover:bg-[#2c3e50] text-white font-semibold text-md rounded-xl px-8 h-12 shadow-md shadow-[#b36b6b]/10 hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto"
//                   >
//                     <ShoppingCart size={18} />
//                     {isLoggedIn ? "Purchase Now" : "Login to Purchase"}
//                   </Button>
//                 </section>
//               </form>
//             )}
//           </Card.Footer>
//         </Card>
//       </div>
//     </div>
//   );
// }
