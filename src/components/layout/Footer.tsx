"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Sparkles, Send, ShieldCheck, Award } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-16 pb-8 font-sans border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-white/10 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-white/5 rounded-full border border-gold/20">
              <ShieldCheck className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-gold text-lg tracking-wide">100% Certified Purity</h4>
              <p className="text-xs text-white/60 mt-1">Every article is BIS Hallmarked and verified for certified gold and diamond purity.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-white/5 rounded-full border border-gold/20">
              <Award className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-gold text-lg tracking-wide">Legacy of Trust</h4>
              <p className="text-xs text-white/60 mt-1">Trusted jewelry brand based in Munger, Bihar, serving families since 1995.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-3.5 bg-white/5 rounded-full border border-gold/20">
              <Sparkles className="h-7 w-7 text-gold" />
            </div>
            <div>
              <h4 className="font-serif text-gold text-lg tracking-wide">Exquisite Craftsmanship</h4>
              <p className="text-xs text-white/60 mt-1">Custom jewelry hand-designed by award-winning karigars with precision.</p>
            </div>
          </div>
        </div>

        {/* Middle: Links and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-16">
          
          {/* Brand Info & Newsletter */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-serif tracking-[0.2em] text-white font-semibold">AP JEWEL</span>
              <span className="text-[9px] tracking-[0.4em] text-gold uppercase mt-1">Heritage & Craftsmanship</span>
            </div>
            <p className="text-xs text-white/75 leading-relaxed">
              AP Jewel brings you luxurious, timeless gold and diamond ornaments meticulously crafted to celebrate your life's precious moments.
            </p>
            
            {/* Newsletter */}
            <div className="pt-2">
              <h5 className="text-xs uppercase tracking-widest font-semibold text-gold mb-3">Newsletter</h5>
              {subscribed ? (
                <p className="text-xs text-gold-light">Thank you! You have subscribed to our seasonal collection updates.</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 bg-white/5 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold placeholder:text-white/30"
                  />
                  <button
                    type="submit"
                    className="bg-gold hover:bg-gold-dark text-white p-2.5 transition-colors"
                    aria-label="Subscribe"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Shopping Links */}
          <div className="space-y-5">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-gold border-b border-white/5 pb-2">Collections</h5>
            <ul className="space-y-3.5 text-xs text-white/80">
              <li><Link href="/shop?category=gold" className="hover:text-gold transition-colors">Gold Jewelry</Link></li>
              <li><Link href="/shop?category=diamond" className="hover:text-gold transition-colors">Diamond Jewelry</Link></li>
              <li><Link href="/shop?filter=bridal" className="hover:text-gold transition-colors">Bridal Collection</Link></li>
              <li><Link href="/shop?filter=festival" className="hover:text-gold transition-colors">Festival Special Ornaments</Link></li>
              <li><Link href="/shop?filter=new" className="hover:text-gold transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Customer Service & Policies */}
          <div className="space-y-5">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-gold border-b border-white/5 pb-2">Customer Care</h5>
            <ul className="space-y-3.5 text-xs text-white/80">
              <li><Link href="/order-tracking" className="hover:text-gold transition-colors">Track Order</Link></li>
              <li><Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors">Help & FAQ</Link></li>
              <li><Link href="/store-location" className="hover:text-gold transition-colors">Our Physical Store</Link></li>
            </ul>
          </div>

          {/* Store Location & Contact Coordinates */}
          <div className="space-y-5">
            <h5 className="text-xs uppercase tracking-widest font-semibold text-gold border-b border-white/5 pb-2">Our Store</h5>
            <ul className="space-y-4 text-xs text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-4.5 w-4.5 text-gold shrink-0 mt-0.5" />
                <span>
                  AP Jewel Building,<br />
                  Chowk Bazar, Munger,<br />
                  Bihar, Pin - 811201, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-gold shrink-0" />
                <span>+91 6344 222111 / +91 99342 55555</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-gold shrink-0" />
                <span>support@apjewel.com</span>
              </li>
              <li className="pt-2 text-[10px] text-white/60">
                <strong>Hours:</strong> 10:30 AM - 8:30 PM<br />
                Closed on Mondays
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom: Payment & Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} AP Jewel. All Rights Reserved. Crafted with love in Munger, Bihar.</p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">Secure Online Payments:</span>
            {/* Payment Trust Badges Display */}
            <div className="flex gap-2">
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[9px] font-semibold text-gold-light uppercase tracking-wider">Razorpay</span>
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[9px] font-semibold text-gold-light uppercase tracking-wider">UPI</span>
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[9px] font-semibold text-gold-light uppercase tracking-wider">Visa/Mastercard</span>
              <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-[9px] font-semibold text-gold-light uppercase tracking-wider">Net Banking</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
