import Header from "@/components/Header";
import Footer from "@/components/Footer";
import destinationsData from "@/data/destinations.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DestinationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = destinationsData.destinations.find(d => d.id === id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-[#0d161b] dark:text-slate-100 antialiased">
      <Header />
      <main className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex mb-6">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400" href="/">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-sm mx-1">chevron_right</span>
                <Link className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400" href="/destinations">Destinations</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-sm mx-1">chevron_right</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{destination.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[400px] md:min-h-[480px] bg-slate-200 dark:bg-slate-800 mb-8 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url("${destination.image}")` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star_half</span>
                  <span className="text-white text-sm font-medium ml-1">4.8 (1,240 Reviews)</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{destination.name}</h1>
                <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl">{destination.description}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all border border-white/30">
                  <span className="material-symbols-outlined text-[20px]">photo_library</span>
                  View Gallery
                </button>
                <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all border border-white/30">
                  <span className="material-symbols-outlined text-[20px]">share</span>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* Left Column: Main Content */}
          <div className="flex flex-col gap-8">
            {/* Navigation Tabs */}
            <div className="sticky top-[64px] z-40 bg-background-light dark:bg-background-dark pt-2 pb-0">
              <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 dark:border-slate-700 gap-8">
                <a className="whitespace-nowrap pb-4 border-b-[3px] border-primary text-primary text-sm font-bold" href="#overview">Overview</a>
                <a className="whitespace-nowrap pb-4 border-b-[3px] border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-bold transition-colors" href="#attractions">Attractions</a>
                <a className="whitespace-nowrap pb-4 border-b-[3px] border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-bold transition-colors" href="#activities">Activities</a>
                <a className="whitespace-nowrap pb-4 border-b-[3px] border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-sm font-bold transition-colors" href="#reviews">Reviews</a>
              </div>
            </div>

            {/* Overview Section */}
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm" id="overview">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">About {destination.name}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {destination.description}. This destination is known for its unique culture, stunning landscapes, and rich history. Whether you're looking for adventure or relaxation, {destination.name} has something for everyone.
              </p>

              {/* Key Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/10">
                  <div className="text-primary bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Best Time</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Oct - Mar is ideal. Summer is pleasant.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-100 dark:border-orange-800/20">
                  <div className="text-orange-500 bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm">
                    <span className="material-symbols-outlined">thermostat</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Weather</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">20°C - 10°C. Mist is common.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800/20">
                  <div className="text-purple-500 bg-white dark:bg-slate-800 p-2 rounded-full shadow-sm">
                    <span className="material-symbols-outlined">flight</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Nearest Airport</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Madurai (IXM) - 120km away.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Booking Card */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                <div className="flex justify-between items-end mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Packages start from</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-extrabold text-[#0d161b] dark:text-white">₹7,499</h3>
                      <span className="text-sm font-medium text-slate-500">/person</span>
                    </div>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded text-xs font-bold border border-green-200 dark:border-green-800">
                    20% OFF
                  </div>
                </div>
                <form className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Travel Date</label>
                    <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5" type="date" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Adults</label>
                      <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5">
                        <option>2</option>
                        <option>3</option>
                        <option>4+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Children</label>
                      <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-primary focus:ring-primary text-sm py-2.5">
                        <option>0</option>
                        <option>1</option>
                        <option>2+</option>
                      </select>
                    </div>
                  </div>
                  <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg mt-2 transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2" type="button">
                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                    Book Now
                  </button>
                  <button className="w-full bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-primary border border-primary font-bold py-3 rounded-lg transition-colors" type="button">
                    Request Callback
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
