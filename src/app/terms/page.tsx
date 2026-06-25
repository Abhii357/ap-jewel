import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto bg-white border border-border p-8 sm:p-12 rounded-sm shadow-sm">
          <h1 className="text-3xl font-serif text-charcoal font-semibold mb-2">Terms & Conditions</h1>
          <p className="text-xs text-charcoal/50 mb-8">Last Updated: June 23, 2026</p>
          
          <div className="space-y-6 text-xs text-charcoal/80 leading-relaxed">
            <p>
              Welcome to AP Jewel. By using our website and purchasing our jewelry, you agree to comply with the terms and conditions outlined below.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">1. Pricing and Live Gold Rates</h2>
            <p>
              The prices of our gold and diamond ornaments are calculated dynamically based on weight, current daily gold rates (for 24K, 22K, and 18K gold as updated daily in our database), and associated making charges. Because metal rates fluctuate daily in the bullion market, the final price is locked at the moment of payment completion during checkout.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">2. Authenticity & Certificates</h2>
            <p>
              AP Jewel guarantees that all articles are genuine. All gold jewelry pieces are 100% BIS Hallmarked. All diamond jewelry pieces are accompanied by authenticity certificates from standard grading labs (such as IGI or GIA).
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">3. Shipping and Delivery</h2>
            <p>
              We provide free, fully insured shipping throughout India. Orders are processed after verification of payment. Once shipped, the customer is provided with a unique tracking number. Delivery typically takes 5-7 business days. In-store pickup at our Munger showroom is also available upon selecting "Pick Up at Store" during checkout.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">4. Custom Orders and Modifications</h2>
            <p>
              For custom-made jewelry or ring resizing requests, extra design and manufacturing time is required. Custom orders cannot be cancelled once production has started in our Munger workshop.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">5. Jurisdictional Authority</h2>
            <p>
              Any disputes or legal proceedings arising from transactions on this platform shall be subject to the exclusive jurisdiction of the competent courts in Munger, Bihar, India.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
