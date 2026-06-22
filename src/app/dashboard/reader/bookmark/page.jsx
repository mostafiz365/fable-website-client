import BookCard from "@/components/BookCard";
import { getUserSession } from "@/lib/core/session";
import { serverApi } from "@/lib/core/test";
import { Bookmark, FolderHeart } from "lucide-react"; // আইকন ব্যবহারের জন্য

const ReaderBookmarkPage = async () => {
    const user = await getUserSession();
    console.log(user);
    // ডাটা না থাকলে যেন ক্র্যাশ না করে সেজন্য একটি ডিফল্ট খালি অ্যারে রাখলাম
    const books = (await serverApi(`/api/my/bookmarks?userId=${user?.id}`)) || [];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8 animate-fadeIn">
            
            {/* ================= HEADER SECTION ================= */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ecd5cf]/30 pb-5 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#b36b6b]/10 rounded-2xl text-[#b36b6b]">
                        <Bookmark size={28} className="fill-current" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
                            My Bookmarked Ebooks
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                            Your curated reading list saved for future reference or quick access.
                        </p>
                    </div>
                </div>
                
                {/* কাউন্টার ব্যাজ */}
                <div className="bg-[#fbf4f2] border border-[#ecd5cf]/50 text-[#b36b6b] font-serif font-bold px-4 py-2 rounded-xl text-sm self-start sm:self-center shadow-sm">
                    Total Saved: {books.length}
                </div>
            </div>

            {/* ================= MAIN CONTENT SECTION ================= */}
            {books.length > 0 ? (
                // ৩-কলামের সুন্দর রেসপনসিভ গ্রিড
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 justify-items-center sm:justify-items-stretch">
                    {books.map((singleBook) => (
                        <BookCard 
                            key={singleBook._id || singleBook.id} 
                            ebook={singleBook} 
                        />
                    ))}
                </div>
            ) : (
                // বুকমার্ক লিষ্ট খালি থাকলে দেখানোর জন্য একটি দৃষ্টিনন্দন এম্পটি স্টেট
                <div className="w-full min-h-[40vh] flex flex-col items-center justify-center p-8 text-center bg-[#fbf4f2]/20 border border-dashed border-[#ecd5cf]/60 rounded-[32px] max-w-md mx-auto mt-10">
                    <FolderHeart size={48} className="text-[#b36b6b]/40 mb-3 stroke-[1.5]" />
                    <h3 className="text-lg font-serif font-bold text-[#2c3e50]">No Bookmarks Yet</h3>
                    <p className="text-xs text-gray-400 max-w-xs mt-1">
                        Explore our extensive library and bookmark the ebooks you would love to read or purchase later.
                    </p>
                </div>
            )}
            
        </div>
    );
};

export default ReaderBookmarkPage;