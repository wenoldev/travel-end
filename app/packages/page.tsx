import Header from "@/components/Header";
import Footer from "@/components/Footer";
import packagesData from "@/data/packages.json";
import Link from "next/link";

export default function PackagesPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-[#0d161b] dark:text-slate-50 flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          className="relative w-full bg-cover bg-center bg-no-repeat min-h-[400px] flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWlsx0raGTF0gXkc05QBhkiYdLA_l2HXcHEdZGM-FtdQiJx0Vy1uD2jw1t4v8rmIeQFMTpR4E1Z1cZiSAGkqqp1nWo1DF3Xi_SpvUHRAgAQf5RnEtUjNmX8z04uxn8P13dAzalqqd_ZfLF7UVA4s_aeDu4b6IH-GZR6vh8Dev5Aunk6cJs_W0Wbhh3NO3SekfzJhphTOStZo5CNjpdyPH63f3X6lnbZcNGfweMhqF4PpJni-xJjc5YtbkwaQB6ZLXM77Da5Jd-VrlV")`
          }}
        >
          <div className="w-full max-w-4xl px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
              Explore Tamil Nadu
            </h1>
            <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              Discover the soul of the south. Unforgettable journeys through ancient temples, misty hills, and pristine beaches start here.
            </p>
            {/* Search Bar */}
            <div className="bg-white dark:bg-[#1a2632] p-2 rounded-xl shadow-xl max-w-3xl mx-auto flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 h-12 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-gray-400 mr-3">search</span>
                <input className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400" placeholder="Search destinations (e.g., Ooty, Madurai)..." type="text" />
              </div>
              <div className="flex-1 flex items-center px-4 h-12 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-gray-700">
                <span className="material-symbols-outlined text-gray-400 mr-3">calendar_month</span>
                <input className="w-full bg-transparent border-none focus:ring-0 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400" placeholder="Duration (e.g., 3 Days)" type="text" />
              </div>
              <button className="h-12 px-8 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                <span>Find</span>
              </button>
            </div>
          </div>
        </section>

        {/* Filters & Sort */}
        <section className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#101a22] sticky top-16 z-40 shadow-sm">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
                <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2632] text-sm font-medium hover:border-primary hover:text-primary transition-all">
                  <span>Duration</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2632] text-sm font-medium hover:border-primary hover:text-primary transition-all">
                  <span>Budget</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
                <button className="whitespace-nowrap flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a2632] text-sm font-medium hover:border-primary hover:text-primary transition-all">
                  <span>Theme</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              </div>
              <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
                Showing {packagesData.packages.length} Packages
              </div>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0d161b] dark:text-white">Popular Tour Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packagesData.packages.map((pkg) => (
              <div key={pkg.id} className="group bg-white dark:bg-[#1a2632] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col h-full hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  {pkg.tag && (
                    <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {pkg.tag}
                    </div>
                  )}
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                    style={{ backgroundImage: `url("${pkg.image}")` }}
                  ></div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                      <span className="material-symbols-outlined text-[18px]">schedule</span>
                      <span>{pkg.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{pkg.subtitle}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Starting from</p>
                      <p className="text-lg font-bold text-primary">₹{pkg.price}</p>
                    </div>
                    <Link href={`/packages/${pkg.id}`} className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial Strip */}
        <section className="bg-white dark:bg-[#1a2632] py-16 border-y border-gray-100 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <span className="material-symbols-outlined text-4xl text-primary/40">format_quote</span>
            </div>
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
              "We booked the Rameshwaram Spiritual Tour and it was perfectly organized. The guide was knowledgeable and the hotels were top-notch. Highly recommend Travelend.in for anyone visiting Tamil Nadu!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div
                className="size-12 rounded-full bg-gray-200 overflow-hidden"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAjbSBVDOpXW0Ld8-6tpXYZ8xFHeo4M7yAu43BQRVeoqEbwfQYu9jo6zzik0VVcnqG86pxdCZuBtjOuVUOSV4O1VVAV4Jtd0IVunfRKSfcUt6sqml4rEOmuzCwL4Oz90xkW0UIh_qqYl7iWvK-ykSPy2SPXvu1CgrsEBOTPSdwQwWTefSL5PjXQfPGZX87dNj-trJ3yKF3AlISS00l0n_U0sf-vu5npMPyTpa6Q7JWevo49AK3pCWJ00Qtx5qHK5Kz6u_nTvobPDECj")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="text-left">
                <div className="font-bold text-gray-900 dark:text-white">Anita Sharma</div>
                <div className="text-sm text-gray-500">Traveled in October 2023</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Can't find what you're looking for?</h2>
              <p className="text-blue-100 text-lg">We customize packages to suit your specific needs and budget.</p>
            </div>
            <button className="bg-white text-primary hover:bg-blue-50 font-bold py-3 px-8 rounded-lg shadow-lg transition-colors whitespace-nowrap">
              Get Custom Quote
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
