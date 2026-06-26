"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  MapPin,
  Settings,
} from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const user = useStore((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalWishlistItems = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop All", href: "/shop" },
    { name: "Categories", href: "/categories" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-charcoal hover:text-gold p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Left: Navigation Links (Desktop) */}
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-2 relative group ${
                    isActive ? "text-gold" : "text-charcoal hover:text-gold"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : ""
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Center: Luxury Logo */}
          <div className="flex-1 flex justify-center md:justify-center">
            <Link href="/" className="flex flex-col items-center select-none text-center">
              <span className="text-2xl sm:text-3xl font-serif tracking-[0.25em] text-charcoal font-semibold hover:text-gold transition-colors">
                AP JEWEL
              </span>
              <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-0.5 font-sans font-medium flex items-center gap-1 justify-center">
                <Sparkles className="h-2 w-2 animate-pulse text-gold" /> Munger • Bihar <Sparkles className="h-2 w-2 animate-pulse text-gold" />
              </span>
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-charcoal hover:text-gold p-2 transition-colors relative"
              aria-label="Search Products"
            >
              <Search className="h-5.5 w-5.5" />
            </button>

            {/* Admin Panel Quick Link */}
            {mounted && user?.role === "ADMIN" && (
              <Link
                href="/admin/dashboard"
                className="text-gold hover:text-gold-dark p-2 transition-colors flex items-center gap-1 text-xs font-semibold uppercase tracking-wider hidden sm:flex"
                title="Admin Panel"
              >
                <Settings className="h-5 w-5" />
                <span>Admin</span>
              </Link>
            )}

            {/* User Profile */}
            <Link
              href={mounted && user ? "/account" : "/account"}
              className={`p-2 transition-colors ${
                pathname.startsWith("/account") ? "text-gold" : "text-charcoal hover:text-gold"
              }`}
              title="My Account"
            >
              <User className="h-5.5 w-5.5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className={`p-2 transition-colors relative ${
                pathname === "/wishlist" ? "text-gold" : "text-charcoal hover:text-gold"
              }`}
              title="My Wishlist"
            >
              <Heart className="h-5.5 w-5.5" />
              {mounted && totalWishlistItems > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-sans animate-scale-in border border-background">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className={`p-2 transition-colors relative ${
                pathname === "/cart" ? "text-gold" : "text-charcoal hover:text-gold"
              }`}
              title="Shopping Cart"
            >
              <ShoppingBag className="h-5.5 w-5.5" />
              {mounted && totalCartItems > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold font-sans animate-scale-in border border-background">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Search Bar dropdown */}
      {searchOpen && (
        <div className="absolute top-20 left-0 w-full bg-background border-b border-border p-4 shadow-md animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium rings, necklaces, bangles, bridal collections..."
                className="w-full pl-10 pr-4 py-3 bg-cream border border-border focus:border-gold focus:outline-none text-sm font-sans rounded-sm text-luxury-black"
                autoFocus
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-charcoal/50" />
            </div>
            <button
              type="submit"
              className="bg-gold hover:bg-gold-dark text-white px-6 py-3 text-xs tracking-wider uppercase font-semibold transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="text-charcoal hover:text-gold p-2"
            >
              <X className="h-5 w-5" />
            </button>
          </form>
        </div>
      )}

    </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer Panel */}
          <div className="relative flex flex-col w-4/5 max-w-sm bg-white border-r border-border h-full p-6 z-50 shadow-2xl animate-slide-in">
            <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
              <span className="font-serif tracking-widest text-xl font-bold">AP JEWEL</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-charcoal hover:text-gold p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col space-y-8 text-base uppercase tracking-widest font-bold flex-1 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`hover:text-gold transition-colors ${
                    pathname === link.href ? "text-gold" : "text-charcoal"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/store-location"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 hover:text-gold transition-colors text-gold border-t border-border pt-6"
              >
                <MapPin className="h-4 w-4" />
                <span>Store Location</span>
              </Link>
              {mounted && user?.role === "ADMIN" && (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 hover:text-gold transition-colors text-gold-dark"
                >
                  <Settings className="h-4 w-4" />
                  <span>Admin Panel</span>
                </Link>
              )}
            </nav>

            <div className="border-t border-border pt-6 mt-auto">
              <p className="text-xs text-charcoal/50 text-center font-sans">
                BIS Hallmarked • 100% Certified Jewelry
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
