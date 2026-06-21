"use client";

import React from "react";
import { Card } from "@heroui/react";
import { Users, ShoppingBag, Banknote, Bookmark } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function AdminDashboardClient({
  stats,
  monthlySalesData,
  genrePieData,
}) {
  // পাই চার্টের জন্য আরও ভাইব্রেন্ট এবং প্রিমিয়াম ওয়াম কালার প্যালেট
  const COLORS = [
    "#b36b6b",
    "#2c3e50",
    "#d9a79a",
    "#e2b65c",
    "#4a6984",
    "#8c5353",
  ];

  // এনালাইটিক্স কার্ডের জন্য ফুললি কালারফুল ও ভাইব্রেন্ট কন্টেন্ট কনফিগ
  const cardItems = [
    {
      title: "Total Registered Users",
      value: stats.totalUsers,
      icon: Users,
      // গ্রিডিয়েন্ট এবং ডার্ক সলিড ভাইব্রেন্ট ব্যাকগ্রাউন্ড মিক্স
      bgClass: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
      iconBg: "bg-white/20 text-white",
    },
    {
      title: "Verified Authors",
      value: stats.totalWriters,
      icon: Bookmark,
      bgClass: "bg-gradient-to-br from-[#b36b6b] to-[#8c5353] text-white",
      iconBg: "bg-white/20 text-white",
    },
    {
      title: "Ebooks Sold",
      value: stats.totalEbooksSold,
      icon: ShoppingBag,
      bgClass: "bg-gradient-to-br from-amber-500 to-orange-600 text-white",
      iconBg: "bg-white/20 text-white",
    },
    {
      title: "Gross Revenue",
      value: `৳${stats.totalRevenue.toLocaleString("en-BD")}`,
      icon: Banknote,
      bgClass: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white",
      iconBg: "bg-white/20 text-white",
    },
  ];

  return (
    <div className="space-y-10">
      {/* ========================================== */}
      {/* SECTION 1: VIBRANT & LARGE ANALYTICS CARDS */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className={`${item.bgClass} p-7 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-none min-h-[140px] flex flex-col justify-between`}
            >
              {/* প্রিমিয়াম ব্যাকগ্রাউন্ড গ্লো ইফেক্ট */}
              <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full group-hover:scale-130 transition-transform duration-500 blur-sm" />

              <div className="flex items-start justify-between w-full">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {item.title}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                    {item.value}
                  </h3>
                </div>
                <div
                  className={`p-3.5 rounded-xl ${item.iconBg} shrink-0 shadow-inner mt-1`}
                >
                  <IconComponent size={24} strokeWidth={2.5} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ========================================== */}
      {/* SECTION 2: ENHANCED RECHARTS GRAPHICAL MAP */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ২.১: এরিয়া চার্ট (ডিপ ভিজ্যুয়ালাইজেশন ও হাইলাইট রিডিবিলিটি) */}
        <div className="lg:col-span-2 bg-white border border-[#ecd5cf]/50 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div className="mb-6">
            <h4 className="font-serif text-lg font-bold text-[#2c3e50]">
              Revenue Timeline History
            </h4>
            <p className="text-xs text-gray-500">
              Track and monitor high-volume graph curves of monthly earnings.
            </p>
          </div>

          <div className="w-full h-[320px] text-xs font-semibold">
            {monthlySalesData.length === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No monthly sales recorded yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlySalesData}
                  margin={{ top: 15, right: 15, left: -5, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorRevenueFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#b36b6b"
                        stopOpacity={0.45}
                      />
                      <stop
                        offset="95%"
                        stopColor="#b36b6b"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>
                  {/* গ্রিড লাইন একটু ডার্ক করা হয়েছে রিডিবিলিটির জন্য */}
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e5e7eb"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#4b5563"
                    tickLine={true}
                    dy={8}
                  />
                  <YAxis
                    stroke="#4b5563"
                    tickLine={false}
                    axisLine={false}
                    dx={-5}
                  />

                  {/* ক্রিস্টাল ক্লিয়ার হোয়াইট টুলটিপ বক্স উইথ ডার্ক টেক্সট */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      color: "#2c3e50",
                      border: "1px solid #ecd5cf",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                    itemStyle={{ color: "#b36b6b", fontWeight: "bold" }}
                    labelStyle={{
                      fontWeight: "bold",
                      color: "#2c3e50",
                      marginBottom: "4px",
                    }}
                  />

                  {/* থিক বর্ডার লাইন এবং ডট পয়েন্ট সক্রিয় করা হয়েছে */}
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    name="Total Revenue"
                    stroke="#b36b6b"
                    strokeWidth={3.5}
                    dot={{
                      stroke: "#b36b6b",
                      strokeWidth: 2,
                      r: 4,
                      fill: "#fff",
                    }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    fillOpacity={1}
                    fill="url(#colorRevenueFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ২.২: লার্জার পাই চার্ট (বড় সাইজ এবং ক্লিয়ার লেবেল) */}
        <div className="bg-white border border-[#ecd5cf]/50 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-lg font-bold text-[#2c3e50]">
              Genre Architecture
            </h4>
            <p className="text-xs text-gray-500">
              Distribution proportion based on book categories.
            </p>
          </div>

          {/* সাইজ বড় করার জন্য কন্টেইনারের হাইট বাড়ানো হয়েছে */}
          <div className="w-full h-[320px] flex items-center justify-center text-xs font-semibold">
            {genrePieData.length === 0 ? (
              <div className="text-gray-400">No books found to categorize.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genrePieData}
                    cx="50%"
                    cy="45%"
                    innerRadius={70} // ইনার রেডিয়াস বাড়ানো হয়েছে
                    outerRadius={105} // আউটার রেডিয়াস বড় করা হয়েছে
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {genrePieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  {/* পাই চার্ট টুলটিপ একদম ক্লিয়ার করা হয়েছে */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      border: "1px solid #ecd5cf",
                      color: "#2c3e50",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                    itemStyle={{ fontWeight: "bold" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={50}
                    iconType="circle"
                    iconSize={9}
                    wrapperStyle={{ paddingTop: "15px", color: "#4b5563" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React from 'react';
// import { Card } from "@heroui/react";
// import { Users, BookOpen, ShoppingBag, Banknote, Bookmark } from "lucide-react";
// import {
//     AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
//     PieChart, Pie, Cell, Legend
// } from 'recharts';

// export default function AdminDashboardClient({ stats, monthlySalesData, genrePieData }) {

//     // আপনার থিমের সাথে ম্যাচিং লাক্সারি কালার প্যালেট (Pie chart এর জন্য)
//     const COLORS = ['#b36b6b', '#2c3e50', '#d9a79a', '#4a6984', '#e2b65c', '#8c5353'];

//     // এনালাইটিক্স কার্ড ডেটা অবজেক্ট
//     const cardItems = [
//         {
//             title: "Total Registered Users",
//             value: stats.totalUsers,
//             icon: Users,
//             color: "text-blue-600",
//             bg: "bg-blue-50/60"
//         },
//         {
//             title: "Verified Authors",
//             value: stats.totalWriters,
//             icon: Bookmark,
//             color: "text-[#b36b6b]",
//             bg: "bg-[#b36b6b]/5"
//         },
//         {
//             title: "Ebooks Sold",
//             value: stats.totalEbooksSold,
//             icon: ShoppingBag,
//             color: "text-amber-600",
//             bg: "bg-amber-50/60"
//         },
//         {
//             title: "Gross Revenue",
//             value: `৳${stats.totalRevenue.toLocaleString('en-BD')}`,
//             icon: Banknote,
//             color: "text-emerald-600",
//             bg: "bg-emerald-50/60"
//         }
//     ];

//     return (
//         <div className="space-y-8">
//             {/* ========================================== */}
//             {/* SECTION 1: UNIQUE ANALYTICS CARDS          */}
//             {/* ========================================== */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//                 {cardItems.map((item, index) => {
//                     const IconComponent = item.icon;
//                     return (
//                         <Card
//                             key={index}
//                             className="border border-[#ecd5cf]/30 bg-white p-5 rounded-2xl relative overflow-hidden group hover:shadow-md transition-all duration-300"
//                         >
//                             {/* ব্যাকগ্রাউন্ড ইউনিক থিম ওয়াটারমার্ক বাবল */}
//                             <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#ecd5cf]/10 rounded-full group-hover:scale-125 transition-transform duration-500" />

//                             <div className="flex items-center justify-between">
//                                 <div className="space-y-2">
//                                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.title}</p>
//                                     <h3 className="text-2xl font-serif font-black text-[#2c3e50] tracking-tight">
//                                         {item.value}
//                                     </h3>
//                                 </div>
//                                 <div className={`p-3 rounded-xl ${item.bg} ${item.color} shrink-0 shadow-sm`}>
//                                     <IconComponent size={22} />
//                                 </div>
//                             </div>
//                         </Card>
//                     );
//                 })}
//             </div>

//             {/* ========================================== */}
//             {/* SECTION 2: RECHARTS GRAPHICAL LAYOUT       */}
//             {/* ========================================== */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                 {/* ২.১: এরিয়া চার্ট (Monthly Revenue Growth) */}
//                 <div className="lg:col-span-2 bg-white border border-[#ecd5cf]/40 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between">
//                     <div className="mb-4">
//                         <h4 className="font-serif text-base font-bold text-[#2c3e50]">Revenue & Payout Timeline</h4>
//                         <p className="text-xs text-gray-400">Track financial trajectory and monthly ebook transactions.</p>
//                     </div>

//                     <div className="w-full h-[300px] text-xs">
//                         {monthlySalesData.length === 0 ? (
//                             <div className="w-full h-full flex items-center justify-center text-gray-400">No monthly sales recorded yet.</div>
//                         ) : (
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <AreaChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//                                     <defs>
//                                         {/* প্রিমিয়াম থিম কালার গ্রেডিয়েন্ট ইফেক্ট */}
//                                         <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                                             <stop offset="5%" stopColor="#b36b6b" stopOpacity={0.3}/>
//                                             <stop offset="95%" stopColor="#b36b6b" stopOpacity={0}/>
//                                         </linearGradient>
//                                     </defs>
//                                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ecd5cf/30" />
//                                     <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} />
//                                     <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
//                                     <Tooltip
//                                         contentStyle={{ backgroundColor: '#2c3e50', borderRadius: '12px', color: '#fff', border: 'none' }}
//                                         labelStyle={{ fontWeight: 'bold', color: '#ecd5cf' }}
//                                     />
//                                     <Area type="monotone" dataKey="revenue" name="Revenue (৳)" stroke="#b36b6b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         )}
//                     </div>
//                 </div>

//                 {/* ২.২: পাই চার্ট (Ebooks by Genre Distribution) */}
//                 <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-4 md:p-5 shadow-sm flex flex-col justify-between">
//                     <div>
//                         <h4 className="font-serif text-base font-bold text-[#2c3e50]">Genre Architecture</h4>
//                         <p className="text-xs text-gray-400">Catalog concentration broken down by genre categories.</p>
//                     </div>

//                     <div className="w-full h-[280px] flex items-center justify-center text-xs">
//                         {genrePieData.length === 0 ? (
//                             <div className="text-gray-400">No books found to categorize.</div>
//                         ) : (
//                             <ResponsiveContainer width="100%" height="100%">
//                                 <PieChart>
//                                     <Pie
//                                         data={genrePieData}
//                                         cx="50%"
//                                         cy="45%"
//                                         innerRadius={60}
//                                         outerRadius={85}
//                                         paddingAngle={4}
//                                         dataKey="value"
//                                     >
//                                         {genrePieData.map((entry, index) => (
//                                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                         ))}
//                                     </Pie>
//                                     <Tooltip
//                                         contentStyle={{ backgroundColor: '#white', borderRadius: '8px', border: '1px solid #ecd5cf' }}
//                                     />
//                                     <Legend
//                                         verticalAlign="bottom"
//                                         height={45}
//                                         iconType="circle"
//                                         iconSize={8}
//                                         wrapperStyle={{ paddingTop: '10px' }}
//                                     />
//                                 </PieChart>
//                             </ResponsiveContainer>
//                         )}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }
