"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Loader2, Landmark } from "lucide-react";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const cart = useStore((state) => state.cart);
  const coupon = useStore((state) => state.coupon);
  const clearCart = useStore((state) => state.clearCart);

  // Form State
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "Munger",
    state: "Bihar",
    postalCode: "811201",
    country: "India",
  });

  // Flow State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSimOpen, setPaymentSimOpen] = useState(false);
  const [successOrder, setSuccessOrder] = useState<any>(null);

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

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingForm.name || !shippingForm.email || !shippingForm.phone || !shippingForm.addressLine1) {
      alert("Please fill in all required shipping fields.");
      return;
    }
    setPaymentSimOpen(true);
  };

  const handleCompleteSimulatedPayment = async () => {
    setPaymentSimOpen(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          guestEmail: shippingForm.email,
          guestName: shippingForm.name,
          guestPhone: shippingForm.phone,
          addressLine1: shippingForm.addressLine1,
          addressLine2: shippingForm.addressLine2,
          city: shippingForm.city,
          state: shippingForm.state,
          postalCode: shippingForm.postalCode,
          country: shippingForm.country,
          items: cart,
          totalAmount: finalTotal,
          couponCode: coupon?.code || null,
          discountAmount: discount,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.order) {
        setSuccessOrder(data.order);
        clearCart();
      } else {
        alert(data.error || "Failed to place order. Please check console.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting server. Please verify database connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successOrder) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="flex-1 bg-cream py-20 px-4 sm:px-6 lg:px-8 font-sans">
          <div className="max-w-xl mx-auto bg-white border border-border p-8 rounded-sm shadow-md text-center space-y-6">
            <div className="mx-auto w-12 h-12 bg-emerald-50 border border-emerald-300 rounded-full flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-serif text-charcoal font-semibold">Order Placed Successfully!</h1>
              <p className="text-xs text-charcoal/60">Thank you for shopping at AP Jewel. Your payment has been secured.</p>
            </div>

            <div className="border border-border/80 rounded-sm bg-cream/35 p-5 text-left text-xs space-y-3.5">
              <div className="flex justify-between border-b border-border/50 pb-2.5">
                <span className="text-charcoal/50 uppercase">Order Receipt:</span>
                <strong className="text-charcoal">{successOrder.orderNumber}</strong>
              </div>
              <div className="flex justify-between">
                <span>Shipping To:</span>
                <strong className="text-charcoal">{successOrder.guestName}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Amount Paid:</span>
                <strong className="text-gold-dark font-semibold">₹{successOrder.totalAmount.toLocaleString("en-IN")}</strong>
              </div>
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono text-charcoal/60 text-[10px]">{successOrder.paymentId}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Address:</span>
                <span className="text-charcoal/70 text-right max-w-xs">{successOrder.addressLine1}, {successOrder.city}, {successOrder.state}</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <Link
                href={`/order-tracking?order=${successOrder.orderNumber}`}
                className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
              >
                <span>Track Order Status</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <Link
                href="/shop"
                className="inline-block text-xs uppercase tracking-wider text-gold hover:text-gold-dark font-semibold underline decoration-gold/30 underline-offset-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Secure Checkout</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Checkout</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          {cart.length === 0 ? (
            <div className="text-center bg-white border border-border py-20 px-4 space-y-4 max-w-md mx-auto rounded-sm">
              <p className="text-sm text-charcoal/50">Your cart is empty. Please add items to checkout.</p>
              <Link href="/shop" className="inline-block bg-gold text-white px-6 py-2.5 text-xs font-semibold uppercase">
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Shipping Form */}
              <form onSubmit={handleStartPayment} className="lg:col-span-7 bg-white border border-border p-6 sm:p-8 rounded-sm space-y-6">
                <h2 className="font-serif text-xl text-charcoal font-semibold border-b border-border pb-3">Shipping Address</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.name}
                      onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      placeholder="E.g. Rajesh Kumar"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      placeholder="E.g. +91 9988776655"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                    className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    placeholder="E.g. rajesh@example.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.addressLine1}
                    onChange={(e) => setShippingForm({ ...shippingForm, addressLine1: e.target.value })}
                    className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold mb-2"
                    placeholder="House No, Building, Street Name"
                  />
                  <input
                    type="text"
                    value={shippingForm.addressLine2}
                    onChange={(e) => setShippingForm({ ...shippingForm, addressLine2: e.target.value })}
                    className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    placeholder="Apartment, Landmark, Area (Optional)"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">City *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">State *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-1 col-span-2 sm:col-span-1">
                    <label className="text-[10px] uppercase tracking-wider font-semibold text-charcoal">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.postalCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold-dark text-white py-4 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Creating Order...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4.5 w-4.5" />
                      <span>Proceed to Payment</span>
                    </>
                  )}
                </button>
              </form>

              {/* Order recap sidebar */}
              <aside className="lg:col-span-5 bg-white border border-border p-6 rounded-sm shadow-sm space-y-6">
                <h2 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Review Items</h2>
                
                <div className="max-h-[220px] overflow-y-auto space-y-3 pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                      <span className="text-charcoal/70 line-clamp-1 flex-1">
                        {item.name} <strong className="text-charcoal">×{item.quantity}</strong>
                      </span>
                      <strong className="text-charcoal shrink-0">₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 text-xs text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Subtotal (including GST)</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  {coupon && (
                    <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-sm border border-emerald-100">
                      <span>Discount ({coupon.code})</span>
                      <span>- ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="h-px bg-border pt-0.5" />
                  
                  <div className="flex justify-between text-sm font-serif font-semibold text-charcoal">
                    <span>Grand Total:</span>
                    <span className="text-gold-dark text-base font-bold">₹{finalTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="bg-cream/40 p-4 border border-gold/10 rounded text-[11px] text-charcoal/70 space-y-2 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-semibold text-gold-dark">
                    <ShieldCheck className="h-4 w-4" />
                    Secure Payment Gateway
                  </div>
                  <p>
                    Your transactions are protected using industry-standard SSL encryption and processed through RBI-approved Payment Aggregators (Razorpay).
                  </p>
                </div>
              </aside>

            </div>
          )}
        </div>
      </main>

      {/* Razorpay Simulation Modal */}
      {paymentSimOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-charcoal border border-gold/30 text-white w-full max-w-md p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl relative animate-scale-in">
            
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="text-gold text-[9px] uppercase tracking-widest font-semibold block mb-0.5">Razorpay Gateway</span>
                <h3 className="font-serif text-lg text-white font-medium">AP Jewel Secure Checkout</h3>
              </div>
              <button onClick={() => setPaymentSimOpen(false)} className="text-white/40 hover:text-white text-xs font-semibold">
                Cancel
              </button>
            </div>

            <div className="flex justify-between items-center bg-white/5 p-4 border border-white/10 rounded-sm">
              <span className="text-xs text-white/60">Amount to Pay:</span>
              <strong className="text-gold text-lg font-serif">₹{finalTotal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-white/60 text-[10px]">Select simulated payment method to complete order:</p>
              
              <button
                onClick={handleCompleteSimulatedPayment}
                className="w-full bg-white/5 hover:bg-gold/10 border border-white/15 hover:border-gold p-3.5 flex justify-between items-center transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Landmark className="h-5 w-5 text-gold" />
                  <span className="text-left font-medium">UPI / GPay / PhonePe</span>
                </div>
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Pay Now</span>
              </button>

              <button
                onClick={handleCompleteSimulatedPayment}
                className="w-full bg-white/5 hover:bg-gold/10 border border-white/15 hover:border-gold p-3.5 flex justify-between items-center transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gold" />
                  <span className="text-left font-medium">Credit / Debit Cards</span>
                </div>
                <span className="text-[10px] text-gold uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Pay Now</span>
              </button>
            </div>

            <div className="text-center pt-2 text-[10px] text-white/40">
              This is a secure sandbox transaction simulation for AP Jewel.
            </div>

          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
