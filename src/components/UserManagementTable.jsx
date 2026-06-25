"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { Table, Button, AlertDialog, Card, Switch } from "@heroui/react";
import { Trash2, Mail, Users, UserCheck, Shield, Loader2 } from "lucide-react";
import { deleteUser, updateUserRole } from "@/lib/actions/users";
import { toast } from "react-toastify";

export default function UserManagementTable({ initialUsers }) {
  // আপনার ডেটাবেজ যেহেতু অলরেডি ক্লিন, তাই সরাসরি initialUsers স্টেটে বসিয়ে দেওয়া হলো
  const [users, setUsers] = useState(initialUsers || []);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPending, startTransition] = useTransition();

  // ==========================================================
  // ১. ইউজার রোল চেঞ্জ করার টগল ফাংশন (অপটিমিস্টিক আপডেট সহ)
  // ==========================================================
  const handleRoleToggle = async (userId, currentRole) => {
    if (currentRole === "admin") return;

    // সরাসরি reader এবং writer এর মধ্যে সুইচ
    const newRole = currentRole === "writer" ? "reader" : "writer";

    // অপটিমিস্টিক UI আপডেট (ইনস্ট্যান্ট রেসপন্স)
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)),
    );

    try {
      await updateUserRole(userId, newRole);
      toast.success("User role updated successfully!");
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Could not update role. Reverting change.");
      // এরর হলে আগের রোলে ব্যাক করা হচ্ছে
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: currentRole } : u)),
      );
    }
  };

  // ইউজার ডিলিট করার কনফার্মেশন হ্যান্ডেলার
  const handleConfirmDelete = () => {
    if (!selectedUser) return;

    startTransition(async () => {
      try {
        const response = await deleteUser(selectedUser._id);
        if (response) {
          setUsers((prev) =>
            prev.filter((user) => user._id !== selectedUser._id),
          );
          toast.error("User Delete Successfully!");
          setSelectedUser(null);
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    });
  };

  // স্ট্যাটাস কার্ডের হিসাব (সরাসরি এবং নিখুঁত কাউন্টিং)
  const totalUsers = users.length;
  const totalWriters = users.filter((u) => u.role === "writer").length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;

  return (
    <div className="space-y-8 relative">
      {/* গ্লোবাল লোডিং ওভারলে */}
      {isPending && (
        <div className="fixed inset-0 bg-[#2c3e50]/10 backdrop-blur-[1px] z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#ecd5cf]/40 flex items-center gap-3">
            <Loader2 className="animate-spin text-[#b36b6b]" size={20} />
            <span className="text-xs font-bold text-[#2c3e50]">
              Deleting User Record...
            </span>
          </div>
        </div>
      )}

      {/* ================= VIBRANT STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* ১. Total Registered Users */}
        <Card className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest block">
                Total Registered
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                {totalUsers}
              </h3>
            </div>
            <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
              <Users size={22} strokeWidth={2.5} />
            </div>
          </div>
        </Card>

        {/* ২. Writers Card */}
        <Card className="bg-gradient-to-br from-[#b36b6b] to-[#8c5353] text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest block">
                Writers
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                {totalWriters}
              </h3>
            </div>
            <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
              <UserCheck size={22} strokeWidth={2.5} />
            </div>
          </div>
        </Card>

        {/* ৩. Admins Card */}
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
          <div className="flex items-start justify-between w-full">
            <div className="space-y-2">
              <span className="text-xs font-bold text-white/80 uppercase tracking-widest block">
                Admins
              </span>
              <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
                {totalAdmins}
              </h3>
            </div>
            <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
              <Shield size={22} strokeWidth={2.5} />
            </div>
          </div>
        </Card>
      </div>

      {/* ================= HERO UI TABLE ================= */}
      <div className="border border-[#ecd5cf]/30 rounded-[24px] overflow-hidden bg-white shadow-sm">
        <Table className="min-w-full">
          <Table.ScrollContainer>
            <Table.Content aria-label="User Management Dashboard">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6"
                >
                  User Details
                </Table.Column>
                <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                  Email
                </Table.Column>
                <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
                  Role
                </Table.Column>
                <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6 text-center">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {users.map((user) => {
                  const isWriter = user.role === "writer";

                  return (
                    <Table.Row
                      key={user._id}
                      className="border-b border-[#ecd5cf]/20 last:border-0 hover:bg-[#fbf4f2]/20 transition-colors h-16"
                    >
                      {/* ১. Name & Image */}
                      <Table.Cell className="px-6">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#ecd5cf]/40 bg-gray-50 shrink-0">
                            <Image
                              src={
                                user.image ||
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5GX1lkI6T4INseXlhyZhaGMtq07LNid9Tw&s"
                              }
                              alt={user.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-serif font-bold text-[#2c3e50] text-sm md:text-base">
                            {user.name}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* ২. Email */}
                      <Table.Cell className="px-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <Mail size={14} className="text-gray-400" />
                          <span>{user.email}</span>
                        </div>
                      </Table.Cell>

                      {/* ৩. Role */}
                      <Table.Cell className="px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                            user.role === "admin"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : user.role === "writer"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </Table.Cell>

                      {/* ৪. Actions */}
                      <Table.Cell className="px-6 text-center">
                        <div className="flex items-center justify-center gap-4">
                          {/* লাইভ রোল টগল স্যুইচ */}
                          <div className="flex items-center border-r border-[#ecd5cf]/40 pr-4">
                            <Switch
                              isSelected={isWriter}
                              onChange={() =>
                                handleRoleToggle(user._id, user.role)
                              }
                              isDisabled={user.role === "admin"}
                              size="sm"
                              aria-label="Toggle User Role"
                            >
                              <Switch.Content>
                                <Switch.Control className="bg-gray-200 data-[selected=true]:bg-[#b36b6b]">
                                  <Switch.Thumb className="bg-white data-[selected=true]:bg-white" />
                                </Switch.Control>
                              </Switch.Content>
                            </Switch>
                          </div>

                          <AlertDialog>
                            <Button
                              isIconOnly
                              variant="danger"
                              onClick={() => setSelectedUser(user)}
                              className="h-9 w-9 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all border border-red-100"
                            >
                              <Trash2 size={16} />
                            </Button>

                            <AlertDialog.Backdrop>
                              <AlertDialog.Container>
                                <AlertDialog.Dialog className="sm:max-w-[420px] bg-white border border-[#ecd5cf]/50 rounded-[28px] shadow-2xl p-5 text-left">
                                  <AlertDialog.CloseTrigger />
                                  <AlertDialog.Header className="flex gap-3 items-center">
                                    <AlertDialog.Icon
                                      status="danger"
                                      className="bg-red-50 text-red-500"
                                    />
                                    <AlertDialog.Heading className="font-serif font-black text-[#2c3e50]">
                                      Terminate Account?
                                    </AlertDialog.Heading>
                                  </AlertDialog.Header>
                                  <AlertDialog.Body>
                                    <p className="text-sm text-gray-500 leading-relaxed">
                                      Are you sure you want to permanently
                                      delete{" "}
                                      <strong>{selectedUser?.name}</strong>?
                                      This action cannot be undone.
                                    </p>
                                  </AlertDialog.Body>
                                  <AlertDialog.Footer>
                                    <Button
                                      variant="tertiary"
                                      onClick={() => setSelectedUser(null)}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="danger"
                                      onClick={handleConfirmDelete}
                                    >
                                      Delete User
                                    </Button>
                                  </AlertDialog.Footer>
                                </AlertDialog.Dialog>
                              </AlertDialog.Container>
                            </AlertDialog.Backdrop>
                          </AlertDialog>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState, useTransition } from "react";
// import Image from "next/image";
// import { Table, Button, AlertDialog, Card } from "@heroui/react";
// import { Trash2, Mail, Users, UserCheck, Shield, Loader2 } from "lucide-react";
// import { deleteUser } from "@/lib/actions/users";
// import { toast } from "react-toastify";

// export default function UserManagementTable({ initialUsers }) {
//   // ডাটাবেজ থেকে r, w, a আসলে সেটিকে সুন্দর ফুল টেক্সট দেখানোর জন্য স্যানিটাইজেশন
//   const sanitizedUsers = (initialUsers || []).map((user) => {
//     let currentRole = String(user.role || "reader")
//       .trim()
//       .toLowerCase();

//     if (currentRole === "w" || currentRole === "writer") currentRole = "writer";
//     else if (currentRole === "a" || currentRole === "admin")
//       currentRole = "admin";
//     else currentRole = "reader";

//     return {
//       ...user,
//       role: currentRole,
//     };
//   });

//   const [users, setUsers] = useState(sanitizedUsers);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isPending, startTransition] = useTransition();

//   // ইউজার ডিলিট করার কনফার্মেশন হ্যান্ডেলার
//   const handleConfirmDelete = () => {
//     if (!selectedUser) return;

//     startTransition(async () => {
//       try {
//         const response = await deleteUser(selectedUser._id);
//         if (response) {
//           setUsers((prev) =>
//             prev.filter((user) => user._id !== selectedUser._id),
//           );
//           toast.error('User Delete Successfully!')
//           setSelectedUser(null);
//         }
//       } catch (error) {
//         console.error("Failed to delete user:", error);
//       }
//     });
//   };

//   // স্ট্যাটাস কার্ডের হিসাব
//   const totalUsers = users.length;
//   const totalWriters = users.filter((u) => u.role === "writer").length;
//   const totalAdmins = users.filter((u) => u.role === "admin").length;

//   return (
//     <div className="space-y-8 relative">
//       {/* গ্লোবাল লোডিং ওভারলে (ডিলিট হওয়ার সময় কাজ করবে) */}
//       {isPending && (
//         <div className="fixed inset-0 bg-[#2c3e50]/10 backdrop-blur-[1px] z-50 flex items-center justify-center pointer-events-none">
//           <div className="bg-white p-4 rounded-2xl shadow-xl border border-[#ecd5cf]/40 flex items-center gap-3">
//             <Loader2 className="animate-spin text-[#b36b6b]" size={20} />
//             <span className="text-xs font-bold text-[#2c3e50]">
//               Deleting User Record...
//             </span>
//           </div>
//         </div>
//       )}

//       {/* ================= VIBRANT STATS CARDS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//         {/* ১. Total Registered Users */}
//         <Card className="bg-gradient-to-br from-[#2c3e50] to-[#1a252f] text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
//           <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
//           <div className="flex items-start justify-between w-full">
//             <div className="space-y-2">
//               <span className="text-xs font-bold text-gray-300 uppercase tracking-widest block">
//                 Total Registered
//               </span>
//               <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
//                 {totalUsers}
//               </h3>
//             </div>
//             <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
//               <Users size={22} strokeWidth={2.5} />
//             </div>
//           </div>
//         </Card>

//         {/* ২. Writers Card */}
//         <Card className="bg-gradient-to-br from-[#b36b6b] to-[#8c5353] text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
//           <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
//           <div className="flex items-start justify-between w-full">
//             <div className="space-y-2">
//               <span className="text-xs font-bold text-white/80 uppercase tracking-widest block">
//                 Writers
//               </span>
//               <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
//                 {totalWriters}
//               </h3>
//             </div>
//             <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
//               <UserCheck size={22} strokeWidth={2.5} />
//             </div>
//           </div>
//         </Card>

//         {/* ৩. Admins Card */}
//         <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-2xl relative overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-none min-h-[130px] flex flex-col justify-between">
//           <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-500 blur-sm" />
//           <div className="flex items-start justify-between w-full">
//             <div className="space-y-2">
//               <span className="text-xs font-bold text-white/80 uppercase tracking-widest block">
//                 Admins
//               </span>
//               <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight drop-shadow-sm">
//                 {totalAdmins}
//               </h3>
//             </div>
//             <div className="p-3 bg-white/10 text-white rounded-xl shadow-inner mt-0.5">
//               <Shield size={22} strokeWidth={2.5} />
//             </div>
//           </div>
//         </Card>
//       </div>

//       {/* ================= HERO UI TABLE ================= */}
//       <div className="border border-[#ecd5cf]/30 rounded-[24px] overflow-hidden bg-white shadow-sm">
//         <Table className="min-w-full">
//           <Table.ScrollContainer>
//             <Table.Content aria-label="User Management Dashboard">
//               <Table.Header>
//                 <Table.Column
//                   isRowHeader
//                   className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6"
//                 >
//                   User Details
//                 </Table.Column>
//                 <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
//                   Email
//                 </Table.Column>
//                 <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6">
//                   Role
//                 </Table.Column>
//                 <Table.Column className="bg-[#fbf4f2]/60 text-[#2c3e50] font-bold text-xs uppercase h-14 px-6 text-center">
//                   Actions
//                 </Table.Column>
//               </Table.Header>

//               <Table.Body>
//                 {users.map((user) => {
//                   return (
//                     <Table.Row
//                       key={user._id}
//                       className="border-b border-[#ecd5cf]/20 last:border-0 hover:bg-[#fbf4f2]/20 transition-colors h-16"
//                     >
//                       {/* ১. Name & Image */}
//                       <Table.Cell className="px-6">
//                         <div className="flex items-center gap-3">
//                           <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#ecd5cf]/40 bg-gray-50 shrink-0">
//                             <Image
//                               src={
//                                 user.image ||
//                                 "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5GX1lkI6T4INseXlhyZhaGMtq07LNid9Tw&s"
//                               }
//                               alt={user.name}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <span className="font-serif font-bold text-[#2c3e50] text-sm md:text-base">
//                             {user.name}
//                           </span>
//                         </div>
//                       </Table.Cell>

//                       {/* ২. Email */}
//                       <Table.Cell className="px-6">
//                         <div className="flex items-center gap-2 text-gray-500 text-sm">
//                           <Mail size={14} className="text-gray-400" />
//                           <span>{user.email}</span>
//                         </div>
//                       </Table.Cell>

//                       {/* ৩. Role */}
//                       <Table.Cell className="px-6">
//                         <span
//                           className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
//                             user.role === "admin"
//                               ? "bg-red-50 text-red-700 border-red-200"
//                               : user.role === "writer"
//                                 ? "bg-purple-50 text-purple-700 border-purple-200"
//                                 : "bg-emerald-50 text-emerald-700 border-emerald-200"
//                           }`}
//                         >
//                           {user.role}
//                         </span>
//                       </Table.Cell>

//                       {/* ৪. Actions */}
//                       <Table.Cell className="px-6 text-center">
//                         <div className="flex items-center justify-center">
//                           <AlertDialog>
//                             <Button
//                               isIconOnly
//                               variant="danger"
//                               onClick={() => setSelectedUser(user)}
//                               className="h-9 w-9 bg-red-50 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all border border-red-100"
//                             >
//                               <Trash2 size={16} />
//                             </Button>

//                             <AlertDialog.Backdrop>
//                               <AlertDialog.Container>
//                                 <AlertDialog.Dialog className="sm:max-w-[420px] bg-white border border-[#ecd5cf]/50 rounded-[28px] shadow-2xl p-5 text-left">
//                                   <AlertDialog.CloseTrigger />
//                                   <AlertDialog.Header className="flex gap-3 items-center">
//                                     <AlertDialog.Icon
//                                       status="danger"
//                                       className="bg-red-50 text-red-500"
//                                     />
//                                     <AlertDialog.Heading className="font-serif font-black text-[#2c3e50]">
//                                       Terminate Account?
//                                     </AlertDialog.Heading>
//                                   </AlertDialog.Header>
//                                   <AlertDialog.Body>
//                                     <p className="text-sm text-gray-500 leading-relaxed">
//                                       Are you sure you want to permanently
//                                       delete{" "}
//                                       <strong>{selectedUser?.name}</strong>?
//                                       This action cannot be undone.
//                                     </p>
//                                   </AlertDialog.Body>
//                                   <AlertDialog.Footer>
//                                     <Button
//                                       variant="tertiary"
//                                       onClick={() => setSelectedUser(null)}
//                                     >
//                                       Cancel
//                                     </Button>
//                                     <Button
//                                       variant="danger"
//                                       onClick={handleConfirmDelete}
//                                     >
//                                       Delete User
//                                     </Button>
//                                   </AlertDialog.Footer>
//                                 </AlertDialog.Dialog>
//                               </AlertDialog.Container>
//                             </AlertDialog.Backdrop>
//                           </AlertDialog>
//                         </div>
//                       </Table.Cell>
//                     </Table.Row>
//                   );
//                 })}
//               </Table.Body>
//             </Table.Content>
//           </Table.ScrollContainer>
//         </Table>
//       </div>
//     </div>
//   );
// }
