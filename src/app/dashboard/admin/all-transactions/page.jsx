import { getAllPurchasedBooks } from '@/lib/api/purchaseBook';
import React from 'react';
import { Landmark } from "lucide-react";
import TransactionTableList from '@/components/dashboard/TransactionTableList';

const AllTransactionPage = async() => {
    // আপনার নিজস্ব এপিআই দিয়ে ডেটা ফেচ করা হচ্ছে
    const purchaseBooks = await getAllPurchasedBooks() || [];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
            {/* নান্দনিক হেডার সেকশন */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#ecd5cf]/40 pb-5 gap-4">
                <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2c3e50] flex items-center gap-2">
                        <Landmark className="text-[#b36b6b] size-8" />
                        Global <span className="text-[#b36b6b]">Transactions</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        A full registry of all successfully purchased e-books across the platform.
                    </p>
                </div>
                {/* টোটাল কাউন্টার */}
                <div className="bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-5 py-2 text-center shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b36b6b]/80 block">Total Statements</span>
                    <span className="text-xl font-serif font-bold text-[#2c3e50]">{purchaseBooks.length}</span>
                </div>
            </div>

            {/* শুধুমাত্র ডেটা ডিসপ্লে করার জন্য টেবিল কম্পোনেন্ট */}
            <TransactionTableList initialTransactions={purchaseBooks} />
        </div>
    );
};

export default AllTransactionPage;