import React from 'react';
import { getUserSession } from "@/lib/core/session";
import AdminEbooksTableList from '@/components/dashboard/AdminEbooksTableList';
import { ShieldCheck } from "lucide-react";
import { serverApi } from '@/lib/core/test';

const AllEbooksPage = async () => {
    // ১. সমস্ত বই নিয়ে আসা হচ্ছে (স্ট্যাটাস নির্বিশেষে)
    const books = await serverApi('/api/all-books') || [];
    
    // ২. কারেন্ট লগইন থাকা অ্যাডমিনের সেশন ডাটা নেওয়া হচ্ছে
    const adminUser = await getUserSession();

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
            {/* নান্দনিক অ্যাডমিন হেডার সেকশন */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#ecd5cf]/40 pb-5 gap-4">
                <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2c3e50] flex items-center gap-2">
                        <ShieldCheck className="text-[#b36b6b] size-8" />
                        Admin: Manage All <span className="text-[#b36b6b]">E-books</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Global control center. Publish, unpublish, or permanently remove any catalog content.
                    </p>
                </div>
                {/* গ্লোবাল স্ট্যাটাস কাউন্টার কার্ড */}
                <div className="bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-5 py-2 text-center shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b36b6b]/80 block">Total Catalog Books</span>
                    <span className="text-xl font-serif font-bold text-[#2c3e50]">{books.length}</span>
                </div>
            </div>

            {/* অ্যাডমিন ইন্টারেক্টিভ টেবিল মডিউল */}
            <AdminEbooksTableList initialBooks={books} adminEmail={adminUser?.email} />
        </div>
    );
};

export default AllEbooksPage;