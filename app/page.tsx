import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/data/siteConfig.json";
import packagesData from "@/data/packages.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <div className="w-full bg-background-light dark:bg-background-dark py-6 sm:py-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="@container">
              <div
                className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-6 sm:p-10 relative overflow-hidden shadow-lg"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA9pqoaFKdNaYqeAom9AlcntGbqZJG4Hz7RiyiU7r1B69ZUeYZUbxGV8pPYviQhXYCfit3kN6Sa0TPWnoR7ZS3sulcwkDYzPqUrL1fNNPxv9bxcmIYb9jyBssbWxwqoN8Qfm2nREvCurvn5bE7Avtl11dXR2leeKKFokVGGtMuarCwEj0pWy-XEkW_MeqfjYPlXViIo69FPYwfgqcvxy2LJZ2ar4m3j6mUFyeQnIex5aKXP7oTUDEDqoqMNxE6wVrBQsjBxf_AWWSPN")`
                }}
              >
                <div className="flex flex-col gap-3 text-center z-10 max-w-2xl">
                  <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight drop-shadow-md">
                    {siteConfig.tagline}
                  </h1>
                  <h2 className="text-white/90 text-base sm:text-lg font-medium leading-relaxed drop-shadow-sm max-w-lg mx-auto">
                    {siteConfig.description}
                  </h2>
                </div>
                <label className="flex flex-col w-full max-w-[540px] z-10 mt-4">
                  <div className="flex w-full flex-col sm:flex-row items-stretch rounded-lg bg-white dark:bg-slate-800 shadow-xl overflow-hidden p-1 gap-1">
                    <div className="flex-1 flex items-center px-3 relative h-12 sm:h-auto border-b sm:border-b-0 sm:border-r border-slate-100 dark:border-slate-700">
                      <span className="material-symbols-outlined text-slate-400">search</span>
                      <input className="w-full h-full bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 text-base px-3" placeholder="Where do you want to go?" />
                    </div>
                    <div className="flex items-center px-1">
                      <button className="w-full sm:w-auto flex items-center justify-center rounded-md h-12 sm:h-12 px-8 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all">
                        Search
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Feature Section */}
        <div className="w-full bg-background-light dark:bg-background-dark py-10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              <div className="flex flex-col gap-6 flex-1">
                <h2 className="text-slate-900 dark:text-white text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                  About {siteConfig.siteName}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg font-normal leading-relaxed">
                  Your trusted partner for exploring the hidden gems and heritage of Tamil Nadu. We specialize in creating unforgettable journeys through the rich culture, spicy cuisine, and diverse landscapes of the region.
                </p>
                <Link className="text-primary font-bold hover:underline inline-flex items-center gap-1" href="/about">
                  Read our story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full lg:w-auto flex-[1.5]">
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Local Expertise</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Deep native knowledge of Tamil Nadu's history and culture.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">calendar_month</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">Custom Itineraries</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Tailor-made trips to suit your specific travel preferences.</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">support_agent</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white text-lg font-bold">24/7 Support</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Always here to help you during every step of your journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Destinations Header */}
        <div className="w-full bg-background-light dark:bg-background-dark pt-8 pb-4">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-bold leading-tight tracking-tight">Popular Destinations</h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">Explore our most booked packages this season</p>
            </div>
            <Link className="text-primary font-bold text-sm hover:underline" href="/packages">View All Destinations</Link>
          </div>
        </div>

        {/* Image Grid */}
        <div className="w-full bg-background-light dark:bg-background-dark pb-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
              {packagesData.packages.map((pkg) => (
                <div key={pkg.id} className="group flex flex-col gap-4 bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="w-full aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url("${pkg.image}")` }}
                    ></div>
                    {pkg.tag && (
                      <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-slate-800 dark:text-white shadow-sm">
                        {pkg.tag}
                      </div>
                    )}
                  </div>
                  <div className="px-1 pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">{pkg.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{pkg.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-primary font-bold">₹{pkg.price}</span>
                        <span className="text-xs text-slate-400">per person</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-3">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        {pkg.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[18px]">hotel</span>
                        {pkg.accommodation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
