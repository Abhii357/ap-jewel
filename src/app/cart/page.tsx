"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Trash2, Plus, Minus, Tag, X, ShoppingBag, ArrowRight } from "lucide-react";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeItemFromCart = useStore((state) => state.removeItemFromCart);
  const coupon = useStore((state) => state.coupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);

  // Local coupon input state
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Calculators
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discount = 0;
  if (coupon) {
    if (coupon.discountType === "PERCENTAGE") {
      discount = subtotal * (coupon.value / 100);
    } else {
      discount = coupon.value;
    }
  }

  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "WELCOME10") {
      applyCoupon({
        code: "WELCOME10",
        discountType: "PERCENTAGE",
        value: 10,
        minOrderAmount: 20000,
      });
      setCouponSuccess(true);
      setCouponCode("");
    } else if (code === "FESTIVE5000") {
      if (subtotal < 50000) {
        setCouponError("This coupon requires a minimum purchase of ₹50,000.");
        return;
      }
      applyCoupon({
        code: "FESTIVE5000",
        discountType: "FLAT",
        value: 5000,
        minOrderAmount: 50000,
      });
      setCouponSuccess(true);
      setCouponCode("");
    } else {
      setCouponError("Invalid coupon code. Try WELCOME10.");
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Shopping Cart</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">My Cart</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          {cart.length === 0 ? (
            <div className="text-center bg-white border border-border py-20 px-4 space-y-6 max-w-xl mx-auto rounded-sm shadow-sm">
              <div className="mx-auto w-12 h-12 bg-cream border border-gold/30 rounded-full flex items-center justify-center text-gold">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-charcoal font-semibold">Your Shopping Cart is Empty</h3>
              <p className="text-xs text-charcoal/50 leading-relaxed max-w-xs mx-auto">
                You haven't added any luxury jewelry items to your cart yet. Explore our latest designs to get started.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-gold hover:bg-gold-dark text-white px-8 py-3 text-xs font-semibold uppercase tracking-widest transition-colors rounded-sm"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Cart items (7 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-border p-4 sm:p-6 rounded-sm shadow-sm flex flex-col sm:flex-row justify-between items-stretch gap-6"
                  >
                    {/* Item Thumbnail */}
                    <div className="flex gap-4 items-center">
                      <div className="h-20 w-20 bg-cream border border-border rounded-sm overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="font-serif text-sm sm:text-base text-charcoal font-semibold">{item.name}</h3>
                        <p className="text-[10px] text-charcoal/50 uppercase tracking-wider font-semibold">
                          {item.metalPurity} • {item.metalType} • {item.weight}g
                        </p>
                        <p className="text-xs font-semibold text-gold-dark font-serif">
                          ₹{item.price.toLocaleString("en-IN")} <span className="text-[10px] text-charcoal/40 font-normal">/ unit</span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity controls & Delete */}
                    <div className="flex sm:flex-col justify-between items-center sm:items-end gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 border-border/50">
                      {/* Counter */}
                      <div className="flex items-center border border-border bg-cream/50 rounded-sm">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:text-gold transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-3.5 text-xs font-semibold text-charcoal select-none">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:text-gold transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="flex items-center gap-4">
                        <strong className="text-sm font-serif font-bold text-charcoal">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </strong>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-charcoal/40 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* Right Column: Order Summary (4 Cols) */}
              <div className="lg:col-span-4 bg-white border border-border p-6 rounded-sm shadow-sm space-y-6">
                <h2 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Order Summary</h2>
                
                <div className="space-y-3.5 text-xs text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Subtotal (including GST)</span>
                    <span className="font-semibold text-charcoal">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 border border-emerald-100 rounded-sm">
                      <span className="flex items-center gap-1">
                        <Tag className="h-3.5 w-3.5" />
                        Discount ({coupon.code})
                      </span>
                      <span className="flex items-center gap-1">
                        - ₹{discount.toLocaleString("en-IN")}
                        <button onClick={removeCoupon} className="hover:text-rose-600 ml-1">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </div>
                  )}

                  <div className="h-px bg-border pt-1" />
                  
                  <div className="flex justify-between text-sm font-serif font-semibold text-charcoal">
                    <span>Grand Total:</span>
                    <span className="text-gold-dark text-base">₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {!coupon && (
                  <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-border/50">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal/70 block mb-2">Apply Coupon Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="E.g. WELCOME10"
                        className="flex-1 bg-cream border border-border px-3 py-2 text-xs text-luxury-black focus:outline-none focus:border-gold placeholder:text-charcoal/30 font-semibold uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-gold hover:bg-gold-dark text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[10px] text-rose-600 mt-1 font-semibold">{couponError}</p>}
                    {couponSuccess && <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Coupon applied successfully!</p>}
                    <p className="text-[9px] text-charcoal/40 mt-1">Hint: Use **WELCOME10** for 10% off.</p>
                  </form>
                )}

                <Link
                  href="/checkout"
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm text-center"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <div className="text-center pt-2">
                  <span className="text-[10px] text-charcoal/40 font-semibold">
                    BIS Hallmarked • Free Insured Delivery in India
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
