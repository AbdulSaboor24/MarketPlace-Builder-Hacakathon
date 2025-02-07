"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SearchIcon, CartIcon, UserIcon, MenuIcon, CloseIcon, Heart } from "./icons";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname(); // Get current page

  const navLinks = [
    { href: "/shop", label: "All Products" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/brands", label: "Brands" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value); // Call only if `onSearch` exists
  };

  return (
    <nav className="bg-white border-b top-0 z-20">
      <div className="max-w-[1380px] mx-auto">
        <div className="px-4 lg:px-8 py-5 md:py-7">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden hover:text-gray-600 transition-colors"
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <Link
                href="/"
                className="text-2xl lg:text-[32px] font-bold font-integralCF mb-2 lg:mr-10"
              >
                SHOP.CO
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center space-x-4 flex-grow justify-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-black transition-colors text-sm lg:text-base font-normal"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search Bar - Only visible on /shop */}
            {pathname === "/shop" && (
              <div className="hidden lg:block relative group mr-10">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 py-4 bg-[#F0F0F0] rounded-full w-[600px] focus:w-[300px] focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            )}

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-600 transition-colors relative">
              <Link href='/Wishlist'>
                <Heart className="w-6 h-6" />
              </Link>
              </button>
              <button className="hover:text-gray-600 transition-colors relative">
              <Link href='/cart'>
                <CartIcon className="w-6 h-6" />
              </Link>
              </button>
              <button className="hidden lg:block hover:text-gray-600 transition-colors">
                <UserIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white">
            <div className="p-4">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="text-xl font-bold font-integralCF">
                  SHOP.CO
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Mobile Search - Only visible on /shop */}
                {pathname === "/shop" && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  </div>
                )}

                {/* Other Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-gray-600 hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;