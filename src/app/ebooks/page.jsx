import React, { Suspense } from 'react';
import { getPublishedBooks } from '@/lib/api/books';
import BrowseEbooksClient from '@/components/BrowseEbooksClient';

// কাস্টম প্রিমিয়াম থিম স্কেলিটন বা লোডিং এফেক্ট
function EbooksSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-pulse">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-[450px] bg-[#fbf4f2]/40 border border-[#ecd5cf]/40 rounded-[24px] p-5 space-y-4">
                    <div className="h-64 bg-gray-200/60 rounded-xl w-full" />
                    <div className="h-4 bg-gray-200/60 rounded w-1/3" />
                    <div className="h-6 bg-gray-200/60 rounded w-3/4" />
                    <div className="h-10 bg-gray-200/60 rounded-xl w-full mt-4" />
                </div>
            ))}
        </div>
    );
}

const AddEbookHomePage = async () => {
    // সার্ভার সাইড থেকে ডাটা নিয়ে আসা
    const books = await getPublishedBooks() || [];

    return (
        <div className="w-full min-h-screen bg-white text-[#2c3e50]">
            <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-16 space-y-12">
                
                {/* ================= ELEGANT PREMIUM HEADER SECTION ================= */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b36b6b]/5 border border-[#b36b6b]/20 text-[#b36b6b] text-xs font-semibold uppercase tracking-widest">
                        Digital Library ({books.length})
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight text-[#2c3e50] leading-tight">
                        Explore Our <span className="text-[#b36b6b] italic">Premium</span> Ebooks
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto font-medium">
                        Discover intellectual treasures written by expert authors. Instant secure checkout and life-time cloud access.
                    </p>
                </div>

                {/* ================= LIVE CLIENT ROUTING & INTERACTION ================= */}
                <Suspense fallback={<EbooksSkeleton />}>
                    <BrowseEbooksClient initialBooks={books} />
                </Suspense>

            </div>
        </div>
    );
};

export default AddEbookHomePage;



// import BookCard from '@/components/BookCard';
// import { getPublishedBooks } from '@/lib/api/books';
// import React from 'react';

// const AddEbookHomePage = async () => {
//     const books = await getPublishedBooks() || [];
//     console.log(books);

    
//     return (
//         <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
//             {/* হেডার কাউন্টার */}
//             <h2 className="text-2xl font-serif font-bold text-[#2c3e50]">
//                 Here is All Books ({books.length})
//             </h2>
            
//             {/* বইয়ের কার্ডগুলো দেখানোর জন্য রেসপনসিভ গ্রিড লেআউট */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
//                 {books.map((singleBook) => (
//                     <BookCard 
//                         key={singleBook._id || singleBook.id} 
//                         ebook={singleBook} 
//                     />
//                 ))}
//             </div>

//             {/* যদি কোনো বই না থাকে তার জন্য সেফটি চেক */}
//             {books.length === 0 && (
//                 <p className="text-gray-400 italic">No books available at the moment.</p>
//             )}
//         </div>
//     );
// };

// export default AddEbookHomePage;