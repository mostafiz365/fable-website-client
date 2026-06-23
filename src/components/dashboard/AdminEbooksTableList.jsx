"use client";

import React, { useState } from "react";
import { Table, Switch, Button, AlertDialog } from "@heroui/react";
import { Trash2, Globe, EyeOff, DollarSign, User } from "lucide-react";
import { adminUpdateEbookStatus, adminDeleteEbook } from "@/lib/actions/books"; // আপনার তৈরি করা ক্লায়েন্ট API
import { toast } from "react-toastify";

export default function AdminEbooksTableList({ initialBooks, adminEmail }) {
    const [books, setBooks] = useState(initialBooks || []);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    // ১. অ্যাডমিন কর্তৃক পাবলিশ / আনপাবলিশ স্ট্যাটাস টগল ফাংশন
    const handleStatusToggle = async (bookId, currentStatus) => {
        const updatedStatus = currentStatus === "published" ? "unpublished" : "published";
        
        // অপটিমিস্টিক UI আপডেট (ইউজার এক্সপেরিয়েন্স স্মুথ রাখার জন্য)
        setBooks(prev => prev.map(b => (b._id === bookId) ? { ...b, status: updatedStatus } : b));

        try {
            // আমরা পূর্বে তৈরি করা অ্যাডমিন স্পেসিফিক ক্লায়েন্ট API কল করছি (ইমেইলসহ)
            await adminUpdateEbookStatus(bookId, updatedStatus, adminEmail);
        } catch (error) {
            console.error("Admin failed to update status:", error);
            alert("Could not update status. Reverting change.");
            // এরর হলে আগের স্টেট ফিরিয়ে আনা হচ্ছে
            setBooks(prev => prev.map(b => (b._id === bookId) ? { ...b, status: currentStatus } : b));
        }
    };

    // ২. অ্যাডমিন কর্তৃক ডিলিট কনফার্মেশন হ্যান্ডেলার
    const handleConfirmDelete = async () => {
        if (!selectedBook) return;
        const targetId = selectedBook._id;

        try {
            // অ্যাডমিন ডিলিট ক্লায়েন্ট API কল (কুয়েরি প্যারামিটারের জন্য ইমেইল পাস করা হচ্ছে)
            await adminDeleteEbook(targetId, adminEmail);

            // লোকাল স্টেট থেকে ডিলিট হওয়া বইটি রিমুভ করা
            setBooks(prev => prev.filter(b => b._id !== targetId));
            toast.error('Book Delete Successfully!')
            setIsDeleteOpen(false); // ডিলিট মোডাল বন্ধ করা
        } catch (error) {
            console.error("Admin error deleting book:", error);
            alert("Failed to delete the ebook. Please try again.");
        }
    };

    return (
        <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-2 md:p-4 shadow-sm overflow-hidden">
            {books.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-[#ecd5cf]/40 rounded-xl">
                    <p className="text-gray-400 text-sm">No ebooks found in the database directory.</p>
                </div>
            ) : (
                <Table className="w-full">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Admin global ebooks management list" className="min-w-[800px]">
                            <Table.Header>
                                <Table.Column isRowHeader className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Cover & Title</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Writer</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Price</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Status</Table.Column>
                                <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4 text-center">Actions</Table.Column>
                            </Table.Header>
                            <Table.Body>
                                {books.map((book) => {
                                    const isPublished = book.status === "published";

                                    return (
                                        <Table.Row key={book._id} className="border-b border-[#ecd5cf]/20 hover:bg-[#b36b6b]/5 transition-colors duration-150">
                                            {/* কলাম ১: Cover & Title */}
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

                                            {/* কলাম ২: Writer Name (রিকোয়ারমেন্ট অনুযায়ী নতুন সংযোজন) */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium">
                                                    <User size={14} className="text-[#b36b6b]/70" />
                                                    <span>{book.writerName || "Unknown Writer"}</span>
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ৩: Price */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center text-sm font-medium text-[#2c3e50]">
                                                    <DollarSign size={14} className="text-gray-400" />
                                                    {book.price ? book.price.toFixed(2) : "0.00"}
                                                </div>
                                            </Table.Cell>

                                            {/* কলাম ৪: Status */}
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

                                            {/* কলাম ৫: Actions (Switch & Delete) */}
                                            <Table.Cell className="py-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    {/* লাইভ স্ট্যাটাস টগল স্যুইচ */}
                                                    <div className="flex items-center gap-2 border-r border-[#ecd5cf]/40 pr-4">
                                                        <Switch 
                                                            isSelected={isPublished}
                                                            onChange={() => handleStatusToggle(book._id, book.status)}
                                                            size="sm"
                                                        >
                                                            <Switch.Content>
                                                                <Switch.Control className="bg-gray-200 data-[selected=true]:bg-[#b36b6b]">
                                                                    <Switch.Thumb className="bg-white data-[selected=true]:bg-white" />
                                                                </Switch.Control>
                                                            </Switch.Content>
                                                        </Switch>
                                                    </div>

                                                    {/* গ্লোবাল ডিলিট বাটন (শুধুমাত্র অ্যাডমিনের জন্য) */}
                                                    <Button 
                                                        isIconOnly 
                                                        variant="flat" 
                                                        className="bg-red-50 text-red-600 hover:bg-red-100 rounded-xl size-9 flex items-center justify-center transition-all"
                                                        onClick={() => {
                                                            setSelectedBook(book);
                                                            setIsDeleteOpen(true);
                                                        }}
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

            {/* ========================================================== */}
            {/* HERO UI GLOBAL DELETE ALERT DIALOG                         */}
            {/* ========================================================== */}
            <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[420px]">
                            <AlertDialog.CloseTrigger onClick={() => setIsDeleteOpen(false)} />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Force delete from catalog?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete <strong>{selectedBook?.title}</strong>? As an admin, this action will override the author (<strong>{selectedBook?.writerName}</strong>) and erase the record permanently.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button variant="tertiary" onClick={() => setIsDeleteOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleConfirmDelete}>
                                    Force Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}