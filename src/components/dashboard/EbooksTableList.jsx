"use client";
import React, { useState } from "react";
import { Table, Switch, Button } from "@heroui/react";
import { Edit3, Trash2, Globe, EyeOff, DollarSign } from "lucide-react";

export default function EbooksTableList({ initialBooks }) {
    const [books, setBooks] = useState(initialBooks);

    // ১. পাবলিশ / আনপাবলিশ স্ট্যাটাস টগল ফাংশন
    const handleStatusToggle = async (bookId, currentStatus) => {
        const updatedStatus = currentStatus === "published" ? "unpublished" : "published";
        
        // অপটিমিস্টিক UI আপডেট (আগে স্ক্রিনে চেঞ্জ হবে, ব্যাকএন্ডে রিকোয়েস্ট যাবে)
        setBooks(prev => prev.map(b => b._id === bookId ? { ...b, status: updatedStatus } : b));

        try {
            // আপনার MongoDB API পাথে PATCH/PUT রিকোয়েস্ট পাঠান
            const res = await fetch(`/api/ebooks/${bookId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: updatedStatus })
            });
            if (!res.ok) throw new Error("Failed to update status");
        } catch (error) {
            console.error(error);
            alert("Could not update status. Reverting change.");
            // এরর হলে আগের স্টেট ফিরিয়ে আনা হচ্ছে
            setBooks(prev => prev.map(b => b._id === bookId ? { ...b, status: currentStatus } : b));
        }
    };

    // ২. ডিলিট ফাংশনালিটি
    const handleDeleteBook = async (bookId) => {
        if (!confirm("Are you sure you want to delete this ebook?")) return;

        try {
            // আপনার MongoDB API পাথে DELETE রিকোয়েস্ট পাঠান
            const res = await fetch(`/api/ebooks/${bookId}`, { method: "DELETE" });
            if (res.ok) {
                setBooks(prev => prev.filter(b => b._id !== bookId));
                alert("Ebook successfully deleted.");
            } else {
                alert("Failed to delete the ebook.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-2 md:p-4 shadow-sm overflow-hidden">
            {books.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-[#ecd5cf]/40 rounded-xl">
                    <p className="text-gray-400 text-sm">No ebooks found. Start by adding a new one!</p>
                </div>
            ) : (
                <Table className="w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Ebooks collection list" className="min-w-[700px]">
                            <Table.Header>
                                <Table.Column isRowHeader className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Cover & Title</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Price</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Status</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4 text-center">Actions</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {books.map((book) => {
                                    const isPublished = book.status === "published";

                                    return (
                                        <Table.Row key={book._id || book.id} className="border-b border-[#ecd5cf]/20 hover:bg-[#b36b6b]/5 transition-colors duration-150">
                                            {/* কলাম ১: কভার ইমেজ এবং টাইটেল */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-16 bg-[#b36b6b]/10 border border-[#ecd5cf]/60 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                                                        <img 
                                                            src={book.coverImage || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=120"} 
                                                            alt={book.title} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-[#2c3e50] text-sm line-clamp-1">{book.title}</span>
                                                        <span className="text-xs text-gray-400 capitalize mt-0.5">{book.genre || "General"}</span>
                                                    </div>
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ২: প্রাইস */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center text-sm font-medium text-[#2c3e50]">
                                                    <DollarSign size={14} className="text-gray-400" />
                                                    {book.price ? book.price.toFixed(2) : "0.00"}
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ৩: লাইভ স্ট্যাটাস ব্যাজ */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                                                        isPublished 
                                                            ? "bg-green-50 text-green-700 border border-green-200" 
                                                            : "bg-amber-50 text-amber-700 border border-amber-200"
                                                    }`}>
                                                        {isPublished ? <Globe size={12} /> : <EyeOff size={12} />}
                                                        {isPublished ? "Published" : "Unpublished"}
                                                    </span>
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ৪: অ্যাকশন বাটনসমূহ এবং সুইচ টগল */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    {/* Hero UI v3.1.0 এর রিকমেন্ডেড কম্পাউন্ড সুইচ সিনট্যাক্স */}
                                                    <div className="flex items-center gap-2 border-r border-[#ecd5cf]/40 pr-4">
                                                        <Switch 
                                                            isSelected={isPublished}
                                                            onChange={() => handleStatusToggle(book._id || book.id, book.status)}
                                                            size="sm"
                                                        >
                                                            <Switch.Content>
                                                                <Switch.Control className="bg-gray-200 data-[selected=true]:bg-[#b36b6b]">
                                                                    <Switch.Thumb className="bg-white data-[selected=true]:bg-white" />
                                                                </Switch.Control>
                                                            </Switch.Content>
                                                        </Switch>
                                                    </div>

                                                    {/* এডিট বাটন */}
                                                    <Button 
                                                        isIconOnly 
                                                        variant="flat" 
                                                        className="bg-[#b36b6b]/5 text-[#2c3e50] hover:bg-[#b36b6b]/10 rounded-xl size-9 flex items-center justify-center transition-all"
                                                        onClick={() => window.location.href = `/dashboard/writer/edit-ebook/${book._id || book.id}`}
                                                    >
                                                        <Edit3 size={15} />
                                                    </Button>

                                                    {/* ডিলিট বাটন */}
                                                    <Button 
                                                        isIconOnly 
                                                        variant="flat" 
                                                        className="bg-red-50 text-red-600 hover:bg-red-100 rounded-xl size-9 flex items-center justify-center transition-all"
                                                        onClick={() => handleDeleteBook(book._id || book.id)}
                                                    >
                                                        <Trash2 size={15} />
                                                    </Button>
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