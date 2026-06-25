"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, Loader2, Check, ShieldCheck } from "lucide-react";

function TrackingContent() {
  const searchParams = useSearchParams();
  const [orderNumberInput, setOrderNumberInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  // Auto check if param is present
  useEffect(() => {
    const orderParam = searchParams.get("order");
    if (orderParam) {
      setOrderNumberInput(orderParam);
      handleTrackOrder(orderParam);
    }
  }, [searchParams]);

  const handleTrackFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumberInput.trim()) {
      handleTrackOrder(orderNumberInput.trim());
    }
  };

  const handleTrackOrder = async (orderNo: string) => {
    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const response = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNo)}`);
      const data = await response.json();

      if (data.success && data.order) {
        setOrderData(data.order);
      } else {
        setError(data.error || "Order not found. Please verify the code.");
      }
    } catch (err) {
      console.error(err);
      setError("Error communicating with server. Please verify database is running.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    const statuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED"];
    return statuses.indexOf(status);
  };

  const currentStep = orderData ? getStatusStep(orderData.status) : -1;

  return (
    <div className="space-y-12">
      {/* Search Input Bar */}
      <div className="bg-white border border-border p-6 rounded-sm shadow-sm max-w-2xl mx-auto">
        <form onSubmit={handleTrackFormSubmit} className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">Enter Order Number</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderNumberInput}
                onChange={(e) => setOrderNumberInput(e.target.value)}
                placeholder="E.g. APJ-10001"
                className="w-full pl-10 pr-4 py-3 bg-cream border border-border focus:border-gold focus:outline-none text-xs font-sans rounded-sm text-luxury-black font-semibold uppercase placeholder:normal-case placeholder:font-normal"
              />
              <Search className="absolute left-3.5 top-3 text-charcoal/40 h-4.5 w-4.5" />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gold hover:bg-gold-dark text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 flex items-center justify-center min-w-[100px]"
            >
              {loading ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : "Track"}
            </button>
          </div>
          {error && <p className="text-[10px] text-rose-600 font-semibold">{error}</p>}
        </form>
      </div>

      {loading && (
        <div className="text-center py-20 text-sm text-charcoal/50 flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin text-gold" />
          <span>Searching AP Jewel secure ledger...</span>
        </div>
      )}

      {orderData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
          
          <div className="lg:col-span-8 bg-white border border-border p-6 sm:p-8 rounded-sm shadow-sm space-y-12">
            
            <div className="flex justify-between items-center border-b border-border/50 pb-4">
              <div>
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest block">Tracking Code:</span>
                <h3 className="font-serif text-lg text-charcoal font-semibold">{orderData.orderNumber}</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-charcoal/40 uppercase tracking-widest block">Estimated Delivery:</span>
                <span className="text-xs text-gold-dark font-semibold">Free Insured Transit</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative py-4">
              <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-border -translate-y-1/2 z-0 hidden sm:block" />
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10 text-center">
                
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    currentStep >= 0 ? "bg-gold text-white border-gold" : "bg-white text-charcoal/40 border-border"
                  }`}>
                    {currentStep > 0 ? <Check className="h-4 w-4" /> : "1"}
                  </div>
                  <div className="text-left sm:text-center">
                    <h4 className="font-semibold text-xs text-charcoal uppercase">Order Placed</h4>
                    <p className="text-[10px] text-charcoal/40 mt-0.5">Secure payment received</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    currentStep >= 1 ? "bg-gold text-white border-gold" : "bg-white text-charcoal/40 border-border"
                  }`}>
                    {currentStep > 1 ? <Check className="h-4 w-4" /> : "2"}
                  </div>
                  <div className="text-left sm:text-center">
                    <h4 className="font-semibold text-xs text-charcoal uppercase">Packaging</h4>
                    <p className="text-[10px] text-charcoal/40 mt-0.5">Under HUID validation</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    currentStep >= 2 ? "bg-gold text-white border-gold" : "bg-white text-charcoal/40 border-border"
                  }`}>
                    {currentStep > 2 ? <Check className="h-4 w-4" /> : "3"}
                  </div>
                  <div className="text-left sm:text-center">
                    <h4 className="font-semibold text-xs text-charcoal uppercase">In Transit</h4>
                    <p className="text-[10px] text-charcoal/40 mt-0.5">Insured courier dispatch</p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-3 sm:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                    currentStep >= 3 ? "bg-gold text-white border-gold" : "bg-white text-charcoal/40 border-border"
                  }`}>
                    {currentStep > 3 ? <Check className="h-4 w-4" /> : "4"}
                  </div>
                  <div className="text-left sm:text-center">
                    <h4 className="font-semibold text-xs text-charcoal uppercase">Delivered</h4>
                    <p className="text-[10px] text-charcoal/40 mt-0.5">Received by customer</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="border-t border-border/50 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-charcoal/80">
              <div className="space-y-1 bg-cream/40 p-4 border border-border rounded">
                <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Shipping Destination</span>
                <strong>{orderData.guestName}</strong>
                <p className="text-charcoal/60 mt-1 leading-relaxed">
                  {orderData.addressLine1}, {orderData.addressLine2 ? `${orderData.addressLine2}, ` : ""}
                  {orderData.city}, {orderData.state} - {orderData.postalCode}
                </p>
              </div>

              <div className="space-y-1 bg-cream/40 p-4 border border-border rounded">
                <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Contact Coordinates</span>
                <p className="mt-1">Email: <strong className="text-charcoal">{orderData.guestEmail}</strong></p>
                <p>Phone: <strong className="text-charcoal">{orderData.guestPhone}</strong></p>
                <p className="pt-2 text-[10px] text-gold-dark font-medium flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Insured Secure Packaged Box
                </p>
              </div>
            </div>

          </div>

          {/* Invoice */}
          <div className="lg:col-span-4 bg-white border border-border p-6 rounded-sm shadow-sm space-y-6">
            <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Invoice Details</h3>
            
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
                <div key={item.id} className="text-xs border-b border-border/30 pb-3 flex justify-between items-center gap-4">
                  <div>
                    <strong className="text-charcoal">{item.productName}</strong>
                    <div className="text-[10px] text-charcoal/40 uppercase mt-0.5">
                      {item.purityAtPurchase} • {item.quantity} Unit(s) • {item.weightAtPurchase}g
                    </div>
                  </div>
                  <strong className="text-charcoal shrink-0 font-serif">₹{item.priceAtPurchase.toLocaleString("en-IN")}</strong>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-border space-y-3.5 text-xs text-charcoal/80">
              <div className="flex justify-between">
                <span>Subtotal (including GST)</span>
                <span className="font-semibold text-charcoal">₹{orderData.totalAmount.toLocaleString("en-IN")}</span>
              </div>
              {orderData.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold bg-emerald-50 p-2 border border-emerald-100 rounded-sm">
                  <span>Discount Applied ({orderData.couponCode})</span>
                  <span>- ₹{orderData.discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="h-px bg-border pt-0.5" />
              <div className="flex justify-between text-sm font-serif font-semibold text-charcoal">
                <span>Grand Total:</span>
                <span className="text-gold-dark text-base font-bold">₹{(orderData.totalAmount - (orderData.discountAmount || 0)).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default function OrderTrackingPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Logistics Status</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Order Tracking</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          <Suspense fallback={
            <div className="text-center py-20 text-sm text-charcoal/50">
              Loading tracking portal...
            </div>
          }>
            <TrackingContent />
          </Suspense>

        </div>
      </main>

      <Footer />
    </>
  );
}
