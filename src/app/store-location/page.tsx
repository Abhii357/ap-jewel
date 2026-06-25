"use client";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass, Sparkles } from "lucide-react";

export default function StoreLocationPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Visit Our Showroom</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Store Location</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto pt-2">
              Welcome to the AP Jewel Flagship Boutique. Located in the heart of Munger, Bihar, our store is ready to serve you with standard gold, diamonds, and bridal consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">

            {/* Left: Location & Hours details */}
            <div className="md:col-span-5 bg-white border border-border p-8 rounded-sm space-y-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-serif text-charcoal font-semibold mb-4">AP Jewel Munger</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <p className="text-xs text-charcoal/85 leading-relaxed">
                      AP Jewel Building, Chowk Bazar,<br />
                      Munger, Bihar - 811201, India
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Phone className="h-5 w-5 text-gold shrink-0" />
                    <p className="text-xs text-charcoal/85">+91 6344 222111 / +91 99342 55555</p>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="h-5 w-5 text-gold shrink-0" />
                    <p className="text-xs text-charcoal/85">munger@apjewel.com</p>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="h-5 w-5 text-gold shrink-0" />
                    <p className="text-xs text-charcoal/85">
                      10:30 AM – 08:30 PM<br />
                      <span className="text-gold font-semibold">Closed on Mondays</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-6 space-y-4">
                <h3 className="font-semibold text-sm text-charcoal flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-gold" />
                  In-Store Services
                </h3>
                <ul className="text-xs text-charcoal/70 space-y-2 list-disc pl-4">
                  <li>BIS Gold Exchange & Valuation</li>
                  <li>IGI/GIA Diamond Grading Verification</li>
                  <li>Bridal Consultation Suites (By Appointment)</li>
                  <li>Jewelry Repair & Polish Services</li>
                  <li>Custom Karigar Designing Session</li>
                </ul>
              </div>
            </div>

            {/* Right: Mock Maps with Local Directions */}
            <div className="md:col-span-7 space-y-6">

              {/* Premium Maps Block */}
              <div className="relative h-[320px] bg-charcoal border border-gold/30 rounded-sm shadow-md overflow-hidden flex flex-col justify-center items-center text-center p-8">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/15 via-transparent to-black/90" />

                <div className="relative z-10 space-y-4 max-w-sm">
                  <div className="mx-auto w-12 h-12 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center">
                    <Compass className="h-6 w-6 text-gold animate-spin-slow" />
                  </div>
                  <h3 className="font-serif text-lg text-white">Chowk Bazar Landmark</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    We are centrally located in Chowk Bazar, right next to the historic Town Hall. Look for our gold-lit showroom facade.
                  </p>
                  <a
                    href="https://maps.google.com/?q=Chowk+Bazar+Munger+Bihar"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-gold hover:bg-gold-dark text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Local Travel Directions */}
              <div className="bg-white border border-border p-6 rounded-sm space-y-4">
                <h3 className="font-serif text-base text-charcoal font-semibold flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-gold" />
                  Directions from Local Landmarks
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-charcoal/80">
                  <div className="space-y-1 bg-cream/40 p-3 rounded border border-border/50">
                    <h4 className="font-semibold text-charcoal">From Munger Junction (3 km)</h4>
                    <p className="text-[11px] text-charcoal/70 leading-relaxed">
                      Take Station Road towards Rajiv Gandhi Chowk, turn left towards Town Hall, and enter Chowk Bazar. We are 100m past the main arch.
                    </p>
                  </div>
                  <div className="space-y-1 bg-cream/40 p-3 rounded border border-border/50">
                    <h4 className="font-semibold text-charcoal">From Jamalpur (8 km)</h4>
                    <p className="text-[11px] text-charcoal/70 leading-relaxed">
                      Follow Jamalpur Road straight into Munger City, continue onto Sadar Bazar, and head towards Chowk Bazar near the Ganga riverbank road.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </>
  );
}
