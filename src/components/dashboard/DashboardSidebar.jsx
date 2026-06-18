import { getUserSession } from "@/lib/core/session";
import { Button, Drawer } from "@heroui/react";
import { LayoutSideContentLeft } from "@gravity-ui/icons";
import DashboardNavLink from "./DashboardNavLink"; 

export async function DashboardSidebar() {
    const user = await getUserSession();
    
    // আইকনগুলোকে সরাসরি পাস না করে String/Name হিসেবে দেওয়া হয়েছে
    const writerNavLinks = [
        // { icon: "House", href: "/dashboard/writer", label: "Home" },
        { icon: "Magnifier", href: "/dashboard/writer", label: "Manage Ebooks" },
        { icon: "CirclePlus", href: "/dashboard/writer/add-ebooks", label: "Add Ebook" },
        // { icon: "Edit", href: "/dashboard/writer/edit-ebook", label: "Edit Ebook" },
        { icon: "Bookmark", href: "/dashboard/writer/bookmark", label: "Bookmark Page" },
        { icon: "HistoryIcon", href: "/dashboard/writer/sales-history", label: "Sales History" },
    ];

    const readerNavLinks = [
        // { icon: "House", href: "/dashboard/reader", label: "Home" },
        { icon: "User2", href: "/dashboard/reader", label: "Profile Management" },
        { icon: "HistoryIcon", href: "/dashboard/reader/purchase-history", label: "Purchase History" },
        { icon: "BiPurchaseTag", href: "/dashboard/reader/purchase-ebooks", label: "Purchased Ebooks" },
        { icon: "Bookmark", href: "/dashboard/reader/bookmark", label: "Bookmark Page" },
    ];

    const adminNavLinks = [
        // { icon: "LayoutDashboard", href: "/dashboard/admin", label: "Dashboard" },
        { icon: "House", href: "/dashboard/admin", label: "Dashboard Home Page" },
        { icon: "User2", href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: " Books", href: "/dashboard/admin/all-ebooks", label: "Manage All Ebooks" },
        { icon: "GrTransaction", href: "/dashboard/admin/all-transactions", label: "View All Transactions" },
    ];

    const navLinksMap = {
        reader: readerNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks
    };

    const currentRole = user?.role || 'reader';
    const navItems = navLinksMap[currentRole];

    const navContent = (
        <div className="flex h-full flex-col justify-between py-2">
            <div>
                {/* প্রোফাইল পার্ট */}
                <div className="mb-8 px-3 py-2 flex items-center gap-3 border-b border-[#ecd5cf]/40 pb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#b36b6b] text-white font-serif font-bold shadow-md shadow-[#b36b6b]/20">
                        {user?.name ? user.name[0].toUpperCase() : 'F'}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#2c3e50] line-clamp-1">{user?.name || "Fable User"}</span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#b36b6b]/80">{currentRole} Portal</span>
                    </div>
                </div>

                {/* নেভিগেশন লিংকসমূহ */}
                <nav className="flex flex-col gap-1.5">
                    {navItems.map((item) => (
                        <DashboardNavLink key={item.label} item={item} />
                    ))}
                </nav>
            </div>

            <div className="mt-auto px-3 py-2">
                <div className="rounded-xl bg-[#b36b6b]/5 p-3.5 border border-[#ecd5cf]/40 text-center">
                    <p className="text-xs font-serif italic text-[#2c3e50]/80">"Ocean Of Book"</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <aside className="hidden w-66 shrink-0 border-r border-[#ecd5cf]/60 bg-white p-5 lg:block min-h-screen shadow-sm shadow-gray-100">
                {navContent}
            </aside>

            <div className="p-4 lg:hidden bg-white border-b border-[#ecd5cf]/40 flex items-center justify-between w-full">
                <Drawer>
                    <Button 
                        className="bg-white border border-[#ecd5cf] hover:bg-[#fbf4f2] text-[#2c3e50] font-medium rounded-xl shadow-sm flex items-center gap-2 h-10 px-4" 
                        variant="flat"
                    >
                        <LayoutSideContentLeft className="text-[#b36b6b] size-4" />
                        Menu Dashboard
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left" className="bg-white max-w-[280px]">
                            <Drawer.Dialog className="border-none focus:outline-none">
                                <Drawer.CloseTrigger className="absolute top-4 right-4 text-gray-400 hover:text-black" />
                                <Drawer.Header className="border-b border-[#ecd5cf]/30 pb-3 mt-2">
                                    <Drawer.Heading className="font-serif text-xl font-bold text-[#2c3e50]">
                                        Fable <span className="text-[#b36b6b]">Menu</span>
                                    </Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body className="px-4 py-2 h-[calc(100vh-80px)]">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
                <span className="font-serif font-bold text-lg text-[#2c3e50]">Fable.</span>
            </div>
        </>
    );
}





// import { getUserSession } from "@/lib/core/session";
// import { LayoutSideContentLeft, Bell,Briefcase, Envelope, Gear, House, Magnifier, Person, CreditCard, FileText, Bookmark, CirclePlus } from "@gravity-ui/icons";
// import { Button, Drawer } from "@heroui/react";
// import { Building2, HistoryIcon, LayoutDashboard, User, User2 } from "lucide-react";
// import Link from "next/link";
// import { BiPurchaseTag } from "react-icons/bi";

// export async function DashboardSidebar() {

//     const user = await getUserSession();
//     const writerNavLinks = [
//         { icon: House, href: "/dashboard/writer", label: "Home" },
//         { icon: Magnifier, href: "/dashboard/writer/manage-ebooks", label: "Manage Ebooks" },
//         { icon: CirclePlus, href: "/dashboard/writer/add-ebook", label: "Add Ebook" },
//         { icon: Bookmark, href: "/dashboard/writer/bookmark", label: "Bookmark Page" },
//         { icon: HistoryIcon, href: "/dashboard/writer/sales-history", label: "Sales History" },
//     ];

//     const readerNavLinks = [
//   { icon: House, href: "/dashboard/reader", label: "Home" },
//   { icon: HistoryIcon, href: "/dashboard/reader/purchase-history", label: "Purchase History" },
//   { icon: BiPurchaseTag, href: "/dashboard/reader/purchase-ebooks", label: "Purchased Ebooks" },
//   { icon: User2, href: "/dashboard/reader/profile", label: "Profile Management" },
//   { icon: Bookmark, href: "/dashboard/reader/bookmark", label: "Bookmark Page" },
// ];

// const adminNavLinks = [
//   { icon: LayoutDashboard, href: "/dashboard/admin", label: "Dashboard" },
//   { icon: User, href: "/dashboard/admin/users", label: "Manage Users" },
//   { icon: Building2, href: "/dashboard/admin/companies", label: "Manage All Ebooks" },
//   { icon: Briefcase, href: "/dashboard/admin/jobs", label: "View All Transactions" },
//   { icon: CreditCard, href: "/dashboard/admin/payments", label: "Dashboard Home Page" },
// ];

//     const navLinksMap = {
//         reader: readerNavLinks,
//         writer: writerNavLinks,
//         admin: adminNavLinks
//     }


//     const navItems = navLinksMap[user?.role || 'reader'];

//     const navContent = <nav className="flex flex-col gap-1">
//         {navItems.map((item) => (
//             <Link
//                 key={item.label}
//                 className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
//                 href={item.href}
//             >
//                 <item.icon className="size-5 text-muted" />
//                 {item.label}
//             </Link>
//         ))}
//     </nav>

//     return (
//         <>
//             <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
//                 {navContent}
//             </aside>
//             <Drawer>
//                 <Button className="lg:hidden" variant="secondary">
//                     <LayoutSideContentLeft />
//                     Sidebar
//                 </Button>
//                 <Drawer.Backdrop>
//                     <Drawer.Content placement="left">
//                         <Drawer.Dialog>
//                             <Drawer.CloseTrigger />
//                             <Drawer.Header>
//                                 <Drawer.Heading>Navigation</Drawer.Heading>
//                             </Drawer.Header>
//                             <Drawer.Body>
//                                 {navContent}
//                             </Drawer.Body>
//                         </Drawer.Dialog>
//                     </Drawer.Content>
//                 </Drawer.Backdrop>
//             </Drawer>
//         </>
//     );
// }