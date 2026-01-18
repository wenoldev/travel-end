import Header from "@/components/Header";
import Footer from "@/components/Footer";
import packagesData from "@/data/packages.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import siteConfig from "@/data/siteConfig.json";

interface ItineraryItem {
  day: number;
  title: string;
  details: string;
}

interface Package {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  duration: string;
  accommodation: string;
  tag?: string;
  spots?: string[];
  itinerary?: ItineraryItem[];
}

export default async function PackageDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = (packagesData.packages as Package[]).find(p => p.id === slug || p.title.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!pkg) {
    notFound();
  }

  return (
    <div className="bg-white font-sans text-slate-900 antialiased">
      <Header />
      <main className="w-full">
        {/* Banner Section - Match Image 2 Pattern */}
        <section className="relative w-full h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-105"
            style={{ backgroundImage: `url("${pkg.image}")` }}
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-1.5 bg-white rounded-full" />
              <h1 className="text-white text-5xl sm:text-6xl font-black tracking-tight drop-shadow-xl uppercase">
                {pkg.title}
              </h1>
            </div>

            {/* Breadcrumbs */}
            <nav className="flex items-center gap-3 text-white/90 text-sm font-bold bg-white/10 backdrop-blur-md w-fit px-6 py-3 rounded-full border border-white/20">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link href="/packages" className="hover:text-white">Packages</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white">{pkg.title}</span>
            </nav>
          </div>
        </section>

        {/* Content Layout */}
        <div className="max-w-[1280px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left Column: Details & Itinerary */}
            <div className="lg:col-span-2 space-y-12">

              {/* Overview */}
              <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex flex-col gap-4 mb-8">
                  <span className="text-primary font-black uppercase tracking-widest text-sm">Experience</span>
                  <h2 className="text-3xl font-black italic">Package Overview</h2>
                  <div className="h-1 w-20 bg-primary rounded-full" />
                </div>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  Embark on a unique journey with our {pkg.title} package. Spanning {pkg.duration}, this experience is curated to highlight the best spots and hidden gems, offering you {pkg.accommodation}.
                </p>

                {/* Spots Included */}
                {pkg.spots && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">location_on</span>
                      Spots in this tour:
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {pkg.spots.map((spot: string, i: number) => (
                        <div key={i} className="bg-secondary px-6 py-3 rounded-2xl border border-slate-100 font-bold text-slate-700 flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">verified</span>
                          {spot}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Itinerary - Day by Day Driven by JSON */}
              {pkg.itinerary && (
                <section className="space-y-8">
                  <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-black italic">Trip Itinerary</h2>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                  </div>

                  <div className="space-y-6">
                    {pkg.itinerary.map((day: ItineraryItem) => (
                      <div key={day.day} className="group flex gap-6 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="size-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg shadow-primary/20">
                            {day.day}
                          </div>
                          <div className="w-0.5 h-full bg-slate-100 my-4" />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-2xl font-black text-slate-800">Day {day.day}: {day.title}</h3>
                          <p className="text-slate-500 leading-relaxed text-lg">{day.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column: Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-slate-900 text-white rounded-[3rem] p-10 space-y-8 shadow-2xl">
                <div>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-2">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-5xl font-black text-white">₹{pkg.price}</h3>
                    <span className="text-white/60 font-medium">/person</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">schedule</span>
                    <div>
                      <p className="text-xs text-white/40 font-bold uppercase">Duration</p>
                      <p className="font-black text-white">{pkg.duration}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-4">
                    <span className="material-symbols-outlined text-primary text-3xl">hotel</span>
                    <div>
                      <p className="text-xs text-white/40 font-bold uppercase">Stay</p>
                      <p className="font-black text-white">{pkg.accommodation}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in booking the ${pkg.title} package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary hover:bg-[#6c193d] text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 text-center block"
                >
                  Book This Experience
                </a>
                <button className="w-full bg-transparent border-2 border-white/20 hover:bg-white/5 text-white py-5 rounded-2xl font-black text-lg transition-all">
                  Request Callback
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
