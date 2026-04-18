import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Phone, Clock, ShieldCheck, Car, Star, Navigation, ArrowRight } from 'lucide-react';
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import siteConfig from "@/data/siteConfig.json";
import Reviews from "@/components/Reviews";
import TaxiBanner from "@/components/TaxiBanner";

export const metadata: Metadata = {
  title: "Thoothukudi Travels - Best Taxi & Cab Service in Tuticorin",
  description: "Looking for the best travels in Thoothukudi? Travelend offers premium taxi services, outstation cabs, and local sightseeing in Tuticorin at affordable rates.",
  keywords: ["Thoothukudi travels", "Tuticorin travels", "taxi in Thoothukudi", "cab booking Tuticorin", "Thoothukudi tour packages"],
  alternates: {
    canonical: "https://travelend.in/thoothukudi-travels",
  },
};

export default function ThoothukudiTravelsPage() {
  return (
    <div className="flex flex-col w-full bg-white">
      <LocalBusinessSchema />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2000")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
            Best <span className="text-primary">Thoothukudi Travels</span> Service
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-10 text-white/90">
            Professional taxi and cab services in Tuticorin for all your travel needs. Reliable, safe, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <Phone size={20} />
              Book Now: {siteConfig.contact.phone}
            </a>
            <Link href="/taxi-tariff" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
              <Car size={20} />
              View Taxi Tariff
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Why Choose Travelend for <span className="text-primary italic">Thoothukudi Travels?</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Travelend stands out as the most trusted name in <strong>Thoothukudi travels</strong>. Whether you need a quick airport drop, a local city tour, or a long-distance outstation trip, our well-maintained fleet and professional drivers ensure a comfortable journey every time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Clock className="text-primary" />, title: "24/7 Availability", desc: "Ready whenever you are." },
                { icon: <ShieldCheck className="text-primary" />, title: "Safe & Secure", desc: "Verified drivers & GPS tracking." },
                { icon: <Navigation className="text-primary" />, title: "Wide Coverage", desc: "Serving all of Tamil Nadu." },
                { icon: <Star className="text-primary" />, title: "Top Rated", desc: "4.9/5 customer satisfaction." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-colors">
                  <div className="shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800"
              alt="Travel in Thoothukudi" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
          </div>
        </div>
      </section>

      {/* Taxi Fleet Section */}
      <TaxiBanner />

      {/* Local Destinations */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 uppercase">Popular Outstation Routes from Tuticorin</h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { route: "Thoothukudi to Tirunelveli", km: "55km", time: "1.5 hours" },
              { route: "Thoothukudi to Madurai", km: "150km", time: "3 hours" },
              { route: "Thoothukudi to Rameshwaram", km: "180km", time: "4 hours" },
              { route: "Thoothukudi to Kanyakumari", km: "130km", time: "3 hours" },
              { route: "Thoothukudi to Chennai", km: "600km", time: "10 hours" },
              { route: "Thoothukudi to Coimbatore", km: "360km", time: "7 hours" },
            ].map((route, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-slate-400 uppercase tracking-widest text-xs">Route {idx + 1}</span>
                  <div className="p-2 bg-secondary rounded-lg text-primary">
                    <Navigation size={20} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{route.route}</h3>
                <div className="flex items-center gap-4 text-slate-500 font-medium text-sm">
                  <span className="flex items-center gap-1"><MapPin size={16} /> {route.km}</span>
                  <span className="flex items-center gap-1"><Clock size={16} /> {route.time}</span>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-100 flex justify-between items-center">
                   <Link href="/contact" className="text-primary font-bold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                    Enquire Now <ArrowRight size={16} />
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 italic">Looking for the Best Travels in Thoothukudi?</h2>
            <p className="text-xl mb-10 text-white/80">Stop searching and start traveling. Call Travelend now for guaranteed lowest rates and premium service.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
                <Phone size={24} />
                Call +91 93456 05097
              </a>
              <Link href="/contact" className="bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
