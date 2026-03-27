import { getDestinations, cmsIds, slugify } from "@/lib/data";
import Link from "next/link";
import { ChevronRight } from 'lucide-react';

export default async function DestinationsPage() {
  const [tamilnadu, kerala, karnataka] = await Promise.all([
    getDestinations(cmsIds.tamilnadu),
    getDestinations(cmsIds.kerala),
    getDestinations(cmsIds.karnataka)
  ]);

  const categories = [
    { name: "Tamil Nadu", data: tamilnadu, id: "tamilnadu" },
    { name: "Kerala", data: kerala, id: "kerala" },
    { name: "Karnataka", data: karnataka, id: "karnataka" }
  ];

  return (
    <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative w-full h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("https://images.unsplash.com/photo-1590050752117-23a9d7fc6f8a?auto=format&fit=crop&q=80&w=1440")` }}
          />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-2">
              <div className="h-10 w-1.5 bg-white rounded-full" />
              <h1 className="text-white text-5xl sm:text-7xl font-black">Destinations</h1>
            </div>
            <p className="text-white/80 text-xl max-w-2xl font-medium">Explore the diverse landscapes and natural beauty of India.</p>
          </div>
        </section>

        {/* Categories & Destinations */}
        <div className="max-w-[1280px] mx-auto px-4 py-20 space-y-20">
          {categories.map((category) => (
            <section key={category.id}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">{category.name}</h2>
                <div className="h-0.5 flex-grow bg-slate-100 mt-2" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {category.data.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${category.id}/${slugify(dest.name)}`}
                    className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url("${dest.image}")` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-white border border-white/20 uppercase tracking-widest leading-none">
                        {category.name}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-300 group-hover:-translate-y-2">
                      <h3 className="text-3xl font-black text-white mb-2">{dest.name}</h3>
                      <p className="text-white/70 text-sm line-clamp-2 mb-6 font-medium">{dest.description}</p>
                      <div className="flex items-center gap-2 text-white font-black text-sm group/btn">
                        Explore Now
                        <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
