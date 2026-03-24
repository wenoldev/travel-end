'use client';

import React from 'react';
import Link from "next/link";
import { motion } from 'framer-motion';

interface PackagesListProps {
  packages: any[];
  type: 'normal' | 'couples' | 'runner';
}

export default function PackagesList({ packages, type }: PackagesListProps) {
  const isCouples = type === 'couples';
  const isRunner = type === 'runner';

  return (
    <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow">
        {/* Banner */}
        <section className="relative w-full h-[300px] sm:h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${isCouples ? "/romantic-couple.png" : "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1440"})` }}
          />
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
          <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-white text-5xl sm:text-7xl font-black mb-4">
                {isCouples ? 'Romantic Packages' : isRunner ? 'Runner Packages' : 'Tour Packages'}
              </h1>
              <p className="text-white/80 text-xl max-w-2xl font-medium">
                {isCouples
                  ? 'Dreamy getaways for your special moments.'
                  : isRunner ? 'Recent festivals and local trip experiences.' : 'Carefully curated experiences for every kind of traveler.'}
              </p>
            </motion.div>
          </div>
        </section>


        {/* Packages Grid */}
        <section className="max-w-[1280px] mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg) => (
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
                    href={`${isCouples ? '/couples-packages' : isRunner ? '/runner-packages' : '/packages'}/${pkg.title.toLowerCase().replace(/\s+/g, '-')}?id=${pkg.id}`}
                    className="w-full bg-secondary hover:bg-primary hover:text-white text-slate-900 py-4 rounded-2xl font-bold transition-all text-center flex items-center justify-center gap-2"
                  >
                    View Details
                    <span className="material-symbols-outlined text-lg">double_arrow</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {packages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">sentiment_dissatisfied</span>
              <h3 className="text-xl font-bold text-slate-900">No packages found</h3>
              <p className="text-slate-500">We're currently updating our {type} collection.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

