"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { mockProducts } from "@/lib/mockData";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Heart, ShoppingBag, SlidersHorizontal, Check } from "lucide-react";
import Link from "next/link";

// We separate the shop contents into a component wrapped in Suspense so that Next.js doesn't complain about client-side useSearchParams on build
function ShopContent() {
  const searchParams = useSearchParams();
  const goldRates = useStore((state) => state.goldRates);
  const diamondRates = useStore((state) => state.diamondRates);
  const wishlist = useStore((state) => state.wishlist);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addItemToCart = useStore((state) => state.addItemToCart);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [selectedTag, setSelectedTag] = useState("all");
  const [sortBy, setSortBy] = useState("featured"); // "featured", "price-asc", "price-desc"
  const [priceRange, setPriceRange] = useState(150000); // Max budget filter

  // Sync with search parameters on load
  const setGoldRates = useStore((state) => state.setGoldRates);

  useEffect(() => {
    // Fetch live rates from database
    fetch("/api/rates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rates?.gold) {
          const g: Record<string, number> = {};
          data.rates.gold.forEach((r: any) => { g[r.karat] = r.pricePerGram; });
          setGoldRates(g);
        }
      })
      .catch(console.error);

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const filter = searchParams.get("filter");

    if (search) setSearchQuery(search);
    if (category) {
      if (category.toLowerCase().includes("ring")) setSelectedCategory("rings");
      else if (category.toLowerCase().includes("neck")) setSelectedCategory("necklaces");
      else if (category.toLowerCase().includes("bang")) setSelectedCategory("bangles");
      else if (category.toLowerCase().includes("ear")) setSelectedCategory("earrings");
      else if (category.toLowerCase().includes("brace")) setSelectedCategory("bracelets");
      else if (category.toLowerCase() === "gold") setSelectedMetal("GOLD");
      else if (category.toLowerCase() === "diamond") setSelectedMetal("DIAMOND");
    }
    if (filter) {
      setSelectedTag(filter);
    }
  }, [searchParams]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedMetal("all");
    setSelectedTag("all");
    setSortBy("featured");
    setPriceRange(150000);
  };

  // Filter products catalog
  const filteredProducts = mockProducts
    .map((product) => {
      const prices = calculateProductPrice(product, goldRates, diamondRates);
      return { ...product, prices };
    })
    .filter((product) => {
      // 1. Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // 2. Category filter
      if (selectedCategory !== "all") {
        if (product.categoryName.toLowerCase() !== selectedCategory.toLowerCase()) {
          if (selectedCategory === "bangles" && product.categoryName === "Bangles") {
            // matches
          } else {
            return false;
          }
        }
      }

      // 3. Metal Type filter
      if (selectedMetal !== "all") {
        if (product.metalType !== selectedMetal) return false;
      }

      // 4. Tags filter
      if (selectedTag !== "all") {
        if (selectedTag === "bridal" && !product.isBridal) return false;
        if (selectedTag === "festival" && !product.isFestival) return false;
        if (selectedTag === "featured" && !product.isFeatured) return false;
        if (selectedTag === "new" && !product.isNewArrival) return false;
        if (selectedTag === "bestseller" && !product.isBestSeller) return false;
      }

      // 5. Price filter
      if (product.prices.total > priceRange) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.prices.total - b.prices.total;
      if (sortBy === "price-desc") return b.prices.total - a.prices.total;
      return 0; // Default Featured
    });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: Sidebar Filters (3 Cols) */}
      <aside className="lg:col-span-3 bg-white border border-border p-6 rounded-sm space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-border">
          <h2 className="font-serif text-lg text-charcoal font-semibold flex items-center gap-2">
            <SlidersHorizontal className="h-4.5 w-4.5 text-gold" />
            Filters
          </h2>
          <button
            onClick={handleResetFilters}
            className="text-[10px] uppercase tracking-wider text-gold hover:text-gold-dark font-semibold underline decoration-gold/30 underline-offset-4"
          >
            Clear All
          </button>
        </div>

        {/* Search within shop */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Keyword Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type ring, necklace..."
            className="w-full bg-cream border border-border px-3 py-2 text-xs text-luxury-black focus:outline-none focus:border-gold placeholder:text-charcoal/40"
          />
        </div>

        {/* Category Choice */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Category</label>
          <div className="flex flex-col gap-1 text-xs text-charcoal/80">
            {["all", "rings", "necklaces", "bangles", "earrings", "bracelets"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-left py-1.5 px-2 rounded-sm capitalize flex justify-between items-center ${
                  selectedCategory === cat ? "bg-gold/10 text-gold-dark font-semibold" : "hover:bg-cream"
                }`}
              >
                <span>{cat === "all" ? "All Categories" : cat}</span>
                {selectedCategory === cat && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Metal Choice */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Metal Type</label>
          <div className="flex flex-col gap-1 text-xs text-charcoal/80">
            {[
              { label: "All Metals", value: "all" },
              { label: "Gold Jewelry", value: "GOLD" },
              { label: "Diamond Jewelry", value: "DIAMOND" },
            ].map((metal) => (
              <button
                key={metal.value}
                onClick={() => setSelectedMetal(metal.value)}
                className={`text-left py-1.5 px-2 rounded-sm flex justify-between items-center ${
                  selectedMetal === metal.value ? "bg-gold/10 text-gold-dark font-semibold" : "hover:bg-cream"
                }`}
              >
                <span>{metal.label}</span>
                {selectedMetal === metal.value && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Collections Tag */}
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Collection</label>
          <div className="flex flex-col gap-1 text-xs text-charcoal/80">
            {[
              { label: "All Collections", value: "all" },
              { label: "Bridal Catalog", value: "bridal" },
              { label: "Festival Special", value: "festival" },
              { label: "Featured Pieces", value: "featured" },
              { label: "New Arrivals", value: "new" },
              { label: "Best Sellers", value: "bestseller" },
            ].map((tag) => (
              <button
                key={tag.value}
                onClick={() => setSelectedTag(tag.value)}
                className={`text-left py-1.5 px-2 rounded-sm flex justify-between items-center ${
                  selectedTag === tag.value ? "bg-gold/10 text-gold-dark font-semibold" : "hover:bg-cream"
                }`}
              >
                <span>{tag.label}</span>
                {selectedTag === tag.value && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div className="space-y-3 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="uppercase tracking-wider font-semibold text-charcoal">Max Budget</span>
            <span className="text-gold font-semibold">₹{priceRange.toLocaleString("en-IN")}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={400000}
            step={5000}
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full accent-gold bg-cream"
          />
          <div className="flex justify-between text-[10px] text-charcoal/40">
            <span>₹10,000</span>
            <span>₹4,00,000</span>
          </div>
        </div>
      </aside>

      {/* Right Column: Catalog Grid (9 Cols) */}
      <main className="lg:col-span-9 space-y-6">
        
        {/* Sort & Stats Bar */}
        <div className="bg-white border border-border p-4 rounded-sm flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-charcoal/60">
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> jewelry articles
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-charcoal/50">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cream border border-border px-3 py-1.5 text-xs text-luxury-black focus:outline-none focus:border-gold"
            >
              <option value="featured">Featured Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center bg-white border border-border py-20 px-4 space-y-4 rounded-sm">
            <p className="text-sm text-charcoal/50">No jewelry articles match your active filter selections.</p>
            <button
              onClick={handleResetFilters}
              className="bg-gold hover:bg-gold-dark text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const inWish = wishlist.some((item) => item.id === product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white border border-border group flex flex-col justify-between rounded-sm overflow-hidden hover:shadow-md transition-all duration-300 relative"
                >
                  {/* Heart Icon */}
                  <button
                    onClick={() =>
                      toggleWishlist({
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        image: product.imageUrl,
                        metalType: product.metalType,
                        metalPurity: product.metalPurity,
                        price: product.prices.total,
                      })
                    }
                    className="absolute top-4 right-4 z-10 p-2 bg-white/85 hover:bg-white rounded-full border border-border/50 text-charcoal hover:text-gold transition-colors"
                  >
                    <Heart
                      className={`h-4.5 w-4.5 ${inWish ? "fill-gold text-gold" : "text-charcoal"}`}
                    />
                  </button>

                  <div className="relative h-[240px] w-full overflow-hidden bg-cream">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-charcoal/90 text-gold-light text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                      {product.metalPurity} • {product.weight}g
                    </div>
                  </div>

                  <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gold uppercase tracking-wider font-semibold">
                        {product.categoryName}
                      </span>
                      <h3 className="font-serif text-base text-charcoal font-medium mt-1 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-charcoal/60 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center border-t border-border/50 pt-3">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-charcoal/40 uppercase tracking-wider">Live Price:</span>
                          <span className="text-sm font-serif font-semibold text-gold-dark">
                            ₹{product.prices.total.toLocaleString("en-IN")}
                          </span>
                        </div>
                        
                        <div className="flex gap-1.5">
                          <Link
                            href={`/product/${product.slug}`}
                            className="bg-cream hover:bg-gold-light border border-border text-charcoal hover:text-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors"
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
                                price: product.prices.total,
                              })
                            }
                            className="bg-gold hover:bg-gold-dark text-white p-2 rounded-sm transition-colors"
                            title="Add to Cart"
                          >
                            <ShoppingBag className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Luxury Catalog</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Shop Our Catalog</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
          </div>

          <Suspense fallback={
            <div className="text-center py-20 text-sm text-charcoal/50">
              Loading AP Jewel collections...
            </div>
          }>
            <ShopContent />
          </Suspense>

        </div>
      </main>

      <Footer />
    </>
  );
}
