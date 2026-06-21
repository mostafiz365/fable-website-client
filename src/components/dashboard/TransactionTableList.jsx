"use client";

import React from "react";
import { Table } from "@heroui/react";
import { Calendar, User, Hash, BookOpen } from "lucide-react";

export default function TransactionTableList({ initialTransactions }) {
    return (
        <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-2 md:p-4 shadow-sm overflow-hidden">
            {initialTransactions.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-[#ecd5cf]/40 rounded-xl">
                    <p className="text-gray-400 text-sm">No transaction ledger history available.</p>
                </div>
            ) : (
                <Table className="w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Purchase Ledger Transactions Table" className="min-w-[850px]">
                            <Table.Header>
                                <Table.Column isRowHeader className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">
                                    <span className="flex items-center gap-1"><Hash size={14} /> Transaction ID</span>
                                </Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">
                                    <span className="flex items-center gap-1"><BookOpen size={14} /> Book Details</span>
                                </Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">
                                    <span className="flex items-center gap-1"><User size={14} /> Buyer Name</span>
                                </Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Amount</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Date</Table.Column>
                            </Table.Header>
                            
                            <Table.Body>
                                {initialTransactions.map((trx) => {
                                    return (
                                        <Table.Row key={trx._id} className="border-b border-[#ecd5cf]/20 hover:bg-[#b36b6b]/3 transition-colors duration-150">
                                            
                                            {/* কলাম ১: Transaction ID */}
                                            <Table.Cell className="py-4 font-mono text-xs text-gray-500 font-bold">
                                                #{trx._id ? trx._id.toUpperCase() : "N/A"}
                                            </Table.Cell>

                                            {/* কলাম ২: Book Title & Book Image */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-14 bg-[#b36b6b]/10 border border-[#ecd5cf]/60 rounded overflow-hidden flex-shrink-0 shadow-sm">
                                                        <img 
                                                            src={trx.bookImage || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=120"} 
                                                            alt={trx.bookTitle} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="font-semibold text-[#2c3e50] text-sm line-clamp-1">
                                                        {trx.bookTitle || "Untitled Ebook"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ৩: Buyer Name */}
                                            <Table.Cell className="py-4">
                                                <span className="text-sm font-medium text-gray-700 capitalize">
                                                    {trx.name || "Anonymous Buyer"}
                                                </span>
                                            </Table.Cell>

                                            {/* কলাম ৪: Amount */}
                                            <Table.Cell className="py-4">
                                                <span className="text-sm font-serif font-bold text-[#b36b6b]">
                                                    ৳{trx.priceAmount ? trx.priceAmount.toFixed(2) : "0.00"}
                                                </span>
                                            </Table.Cell>

                                            {/* কলাম ৫: Date */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                                    <Calendar size={13} className="text-gray-400" />
                                                    <span>
                                                        {trx.createdAt 
                                                            ? new Date(trx.createdAt).toLocaleDateString('en-US', { 
                                                                day: 'numeric', 
                                                                month: 'short', 
                                                                year: 'numeric' 
                                                              }) 
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    );
}