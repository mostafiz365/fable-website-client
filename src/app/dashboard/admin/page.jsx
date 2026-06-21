import React from 'react';
import { getUsers } from '@/lib/api/users';
import { getBooks } from '@/lib/api/books';
import { getAllPurchasedBooks } from '@/lib/api/purchaseBook';
import { LayoutDashboard } from "lucide-react";
import AdminDashboardClient from '@/components/dashboard/AdminDashboardClient';

const DashboardHomePage = async () => {
    // ১. সমস্থ প্রয়োজনীয় এপিআই কল (আপনার দেওয়া লজিক অনুযায়ী)
    const users = (await getUsers()) || [];
    const books = (await getBooks()) || [];
    const purchaseBooks = (await getAllPurchasedBooks()) || [];

    // ২. অ্যানালিটিক্স কার্ডের ডেটা ক্যালকুলেশন
    const totalUsers = users.length;
    const totalWriters = users.filter(user => user.role === 'writer').length;
    const totalEbooksSold = purchaseBooks.length;
    const totalRevenue = purchaseBooks.reduce((sum, item) => sum + (item.priceAmount || 0), 0);

    // ৩. চার্ট ১: Monthly Sales Chart ডেটা প্রসেসিং (createdAt থেকে মাস বের করা)
    const monthlyDataMap = {};
    purchaseBooks.forEach(sale => {
        if (!sale.createdAt) return;
        const date = new Date(sale.createdAt);
        // মাসের নাম বের করা (যেমন: Jan, Feb, Mar)
        const monthName = date.toLocaleString('en-US', { month: 'short' });
        
        if (!monthlyDataMap[monthName]) {
            monthlyDataMap[monthName] = { name: monthName, sales: 0, revenue: 0 };
        }
        monthlyDataMap[monthName].sales += 1;
        monthlyDataMap[monthName].revenue += (sale.priceAmount || 0);
    });
    
    // মাসের ক্রমানুসারে সাজানোর জন্য একটি স্ট্যান্ডার্ড অর্ডার
    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlySalesData = monthOrder
        .filter(m => monthlyDataMap[m])
        .map(m => monthlyDataMap[m]);

    // ৪. চার্ট ২: Ebooks by Genre Pie Chart ডেটা প্রসেসিং
    const genreDataMap = {};
    books.forEach(book => {
        const genre = book.genre || 'Uncategorized';
        // প্রথম অক্ষর বড় হাতের করা দেখতে সুন্দরের জন্য
        const formattedGenre = genre.charAt(0).toUpperCase() + genre.slice(1);
        genreDataMap[formattedGenre] = (genreDataMap[formattedGenre] || 0) + 1;
    });

    const genrePieData = Object.keys(genreDataMap).map(key => ({
        name: key,
        value: genreDataMap[key]
    }));

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8 p-4 md:p-6">
            {/* প্রিমিয়াম ড্যাশবোর্ড হেডার */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#ecd5cf]/40 pb-5 gap-2">
                <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-black text-[#2c3e50] flex items-center gap-2">
                        <LayoutDashboard className="text-[#b36b6b] size-8 animate-pulse" />
                        Admin <span className="text-[#b36b6b]">Overview</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back! Here is the real-time operational pulse and health of your platform.
                    </p>
                </div>
                <div className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 self-start md:self-auto">
                    Live Syncing Active
                </div>
            </div>

            {/* মেইন ক্লায়েন্ট মডিউল (যেখানে কার্ড এবং Recharts লোড হবে) */}
            <AdminDashboardClient 
                stats={{ totalUsers, totalWriters, totalEbooksSold, totalRevenue, totalCatalogBooks: books.length }}
                monthlySalesData={monthlySalesData}
                genrePieData={genrePieData}
            />
        </div>
    );
};

export default DashboardHomePage;