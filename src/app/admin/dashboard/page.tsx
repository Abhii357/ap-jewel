"use client";

import { useEffect, useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Wrench,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // "overview", "rates", "products", "orders"

  // Rates State
  const [goldRates, setGoldRates] = useState<any>({ "24K": 7450, "22K": 6830, "18K": 5590 });
  const [diamondRates, setDiamondRates] = useState<any>({ "VVS-EF": 95000, "VS-GH": 80000, "SI-IJ": 65000 });
  const [rateUpdates, setRateUpdates] = useState({ gold24K: 7450, gold22K: 6830, gold18K: 5590 });
  const [ratesMessage, setRatesMessage] = useState("");

  // Orders State
  const [orders, setOrders] = useState<any[]>([]);

  // Products & Categories State
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newProductForm, setNewProductForm] = useState({
    name: "",
    description: "",
    categoryId: "",
    weight: 10,
    metalType: "GOLD",
    metalPurity: "22K",
    diamondCarat: 0,
    diamondClarity: "VS",
    diamondColor: "GH",
    certifiedBy: "BIS Hallmark Certified",
    makingChargesType: "PERCENTAGE",
    makingChargesValue: 10,
    stock: 5,
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop",
  });
  const [productMessage, setProductMessage] = useState("");

  // Loading States
  const [ratesLoading, setRatesLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // FETCH RATES
  const fetchRates = async () => {
    setRatesLoading(true);
    try {
      const res = await fetch("/api/rates");
      const data = await res.json();
      if (data.success && data.rates) {
        // Map arrays to keyed objects
        const g: any = {};
        data.rates.gold.forEach((r: any) => { g[r.karat] = r.pricePerGram; });
        const d: any = {};
        data.rates.diamond.forEach((r: any) => { d[r.quality] = r.pricePerCarat; });

        setGoldRates(g);
        setDiamondRates(d);
        setRateUpdates({
          gold24K: g["24K"] || 7450,
          gold22K: g["22K"] || 6830,
          gold18K: g["18K"] || 5590,
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRatesLoading(false);
    }
  };

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
        if (data.categories?.length > 0 && !newProductForm.categoryId) {
          setNewProductForm((prev) => ({ ...prev, categoryId: data.categories[0].id }));
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setOrdersLoading(false);
    }
  };

  // RATE UPDATE SUBMIT
  const handleUpdateRates = async (e: React.FormEvent) => {
    e.preventDefault();
    setRatesMessage("");
    try {
      // Send sequential updates
      await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ karat: "24K", pricePerGram: rateUpdates.gold24K }),
      });
      await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ karat: "22K", pricePerGram: rateUpdates.gold22K }),
      });
      await fetch("/api/rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ karat: "18K", pricePerGram: rateUpdates.gold18K }),
      });

      setRatesMessage("Gold rates updated successfully in database!");
      fetchRates();
    } catch (err) {
      console.error(err);
      setRatesMessage("Error updating rates. Please verify connection.");
    }
  };

  // PRODUCT UPDATE SUBMIT
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setProductMessage("");
    if (!newProductForm.categoryId) {
      setProductMessage("Please wait for categories to load or check database connection.");
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductForm),
      });
      const data = await res.json();
      if (data.success) {
        setProductMessage(`Product "${newProductForm.name}" created successfully!`);
        setNewProductForm({
          name: "",
          description: "",
          categoryId: categories[0]?.id || "",
          weight: 10,
          metalType: "GOLD",
          metalPurity: "22K",
          diamondCarat: 0,
          diamondClarity: "VS",
          diamondColor: "GH",
          certifiedBy: "BIS Hallmark Certified",
          makingChargesType: "PERCENTAGE",
          makingChargesValue: 10,
          stock: 5,
          imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=300&auto=format&fit=crop",
        });
        fetchProducts();
      } else {
        setProductMessage(data.error || "Failed to create product.");
      }
    } catch (err) {
      console.error(err);
      setProductMessage("Error contacting products server.");
    }
  };

  // ORDER STATUS CHANGE
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrders();
      } else {
        alert(data.error || "Failed to update order status.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchRates();
    fetchProducts();
    fetchOrders();
  }, []);

  if (!mounted) return null;

  // Analytics Metrics
  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const activeProductsCount = products.length;

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-border pb-6">
            <div>
              <span className="text-[10px] text-gold uppercase tracking-[0.25em] font-semibold block mb-0.5">Control Panel</span>
              <h1 className="text-3xl font-serif text-charcoal font-semibold">Admin Dashboard</h1>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  fetchRates();
                  fetchProducts();
                  fetchOrders();
                }}
                className="bg-cream hover:bg-gold-light border border-border p-2.5 rounded-sm text-charcoal hover:text-gold transition-colors"
                title="Refresh All Data"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Navigation tabs */}
          <div className="flex gap-2 border-b border-border pb-0.5 text-xs uppercase tracking-wider font-semibold">
            {[
              { id: "overview", label: "Overview" },
              { id: "rates", label: "Gold & Diamond Rates" },
              { id: "products", label: "Product Management" },
              { id: "orders", label: "Orders desk" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 border-b-2 font-medium transition-all ${
                  activeTab === tab.id
                    ? "border-gold text-gold-dark font-semibold"
                    : "border-transparent text-charcoal/50 hover:text-gold"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-fade-in">
              {/* KPIs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-gold-light text-gold-dark rounded-full shrink-0">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block font-semibold">Total Sales Revenue</span>
                    <strong className="text-xl text-charcoal font-serif font-semibold">₹{totalSales.toLocaleString("en-IN")}</strong>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-gold-light text-gold-dark rounded-full shrink-0">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block font-semibold">Total Orders</span>
                    <strong className="text-xl text-charcoal font-serif font-semibold">{totalOrdersCount}</strong>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-gold-light text-gold-dark rounded-full shrink-0">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block font-semibold">Catalog Articles</span>
                    <strong className="text-xl text-charcoal font-serif font-semibold">{activeProductsCount}</strong>
                  </div>
                </div>

                <div className="bg-white border border-border p-6 rounded-sm shadow-sm flex items-center gap-4">
                  <div className="p-3 bg-gold-light text-gold-dark rounded-full shrink-0">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase block font-semibold">Live 22K Gold Rate</span>
                    <strong className="text-xl text-charcoal font-serif font-semibold">₹{(goldRates["22K"] || 6830).toLocaleString("en-IN")}/g</strong>
                  </div>
                </div>
              </div>

              {/* Quick details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                  <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Recent Transactions</h3>
                  {orders.length === 0 ? (
                    <p className="text-xs text-charcoal/40">No orders registered in the system database yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                      {orders.slice(0, 5).map((o) => (
                        <div key={o.id} className="text-xs border-b border-border/30 pb-2.5 flex justify-between items-center gap-4">
                          <div>
                            <strong>{o.orderNumber}</strong>
                            <span className="text-charcoal/50 block text-[10px]">{o.guestName} • {new Date(o.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-serif font-bold text-gold-dark block">₹{o.totalAmount.toLocaleString("en-IN")}</span>
                            <span className="text-[9px] uppercase tracking-wider bg-gold-light text-gold-dark px-1.5 py-0.5 rounded font-bold">{o.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                  <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Latest Products Added</h3>
                  {products.length === 0 ? (
                    <p className="text-xs text-charcoal/40">No products registered in database yet.</p>
                  ) : (
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2">
                      {products.slice(0, 5).map((p) => (
                        <div key={p.id} className="text-xs border-b border-border/30 pb-2.5 flex justify-between items-center gap-4">
                          <div>
                            <strong>{p.name}</strong>
                            <span className="text-charcoal/50 block text-[10px]">{p.metalPurity} Gold • {p.weight}g</span>
                          </div>
                          <strong className="text-charcoal shrink-0">{p.category?.name}</strong>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE RATES */}
          {activeTab === "rates" && (
            <div className="max-w-xl mx-auto bg-white border border-border p-8 rounded-sm shadow-sm space-y-6 animate-fade-in">
              <h2 className="font-serif text-2xl text-charcoal font-semibold border-b border-border pb-3">Daily Metal Rate Settings</h2>
              
              <form onSubmit={handleUpdateRates} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">24K Gold Rate (Per Gram in INR)</label>
                    <input
                      type="number"
                      required
                      value={rateUpdates.gold24K}
                      onChange={(e) => setRateUpdates({ ...rateUpdates, gold24K: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs text-luxury-black font-semibold focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">22K Gold Rate (Per Gram in INR)</label>
                    <input
                      type="number"
                      required
                      value={rateUpdates.gold22K}
                      onChange={(e) => setRateUpdates({ ...rateUpdates, gold22K: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs text-luxury-black font-semibold focus:outline-none focus:border-gold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">18K Gold Rate (Per Gram in INR)</label>
                    <input
                      type="number"
                      required
                      value={rateUpdates.gold18K}
                      onChange={(e) => setRateUpdates({ ...rateUpdates, gold18K: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs text-luxury-black font-semibold focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={ratesLoading}
                  className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                >
                  <Wrench className="h-4 w-4" />
                  <span>Update Live Rates</span>
                </button>
              </form>

              {ratesMessage && (
                <p className="text-xs text-center font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 p-2.5 rounded flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  <span>{ratesMessage}</span>
                </p>
              )}
            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {activeTab === "products" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              
              {/* Product list table (7 Cols) */}
              <div className="lg:col-span-7 bg-white border border-border p-6 rounded-sm shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Active Catalog</h3>
                
                {productsLoading ? (
                  <p className="text-xs text-charcoal/40">Loading products database...</p>
                ) : products.length === 0 ? (
                  <p className="text-xs text-charcoal/40">No database products found. Use form on the right to add.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/80 text-[10px] uppercase tracking-wider text-charcoal/40 font-semibold bg-cream/35">
                          <th className="py-2.5 px-2">Name</th>
                          <th className="py-2.5 px-2">Details</th>
                          <th className="py-2.5 px-2 text-right">Stock</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((p) => (
                          <tr key={p.id} className="border-b border-border/30 hover:bg-cream/20">
                            <td className="py-3 px-2 font-medium">{p.name}</td>
                            <td className="py-3 px-2 text-charcoal/60">
                              {p.metalPurity} • {p.weight}g • {p.metalType}
                            </td>
                            <td className="py-3 px-2 text-right font-bold text-charcoal">{p.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add product form (5 Cols) */}
              <div className="lg:col-span-5 bg-white border border-border p-6 rounded-sm shadow-sm space-y-4">
                <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3 flex items-center gap-1.5">
                  <Plus className="h-5 w-5 text-gold" /> Add Jewelry Article
                </h3>
                
                <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-semibold text-charcoal">Design Name *</label>
                    <input
                      type="text"
                      required
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      placeholder="E.g. Antique Gold Jhumka"
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Category *</label>
                      <select
                        value={newProductForm.categoryId}
                        onChange={(e) => setNewProductForm({ ...newProductForm, categoryId: e.target.value })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Metal Type *</label>
                      <select
                        value={newProductForm.metalType}
                        onChange={(e) => setNewProductForm({ ...newProductForm, metalType: e.target.value })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      >
                        <option value="GOLD">Gold</option>
                        <option value="DIAMOND">Diamond</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Weight (g) *</label>
                      <input
                        type="number"
                        step={0.1}
                        required
                        value={newProductForm.weight}
                        onChange={(e) => setNewProductForm({ ...newProductForm, weight: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Purity *</label>
                      <select
                        value={newProductForm.metalPurity}
                        onChange={(e) => setNewProductForm({ ...newProductForm, metalPurity: e.target.value })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      >
                        <option value="24K">24K Gold</option>
                        <option value="22K">22K Gold</option>
                        <option value="18K">18K Gold</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Stock *</label>
                      <input
                        type="number"
                        required
                        value={newProductForm.stock}
                        onChange={(e) => setNewProductForm({ ...newProductForm, stock: parseInt(e.target.value) || 0 })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Making Charge Type</label>
                      <select
                        value={newProductForm.makingChargesType}
                        onChange={(e) => setNewProductForm({ ...newProductForm, makingChargesType: e.target.value })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      >
                        <option value="PERCENTAGE">Percentage (%)</option>
                        <option value="PER_GRAM">Per Gram (Flat)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-charcoal">Making Value *</label>
                      <input
                        type="number"
                        required
                        value={newProductForm.makingChargesValue}
                        onChange={(e) => setNewProductForm({ ...newProductForm, makingChargesValue: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-charcoal">Image URL *</label>
                    <input
                      type="text"
                      required
                      value={newProductForm.imageUrl}
                      onChange={(e) => setNewProductForm({ ...newProductForm, imageUrl: e.target.value })}
                      className="w-full bg-cream border border-border px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors"
                  >
                    Add Ornament
                  </button>
                </form>

                {productMessage && (
                  <p className="text-[10px] text-center font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 p-2 rounded flex items-center justify-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span>{productMessage}</span>
                  </p>
                )}
              </div>

            </div>
          )}

          {/* TAB 4: ORDERS DESK */}
          {activeTab === "orders" && (
            <div className="bg-white border border-border p-6 rounded-sm shadow-sm space-y-4 animate-fade-in">
              <h3 className="font-serif text-lg text-charcoal font-semibold border-b border-border pb-3">Transaction Registry</h3>
              
              {ordersLoading ? (
                <p className="text-xs text-charcoal/40">Loading transactions ledger...</p>
              ) : orders.length === 0 ? (
                <p className="text-xs text-charcoal/40">No orders registered in the system database yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/80 text-[10px] uppercase tracking-wider text-charcoal/40 font-semibold bg-cream/35">
                        <th className="py-2.5 px-2">Order #</th>
                        <th className="py-2.5 px-2">Customer</th>
                        <th className="py-2.5 px-2">Email</th>
                        <th className="py-2.5 px-2 text-right">Amount</th>
                        <th className="py-2.5 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} className="border-b border-border/30 hover:bg-cream/20">
                          <td className="py-3.5 px-2 font-mono font-semibold">{o.orderNumber}</td>
                          <td className="py-3.5 px-2 font-medium">{o.guestName}</td>
                          <td className="py-3.5 px-2 text-charcoal/60">{o.guestEmail}</td>
                          <td className="py-3.5 px-2 text-right font-bold text-gold-dark font-serif">
                            ₹{o.totalAmount.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-2 text-center">
                            <select
                              value={o.status}
                              onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                              className="bg-cream border border-border px-2 py-1 text-[11px] text-luxury-black focus:outline-none focus:border-gold font-semibold uppercase"
                            >
                              <option value="PROCESSING">Processing</option>
                              <option value="SHIPPED">Shipped</option>
                              <option value="DELIVERED">Delivered</option>
                              <option value="CANCELLED">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
