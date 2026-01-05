import Header from "@/components/Header";
import Footer from "@/components/Footer";
import packagesData from "@/data/packages.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = packagesData.packages.find(p => p.id === id);

  if (!pkg) {
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
                <Link className="text-sm font-medium text-slate-500 hover:text-primary dark:text-slate-400" href="/packages">Packages</Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-slate-400 text-sm mx-1">chevron_right</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">{pkg.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative w-full rounded-2xl overflow-hidden min-h-[400px] md:min-h-[480px] bg-slate-200 dark:bg-slate-800 mb-8 group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url("${pkg.image}")` }}
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
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="text-white text-sm font-medium ml-1">5.0 (85 Reviews)</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">{pkg.title}</h1>
                <p className="text-slate-200 text-lg md:text-xl font-medium max-w-2xl">{pkg.subtitle}</p>
              </div>
              <div className="flex gap-3">
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
            <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Package Overview</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Experience the best of {pkg.title} with our carefully curated {pkg.duration} tour. This package includes {pkg.accommodation} and is designed to give you an unforgettable experience of Tamil Nadu's rich culture and natural beauty.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="font-bold dark:text-white">{pkg.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <span className="material-symbols-outlined text-primary">hotel</span>
                  <div>
                    <p className="text-xs text-slate-500">Accommodation</p>
                    <p className="font-bold dark:text-white">{pkg.accommodation}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Itinerary Highlights</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                    <div className="w-0.5 flex-grow bg-slate-200 dark:bg-slate-700 my-2"></div>
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Arrival and Sightseeing</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Welcome to the destination. Check-in to your hotel and start exploring the local attractions.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                    <div className="w-0.5 flex-grow bg-slate-200 dark:bg-slate-700 my-2"></div>
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Cultural Immersion</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Visit ancient temples and experience the local traditions and cuisine.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="size-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                  </div>
                  <div>
                    <h3 className="font-bold dark:text-white">Departure</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Last minute shopping and transfer to the airport/station for your journey back home.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="relative">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
                <div className="flex justify-between items-end mb-4 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Price</p>
                    <div className="flex items-baseline gap-1">
                      <h3 className="text-3xl font-extrabold text-[#0d161b] dark:text-white">₹{pkg.price}</h3>
                      <span className="text-sm font-medium text-slate-500">/person</span>
                    </div>
                  </div>
                </div>
                <form className="flex flex-col gap-4">
                  <button className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-lg mt-2 transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2" type="button">
                    Book This Package
                  </button>
                  <button className="w-full bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-primary border border-primary font-bold py-3 rounded-lg transition-colors" type="button">
                    Enquire Now
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
