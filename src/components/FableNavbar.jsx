'use client';

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation"; // ১. নেক্সট জেএস-এর পাথনেম হুক ইমপোর্ট করা হলো
import { authClient } from "@/lib/auth-client";

export default function FableNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ২. কারেন্ট ইউআরএল পাথ ট্র্যাক করার জন্য ভ্যারিয়েবল নেওয়া হলো

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // রিকোয়ারমেন্ট অনুযায়ী মেনু লিংকসমূহ
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "/ebooks" },
  ];

  const dashboardLinks = {
    reader: '/dashboard/reader',
    writer: '/dashboard/writer',
    admin: '/dashboard/admin'
  };

  if(user?.email){
    navLinks.push(
      {
        name: 'Dashboard',
        href: dashboardLinks[user?.role || 'reader']
      }
    );
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false); // মোবাইল মেনু ওপেন থাকলে লিঙ্ক ক্লিকের পর ড্রয়ার বন্ধ হবে
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#ecd5cf]/20 bg-background/70 backdrop-blur-md transition-all duration-300">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        
        {/* ================= LEFT SIDE: LOGO ================= */}
        <div className="flex items-center gap-4">
          {/* মোবাইল হ্যামবার্গার মেনু টগল বাটন */}
          <button
            className="md:hidden text-[#2c3e50] dark:text-foreground p-1.5 rounded-xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          
          {/* ব্র্যান্ড লোগো */}
          <Link 
            href="/" 
            onClick={handleLinkClick}
            className="flex items-center gap-2 font-serif font-black text-3xl tracking-tight cursor-pointer group"
          >
            <span className="text-[#b36b6b] bg-gradient-to-r from-[#b36b6b] to-[#c98383] bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
              Fable
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2c3e50] dark:bg-white mt-2 animate-pulse" />
          </Link>
        </div>

        {/* ================= MIDDLE: NAVIGATION LINKS ================= */}
        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            // ৩. কারেন্ট পাথনেমের সাথে লিংকের href মিলছে কিনা তা চেক করা হচ্ছে
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li key={link.name} className="relative">
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-lg font-semibold transition-all duration-300 relative py-2 block ${
                    isActive ? "text-[#b36b6b]" : "text-[#2c3e50]/80 dark:text-foreground/80"
                  }`}
                >
                  {link.name}
                  {/* স্লিক অ্যান্ড প্রিমিয়াম আন্ডারলাইন অ্যানিমেশন */}
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#b36b6b] rounded-full transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`} />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ================= RIGHT SIDE: AUTH BUTTONS ================= */}
        <div className="flex items-center gap-4">
          {user ? ( 
            <div className="flex items-center gap-3.5 bg-[#fbf4f2] dark:bg-slate-900 border border-[#ecd5cf]/30 pl-3.5 pr-2 py-1 rounded-full shadow-sm">
              <p className="text-xs font-semibold text-[#2c3e50] dark:text-gray-300">
                Hi, <span className="text-[#b36b6b] font-bold">{user.name}</span>
              </p>
              <Button 
                onClick={async() => await authClient.signOut()} 
                size="sm"
                radius="full"
                className="bg-danger-500 hover:bg-danger-600 text-white font-medium text-xs px-4 shadow-sm hover:shadow transition-all duration-200"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="light"
                radius="full"
                className="text-[#2c3e50] dark:text-foreground/80 font-semibold hover:text-[#b36b6b] hover:bg-[#b36b6b]/5 px-4 text-xs tracking-wide"
              >
                <Link href="/signin" className="text-inherit">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-[#b36b6b] to-[#a25a5a] text-white font-bold px-5 shadow-md shadow-[#b36b6b]/10 hover:shadow-lg hover:shadow-[#b36b6b]/20 hover:-translate-y-0.5 transition-all duration-200 text-xs tracking-wide"
                radius="full"
              >
                <Link href="/signup" className="text-white">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-[#ecd5cf]/20 bg-background/95 backdrop-blur-xl md:hidden animate-fadeIn shadow-lg">
          <ul className="flex flex-col gap-1.5 p-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block py-3 px-4 text-sm rounded-xl font-medium tracking-wide transition-all duration-200 ${
                      isActive
                        ? "bg-[#b36b6b]/10 text-[#b36b6b] font-bold shadow-inner"
                        : "text-[#2c3e50]/80 dark:text-foreground/80 hover:bg-default-100"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
}


// 'use client';

// import { useState } from "react";
// import { Link, Button } from "@heroui/react";
// import { usePathname } from "next/navigation"; // ১. নেক্সট জেএস-এর পাথনেম হুক ইমপোর্ট করা হলো
// import { authClient } from "@/lib/auth-client";

// export default function FableNavbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname(); // ২. কারেন্ট ইউআরএল পাথ ট্র্যাক করার জন্য ভ্যারিয়েবল নেওয়া হলো

//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // রিকোয়ারমেন্ট অনুযায়ী মেনু লিংকসমূহ
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Ebooks", href: "/ebooks" },
//   ];

//   const dashboardLinks = {
//     reader: '/dashboard/reader',
//     writer: '/dashboard/writer',
//     admin: '/dashboard/admin'
//   };

//   if(user?.email){
//     navLinks.push(
//       {
//         name: 'Dashboard',
//         href: dashboardLinks[user?.role || 'reader']
//       }
//     );
//   }

//   const handleLinkClick = () => {
//     setIsMenuOpen(false); // মোবাইল মেনু ওপেন থাকলে লিঙ্ক ক্লিকের পর ড্রয়ার বন্ধ হবে
//   };

//   return (
//     <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
//       <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        
//         {/* ================= LEFT SIDE: LOGO ================= */}
//         <div className="flex items-center gap-4">
//           {/* মোবাইল হ্যামবার্গার মেনু টগল বাটন */}
//           <button
//             className="md:hidden text-foreground focus:outline-none"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
          
//           {/* ব্র্যান্ড লোগো */}
//           <Link 
//             href="/" 
//             onClick={handleLinkClick}
//             className="flex items-center gap-2 font-serif font-bold text-xl text-foreground tracking-wide cursor-pointer"
//           >
//             <span className="text-[#b36b6b]">Fable</span>
//           </Link>
//         </div>

//         {/* ================= MIDDLE: NAVIGATION LINKS ================= */}
//         <ul className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => {
//             // ৩. কারেন্ট পাথনেমের সাথে লিংকের href মিলছে কিনা তা চেক করা হচ্ছে
//             // ড্যাশবোর্ড সাব-রাউটগুলোর ম্যাচিং নিখুঁত রাখার জন্য starsWith বা সরাসরি ইকুয়াল চেক করা হয়েছে
//             const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

//             return (
//               <li key={link.name}>
//                 <Link
//                   href={link.href}
//                   onClick={handleLinkClick}
//                   className={`text-lg font-medium transition-colors relative py-1 block after:w-full after:bg-[#b36b6b] after:duration-200 ${
//                     isActive ? "text-[#b36b6b] font-semibold" : ""
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>

//         {/* ================= RIGHT SIDE: AUTH BUTTONS ================= */}
//         <div className="flex items-center gap-3">
//           {user ? ( 
//             <>
//               <p>Hi, {user.name}</p>
//               <Button onClick={async() => await authClient.signOut()} variant="danger" size="sm">SignOut</Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 size="sm"
//                 variant="light"
//                 className="text-foreground/80 hover:text-[#b36b6b]"
//               >
//                 <Link href="/signin">Sign In</Link>
//               </Button>
//               <Button
//                 size="sm"
//                 className="bg-[#b36b6b] text-white"
//                 radius="full"
//               >
//                 <Link href="/signup" className={'text-white'}>Register</Link>
//               </Button>
//             </>
//           )}
//         </div>
//       </header>

//       {/* ================= MOBILE DROPDOWN MENU ================= */}
//       {isMenuOpen && (
//         <div className="border-t border-divider bg-background md:hidden">
//           <ul className="flex flex-col gap-1 p-4">
//             {navLinks.map((link) => {
//               const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

//               return (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     onClick={handleLinkClick}
//                     className={`block py-2 px-3 text-sm rounded-lg ${
//                       isActive
//                         ? "bg-[#b36b6b]/10 text-[#b36b6b] font-semibold"
//                         : "text-foreground/80 hover:bg-default-100"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }




// 'use client';

// import { useState } from "react";
// import { Link, Button } from "@heroui/react";
// import { authClient } from "@/lib/auth-client";

// export default function FableNavbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeRoute, setActiveRoute] = useState("Home");


//   const { data: session } = authClient.useSession()
//   const user = session?.user;

//   // রিকোয়ারমেন্ট অনুযায়ী মেনু লিংকসমূহ
//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Browse Ebooks", href: "/ebooks" },
//   ];

//   const dashboardLinks = {
//     reader: '/dashboard/reader',
//     writer: '/dashboard/writer',
//     admin: '/dashboard/admin'
//   }

//   if(user?.email){
//     navLinks.push(
//       {
//         name: 'Dashboard',
//         href: dashboardLinks[user?.role || 'reader']
//       }
//     )
//   }



//   const handleLinkClick = (routeName) => {
//     setActiveRoute(routeName);
//     setIsMenuOpen(false); // মোবাইল মেনু ওপেন থাকলে লিঙ্ক ক্লিকের পর ড্রয়ার বন্ধ হবে
//   };

//   return (
//     <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
//       <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        
//         {/* ================= LEFT SIDE: LOGO ================= */}
//         <div className="flex items-center gap-4">
//           {/* মোবাইল হ্যামবার্গার মেনু টগল বাটন */}
//           <button
//             className="md:hidden text-foreground focus:outline-none"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             <svg
//               className="h-6 w-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
          
//           {/* ব্র্যান্ড লোগো */}
//           <Link 
//             href="#" 
//             onClick={() => handleLinkClick("Home")}
//             className="flex items-center gap-2 font-serif font-bold text-xl text-foreground tracking-wide cursor-pointer"
//           >
//             <span className="text-[#b36b6b]">Fable</span>
//           </Link>
//         </div>

//         {/* ================= MIDDLE: NAVIGATION LINKS ================= */}
//         <ul className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <li key={link.name}>
//               <Link
//                 href={link.href}
//                 onClick={() => handleLinkClick(link.name)}
//                 className={`text-lg font-medium transition-colors relative py-1 block after:w-full after:bg-[#b36b6b] after:duration-200 ${
//                   activeRoute === link.name
//                     ? "text-[#b36b6b] font-semibold"
//                     : ""
//                 }`}
//               >
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* ================= RIGHT SIDE: AUTH BUTTONS ================= */}

//         <div className="flex items-center gap-3">

//           {user ? ( <>
//              <p>Hi, {user.name}</p>
//              <Button onClick={async() => await authClient.signOut()} variant="danger" size="sm">SignOut</Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 size="sm"
//                 variant="light"
//                 className="text-foreground/80 hover:text-[#b36b6b]"
//               >
//                 <Link href="/signin">
//                 Sign In
//                 </Link>
                
//               </Button>
//               <Button
//                 size="sm"
//                 className="bg-[#b36b6b] text-white"
//                 radius="full"
//               >
//                 <Link href="/signup">
//                   Register
//                 </Link>
                
//               </Button>
//             </>
//           )}
//         </div>
//       </header>

//       {/* ================= MOBILE DROPDOWN MENU ================= */}
//       {isMenuOpen && (
//         <div className="border-t border-divider bg-background md:hidden">
//           <ul className="flex flex-col gap-1 p-4">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <Link
//                   href={link.href}
//                   onClick={() => handleLinkClick(link.name)}
//                   className={`block py-2 px-3 text-sm rounded-lg ${
//                     activeRoute === link.name
//                       ? "bg-[#b36b6b]/10 text-[#b36b6b] font-semibold"
//                       : "text-foreground/80 hover:bg-default-100"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// }