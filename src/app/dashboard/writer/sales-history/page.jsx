import React from "react";
import Image from "next/image";
import { Table, Card } from "@heroui/react";
import { TrendingUp, BadgeDollarSign, BookCheck, Calendar, User } from "lucide-react";
import { getPurchasedBooksByWriter } from "@/lib/api/purchaseBook";
import { getUserSession } from "@/lib/core/session";

const SalesHistoryPage = async () => {
  const user = await getUserSession();
  
  // ডাটা না থাকলে ক্র্যাশ এড়াতে ফলব্যাক খালি অ্যারে
  const salesEbooks = (await getPurchasedBooksByWriter(user?.id)) || [];

  /* ================= STATS CALCULATION ================= */
  const totalSalesCount = salesEbooks.length;
  const totalRevenue = salesEbooks.reduce((acc, current) => {
    // ডাটাবেজের অবজেক্ট অনুযায়ী 'priceAmount' অথবা 'price' থেকে ভ্যালু নেওয়া হচ্ছে
    const amount = current.priceAmount || current.price || 0;
    return acc + Number(amount);
  }, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-10 animate-fadeIn">
      
      {/* ================= 1. HEADER SECTION ================= */}
      <div className="flex flex-col border-b border-[#ecd5cf]/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#b36b6b]/10 rounded-2xl text-[#b36b6b]">
            <TrendingUp size={28} className="stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
              Sales <span className="text-[#b36b6b]">Performance</span>
            </h2>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              Monitor your ebook sales, track your earnings, and view buyer insights.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 2. PREMIUM & VIBRANT OVERVIEW CARDS (USD FIXED) ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: Total Books Sold */}
        <Card className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white p-7 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[140px] flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full group-hover:scale-130 transition-transform duration-500 blur-sm" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-300 block">
                Total Books Sold
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                {totalSalesCount} <span className="text-sm font-sans font-medium text-gray-400">Copies</span>
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 text-white shrink-0 shadow-inner mt-1">
              <BookCheck size={24} strokeWidth={2.5} />
            </div>
          </div>
        </Card>

        {/* Card 2: Total Revenue Generated */}
        <Card className="bg-gradient-to-br from-[#b36b6b] to-[#8c5353] text-white p-7 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[140px] flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full group-hover:scale-130 transition-transform duration-500 blur-sm" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-white/80 block">
                Total Revenue
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                ${totalRevenue.toFixed(2)} <span className="text-sm font-sans font-medium text-white/70">USD</span>
              </h3>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 text-white shrink-0 shadow-inner mt-1">
              <BadgeDollarSign size={24} strokeWidth={2.5} />
            </div>
          </div>
        </Card>

      </div>

      {/* ================= 3. SALES HISTORY TABLE ================= */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#2c3e50] flex items-center gap-2 px-1">
          Recent Transactions
        </h3>
        
        {salesEbooks.length > 0 ? (
          <div className="border border-[#ecd5cf]/30 rounded-[24px] overflow-hidden bg-white shadow-sm">
            <Table className="min-w-full">
              <Table.ScrollContainer>
                <Table.Content aria-label="Writer sales history table">
                  <Table.Header>
                    <Table.Column isRowHeader className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Ebook Title
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Buyer Name
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Purchase Date
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6 text-right">
                      Amount
                    </Table.Column>
                  </Table.Header>
                  
                  <Table.Body>
                    {salesEbooks.map((sale) => {
                      const saleDate = sale.createdAt 
                        ? new Date(sale.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })
                        : "N/A";

                      return (
                        <Table.Row key={sale._id || sale.id} className="border-b border-[#ecd5cf]/20 last:border-0 hover:bg-[#fbf4f2]/20 transition-colors h-16">
                          
                          {/* ১. ইবুক কভার ইমেজ + টাইটেল */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#2c3e50]/5 border border-[#ecd5cf]/40 shrink-0 shadow-sm">
                                {sale.bookImage ? (
                                  <Image 
                                    src={sale.bookImage} 
                                    alt={sale.bookTitle || "Book"} 
                                    fill 
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100" />
                                )}
                              </div>
                              <span className="font-serif font-bold text-[#2c3e50] text-sm md:text-base line-clamp-1 max-w-[220px]">
                                {sale.bookTitle || "Untitled Ebook"}
                              </span>
                            </div>
                          </Table.Cell>

                          {/* ২. ক্রেতার নাম */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <User size={15} className="text-gray-400" />
                              <span className="font-medium capitalize">{sale.name || "Anonymous"}</span>
                            </div>
                          </Table.Cell>

                          {/* ৩. পারচেজ ডেট */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm font-medium">
                              <Calendar size={14} className="text-gray-400" />
                              <span>{saleDate}</span>
                            </div>
                          </Table.Cell>

                          {/* ৪. অ্যামাউন্ট */}
                          <Table.Cell className="px-6 text-right">
                            <span className="font-serif font-bold text-[#b36b6b] text-sm md:text-base">
                              ${Number(sale.priceAmount || sale.price || 0).toFixed(2)}
                            </span>
                          </Table.Cell>

                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </div>
        ) : (
          <div className="w-full min-h-[35vh] flex flex-col items-center justify-center p-8 text-center bg-[#fbf4f2]/20 border border-dashed border-[#ecd5cf]/60 rounded-[32px] max-w-md mx-auto mt-6">
            <div className="w-14 h-14 bg-[#b36b6b]/5 flex items-center justify-center rounded-2xl text-[#b36b6b]/40 mb-3 border border-[#ecd5cf]/20">
              <BadgeDollarSign size={32} className="stroke-[1.3]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2c3e50]">No Sales Record Yet</h3>
            <p className="text-xs text-gray-400 max-w-xs mt-1 leading-relaxed">
              When readers purchase your published books, the transactions, earnings, and data metrics will appear here in real-time.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default SalesHistoryPage;