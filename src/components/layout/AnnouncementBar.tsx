"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { Sparkles, ShieldCheck, Truck } from "lucide-react";

export default function AnnouncementBar() {
  const goldRates = useStore((state) => state.goldRates);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-charcoal text-gold-light py-2 text-center text-xs tracking-wider border-b border-gold/20 font-sans">
        AP Jewel | Trust & Craftsmanship Since 1995
      </div>
    );
  }

  const rate24k = goldRates["24K"] ? `₹${goldRates["24K"].toLocaleString("en-IN")}` : "₹7,450";
  const rate22k = goldRates["22K"] ? `₹${goldRates["22K"].toLocaleString("en-IN")}` : "₹6,830";

  return (
    <div className="bg-charcoal text-white py-2 text-xs overflow-hidden relative border-b border-gold/20 font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Left Side: Store Assurance */}
        <div className="hidden md:flex items-center gap-4 text-gold-light">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" />
            100% BIS Hallmarked
          </span>
          <span className="h-3 w-px bg-gold/30" />
          <span className="flex items-center gap-1">
            <Truck className="h-3.5 w-3.5 text-gold" />
            Free Insured Shipping
          </span>
        </div>

        {/* Center/Scroll: Live Metal Rates & Promotions */}
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-center">
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-widest font-semibold text-gold">
              <Sparkles className="h-3 w-3 animate-pulse" />
              Live Gold Rates (1g):
            </span>
            <span className="tracking-wide">
              24K: <strong className="text-gold-light">{rate24k}</strong>
            </span>
            <span className="text-gold/40">•</span>
            <span className="tracking-wide">
              22K: <strong className="text-gold-light">{rate22k}</strong>
            </span>
            <span className="hidden sm:inline text-gold/40">•</span>
            <span className="hidden sm:inline uppercase tracking-widest text-[10px] text-gold-light">
              Crafted in Munger, Bihar
            </span>
          </div>
        </div>

        {/* Right Side: Quick Action */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/store-location"
            className="text-gold-light hover:text-gold transition-colors tracking-wide underline decoration-gold/40 underline-offset-4"
          >
            Visit Our Munger Store
          </a>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(10%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(-10%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite alternate;
        }
      `}</style>
    </div>
  );
}
