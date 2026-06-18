'use client';

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { usePathname } from "next/navigation"; // ১. নেক্সট জেএস-এর পাথনেম হুক ইমপোর্ট করা হলো
import { authClient } from "@/lib/auth-client";

export default function FableNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname(); // ২. কারেন্ট ইউআরএল পাথ ট্র্যাক করার জন্য ভ্যারিয়েবল নেওয়া হলো

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
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto w-full">
        
        {/* ================= LEFT SIDE: LOGO ================= */}
        <div className="flex items-center gap-4">
          {/* মোবাইল হ্যামবার্গার মেনু টগল বাটন */}
          <button
            className="md:hidden text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
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
            className="flex items-center gap-2 font-serif font-bold text-xl text-foreground tracking-wide cursor-pointer"
          >
            <span className="text-[#b36b6b]">Fable</span>
          </Link>
        </div>

        {/* ================= MIDDLE: NAVIGATION LINKS ================= */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            // ৩. কারেন্ট পাথনেমের সাথে লিংকের href মিলছে কিনা তা চেক করা হচ্ছে
            // ড্যাশবোর্ড সাব-রাউটগুলোর ম্যাচিং নিখুঁত রাখার জন্য starsWith বা সরাসরি ইকুয়াল চেক করা হয়েছে
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`text-lg font-medium transition-colors relative py-1 block after:w-full after:bg-[#b36b6b] after:duration-200 ${
                    isActive ? "text-[#b36b6b] font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ================= RIGHT SIDE: AUTH BUTTONS ================= */}
        <div className="flex items-center gap-3">
          {user ? ( 
            <>
              <p>Hi, {user.name}</p>
              <Button onClick={async() => await authClient.signOut()} variant="danger" size="sm">SignOut</Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="light"
                className="text-foreground/80 hover:text-[#b36b6b]"
              >
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                size="sm"
                className="bg-[#b36b6b] text-white"
                radius="full"
              >
                <Link href="/signup" className={'text-white'}>Register</Link>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-divider bg-background md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`block py-2 px-3 text-sm rounded-lg ${
                      isActive
                        ? "bg-[#b36b6b]/10 text-[#b36b6b] font-semibold"
                        : "text-foreground/80 hover:bg-default-100"
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