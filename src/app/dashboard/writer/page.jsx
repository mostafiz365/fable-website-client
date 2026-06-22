import EbooksTableList from "@/components/dashboard/EbooksTableList";
import { getUserSession } from "@/lib/core/session"; // ক্লায়েন্ট কম্পোনেন্টটি ইমপোর্ট করুন
import { serverApi } from "@/lib/core/test";
import { BookOpen } from "lucide-react";

const ManageEbooksPage = async () => {
    const user = await getUserSession();
    // ইউজারের আইডি দিয়ে তার নিজস্ব বইগুলো ফেচ করা হচ্ছে
    const books = await serverApi(`/api/my/books?userId=${user?.id}`) || [];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-6 p-4 md:p-6">
            {/* নান্দনিক হেডার সেকশন */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#ecd5cf]/40 pb-5 gap-4">
                <div>
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#2c3e50] flex items-center gap-2">
                        <BookOpen className="text-[#b36b6b] size-7" />
                        Manage Your <span className="text-[#b36b6b]">E-books</span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Review, update, toggle status, or remove your published content.
                    </p>
                </div>
                {/* স্ট্যাটাস কাউন্টার কার্ড */}
                <div className="bg-[#b36b6b]/5 border border-[#ecd5cf]/60 rounded-xl px-5 py-2 text-center shrink-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#b36b6b]/80 block">Total Ebooks</span>
                    <span className="text-xl font-serif font-bold text-[#2c3e50]">{books.length}</span>
                </div>
            </div>

            {/* ইন্টারেক্টিভ টেবিল মডিউল */}
            <EbooksTableList initialBooks={books} />
        </div>
    );
};

export default ManageEbooksPage;