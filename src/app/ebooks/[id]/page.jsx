import { getBookById } from '@/lib/api/books';
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getUserSession } from '@/lib/core/session';
import EbookDetailsClient from '@/components/EbookDetailsClient';

export default async function EbookDetailsPage({ params }) {
    const { id } = await params;
    
    const book = await getBookById(id);
    
    // কারেন্ট লগইন থাকা ইউজারের সেশন নেওয়া (সার্ভার সাইড)
    const user = await getUserSession();
    const currentUser = user || null;

    // ১. Error State: ইবুক পাওয়া না গেলে "Ebook not found" মেসেজ
    if (!book) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
                <h2 className="text-2xl font-serif font-bold text-[#2c3e50] mb-2">Ebook Not Found</h2>
                <p className="text-gray-500 mb-6">The ebook you are looking for might have been removed or the ID is invalid.</p>
                <Link href="/ebooks" className="text-[#b36b6b] hover:underline flex items-center gap-1 font-medium">
                    <ChevronLeft size={16} /> Back to Browse
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 animate-fadeIn">
            {/* ব্যাক বাটন */}
            <Link href="/ebooks" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#b36b6b] mb-6 transition-colors">
                <ChevronLeft size={16} /> Back to Ebooks
            </Link>

            {/* ক্লায়েন্ট ইন্টারঅ্যাকশন কম্পোনেন্ট */}
            <EbookDetailsClient book={book} currentUser={currentUser} />
        </div>
    );
}