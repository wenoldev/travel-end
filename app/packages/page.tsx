

import packagesData from "@/data/packages.json";
import Link from "next/link";

export default function PackagesPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative w-full h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1440")` }}
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
            <h1 className="text-white text-5xl sm:text-7xl font-black mb-4">Tour Packages</h1>
            <p className="text-white/80 text-xl max-w-2xl font-medium">Carefully curated experiences for every kind of traveler.</p>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="max-w-[1280px] mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packagesData.packages.map((pkg) => (
              <div key={pkg.id} className="group relative flex flex-col bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                <div className="w-full aspect-[4/5] overflow-hidden relative">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url("${pkg.image}")` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  {pkg.tag && (
                    <div className="absolute top-6 right-6 bg-primary/95 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-white shadow-lg uppercase tracking-widest">
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
                      <span className="text-xs text-slate-400">{pkg.accommodation}</span>
                    </div>
                  </div>
                  <Link
                    href={`/packages/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="w-full bg-secondary hover:bg-primary hover:text-white text-slate-900 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2"
                  >
                    View Details
                    <span className="material-symbols-outlined text-lg">double_arrow</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
