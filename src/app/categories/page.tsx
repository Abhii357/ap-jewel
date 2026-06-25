import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      name: "Rings",
      slug: "rings",
      description: "Eternity bands, diamond engagement solitaires, and daily gold bands.",
      imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
      count: "12 Designs",
    },
    {
      name: "Necklaces",
      slug: "necklaces",
      description: "Handcrafted gold chokers, mangalsutras, and precious diamond pendants.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
      count: "18 Designs",
    },
    {
      name: "Bangles & Kada",
      slug: "bangles",
      description: "Traditional heavy gold kadas and thin contemporary diamond bangles.",
      imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
      count: "8 Designs",
    },
    {
      name: "Earrings",
      slug: "earrings",
      description: "Delicate Jhumkas, diamond studs, and contemporary drop earrings.",
      imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop",
      count: "15 Designs",
    },
    {
      name: "Bracelets",
      slug: "bracelets",
      description: "Luxury diamond tennis bracelets and daily wear gold link bracelets.",
      imageUrl: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop",
      count: "6 Designs",
    },
  ];

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Exquisite Range</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Categories</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto pt-2">
              Explore our diverse collections of gold and diamond jewelry, crafted to standard perfection for every occasion.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, index) => (
              <div
                key={cat.slug}
                className={`bg-white border border-border group overflow-hidden flex flex-col justify-between rounded-sm shadow-sm hover:shadow-md transition-all duration-300 ${
                  index === 0 || index === 3 ? "lg:col-span-2" : ""
                }`}
              >
                <div className="relative h-[260px] bg-charcoal overflow-hidden">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 text-white space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-gold font-semibold bg-charcoal/80 px-2 py-0.5 rounded-sm">
                      {cat.count}
                    </span>
                    <h2 className="text-2xl font-serif font-medium tracking-wide">{cat.name}</h2>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <p className="text-xs text-charcoal/70 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 border-t border-border/50 flex justify-between items-center">
                    <span className="text-[10px] text-charcoal/40 uppercase tracking-widest font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-gold" /> Handcrafted
                    </span>
                    
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-gold hover:text-gold-dark uppercase tracking-wider transition-colors"
                    >
                      <span>Explore Shop</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
