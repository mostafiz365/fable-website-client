import React from "react";
import Image from "next/image";
import { Table, Card } from "@heroui/react";
import { ShoppingBag, CreditCard, BookOpen, Calendar, UserCheck } from "lucide-react";
import { getPurchasedBooksByUser } from "@/lib/api/purchaseBook";
import { getUserSession } from "@/lib/core/session";

const PurchaseHistoryPage = async () => {
  const user = await getUserSession();
  
  // ডাটা না থাকলে ক্র্যাশ এড়াতে ফলব্যাক খালি অ্যারে
  const purchaseEbooks = (await getPurchasedBooksByUser(user?.id)) || [];

  /* ================= STATS CALCULATION ================= */
  const totalPurchasedCount = purchaseEbooks.length;
  const totalExpense = purchaseEbooks.reduce((acc, current) => {
    // আপনার ডাটাবেজের অবজেক্ট অনুযায়ী 'priceAmount' অথবা 'price' নেওয়া হচ্ছে
    const amount = current.priceAmount || current.price || 0;
    return acc + Number(amount);
  }, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8 animate-fadeIn">
      
      {/* ================= 1. HEADER SECTION ================= */}
      <div className="flex flex-col border-b border-[#ecd5cf]/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#b36b6b]/10 rounded-2xl text-[#b36b6b]">
            <ShoppingBag size={28} className="stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
              Purchase History
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
              Keep track of all your bought premium ebooks, invoices, and transaction history.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 2. OVERVIEW STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Card 1: Total Books Purchased */}
        <Card className="bg-white border border-[#ecd5cf]/30 p-6 rounded-[24px] shadow-sm flex flex-row items-center justify-between group hover:border-[#b36b6b]/40 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Books Purchased
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-[#b36b6b] group-hover:text-[#b36b6b] transition-colors">
              {totalPurchasedCount} <span className="text-sm font-sans font-medium text-gray-400">Ebooks</span>
            </h3>
          </div>
          <div className="p-4 bg-[#fbf4f2] text-[#b36b6b] rounded-2xl group-hover:bg-[#b36b6b] group-hover:text-white transition-all duration-300">
            <BookOpen size={26} />
          </div>
        </Card>

        {/* Card 2: Total Investment/Expense */}
        <Card className="bg-white border border-[#ecd5cf]/30 p-6 rounded-[24px] shadow-sm flex flex-row items-center justify-between group hover:border-[#b36b6b]/30 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Total Spent
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-[#b36b6b]">
              {totalExpense.toFixed(2)} <span className="text-sm font-sans font-medium text-gray-400">BDT / USD</span>
            </h3>
          </div>
          <div className="p-4 bg-[#b36b6b]/5 text-[#b36b6b] rounded-2xl group-hover:bg-[#b36b6b] group-hover:text-white transition-all duration-300">
            <CreditCard size={26} />
          </div>
        </Card>

      </div>

      {/* ================= 3. PURCHASE HISTORY TABLE ================= */}
      <div className="space-y-3">
        <h3 className="text-lg font-serif font-bold text-[#2c3e50] flex items-center gap-2 px-1">
          Order Records
        </h3>
        
        {purchaseEbooks.length > 0 ? (
          <div className="border border-[#ecd5cf]/30 rounded-[24px] overflow-hidden bg-white shadow-sm">
            <Table className="min-w-full">
              <Table.ScrollContainer>
                <Table.Content aria-label="Reader purchase history table">
                  <Table.Header>
                    <Table.Column isRowHeader className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Ebook Details
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Writer ID
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                      Purchase Date
                    </Table.Column>
                    <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6 text-right">
                      Price
                    </Table.Column>
                  </Table.Header>
                  
                  <Table.Body>
                    {purchaseEbooks.map((item) => {
                      // সাকসেসফুল ডেট ফরম্যাটিং (যেমন: Jun 20, 2026)
                      const purchaseDate = item.createdAt 
                        ? new Date(item.createdAt).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                          })
                        : "N/A";

                      return (
                        <Table.Row key={item._id || item.id} className="border-b border-[#ecd5cf]/20 last:border-0 hover:bg-[#fbf4f2]/20 transition-colors h-16">
                          
                          {/* ১. ইবুক ইমেজ + টাইটেল */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-14 rounded-lg overflow-hidden bg-[#2c3e50]/5 border border-[#ecd5cf]/40 shrink-0">
                                {item.bookImage ? (
                                  <Image 
                                    src={item.bookImage} 
                                    alt={item.bookTitle || "Book Cover"} 
                                    fill 
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100" />
                                )}
                              </div>
                              <span className="font-serif font-bold text-[#2c3e50] text-sm md:text-base line-clamp-1 max-w-[220px]">
                                {item.bookTitle || "Untitled Ebook"}
                              </span>
                            </div>
                          </Table.Cell>

                          {/* ২. রাইটার আইডি */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm font-mono">
                              <UserCheck size={14} className="text-[#b36b6b]/60" />
                              <span className="truncate max-w-[120px]">{item.writerId || "N/A"}</span>
                            </div>
                          </Table.Cell>

                          {/* ৩. পারচেজ ডেট */}
                          <Table.Cell className="px-6">
                            <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm">
                              <Calendar size={14} />
                              <span>{purchaseDate}</span>
                            </div>
                          </Table.Cell>

                          {/* ৪. প্রাইস অ্যামাউন্ট (ডান দিকে অ্যালাইনড) */}
                          <Table.Cell className="px-6 text-right">
                            <span className="font-sans font-black text-[#2c3e50] text-sm md:text-base">
                              ${Number(item.priceAmount || item.price || 0).toFixed(2)}
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
        //   {/* পারচেজ হিস্ট্রি খালি থাকলে দেখানোর এম্পটি স্টেট (সিনট্যাক্স ফিক্সড) */}
          <div className="w-full min-h-[35vh] flex flex-col items-center justify-center p-8 text-center bg-[#fbf4f2]/20 border border-dashed border-[#ecd5cf]/60 rounded-[32px] max-w-md mx-auto mt-6">
            <div className="w-14 h-14 bg-[#b36b6b]/5 flex items-center justify-center rounded-2xl text-[#b36b6b]/40 mb-3 border border-[#ecd5cf]/20">
              <ShoppingBag size={32} className="stroke-[1.3]" />
            </div>
            <h3 className="text-lg font-serif font-bold text-[#2c3e50]">No Order History</h3>
            <p className="text-xs text-gray-400 max-w-xs mt-1 leading-relaxed">
              You have not bought any ebooks yet. Your future successful checkouts and premium invoices will appear right here.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};

export default PurchaseHistoryPage;