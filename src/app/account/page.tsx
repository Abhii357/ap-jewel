"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { User, LogIn, ShoppingBag, Loader2 } from "lucide-react";

export default function AccountPage() {
  const [mounted, setMounted] = useState(false);
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const logout = useStore((state) => state.logout);

  // Form State
  const [isRegister, setIsRegister] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Customer Orders State
  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      fetchCustomerOrders(user.email);
    }
  }, [mounted, user]);

  if (!mounted) return null;

  const fetchCustomerOrders = async (email: string) => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && data.orders) {
        const filtered = data.orders.filter(
          (o: any) => o.guestEmail?.toLowerCase() === email.toLowerCase()
        );
        setCustomerOrders(filtered);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) return;

    if (isRegister) {
      if (!nameInput) return;
      const newUser = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: nameInput,
        email: emailInput,
        role: emailInput.toLowerCase().includes("admin") ? "ADMIN" : "CUSTOMER",
      };
      setUser(newUser);
    } else {
      const loggedUser = {
        id: `usr_${Math.random().toString(36).substring(2, 9)}`,
        name: emailInput.split("@")[0].toUpperCase(),
        email: emailInput,
        role: emailInput.toLowerCase().includes("admin") ? "ADMIN" : "CUSTOMER",
      };
      setUser(loggedUser);
    }

    setEmailInput("");
    setNameInput("");
    setPasswordInput("");
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Member Portal</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">My Account</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          {user ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-4 bg-white border border-border p-6 rounded-sm text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-gold-light border border-gold/20 rounded-full flex items-center justify-center text-gold">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-charcoal font-semibold">{user.name}</h3>
                  <p className="text-xs text-charcoal/50">{user.email}</p>
                  <span className="mt-2 inline-block text-[9px] uppercase tracking-widest font-bold bg-gold/10 text-gold-dark px-2.5 py-1 rounded-sm">
                    {user.role} Member
                  </span>
                </div>

                <div className="border-t border-border pt-4 mt-4">
                  <button
                    onClick={() => {
                      logout();
                      setCustomerOrders([]);
                    }}
                    className="text-xs uppercase tracking-wider text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                  >
                    Logout Session
                  </button>
                </div>
              </div>

              <div className="md:col-span-8 bg-white border border-border p-6 sm:p-8 rounded-sm space-y-6">
                <h3 className="font-serif text-xl text-charcoal font-semibold border-b border-border pb-3 flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-gold" />
                  Order History
                </h3>

                {ordersLoading ? (
                  <div className="text-center py-8 text-xs text-charcoal/50 flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-gold" />
                    <span>Loading past transactions...</span>
                  </div>
                ) : customerOrders.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <p className="text-xs text-charcoal/50">You haven't placed any orders with this email address yet.</p>
                    <Link
                      href="/shop"
                      className="inline-block bg-gold hover:bg-gold-dark text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Shop Designs
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {customerOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-border/80 p-4 rounded bg-cream/25 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gold transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <strong className="text-charcoal font-mono">{order.orderNumber}</strong>
                            <span className="text-[9px] uppercase tracking-wider bg-gold/10 text-gold-dark px-1.5 py-0.5 rounded font-bold">{order.status}</span>
                          </div>
                          <p className="text-charcoal/50 text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right sm:text-right w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end">
                          <strong className="text-gold-dark font-serif text-sm">₹{order.totalAmount.toLocaleString("en-IN")}</strong>
                          <Link
                            href={`/order-tracking?order=${order.orderNumber}`}
                            className="text-[10px] text-gold font-semibold uppercase tracking-wider underline underline-offset-4 decoration-gold/30 hover:text-gold-dark"
                          >
                            Track Shipment
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white border border-border p-8 rounded-sm shadow-sm space-y-6">
              <h2 className="font-serif text-2xl text-charcoal font-semibold border-b border-border pb-3 text-center">
                {isRegister ? "Create An Account" : "Secure Account Login"}
              </h2>

              <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
                {isRegister && (
                  <div className="space-y-1">
                    <label className="font-semibold text-charcoal">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="E.g. Rajesh Kumar"
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="E.g. rajesh@example.com"
                    className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-charcoal">Password *</label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  <span>{isRegister ? "Register Membership" : "Secure Login"}</span>
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setIsRegister(!isRegister);
                  }}
                  className="text-xs text-gold hover:text-gold-dark font-semibold transition-colors"
                >
                  {isRegister ? "Already have an account? Login here" : "Don't have an account? Sign up here"}
                </button>
                <p className="text-[9px] text-charcoal/40 mt-3">
                  Tip: Entering **admin@apjewel.com** logs you in as an administrator.
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
