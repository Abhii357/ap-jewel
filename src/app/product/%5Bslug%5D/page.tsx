"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { mockProducts } from "@/lib/mockData";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Compass,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [mounted, setMounted] = useState(false);
  const goldRates = useStore((state) => state.goldRates);
  const diamondRates = useStore((state) => state.diamondRates);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addItemToCart = useStore((state) => state.addItemToCart);

  // Delivery check state
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{
    status: "success" | "error" | "none";
    message: string;
  }>({ status: "none", message: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Find product by slug
  const product = mockProducts.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <main className="flex-1 bg-cream py-20 px-4 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-gold mx-auto" />
          <h1 className="text-3xl font-serif text-charcoal font-semibold">Jewelry Article Not Found</h1>
          <p className="text-xs text-charcoal/60">The requested custom design could not be located in our catalog.</p>
          <Link href="/shop" className="inline-block bg-gold text-white text-xs font-semibold uppercase px-6 py-2.5">
            Back to Catalog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Calculate live prices
  const prices = calculateProductPrice(product, goldRates, diamondRates);
  const inWish = wishlist.some((item) => item.id === product.id);

  // Pincode validation helper (focused on Munger / Bihar region)
  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus({
        status: "error",
        message: "Please enter a valid 6-digit Indian pincode.",
      });
      return;
    }

    if (pincode.startsWith("811201")) {
      setPincodeStatus({
        status: "success",
        message: "Munger Showroom Pickup available in 24 hours, or Free Express Hand-Delivery in 1-2 days.",
      });
    } else if (pincode.startsWith("811") || pincode.startsWith("800") || pincode.startsWith("8")) {
      setPincodeStatus({
        status: "success",
        message: "Free Express Insured Shipping in Bihar (2-3 working days).",
      });
    } else {
      setPincodeStatus({
        status: "success",
        message: "Free Insured National Transit via BlueDart (4-6 working days).",
      });
    }
  };

  // Find related designs (same metal type or category)
  const related = mockProducts.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Breadcrumb */}
          <nav className="text-xs text-charcoal/40 flex items-center gap-2">
            <Link href="/" className="hover:text-gold">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-gold">Shop</Link>
            <span>/</span>
            <span className="text-charcoal/70">{product.name}</span>
          </nav>

          {/* Product main view */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Dynamic Image Gallery (5 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white border border-border h-[450px] w-full rounded-sm overflow-hidden flex items-center justify-center relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
                
                {/* Certified Badge absolute */}
                <div className="absolute top-4 left-4 bg-charcoal/90 border border-gold/40 text-gold-light text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold flex items-center gap-1.5 rounded-sm">
                  <ShieldCheck className="h-3.5 w-3.5 text-gold" />
                  <span>{product.certifiedBy}</span>
                </div>
              </div>

              {/* Sub Gallery thumbnails (mock) */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-gold h-[100px] rounded-sm overflow-hidden opacity-90 cursor-pointer bg-white">
                  <img src={product.imageUrl} className="h-full w-full object-cover" alt="view 1" />
                </div>
                <div className="border border-border h-[100px] rounded-sm overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-white">
                  <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=300&auto=format&fit=crop" className="h-full w-full object-cover" alt="view 2" />
                </div>
                <div className="border border-border h-[100px] rounded-sm overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-white">
                  <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=300&auto=format&fit=crop" className="h-full w-full object-cover" alt="view 3" />
                </div>
              </div>
            </div>

            {/* Right Col: Specifications and calculations (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Product Info Header */}
              <div className="space-y-2">
                <span className="text-[10px] text-gold uppercase tracking-widest font-semibold">{product.categoryName}</span>
                <h1 className="text-3xl sm:text-4xl font-serif text-charcoal font-medium leading-tight">{product.name}</h1>
                <div className="flex items-center gap-1.5 text-gold pt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-gold" />
                  ))}
                  <span className="text-xs text-charcoal/50 font-medium pl-1.5">(4.9 out of 5 from 18 verified reviews)</span>
                </div>
              </div>

              {/* Price breakup display */}
              <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <div>
                    <span className="text-[10px] text-charcoal/40 uppercase tracking-wider block">Live Price (incl. GST):</span>
                    <span className="text-2xl font-serif font-semibold text-gold-dark">
                      ₹{prices.total.toLocaleString("en-IN")}
                    </span>
                  </div>
                  
                  {/* Stock Status */}
                  <div>
                    {product.stock > 0 ? (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold border border-emerald-100">
                        In Stock ({product.stock} available)
                      </span>
                    ) : (
                      <span className="bg-rose-50 text-rose-700 text-[10px] uppercase tracking-wider px-2.5 py-1 font-bold border border-rose-100">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing Breakup Breakdown */}
                <div className="space-y-2.5 text-xs text-charcoal/80">
                  <div className="flex justify-between">
                    <span>Base Metal Price ({product.weight}g × {product.metalPurity} Purity)</span>
                    <span>₹{prices.baseMetalPrice.toLocaleString("en-IN")}</span>
                  </div>
                  
                  {product.metalType === "DIAMOND" && product.diamondCarat > 0 && (
                    <div className="flex justify-between text-charcoal font-medium">
                      <span>Diamond Cost ({product.diamondCarat} Carat {product.diamondClarity}-{product.diamondColor})</span>
                      <span>₹{prices.diamondPrice.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Making Charges ({product.makingChargesType === "PERCENTAGE" ? `${product.makingChargesValue}%` : `₹${product.makingChargesValue}/g`})</span>
                    <span>₹{prices.makingCharges.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Jewelry GST (3% Standard Indian Tax)</span>
                    <span>₹{prices.gst.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Metal Specs Table */}
              <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-charcoal">Ornaments Specifications</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="bg-cream/40 p-3 rounded">
                    <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Metal Purity</span>
                    <strong className="text-charcoal">{product.metalPurity} Gold ({product.metalPurity === "22K" ? "91.6% Pure" : "75.0% Pure"})</strong>
                  </div>
                  <div className="bg-cream/40 p-3 rounded">
                    <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Gross Weight</span>
                    <strong className="text-charcoal">{product.weight} Grams</strong>
                  </div>
                  <div className="bg-cream/40 p-3 rounded col-span-2">
                    <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Quality Assurance</span>
                    <span className="text-charcoal leading-relaxed block">
                      Guaranteed by <strong>{product.certifiedBy}</strong> with HUID verification.
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery checker */}
              <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-charcoal">Check Estimated Delivery</h3>
                
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 6-digit Pincode"
                    className="flex-1 bg-cream border border-border px-3 py-2 text-xs text-luxury-black focus:outline-none focus:border-gold placeholder:text-charcoal/30"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus.status !== "none" && (
                  <p className={`text-xs flex items-center gap-1.5 ${
                    pincodeStatus.status === "success" ? "text-emerald-700" : "text-rose-700"
                  }`}>
                    {pincodeStatus.status === "success" ? (
                      <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    )}
                    <span>{pincodeStatus.message}</span>
                  </p>
                )}
              </div>

              {/* Main Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
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
                  className="flex-1 bg-gold hover:bg-gold-dark text-white py-4 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Add To Cart</span>
                </button>
                
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
                  className="bg-white border border-border text-charcoal hover:text-gold px-6 py-4 text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 rounded-sm"
                >
                  <Heart className={`h-4.5 w-4.5 ${inWish ? "fill-gold text-gold" : "text-charcoal"}`} />
                  <span>{inWish ? "Wishlisted" : "Add to Wishlist"}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Detailed Description */}
          <div className="bg-white border border-border p-8 sm:p-12 rounded-sm space-y-6">
            <h2 className="text-xl font-serif text-charcoal font-semibold border-b border-border pb-4">Artisan Craftsmanship & Details</h2>
            <div className="space-y-4 text-xs text-charcoal/80 leading-relaxed">
              <p>{product.description}</p>
              <p>
                Meticulously manufactured in Munger, Bihar, under the guidance of our traditional family karigars, this ornament showcases a marriage between heritage aesthetics and modern build stability. Gold is sourced from certified channels and undergoes strict laboratory grade testing before receiving its official BIS hallmark seal.
              </p>
              <p className="flex items-center gap-1.5 font-semibold text-gold-dark">
                <Award className="h-4.5 w-4.5" /> Lifetime Exchange & Buyback Guarantee at our Munger Chowk Bazar Flagship showroom.
              </p>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-serif text-charcoal font-semibold">Related Designs</h2>
              <div className="h-px w-16 bg-gold/50 mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {related.map((relProduct) => {
                const relPrice = calculateProductPrice(relProduct, goldRates, diamondRates);
                return (
                  <Link
                    href={`/product/${relProduct.slug}`}
                    key={relProduct.id}
                    className="bg-white border border-border p-4 rounded-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
                  >
                    <div className="h-[200px] w-full overflow-hidden bg-cream mb-4">
                      <img
                        src={relProduct.imageUrl}
                        alt={relProduct.name}
                        className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase tracking-wider text-gold font-semibold block">{relProduct.categoryName}</span>
                      <h4 className="font-serif text-sm text-charcoal font-semibold leading-tight group-hover:text-gold transition-colors">{relProduct.name}</h4>
                      <div className="flex justify-between items-center pt-2 border-t border-border/50">
                        <span className="text-[10px] text-charcoal/40 font-semibold">{relProduct.metalPurity} • {relProduct.weight}g</span>
                        <strong className="text-xs text-gold-dark font-serif font-semibold">₹{relPrice.total.toLocaleString("en-IN")}</strong>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
