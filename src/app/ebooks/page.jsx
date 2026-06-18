import BookCard from '@/components/BookCard';
import { getBooks } from '@/lib/api/books';
import React from 'react';

const AddEbookHomePage = async () => {
    const books = await getBooks() || [];
    console.log(books);

    
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-6">
            {/* হেডার কাউন্টার */}
            <h2 className="text-2xl font-serif font-bold text-[#2c3e50]">
                Here is All Books ({books.length})
            </h2>
            
            {/* বইয়ের কার্ডগুলো দেখানোর জন্য রেসপনসিভ গ্রিড লেআউট */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {books.map((singleBook) => (
                    <BookCard 
                        key={singleBook._id || singleBook.id} 
                        ebook={singleBook} 
                    />
                ))}
            </div>

            {/* যদি কোনো বই না থাকে তার জন্য সেফটি চেক */}
            {books.length === 0 && (
                <p className="text-gray-400 italic">No books available at the moment.</p>
            )}
        </div>
    );
};

export default AddEbookHomePage;