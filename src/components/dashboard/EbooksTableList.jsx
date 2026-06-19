"use client";
import React, { useState } from "react";
import { Table, Switch, Button, Modal, AlertDialog, Surface, TextField, Label, Input } from "@heroui/react";
import { Edit3, Trash2, Globe, EyeOff, DollarSign, BookOpen } from "lucide-react";
import { deleteEbook, updateEbookInfo, updateEbookStatus } from "@/lib/actions/books";


export default function EbooksTableList({ initialBooks }) {
    const [books, setBooks] = useState(initialBooks || []);
    
    // মোডাল এবং ডাটা ট্র্যাকিং স্টেট সমূহ
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ১. পাবলিশ / আনপাবলিশ স্ট্যাটাস টগল ফাংশন
    const handleStatusToggle = async (bookId, currentStatus) => {
        const updatedStatus = currentStatus === "published" ? "unpublished" : "published";
        
        // অপটিমিস্টিক UI আপডেট 
        setBooks(prev => prev.map(b => (b._id === bookId || b.id === bookId) ? { ...b, status: updatedStatus } : b));

        try {
            await updateEbookStatus(bookId, updatedStatus);
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Could not update status. Reverting change.");
            // এরর হলে আগের স্টেট ফিরিয়ে আনা হচ্ছে
            setBooks(prev => prev.map(b => (b._id === bookId || b.id === bookId) ? { ...b, status: currentStatus } : b));
        }
    };

    // ২. এডিট ফর্ম সাবমিট হ্যান্ডলার
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        
        const updatedData = {
            title: formData.get("title"),
            genre: formData.get("genre"),
            price: parseFloat(formData.get("price")),
            coverImage: formData.get("coverImage"),
            description: formData.get("description"),
        };

        const targetId = selectedBook._id || selectedBook.id;

        try {
            await updateEbookInfo(targetId, updatedData);
            
            // লোকাল স্টেট আপডেট
            setBooks(prev => prev.map(b => (b._id === targetId || b.id === targetId) ? { ...b, ...updatedData } : b));
            setIsEditOpen(false);
        } catch (error) {
            console.error("Error updating book:", error);
            alert("Failed to update book information.");
        } finally {
            setIsSubmitting(false);
        }
    };


    // ৩. ডিলিট কনফার্মেশন হ্যান্ডলার (এডিট ফাংশনের মতো করে)
const handleConfirmDelete = async () => {
    if (!selectedBook) return;
    const targetId = selectedBook._id || selectedBook.id;

    try {
        // এডিটের মতোই ক্লায়েন্ট সাইড অ্যাকশন ফাংশন কল করা হলো
        await deleteEbook(targetId);

        
        // লোকাল স্টেট থেকে ডিলিট হওয়া বইটিকে ফিল্টার করে রিমুভ করা
        setBooks(prev => prev.filter(b => b._id !== targetId && b.id !== targetId));
        setIsDeleteOpen(false); // ডিলিট মোডাল বন্ধ করা
    } catch (error) {
        console.error("Error deleting book:", error);
        alert("Failed to delete the ebook. Please try again.");
    }
};

    // ৩. ডিলিট কনফার্মেশন হ্যান্ডলার
    // const handleConfirmDelete = async () => {
    //     if (!selectedBook) return;
    //     const targetId = selectedBook._id || selectedBook.id;

    //     try {
    //         const res = await fetch(`/api/ebooks/${targetId}`, { method: "DELETE" });
    //         if (res.ok) {
    //             setBooks(prev => prev.filter(b => b._id !== targetId && b.id !== targetId));
    //             setIsDeleteOpen(false);
    //         } else {
    //             alert("Failed to delete the ebook from server.");
    //         }
    //     } catch (error) {
    //         console.error("Error deleting book:", error);
    //     }
    // };

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

                                            <Table.Cell className="py-4">
                                                <div className="flex items-center text-sm font-medium text-[#2c3e50]">
                                                    <DollarSign size={14} className="text-gray-400" />
                                                    {book.price ? book.price.toFixed(2) : "0.00"}
                                                </div>
                                            </Table.Cell>

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

                                            <Table.Cell className="py-4">
                                                <div className="flex items-center justify-center gap-4">
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

                                                    {/* এডিট বাটন - মোডাল ওপেন ট্রিগার */}
                                                    <Button 
                                                        isIconOnly 
                                                        variant="flat" 
                                                        className="bg-[#b36b6b]/5 text-[#2c3e50] hover:bg-[#b36b6b]/10 rounded-xl size-9 flex items-center justify-center transition-all"
                                                        onClick={() => {
                                                            setSelectedBook(book);
                                                            setIsEditOpen(true);
                                                        }}
                                                    >
                                                        <Edit3 size={15} />
                                                    </Button>

                                                    {/* ডিলিট বাটন - অ্যালার্ট ডায়ালগ ওপেন ট্রিগার */}
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
            {/* ১. HERO UI EDIT MODEL COMPONENT                         */}
            {/* ========================================================== */}
            <Modal isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                            <Modal.CloseTrigger onClick={() => setIsEditOpen(false)} />
                            <Modal.Header>
                                <Modal.Icon className="bg-[#b36b6b]/10 text-[#b36b6b]">
                                    <BookOpen className="size-5" />
                                </Modal.Icon>
                                <Modal.Heading>Edit Ebook Information</Modal.Heading>
                                <p className="mt-1.5 text-xs text-gray-400">
                                    Modify your books public details, pricing, or metadata accurately.
                                </p>
                            </Modal.Header>
                            <Modal.Body className="p-6">
                                {selectedBook && (
                                    <Surface variant="default">
                                        <form id="edit-book-form" onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                                            <TextField className="w-full" name="title" type="text" variant="secondary" defaultValue={selectedBook.title} required>
                                                <Label>Ebook Title</Label>
                                                <Input placeholder="Enter book title" />
                                            </TextField>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <TextField className="w-full" name="genre" type="text" variant="secondary" defaultValue={selectedBook.genre} required>
                                                    <Label>Genre / Category</Label>
                                                    <Input placeholder="e.g., sci-fi, fiction" />
                                                </TextField>
                                                <TextField className="w-full" name="price" type="number" step="0.01" variant="secondary" defaultValue={selectedBook.price} required>
                                                    <Label>Price (USD)</Label>
                                                    <Input placeholder="0.00" />
                                                </TextField>
                                            </div>

                                            <TextField className="w-full" name="coverImage" type="url" variant="secondary" defaultValue={selectedBook.coverImage} required>
                                                <Label>Cover Image URL</Label>
                                                <Input placeholder="https://example.com/image.jpg" />
                                            </TextField>

                                            <TextField className="w-full" name="description" variant="secondary" defaultValue={selectedBook.description}>
                                                <Label>Description / Book Summary</Label>
                                                <Input placeholder="Enter brief summary of your ebook..." />
                                            </TextField>
                                        </form>
                                    </Surface>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" form="edit-book-form" className="bg-[#b36b6b] text-white" isLoading={isSubmitting}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* ========================================================== */}
            {/* ২. HERO UI DELETE ALERT DIALOG COMPONENT                */}
            {/* ========================================================== */}
            <AlertDialog isOpen={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[420px]">
                            <AlertDialog.CloseTrigger onClick={() => setIsDeleteOpen(false)} />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete ebook permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete <strong>{selectedBook?.title}</strong>? This will remove all associated database metrics and files. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button variant="tertiary" onClick={() => setIsDeleteOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={handleConfirmDelete}>
                                    Delete Ebook
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
}




// "use client";
// import React, { useState } from "react";
// import { Table, Switch, Button } from "@heroui/react";
// import { Edit3, Trash2, Globe, EyeOff, DollarSign } from "lucide-react";

// export default function EbooksTableList({ initialBooks }) {
//     const [books, setBooks] = useState(initialBooks);

//     // ১. পাবলিশ / আনপাবলিশ স্ট্যাটাস টগল ফাংশন
//     const handleStatusToggle = async (bookId, currentStatus) => {
//         const updatedStatus = currentStatus === "published" ? "unpublished" : "published";
        
//         // অপটিমিস্টিক UI আপডেট (আগে স্ক্রিনে চেঞ্জ হবে, ব্যাকএন্ডে রিকোয়েস্ট যাবে)
//         setBooks(prev => prev.map(b => b._id === bookId ? { ...b, status: updatedStatus } : b));

//         try {
//             // আপনার MongoDB API পাথে PATCH/PUT রিকোয়েস্ট পাঠান
//             const res = await fetch(`/api/ebooks/${bookId}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ status: updatedStatus })
//             });
//             if (!res.ok) throw new Error("Failed to update status");
//         } catch (error) {
//             console.error(error);
//             alert("Could not update status. Reverting change.");
//             // এরর হলে আগের স্টেট ফিরিয়ে আনা হচ্ছে
//             setBooks(prev => prev.map(b => b._id === bookId ? { ...b, status: currentStatus } : b));
//         }
//     };

//     // ২. ডিলিট ফাংশনালিটি
//     const handleDeleteBook = async (bookId) => {
//         if (!confirm("Are you sure you want to delete this ebook?")) return;

//         try {
//             // আপনার MongoDB API পাথে DELETE রিকোয়েস্ট পাঠান
//             const res = await fetch(`/api/ebooks/${bookId}`, { method: "DELETE" });
//             if (res.ok) {
//                 setBooks(prev => prev.filter(b => b._id !== bookId));
//                 alert("Ebook successfully deleted.");
//             } else {
//                 alert("Failed to delete the ebook.");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="bg-white border border-[#ecd5cf]/40 rounded-2xl p-2 md:p-4 shadow-sm overflow-hidden">
//             {books.length === 0 ? (
//                 <div className="text-center py-12 border-2 border-dashed border-[#ecd5cf]/40 rounded-xl">
//                     <p className="text-gray-400 text-sm">No ebooks found. Start by adding a new one!</p>
//                 </div>
//             ) : (
//                 <Table className="w-full">
//                     <Table.ScrollContainer>
//                         <Table.Content aria-label="Ebooks collection list" className="min-w-[700px]">
//                             <Table.Header>
//                                 <Table.Column isRowHeader className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Cover & Title</Table.Column>
//                                 <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Price</Table.Column>
//                                 <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4">Status</Table.Column>
//                                 <Table.Column className="bg-[#b36b6b]/5 text-[#2c3e50] font-serif font-bold text-sm py-4 text-center">Actions</Table.Column>
//                             </Table.Header>
//                             <Table.Body>
//                                 {books.map((book) => {
//                                     const isPublished = book.status === "published";

//                                     return (
//                                         <Table.Row key={book._id || book.id} className="border-b border-[#ecd5cf]/20 hover:bg-[#b36b6b]/5 transition-colors duration-150">
//                                             {/* কলাম ১: কভার ইমেজ এবং টাইটেল */}
//                                             <Table.Cell className="py-4">
//                                                 <div className="flex items-center gap-4">
//                                                     <div className="w-12 h-16 bg-[#b36b6b]/10 border border-[#ecd5cf]/60 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
//                                                         <img 
//                                                             src={book.coverImage || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=120"} 
//                                                             alt={book.title} 
//                                                             className="w-full h-full object-cover"
//                                                         />
//                                                     </div>
//                                                     <div className="flex flex-col">
//                                                         <span className="font-semibold text-[#2c3e50] text-sm line-clamp-1">{book.title}</span>
//                                                         <span className="text-xs text-gray-400 capitalize mt-0.5">{book.genre || "General"}</span>
//                                                     </div>
//                                                 </div>
//                                             </Table.Cell>

//                                             {/* কলাম ২: প্রাইস */}
//                                             <Table.Cell className="py-4">
//                                                 <div className="flex items-center text-sm font-medium text-[#2c3e50]">
//                                                     <DollarSign size={14} className="text-gray-400" />
//                                                     {book.price ? book.price.toFixed(2) : "0.00"}
//                                                 </div>
//                                             </Table.Cell>

//                                             {/* কলাম ৩: লাইভ স্ট্যাটাস ব্যাজ */}
//                                             <Table.Cell className="py-4">
//                                                 <div className="flex items-center gap-2">
//                                                     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
//                                                         isPublished 
//                                                             ? "bg-green-50 text-green-700 border border-green-200" 
//                                                             : "bg-amber-50 text-amber-700 border border-amber-200"
//                                                     }`}>
//                                                         {isPublished ? <Globe size={12} /> : <EyeOff size={12} />}
//                                                         {isPublished ? "Published" : "Unpublished"}
//                                                     </span>
//                                                 </div>
//                                             </Table.Cell>

//                                             {/* কলাম ৪: অ্যাকশন বাটনসমূহ এবং সুইচ টগল */}
//                                             <Table.Cell className="py-4">
//                                                 <div className="flex items-center justify-center gap-4">
//                                                     {/* Hero UI v3.1.0 এর রিকমেন্ডেড কম্পাউন্ড সুইচ সিনট্যাক্স */}
//                                                     <div className="flex items-center gap-2 border-r border-[#ecd5cf]/40 pr-4">
//                                                         <Switch 
//                                                             isSelected={isPublished}
//                                                             onChange={() => handleStatusToggle(book._id || book.id, book.status)}
//                                                             size="sm"
//                                                         >
//                                                             <Switch.Content>
//                                                                 <Switch.Control className="bg-gray-200 data-[selected=true]:bg-[#b36b6b]">
//                                                                     <Switch.Thumb className="bg-white data-[selected=true]:bg-white" />
//                                                                 </Switch.Control>
//                                                             </Switch.Content>
//                                                         </Switch>
//                                                     </div>

//                                                     {/* এডিট বাটন */}
//                                                     <Button 
//                                                         isIconOnly 
//                                                         variant="flat" 
//                                                         className="bg-[#b36b6b]/5 text-[#2c3e50] hover:bg-[#b36b6b]/10 rounded-xl size-9 flex items-center justify-center transition-all"
//                                                         onClick={() => window.location.href = `/dashboard/writer/edit-ebook/${book._id || book.id}`}
//                                                     >
//                                                         <Edit3 size={15} />
//                                                     </Button>

//                                                     {/* ডিলিট বাটন */}
//                                                     <Button 
//                                                         isIconOnly 
//                                                         variant="flat" 
//                                                         className="bg-red-50 text-red-600 hover:bg-red-100 rounded-xl size-9 flex items-center justify-center transition-all"
//                                                         onClick={() => handleDeleteBook(book._id || book.id)}
//                                                     >
//                                                         <Trash2 size={15} />
//                                                     </Button>
//                                                 </div>
//                                             </Table.Cell>
//                                         </Table.Row>
//                                     );
//                                 })}
//                             </Table.Body>
//                         </Table.Content>
//                     </Table.ScrollContainer>
//                 </Table>
//             )}
//         </div>
//     );
// }