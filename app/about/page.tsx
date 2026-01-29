import siteConfig from "@/data/siteConfig.json";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 font-sans flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Discover the Soul of South India
                </div>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                  Discovering Tamil Nadu, One Journey at a Time
                </h1>
                <p className="text-lg leading-relaxed text-slate-600">
                  We are dedicated to providing authentic, safe, and unforgettable travel experiences across the heart of South India. From the temples of Madurai to the hills of Ooty, we guide you through it all.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/packages" className="h-12 flex items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30">
                    Explore Our Packages
                  </Link>
                  <button className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 bg-transparent px-6 text-base font-bold text-slate-700 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-primary">play_circle</span>
                    Watch Our Story
                  </button>
                </div>
              </div>
              <div className="relative lg:ml-auto w-full max-w-[600px]">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-2xl">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform hover:scale-105 duration-700"
                    style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBnAkXQYgw8AIXGttryqy-hwLSy9g_KU_BXFPpet8oP928KbCU04Tr6mU2Dx1TBnKijhpfGlTqkAXgzNP9dyBScpqeFl9um8jmuXiChiY14LzBc6rUoeDNOeDyZGxlMI123vEf1IBUCjaRLXV6KE9B3zwY_hZQGZ_68693OkRrFcdZlCMb3ikFbqEsgfDaJdz63GijyLOeszOSZQhsLP5JzvJ_HSIGSsO69mxA35m_RJV182n3-e3fQADCYP2Ntiwo4AXrlwYuT-DZQ")` }}
                  ></div>
                </div>
                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 hidden md:flex flex-col gap-1 rounded-xl bg-white p-6 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Certified</span>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">#1 Agency</p>
                  <p className="text-sm text-slate-500">In Tamil Nadu Tourism</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:divide-x md:divide-slate-200">
              <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left md:pl-8 first:pl-0">
                <span className="text-4xl font-bold text-primary">5000+</span>
                <span className="text-sm font-medium text-slate-600">Happy Travelers</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left md:pl-8">
                <span className="text-4xl font-bold text-primary">50+</span>
                <span className="text-sm font-medium text-slate-600">Destinations</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left md:pl-8">
                <span className="text-4xl font-bold text-primary">10</span>
                <span className="text-sm font-medium text-slate-600">Years Experience</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center md:items-start md:text-left md:pl-8">
                <span className="text-4xl font-bold text-primary">4.9/5</span>
                <span className="text-sm font-medium text-slate-600">Average Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCAp5ynIdNowcVYUpC-tzWSx-kWn_tsp_j_ZlwXPENLufcQVRRTpA0K6zkb_XEutbD_HjOXIdHI8L7nfWBsYbp-uf-Rj_zKKrcCItNZ8RftsOIUgGJsKPza4xqHCXCPMaRsxqY6PEcgzqdjS2s1Y4bWAM3uhQz7C7vwBBvbfpW0DPrfsBMb1Jkjwe7gSz12weBjrt4BAS-C2kMi3J_xIxzConotl3Pq10KJNfnHP9NY5k_38gjcVXwYTq66FYhDdkgXo_vDrKhZpMVB")` }}
                    ></div>
                  </div>
                  <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-200 translate-y-12">
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYYQi3l7ewKAJu1WMld6WeiZgXK4_6w4zZWPYqon4ZvigVRZ56MiFScyA6aSf98GnvuiYmF0qW5NXqal6z3fA5stQtYTGTlUchYUp7q9vSI97bmRIEjX9sBQnhgMjlH_qMV6fBfcIkEI7PFCUXTY2QT95hsig7Kns4HBsGSb0w0bn5pYelttbJlbs3ENOdED_weUThk2a0W4zIvnnkCvq-D6nRU6dQ1Of3u4SX6QzbIuiOMWQnYF-FlrJOB36LACIjEeq5VUM0pjMB")` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2 flex flex-col gap-6">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Our Story</h2>
                <div className="h-1 w-20 rounded-full bg-primary"></div>
                <p className="text-lg leading-relaxed text-slate-600">
                  Founded in 2013, Travelend.in started with a simple passion: to show the world the hidden gems of Tamil Nadu. What began as a small family-run operation has grown into a trusted agency known for personalized itineraries and deep local expertise.
                </p>
                <p className="text-lg leading-relaxed text-slate-600">
                  We believe that travel is more than just sightseeing; it's about connecting with the culture, the people, and the history of a place. Our team of local experts curates every journey to ensure you don't just see Tamil Nadu, but you truly experience it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Why Choose Travelend?</h2>
              <p className="mt-4 text-lg text-slate-600">We go the extra mile to make your journey special.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">health_and_safety</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Safety First</h3>
                <p className="text-slate-600 leading-relaxed">
                  Your well-being is our priority. We partner with verified hotels and reliable transport providers to ensure a worry-free trip.
                </p>
              </div>
              <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">temple_hindu</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Authentic Experiences</h3>
                <p className="text-slate-600 leading-relaxed">
                  Get off the beaten path. We take you to local artisans, hidden temples, and culinary hotspots that most tourists miss.
                </p>
              </div>
              <div className="group rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <div className="mb-6 inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">savings</span>
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">Best Price Guarantee</h3>
                <p className="text-slate-600 leading-relaxed">
                  Luxury doesn't have to be expensive. We negotiate the best rates to give you premium experiences at affordable prices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
