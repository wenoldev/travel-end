import Header from "@/components/Header";
import Footer from "@/components/Footer";
import destinationsData from "@/data/destinations.json";
import Link from "next/link";

export default function DestinationsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-[#0d161b] dark:text-slate-50 flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full bg-cover bg-center bg-no-repeat min-h-[300px] flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200")`
          }}
        >
          <div className="w-full max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              Destinations
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Explore the diverse landscapes and rich heritage of Tamil Nadu.
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destinationsData.destinations.map((dest) => (
              <Link
                key={dest.id}
                href={`/destinations/${dest.id}`}
                className="group relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${dest.image}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{dest.name}</h3>
                  <p className="text-slate-200 text-sm line-clamp-2">{dest.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-primary font-bold text-sm">
                    Explore <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-white dark:bg-slate-900 py-16 border-y border-slate-100 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to start your journey?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Let us help you plan the perfect trip to your favorite destination.</p>
            <button className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-colors">
              Contact Our Experts
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
