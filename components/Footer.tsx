'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';
import { getDestinations, cmsIds } from '@/lib/data';

export default function Footer() {
  const [pilgrims, setPilgrims] = useState<any[]>([]);
  const [specialPlaces, setSpecialPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const [p, s] = await Promise.all([
          getDestinations(cmsIds.pilgrim),
          getDestinations(cmsIds.special),
        ]);
        setPilgrims(p);
        setSpecialPlaces(s);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFooterData();
  }, []);

  return (
    <footer className="relative bg-[#0b0f19] pt-20 pb-12 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-3xl text-white">travel_explore</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-black text-white tracking-tight leading-none">TravelEnd<span className="text-primary italic">.in</span></h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Tours & Travels</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-medium">
              Curated experiences across ancient temples, serene beaches, and misty hill stations. We specialize in creating unforgettable journeys through the rich heritage of South India.
            </p>
            <div className="flex items-center gap-4">
              {Object.entries(siteConfig.socials).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all"
                >
                  <i className={`fab fa-${platform}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-lg uppercase tracking-tight">Explore</h4>
            <div className="h-[2px] w-12 bg-white/10 -mt-6" />
            <ul className="flex flex-col gap-4">
              {siteConfig.navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-white/60 hover:text-primary text-sm font-semibold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Special Places - Fully Dynamic */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-lg uppercase tracking-tight">Special Places</h4>
            <div className="h-[2px] w-12 bg-white/10 -mt-6" />
            <ul className="flex flex-col gap-4">
              {loading ? (
                [...Array(6)].map((_, i) => (
                    <li key={i} className="h-4 w-24 bg-white/5 animate-pulse rounded" />
                ))
              ) : (
                specialPlaces.slice(0, 8).map((dest) => (
                  <li key={dest.id}>
                    <Link href={`/destinations/${dest.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/60 hover:text-primary text-sm font-semibold transition-colors flex items-center gap-3 group">
                      <span className="text-white/20 group-hover:text-primary transition-colors text-xs font-black">≫</span>
                      {dest.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Pilgrimage Places - Fully Dynamic */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-lg uppercase tracking-tight">Pilgrimage Places</h4>
            <div className="h-[2px] w-12 bg-white/10 -mt-6" />
            <ul className="flex flex-col gap-4">
              {loading ? (
                [...Array(6)].map((_, i) => (
                    <li key={i} className="h-4 w-24 bg-white/5 animate-pulse rounded" />
                ))
              ) : (
                pilgrims.slice(0, 8).map((dest) => (
                  <li key={dest.id}>
                    <Link href={`/pilgrimage/${dest.name.toLowerCase().replace(/\s+/g, '-')}`} className="text-white/60 hover:text-primary text-sm font-semibold transition-colors flex items-center gap-3 group">
                      <span className="text-white/20 group-hover:text-primary transition-colors text-xs font-black">≫</span>
                      {dest.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="flex flex-col gap-8">
            <h4 className="text-white font-bold text-lg uppercase tracking-tight">Get in Touch</h4>
            <div className="h-[2px] w-12 bg-white/10 -mt-6" />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 group">
                <div className="size-11 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-2xl">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none mb-1">Call support</span>
                  <a className="text-white text-base font-black hover:text-primary transition-colors" href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}>{siteConfig.contact.phone}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-11 rounded-xl bg-white/5 flex items-center justify-center text-primary shrink-0 border border-white/10 group-hover:border-primary/30 transition-colors">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase font-black tracking-widest leading-none mb-1">Email us</span>
                  <a className="text-white text-sm font-bold hover:text-primary transition-colors" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-xs font-medium">
            © {new Date().getFullYear()} {siteConfig.siteName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
