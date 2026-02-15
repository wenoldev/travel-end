'use client';

import React, { useState, useEffect, Suspense } from 'react';
import packagesData from "@/data/packages.json";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import CouplesBanner from '@/components/CouplesBanner';
import { motion, AnimatePresence } from 'framer-motion';

function PackagesList() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get('type') === 'couples' ? 'couples' : 'normal';
  const [activeTab, setActiveTab] = useState<'normal' | 'couples'>(initialType);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'couples') {
      setActiveTab('couples');
    } else {
      setActiveTab('normal');
    }
  }, [searchParams]);

  const filteredPackages = packagesData.packages.filter(pkg => (pkg as any).type === activeTab);

  return (
    <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeTab === 'couples' ? "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=1920" : "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1440"})` }}
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white text-5xl sm:text-7xl font-black mb-4">
                {activeTab === 'couples' ? 'Romantic Packages' : 'Tour Packages'}
              </h1>
              <p className="text-white/80 text-xl max-w-2xl font-medium">
                {activeTab === 'couples'
                  ? 'Dreamy getaways for your special moments.'
                  : 'Carefully curated experiences for every kind of traveler.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Tab */}
        <div className="max-w-[1280px] mx-auto px-4 mt-12">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('normal')}
              className={`px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'normal' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <span className="material-symbols-outlined text-lg">explore</span>
              Normal Packages
            </button>
            <button
              onClick={() => setActiveTab('couples')}
              className={`px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeTab === 'couples' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <span className="material-symbols-outlined text-lg">favorite</span>
              Couple Specials
            </button>
          </div>
        </div>

        {/* Couples Banner on Listing Page (Only if not viewing Couples already or as a header) */}
        {activeTab === 'couples' && (
          <div className="mt-8">
            <CouplesBanner />
          </div>
        )}

        {/* Packages Grid */}
        <section className="max-w-[1280px] mx-auto px-4 py-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredPackages.map((pkg) => (
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
            </motion.div>
          </AnimatePresence>

          {filteredPackages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">sentiment_dissatisfied</span>
              <h3 className="text-xl font-bold text-slate-900">No packages found</h3>
              <p className="text-slate-500">We're currently updating our {activeTab} collection.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Packages...</div>}>
      <PackagesList />
    </Suspense>
  );
}
