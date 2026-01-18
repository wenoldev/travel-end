import Header from "@/components/Header";
import Footer from "@/components/Footer";
import packagesData from "@/data/packages.json";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section className="w-full bg-white">
          <HeroCarousel />
        </section>

        {/* Intro Feature Section */}
        <section className="w-full bg-[#f8f9fa] py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl animate-pulse" />
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex flex-col gap-8 flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  About Us
                </div>
                <h2 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                  Crafting Your Perfect <span className="text-primary italic">Travel Story</span>
                </h2>
                <p className="text-slate-600 text-lg font-medium leading-relaxed">
                  Your trusted partner for exploring the hidden gems and heritage of South India. We specialize in creating unforgettable journeys through the rich culture, spicy cuisine, and diverse landscapes of the region.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform" href="/about">
                    Our Story
                  </Link>
                  <Link className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-100 rounded-xl font-bold hover:bg-slate-50 transition-colors" href="/contact">
                    Get in Touch
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full lg:w-auto flex-[1.2]">
                {[
                  { icon: 'location_on', title: 'Local Expertise', desc: 'Deep native knowledge of history and culture.' },
                  { icon: 'calendar_month', title: 'Custom Itineraries', desc: 'Tailor-made trips to suit your travel style.' },
                  { icon: 'support_agent', title: '24/7 Support', desc: 'Always here to help you during your journey.' },
                  { icon: 'verified', title: 'Trusted Service', desc: 'Thousands of happy travelers every year.' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex flex-col gap-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="size-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group">
                      <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-slate-900 text-xl font-bold">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="w-full bg-white py-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-end gap-8 mb-16 px-4">
              <div className="max-w-xl">
                <h2 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">Trending Packages</h2>
                <div className="h-1.5 w-24 bg-primary rounded-full mb-6" />
                <p className="text-slate-500 text-lg font-medium">Explore our most booked packages this season, curated just for you.</p>
              </div>
              <Link className="text-primary font-bold text-lg hover:underline flex items-center gap-2 group" href="/packages">
                All Destinations
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {packagesData.packages.map((pkg) => (
                <div key={pkg.id} className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="w-full aspect-[4/5] overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${pkg.image}")` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    {pkg.tag && (
                      <div className="absolute top-6 right-6 bg-primary/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-white shadow-lg uppercase tracking-widest leading-none">
                        {pkg.tag}
                      </div>
                    )}
                    <div className="absolute bottom-6 left-6 right-6 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
                      <h3 className="text-2xl font-black mb-1 drop-shadow-md">{pkg.title}</h3>
                      <div className="flex items-center gap-2 text-white/90 text-sm font-bold">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {pkg.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Starting from</span>
                        <span className="text-primary text-3xl font-black">₹{pkg.price}</span>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="flex items-center gap-1 text-slate-700 font-bold mb-1">
                          <span className="material-symbols-outlined text-lg">schedule</span>
                          {pkg.duration}
                        </div>
                        <span className="text-xs text-slate-400">{pkg.accommodation} included</span>
                      </div>
                    </div>
                    <Link
                      href={`/packages/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="w-full bg-secondary hover:bg-primary hover:text-white text-slate-900 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2 group/btn"
                    >
                      View Trip Details
                      <span className="material-symbols-outlined text-lg transition-transform group-hover/btn:translate-x-1">double_arrow</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-white pb-24">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full bg-primary rounded-[3rem] p-12 sm:p-20 relative overflow-hidden flex flex-col items-center text-center">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-white text-4xl sm:text-6xl font-black mb-8 leading-tight">Ready to Start Your Journey?</h2>
                <p className="text-white/80 text-lg sm:text-xl font-medium mb-12">
                  Contact our travel experts today and let us plan your dream vacation down to the last detail.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a href="tel:+919876543210" className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-xl">
                    <span className="material-symbols-outlined">call</span>
                    Call Us Now
                  </a>
                  <Link href="/contact" className="flex items-center justify-center gap-3 px-10 py-5 bg-primary border-2 border-white/30 text-white rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                    Plan My Trip
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
