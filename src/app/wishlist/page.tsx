"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addItemToCart = useStore((state) => state.addItemToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">My Collection</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">My Wishlist</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center bg-white border border-border py-20 px-4 space-y-6 max-w-xl mx-auto rounded-sm shadow-sm">
              <div className="mx-auto w-12 h-12 bg-cream border border-gold/30 rounded-full flex items-center justify-center text-gold">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold">Your Wishlist is Empty</h3>
              <p className="text-xs text-charcoal/50 leading-relaxed max-w-xs mx-auto">
                Keep track of gold and diamond articles you love. Add designs here while browsing our catalog.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm"
              >
                Browse Designs
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-border group overflow-hidden flex flex-col justify-between rounded-sm shadow-sm hover:shadow-md transition-shadow relative"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => toggleWishlist(item)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full border border-border/50 text-rose-600 hover:text-rose-700 transition-colors"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  <div className="relative h-[250px] w-full bg-cream overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center group-hover:scale-103 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 left-3 bg-charcoal/90 text-gold-light text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold">
                      {item.metalPurity} • {item.metalType}
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base text-charcoal font-medium leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-sm font-semibold text-gold-dark mt-1 font-serif">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/50 flex gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex-1 bg-cream hover:bg-gold-light border border-border text-charcoal hover:text-gold text-center py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-colors"
                      >
                        Details
                      </Link>
                      
                      <button
                        onClick={() => {
                          addItemToCart({
                            id: item.id,
                            name: item.name,
                            slug: item.slug,
                            image: item.image,
                            weight: 10,
                            metalType: item.metalType,
                            metalPurity: item.metalPurity,
                            makingChargesType: "PERCENTAGE",
                            makingChargesValue: 10,
                            price: item.price,
                          });
                          toggleWishlist(item);
                        }}
                        className="bg-gold hover:bg-gold-dark text-white px-4 py-2.5 rounded-sm transition-colors flex items-center justify-center gap-1.5"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span className="text-[10px] uppercase tracking-wider font-semibold">Move To Cart</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
