'use client';

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function FableNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState("Home");


  const { data: session } = authClient.useSession()
  const user = session?.user;


  // রিকোয়ারমেন্ট অনুযায়ী মেনু লিংকসমূহ
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Ebooks", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  const handleLinkClick = (routeName) => {
    setActiveRoute(routeName);
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
            href="#" 
            onClick={() => handleLinkClick("Home")}
            className="flex items-center gap-2 font-serif font-bold text-xl text-foreground tracking-wide cursor-pointer"
          >
            <span className="text-[#b36b6b]">Fable</span>
          </Link>
        </div>

        {/* ================= MIDDLE: NAVIGATION LINKS ================= */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={() => handleLinkClick(link.name)}
                className={`text-lg font-medium transition-colors relative py-1 block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#b36b6b] after:transition-transform after:duration-200 ${
                  activeRoute === link.name
                    ? "text-[#b36b6b] font-semibold after:scale-x-100"
                    : "text-foreground/80 hover:text-[#b36b6b] after:scale-x-0 hover:after:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ================= RIGHT SIDE: AUTH BUTTONS ================= */}

        <div className="flex items-center gap-3">

          {/* <Button
                size="sm"
                variant="light"
                className="text-foreground/80 hover:text-[#b36b6b]"
              >
                <Link href="/signin">
                Sign In
                </Link>
                
              </Button>
              <Button
                size="sm"
                className="bg-[#b36b6b] text-white"
                radius="full"
              >
                <Link href="/signup">
                  Register
                </Link>
                
              </Button> */}
          {user ? ( <>
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
                <Link href="/signin">
                Sign In
                </Link>
                
              </Button>
              <Button
                size="sm"
                className="bg-[#b36b6b] text-white"
                radius="full"
              >
                <Link href="/signup">
                  Register
                </Link>
                
              </Button>
            </>
          )}
        </div>
      </header>

      {/* ================= MOBILE DROPDOWN MENU ================= */}
      {isMenuOpen && (
        <div className="border-t border-divider bg-background md:hidden">
          <ul className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`block py-2 px-3 text-sm rounded-lg ${
                    activeRoute === link.name
                      ? "bg-[#b36b6b]/10 text-[#b36b6b] font-semibold"
                      : "text-foreground/80 hover:bg-default-100"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}