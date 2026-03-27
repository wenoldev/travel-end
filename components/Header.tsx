'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';
import { getDestinations, cmsIds, slugify, categoryMapping } from '@/lib/data';
import { 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  ChevronsRight, 
  ArrowRight, 
  Heart, 
  Headset, 
  X, 
  Menu, 
  Globe 
} from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [domesticData, setDomesticData] = useState<any>({});
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch CMS data for mega menu
    const fetchDomestic = async () => {
        try {
            const [tamilnadu, kerala, karnataka] = await Promise.all([
                getDestinations(cmsIds.tamilnadu),
                getDestinations(cmsIds.kerala),
                getDestinations(cmsIds.karnataka),
            ]);
            setDomesticData({
                "Tamilnadu": tamilnadu.map(d => d.name),
                "Kerala": kerala.map(d => d.name),
                "Karnataka": karnataka.map(d => d.name),
                "International": { type: 'cta', icon: 'public', title: 'Global Tours', buttonText: 'Enquire for Details' }
            });
        } catch (error) {
            console.error("Error fetching header data:", error);
        }
    };
    fetchDomestic();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = domesticData;

  return (
    <div className={`w-full bg-white transition-all duration-300 sticky top-0 z-50 ${isScrolled ? 'py-1 shadow-md' : 'py-2'}`}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between whitespace-nowrap py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-slate-900 cursor-pointer">
            <div className="size-10 text-primary flex items-center justify-center">
              <Compass size={36} />
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

              {/* Mega Menu Trigger - Domestic */}
              <div 
                className="relative group"
                onMouseEnter={() => setIsDomesticOpen(true)}
                onMouseLeave={() => setIsDomesticOpen(false)}
              >
                <button className="flex items-center gap-1 text-slate-700 text-sm font-bold hover:text-primary transition-colors py-2 cursor-pointer">
                  Domestic
                  {isDomesticOpen ? (
                    <ChevronUp size={16} className="text-primary transition-all" />
                  ) : (
                    <ChevronDown size={16} className="transition-all" />
                  )}
                </button>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0`}>
                  <div className="bg-primary text-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-10 w-[900px] lg:w-[1100px] grid grid-cols-4 gap-12 border border-white/10">
                    {Object.entries(categories).map(([subcat, data]) => (
                      <div key={subcat} className="flex flex-col gap-4">
                        <h3 className="text-xl font-black border-b border-white/20 pb-2 mb-2 tracking-tight">{subcat}</h3>
                        {Array.isArray(data) ? (
                          <ul className="flex flex-col gap-2.5">
                            {data.map((place: string) => {
                               const categoryKey = categoryMapping[subcat] || subcat.toLowerCase();
                               const href = `/destinations/${categoryKey}/${slugify(place)}`;
                               return (
                                <li key={place}>
                                  <Link
                                    href={href}
                                    className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors group/item"
                                  >
                                    <ChevronsRight size={12} className="opacity-50 group-hover/item:opacity-100 transition-opacity" />
                                    {place}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : (
                          <div className="flex flex-col gap-6 h-full justify-center">
                            <div className="size-16 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-lg backdrop-blur-sm border border-white/20">
                              {(() => {
                                const Icon = (data as any).icon === 'public' ? Globe : Compass;
                                return <Icon size={36} />;
                              })()}
                            </div>
                            <div className="space-y-2">
                              <p className="text-base text-white font-black leading-tight">
                                Ready to explore the world?
                              </p>
                              <p className="text-sm text-white/60 font-medium">Get curated international tours tailored for you.</p>
                            </div>
                            <Link
                              href="/international-trip"
                              className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-2xl text-xs font-black hover:bg-orange-50 transition-all w-fit shadow-xl shadow-black/20 group/cta"
                            >
                              <span>{(data as any).buttonText}</span>
                              <ArrowRight size={14} className="transition-transform group-hover/cta:translate-x-1" />
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link href="/packages" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Packages</Link>
              <Link href="/couples-packages" className="text-pink-500 text-sm font-bold hover:text-pink-600 transition-colors flex items-center gap-1">
                <Heart size={18} />
                Couples Package
              </Link>
              <Link href="/contact" className="text-slate-700 text-sm font-bold hover:text-primary transition-colors">Contact Us</Link>
            </nav>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in booking a tour with ${siteConfig.siteName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full h-11 px-6 bg-primary hover:bg-orange-600 transition-all text-white text-sm font-bold shadow-lg shadow-primary/20"
            >
              <Headset size={18} />
              <span>Enquire Now!</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-900 p-2 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Content */}
      <div className={`lg:hidden fixed inset-0 top-[73px] bg-white text-slate-900 z-50 transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-6 gap-6 h-full overflow-y-auto">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Home</Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">About Us</Link>
          <Link href="/couples-packages" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4 text-pink-500 flex items-center gap-2">
            <Heart size={20} />
            Couples Package
          </Link>

          {/* Mobile Domestic Menu */}
          <div className="flex flex-col gap-4 border-b pb-4">
            <h3 className="text-xl font-bold text-primary">Domestic</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pl-4">
              {Object.entries(categories).map(([subcat, data]) => (
                <div key={subcat} className="flex flex-col gap-2">
                  <h4 className="font-bold text-sm text-slate-500">{subcat}</h4>
                  {Array.isArray(data) ? (
                    <div className="flex flex-col gap-2">
                      {data.map((place: string) => (
                        <Link
                          key={place}
                          href={`/destinations/${categoryMapping[subcat] || subcat.toLowerCase()}/${slugify(place)}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm text-slate-700 hover:text-primary transition-colors"
                        >
                          {place}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3 mt-1">
                      <Link
                        href="/contact?type=international"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold w-fit"
                      >
                         {(() => {
                           const Icon = (data as any).icon === 'public' ? Globe : Compass;
                           return <Icon size={14} />;
                         })()}
                        {(data as any).buttonText}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link href="/packages" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Packages</Link>
          <Link href="/college-trip" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">College Trip</Link>
          <Link href="/taxi-tariff" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Taxi Tariff</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold border-b pb-4">Contact Us</Link>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in booking a tour with ${siteConfig.siteName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl h-14 bg-primary text-white text-lg font-bold"
          >
            <Headset size={24} />
            Enquire Now!
          </a>
        </div>
      </div>
    </div>
  );
}
