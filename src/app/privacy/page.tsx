import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PrivacyPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-3xl mx-auto bg-white border border-border p-8 sm:p-12 rounded-sm shadow-sm">
          <h1 className="text-3xl font-serif text-charcoal font-semibold mb-2">Privacy Policy</h1>
          <p className="text-xs text-charcoal/50 mb-8">Last Updated: June 23, 2026</p>
          
          <div className="space-y-6 text-xs text-charcoal/80 leading-relaxed">
            <p>
              At AP Jewel, we take your privacy and data security seriously. This Privacy Policy details how we collect, protect, and use your personal information when you browse our premium jewelry catalog or complete secure transactions online.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">1. Information We Collect</h2>
            <p>
              We collect information you directly provide us, including your name, shipping address, billing address, phone number, email address, and payment confirmation details. When you browse our website, we also receive device analytics information (e.g. browser type, IP address, screen resolution) to optimize our mobile loading performance.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">2. Payment & Financial Data</h2>
            <p>
              All online payments on AP Jewel are handled through certified third-party payment gateways, primarily **Razorpay**. We do not store or process card numbers, bank credentials, or UPI PINs on our servers. Financial data is encrypted under standard PCI-DSS compliance by the payment handler.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">3. Cookies and Cart Persistence</h2>
            <p>
              We utilize cookies and local web storage to keep track of your shopping cart item quantities, wishlist preferences, and user login tokens. This ensures a seamless, fast checkout experience and avoids losing selected articles upon refresh.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">4. Contact & Marketing</h2>
            <p>
              If you subscribe to our newsletter or submit an inquiry, we will use your email to send collection arrivals, festival discounts, or order tracking status. You may opt out of promotional emails at any time.
            </p>

            <h2 className="text-lg font-serif text-charcoal font-semibold pt-4 border-t border-border">5. Local Business Compliance</h2>
            <p>
              As a physical and online business operating in Munger, Bihar, India, we comply with all applicable local data protection and business compliance regulations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
