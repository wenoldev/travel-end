'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';

const megaMenuData = {
  "Domestic": {
    "Kerala": ["Wayanad", "Munnar", "Alappuzha", "Kochi", "Vagamon", "Varkala"],
    "Karnataka": ["Coorg", "Chikkamagaluru", "Dandeli", "Gokarna", "Mysuru", "Hampi"],
    "North India": ["Pune", "Goa", "Manali", "Golden Triangle", "Rajasthan", "Kashmir"],
    "Tamilnadu": ["Ooty", "Kodaikanal", "Pondy"]
  },
  // "International": {
  //   "South Asia": ["Thailand", "Singapore", "Malaysia", "Bali"],
  //   "Middle East": ["Dubai", "Abu Dhabi"],
  //   "Europe": ["Switzerland", "France", "Italy"]
  // }
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`w-full bg-white transition-all duration-300 sticky top-0 z-50 ${isScrolled ? 'py-1 shadow-md' : 'py-2'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between whitespace-nowrap py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-slate-900 cursor-pointer">
            <div className="size-10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">travel_explore</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black leading-none tracking-tight text-primary">TravelEnd<span className="text-slate-900">.in</span></h2>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Tours & Travels</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Home</Link>
              <Link href="/about" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">About Us</Link>

              {/* Mega Menu Triggers */}
              {Object.keys(megaMenuData).map((category) => (
                <div
                  key={category}
                  className="relative group"
                >
                  <button className="flex items-center gap-1 text-slate-700 text-sm font-bold hover:text-primary transition-colors py-2">
                    {category}
                    <span className="material-symbols-outlined text-sm transition-transform group-hover:rotate-180">expand_more</span>
                  </button>

                  {/* Mega Menu Content */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0`}>
                    <div className="bg-primary text-white rounded-2xl shadow-2xl p-8 min-w-[800px] grid grid-cols-4 gap-8 border border-white/10">
                      {Object.entries(megaMenuData[category as keyof typeof megaMenuData]).map(([subcat, places]) => (
                        <div key={subcat} className="flex flex-col gap-4">
                          <h3 className="text-lg font-black border-b border-white/20 pb-2 mb-2">{subcat}</h3>
                          <ul className="flex flex-col gap-2">
                            {places.map((place) => (
                              <li key={place}>
                                <Link
                                  href={`/destinations/${place.toLowerCase().replace(/\s+/g, '-')}`}
                                  className="text-white/80 hover:text-white flex items-center gap-2 text-sm transition-colors group/item"
                                >
                                  <span className="material-symbols-outlined text-xs opacity-50 group-hover/item:opacity-100">double_arrow</span>
                                  {place}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/packages" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Packages</Link>
              <Link href="/college-trip" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">College Trip</Link>
              <Link href="/taxi-tariff" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Taxi Tariff</Link>
              <Link href="/contact" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Contact Us</Link>
            </nav>
            <a
              href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in booking a tour with ${siteConfig.siteName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full h-11 px-6 bg-primary hover:bg-orange-600 transition-all text-white text-sm font-bold shadow-lg shadow-primary/20"
            >
              <span className="material-symbols-outlined text-lg">headset_mic</span>
              <span>Enquire Now!</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 p-2"
            >
              <span className="material-symbols-outlined text-3xl">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden fixed inset-0 top-[73px] bg-white text-slate-900 z-50 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-6 gap-6 h-full overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">About Us</Link>

          {Object.entries(megaMenuData).map(([category, subcats]) => (
            <div key={category} className="flex flex-col gap-4 border-b pb-4">
              <h3 className="text-xl font-bold text-primary">{category}</h3>
              <div className="grid grid-cols-2 gap-4 pl-4">
                {Object.entries(subcats).map(([subcat, places]) => (
                  <div key={subcat} className="flex flex-col gap-2">
                    <h4 className="font-bold text-sm text-slate-500">{subcat}</h4>
                    {places.map(place => (
                      <Link
                        key={place}
                        href={`/destinations/${place.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm text-slate-700"
                      >
                        {place}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Packages</Link>
          <Link href="/college-trip" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">College Trip</Link>
          <Link href="/taxi-tariff" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Taxi Tariff</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Contact Us</Link>

          <a
            href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in booking a tour with ${siteConfig.siteName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white text-lg font-bold"
          >
            <span className="material-symbols-outlined">headset_mic</span>
            Enquire Now!
          </a>
        </div>
      </div>
    </div>
  );
}
