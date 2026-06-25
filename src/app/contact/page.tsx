"use client";

import { useState } from "react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Custom Jewelry Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Custom Jewelry Inquiry",
        message: "",
      });
    }
  };

  return (
    <>
      <AnnouncementBar />
      <Header />

      <main className="flex-1 bg-cream py-16 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold">Get In Touch</span>
            <h1 className="text-4xl sm:text-5xl font-serif tracking-wide text-luxury-black font-medium">Contact AP Jewel</h1>
            <div className="h-0.5 w-24 bg-gold mx-auto mt-4" />
            <p className="text-sm text-charcoal/80 max-w-xl mx-auto pt-2">
              Have questions about an order, custom jewelry sizing, live gold rates, or want to schedule a private viewing? Send us a message.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Info (5 Cols) */}
            <div className="lg:col-span-5 space-y-8 bg-white border border-border p-8 rounded-sm shadow-sm">
              <h2 className="text-2xl font-serif text-charcoal font-semibold tracking-wide">
                Showroom Information
              </h2>
              <p className="text-xs text-charcoal/60 leading-relaxed">
                Visit our physical store in Chowk Bazar, Munger, Bihar to view our complete bridal catalogs and consult with our master designers.
              </p>

              <div className="space-y-6 pt-4 border-t border-border">
                <div className="flex gap-4">
                  <div className="p-2 bg-gold-light border border-gold/20 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Location Address</h3>
                    <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                      AP Jewel Building, Chowk Bazar,<br />
                      Munger, Bihar - 811201, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-gold-light border border-gold/20 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Call Showroom</h3>
                    <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                      +91 6344 222111<br />
                      +91 99342 55555
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-gold-light border border-gold/20 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Email Support</h3>
                    <p className="text-xs text-charcoal/70 mt-1">
                      support@apjewel.com<br />
                      info@apjewel.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2 bg-gold-light border border-gold/20 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-charcoal">Working Hours</h3>
                    <p className="text-xs text-charcoal/70 mt-1">
                      10:30 AM – 08:30 PM<br />
                      <span className="text-gold font-medium">Closed on Mondays</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact Form (7 Cols) */}
            <div className="lg:col-span-7 bg-white border border-border p-8 rounded-sm shadow-sm">
              <h2 className="text-2xl font-serif text-charcoal font-semibold tracking-wide mb-6">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="inline-flex items-center justify-center p-3 bg-green-50 text-green-600 rounded-full border border-green-200">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal font-semibold">Message Sent Successfully!</h3>
                  <p className="text-xs text-charcoal/60 max-w-sm mx-auto">
                    Thank you for reaching out to AP Jewel. One of our jewelry consultants will contact you within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 bg-gold hover:bg-gold-dark text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-cream border border-border px-4 py-3 text-xs text-luxury-black focus:outline-none focus:border-gold"
                        placeholder="E.g. Rajesh Kumar"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-cream border border-border px-4 py-3 text-xs text-luxury-black focus:outline-none focus:border-gold"
                        placeholder="E.g. rajesh@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-cream border border-border px-4 py-3 text-xs text-luxury-black focus:outline-none focus:border-gold"
                        placeholder="E.g. +91 9988776655"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Subject</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-cream border border-border px-4 py-3 text-xs text-luxury-black focus:outline-none focus:border-gold"
                      >
                        <option value="Custom Jewelry Inquiry">Custom Jewelry Inquiry</option>
                        <option value="Order Status">Order Status & Delivery</option>
                        <option value="Design Consultation">Design Consultation Appointment</option>
                        <option value="Product Sizing">Product Ring Sizing</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-semibold text-charcoal">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-cream border border-border px-4 py-3 text-xs text-luxury-black focus:outline-none focus:border-gold resize-none"
                      placeholder="Please write details about your metal specifications, size, or custom requests..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-dark text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
