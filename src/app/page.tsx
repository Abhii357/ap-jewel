"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { mockProducts } from "@/lib/mockData";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  ShoppingBag,
  Clock,
  Compass,
  Star,
  Calculator,
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const goldRates = useStore((state) => state.goldRates);
  const diamondRates = useStore((state) => state.diamondRates);
  const wishlist = useStore((state) => state.wishlist);
  const addItemToCart = useStore((state) => state.addItemToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);

  // Calculator State
  const [calcPurity, setCalcPurity] = useState("22K");
  const [calcWeight, setCalcWeight] = useState(10);
  const [calcResult, setCalcResult] = useState({ metal: 0, making: 0, gst: 0, total: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update calculator result when parameters change
  useEffect(() => {
    if (mounted) {
      const rate = goldRates[calcPurity] || 6830;
      const metalVal = calcWeight * rate;
      const makingVal = metalVal * 0.10; // Default 10% making charges
      const sub = metalVal + makingVal;
      const gstVal = sub * 0.03;
      setCalcResult({
        metal: Math.round(metalVal),
        making: Math.round(makingVal),
        gst: Math.round(gstVal),
        total: Math.round(sub + gstVal),
      });
    }
  }, [calcWeight, calcPurity, goldRates, mounted]);

  if (!mounted) return null;

  // Split products for displays
  const featured = mockProducts.filter((p) => p.isFeatured);
  const newArrivals = mockProducts.filter((p) => p.isNewArrival);

  return (
    <>
      <AnnouncementBar />
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-charcoal text-white overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-black/90" />
        
        {/* Animated Background Ornaments */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 text-gold tracking-[0.3em] text-xs sm:text-sm font-semibold uppercase"
          >
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
            <span>Exquisite Craftsmanship Since 1995</span>
            <Sparkles className="h-4.5 w-4.5 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide leading-tight"
          >
            Pure Gold. <br className="hidden sm:inline" />
            <span className="text-gold font-normal italic">Timeless Elegance.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed"
          >
            Discover Munger's finest collection of certified gold ornaments and GIA-graded diamond rings, handcrafted to match your heritage.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
          >
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 border border-gold"
            >
              <span>Explore Collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact?subject=Design%20Consultation"
              className="w-full sm:w-auto bg-transparent hover:bg-white/5 border border-white/40 hover:border-gold text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories/Collections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Curated Designs</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-medium">Shop By Collection</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Collection 1: Bridal */}
            <div className="group relative h-[380px] bg-charcoal border border-gold/20 overflow-hidden flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-20 space-y-3">
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">Heritage</span>
                <h3 className="text-2xl font-serif text-white font-medium">The Bridal Collection</h3>
                <p className="text-xs text-white/60">Heavy gold sets and traditional Kundan designs for your big day.</p>
                <Link href="/shop?filter=bridal" className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:text-white transition-colors pt-2">
                  <span>View Catalog</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Collection 2: Diamond */}
            <div className="group relative h-[380px] bg-charcoal border border-gold/20 overflow-hidden flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-20 space-y-3">
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">Precious</span>
                <h3 className="text-2xl font-serif text-white font-medium">Fine Diamonds</h3>
                <p className="text-xs text-white/60">IGI certified solitaires, eternity bands, and drop pendants.</p>
                <Link href="/shop?category=diamond" className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:text-white transition-colors pt-2">
                  <span>View Catalog</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Collection 3: Daily Wear */}
            <div className="group relative h-[380px] bg-charcoal border border-gold/20 overflow-hidden flex flex-col justify-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
              <div className="relative z-20 space-y-3">
                <span className="text-gold text-xs font-semibold tracking-wider uppercase">Modern</span>
                <h3 className="text-2xl font-serif text-white font-medium">Daily Wear Gold</h3>
                <p className="text-xs text-white/60">Lightweight bangles, chains, and rings for daily wear.</p>
                <Link href="/shop?category=gold" className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-wider hover:text-white transition-colors pt-2">
                  <span>View Catalog</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Gold Rate & Interactive Price Calculator */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Info Grid */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Bullion Transparency</span>
            <h2 className="text-3xl font-serif text-charcoal font-medium">Live Gold Rates Munger</h2>
            <div className="h-0.5 w-16 bg-gold mt-2" />
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Bullion markets fluctuate continuously. At AP Jewel, we follow standard, honest pricing models. Below are our live gold rates per gram for today:
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="bg-cream border border-border p-4 text-center">
                <span className="text-[10px] text-charcoal/50 uppercase tracking-widest block mb-1">24K Gold</span>
                <span className="text-sm font-semibold text-charcoal">₹{(goldRates["24K"] || 7450).toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-cream border border-border p-4 text-center">
                <span className="text-[10px] text-charcoal/50 uppercase tracking-widest block mb-1">22K Gold</span>
                <span className="text-sm font-semibold text-charcoal">₹{(goldRates["22K"] || 6830).toLocaleString("en-IN")}</span>
              </div>
              <div className="bg-cream border border-border p-4 text-center">
                <span className="text-[10px] text-charcoal/50 uppercase tracking-widest block mb-1">18K Gold</span>
                <span className="text-sm font-semibold text-charcoal">₹{(goldRates["18K"] || 5590).toLocaleString("en-IN")}</span>
              </div>
            </div>
            <p className="text-[10px] text-charcoal/50 italic flex items-center gap-1">
              <Clock className="h-3 w-3 text-gold" /> Updated daily at 11:00 AM based on MCX bullion market.
            </p>
          </div>

          {/* Right: Live Price Calculator */}
          <div className="lg:col-span-7 bg-cream border border-border p-8 rounded-sm shadow-sm space-y-6">
            <h3 className="font-serif text-xl text-charcoal font-semibold flex items-center gap-2">
              <Calculator className="h-5 w-5 text-gold" />
              Live Metal Price Calculator
            </h3>
            <p className="text-[11px] text-charcoal/60 leading-relaxed">
              Estimate the raw price of custom jewelry. Price = (Weight * Rate) + 10% Making Charges + 3% GST.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Purity Choice */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">Gold Purity</label>
                <div className="grid grid-cols-3 gap-2">
                  {["24K", "22K", "18K"].map((p) => (
                    <button
                      key={p}
                      onClick={() => setCalcPurity(p)}
                      className={`py-2.5 text-xs font-semibold transition-colors border ${
                        calcPurity === p
                          ? "bg-gold text-white border-gold"
                          : "bg-white text-charcoal border-border hover:border-gold"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight input */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-charcoal block">Weight (in Grams)</label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full px-4 py-2 bg-white border border-border focus:border-gold focus:outline-none text-sm text-luxury-black font-semibold"
                />
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="bg-white border border-border p-5 rounded space-y-3.5 text-xs text-charcoal/80">
              <div className="flex justify-between">
                <span>Metal Base Price ({calcWeight}g × ₹{(goldRates[calcPurity] || 6830).toLocaleString("en-IN")})</span>
                <span className="font-semibold text-charcoal">₹{calcResult.metal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Making Charges (10% standard estimate)</span>
                <span className="font-semibold text-charcoal">₹{calcResult.making.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>GST Tax (3% Government Standard)</span>
                <span className="font-semibold text-charcoal">₹{calcResult.gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="h-px bg-border pt-0.5" />
              <div className="flex justify-between text-sm font-semibold text-charcoal">
                <span className="text-gold-dark font-serif font-semibold">Estimated Final Price:</span>
                <span className="text-gold-dark font-serif font-semibold text-base">₹{calcResult.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Featured Products / New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Exquisite Pieces</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-medium">New Masterpieces</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.slice(0, 3).map((product) => {
              const prices = calculateProductPrice(product, goldRates, diamondRates);
              const inWish = wishlist.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-border group flex flex-col justify-between rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 relative"
                >
                  {/* Heart / Wishlist icon absolute */}
                  <button
                    onClick={() =>
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        image: product.imageUrl,
                        metalType: product.metalType,
                        metalPurity: product.metalPurity,
                        price: prices.total,
                      })
                    }
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full border border-border/50 text-charcoal hover:text-gold transition-colors"
                  >
                    <Heart
                      className={`h-4.5 w-4.5 ${inWish ? "fill-gold text-gold" : "text-charcoal"}`}
                    />
                  </button>

                  <div className="relative h-[280px] w-full overflow-hidden bg-cream">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-charcoal/90 text-gold-light text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                      {product.metalPurity} • {product.weight}g
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                        {product.categoryName}
                      </span>
                      <h3 className="font-serif text-lg text-charcoal font-medium mt-1 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center border-t border-border/50 pt-4">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-charcoal/40 uppercase tracking-wider">Live Price:</span>
                          <span className="text-base font-serif font-semibold text-gold-dark">
                            ₹{prices.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Link
                            href={`/product/${product.slug}`}
                            className="bg-cream hover:bg-gold-light border border-border text-charcoal hover:text-gold px-3.5 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() =>
                              addItemToCart({
                                id: product.id,
                                name: product.name,
                                slug: product.slug,
                                image: product.imageUrl,
                                weight: product.weight,
                                metalType: product.metalType,
                                metalPurity: product.metalPurity,
                                makingChargesType: product.makingChargesType,
                                makingChargesValue: product.makingChargesValue,
                                price: prices.total,
                              })
                            }
                            className="bg-gold hover:bg-gold-dark text-white p-2.5 rounded-sm transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose AP Jewel */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-charcoal text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-black/90" />
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-16">
          <div className="space-y-3">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Our Guarantee</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-medium">Why Munger Prefers AP Jewel</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium">HUID BIS Hallmarked</h3>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Every piece carries unique HUID registration validating exact 916 gold purity and government approval.
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium">30+ Years Trust</h3>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Trusted since 1995 as Munger's local family jeweler. We cherish your lifetime relationships and exchanges.
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium">Transparent Rates</h3>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Live pricing updates matching national gold rates, with clear breakups of weight and making charges.
              </p>
            </div>

            <div className="space-y-4 p-6 bg-white/5 border border-white/10 rounded-sm">
              <div className="w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg text-white font-medium">Insured Free Transit</h3>
              <p className="text-[11px] text-white/60 leading-relaxed">
                All online shipments are fully insured in tamper-proof premium packages, delivered to your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-charcoal font-medium">Voices of AP Jewel</h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-border p-8 rounded-sm space-y-4 shadow-sm">
              <div className="flex text-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed italic">
                "Bought my daughter's wedding set here. AP Jewel offered the best gold rate in Munger, and the karigars customized the choker length on short notice. Very transparent billing."
              </p>
              <div>
                <h4 className="font-semibold text-xs text-charcoal uppercase">Anjali Mishra</h4>
                <p className="text-[10px] text-charcoal/40 mt-0.5">Munger Town, Bihar</p>
              </div>
            </div>

            <div className="bg-white border border-border p-8 rounded-sm space-y-4 shadow-sm">
              <div className="flex text-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed italic">
                "Ordered a diamond solitaire ring online. The tracking was fully detailed, and the package arrived in a secure metal box. Checked the IGI certificate at their showroom—completely authentic."
              </p>
              <div>
                <h4 className="font-semibold text-xs text-charcoal uppercase">Rajeev Ranjan</h4>
                <p className="text-[10px] text-charcoal/40 mt-0.5">Jamalpur, Bihar</p>
              </div>
            </div>

            <div className="bg-white border border-border p-8 rounded-sm space-y-4 shadow-sm">
              <div className="flex text-gold gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-xs text-charcoal/80 leading-relaxed italic">
                "We visit their Chowk Bazar showroom regularly. AP Jewel's staff is incredibly polite and their daily gold rate updates are completely fair. Highly recommend their light gold necklaces."
              </p>
              <div>
                <h4 className="font-semibold text-xs text-charcoal uppercase">Suman Singh</h4>
                <p className="text-[10px] text-charcoal/40 mt-0.5">Fort Area, Munger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
