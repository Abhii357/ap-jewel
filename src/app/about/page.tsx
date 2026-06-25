import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Sparkles, Award, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      
      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Our Heritage</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">About AP Jewel</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto italic pt-2">
              "Honoring generations of luxury, trust, and unmatched craftsmanship in Munger, Bihar."
            </p>
          </div>

          {/* Legacy Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-serif text-luxury-black font-medium tracking-wide">
                A Legacy of Purity Since 1995
              </h2>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Founded in the historic town of Munger, Bihar, AP Jewel has grown from a humble family showroom into a benchmark of luxury, reliability, and certified purity. For over three decades, we have had the privilege of embellishing the special moments of countless families with gold, diamonds, and precious gemstones.
              </p>
              <p className="text-sm text-charcoal/80 leading-relaxed">
                Every piece in our catalog is hand-selected and crafted by master karigars who bring centuries of heritage jewelry techniques into contemporary, modern designs. Whether you are looking for classic bridal ornaments or sleek daily-wear gold, we guarantee unrivaled authenticity.
              </p>
            </div>
            
            {/* Visual Box representing luxury showroom image */}
            <div className="relative h-[350px] w-full border border-gold/30 bg-charcoal p-8 flex flex-col justify-end text-gold-light rounded-sm shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-black/85" />
              <div className="relative z-10 space-y-3">
                <Sparkles className="h-8 w-8 text-gold animate-pulse" />
                <h3 className="font-serif text-xl text-white">Our Munger Showroom</h3>
                <p className="text-xs text-white/70">
                  Experience our craftsmanship in person. Our flagship boutique features a secure, private viewing lounge for bridal catalog consultations.
                </p>
              </div>
            </div>
          </div>

          {/* Pillars of Trust */}
          <div className="space-y-8 mb-20">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-serif text-charcoal font-semibold">Our Pillars of Trust</h2>
              <div className="h-[1px] w-16 bg-gold/50 mx-auto mt-3" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
              <div className="bg-white border border-border p-6 text-center space-y-4 rounded-sm shadow-sm hover:border-gold transition-all duration-300">
                <div className="mx-auto w-12 h-12 bg-gold-light rounded-full flex items-center justify-center border border-gold/20">
                  <ShieldCheck className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">100% BIS Hallmarked</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  We sell exclusively 916 BIS Hallmarked Gold and certified diamonds, ensuring absolute purity and resale value guarantee.
                </p>
              </div>

              <div className="bg-white border border-border p-6 text-center space-y-4 rounded-sm shadow-sm hover:border-gold transition-all duration-300">
                <div className="mx-auto w-12 h-12 bg-gold-light rounded-full flex items-center justify-center border border-gold/20">
                  <Award className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">Fair Pricing</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  Transparent metal pricing based on daily live rates, combined with minimal, reasonable making charges and zero hidden costs.
                </p>
              </div>

              <div className="bg-white border border-border p-6 text-center space-y-4 rounded-sm shadow-sm hover:border-gold transition-all duration-300">
                <div className="mx-auto w-12 h-12 bg-gold-light rounded-full flex items-center justify-center border border-gold/20">
                  <Heart className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg text-charcoal font-semibold">Customer First</h3>
                <p className="text-xs text-charcoal/60 leading-relaxed">
                  Lifetime exchange guarantees, buyback options, secure transit delivery packaging, and personal wedding jewelry counseling.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate statement */}
          <div className="bg-white border border-gold/30 p-8 text-center space-y-4 rounded-sm">
            <h3 className="font-serif text-xl text-gold-dark font-medium">Quality Certified by Leading Institutions</h3>
            <p className="text-xs text-charcoal/70 max-w-xl mx-auto leading-relaxed">
              Every single diamond purchase is accompanied by an authentic certificate of grading (IGI or GIA) specifying exact cut, clarity, color, and carat weight. Our gold carries the government-approved BIS logo and unique HUID identifier.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
