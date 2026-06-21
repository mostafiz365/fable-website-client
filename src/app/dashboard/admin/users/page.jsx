import React from "react";
import { ShoppingBag, ShieldAlert } from "lucide-react";
import { getUsers } from "@/lib/api/users"; // পাথটি আপনার ফোল্ডার অনুযায়ী চেক করবেন
import UserManagementTable from "@/components/UserManagementTable";

const AllUsersPage = async () => {
  // ডাটাবেজ থেকে ক্লিন সার্ভার ফেচ
  const users = (await getUsers()) || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-10 space-y-8 animate-fadeIn">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col border-b border-[#ecd5cf]/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#b36b6b]/10 rounded-2xl text-[#b36b6b]">
            <ShieldAlert size={28} className="stroke-[1.8]" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-[#2c3e50]">
              User Management Panel
            </h2>
            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
              Review platform memberships, adjust system levels, and filter user permissions instantly.
            </p>
          </div>
        </div>
      </div>

      {/* ================= LIVE CLIENT TABLE COMPONENT ================= */}
      <UserManagementTable initialUsers={users} />

    </div>
  );
};

export default AllUsersPage;