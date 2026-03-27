'use client';

import React from 'react';
import Link from 'next/link';
import siteConfig from "@/data/siteConfig.json";
import { ChevronRight, Landmark, Compass, CheckCircle2, Phone, Mail, ShieldCheck, Bed, Car } from 'lucide-react';

interface DestinationViewProps {
    destination: any;
    theme?: 'default' | 'spiritual';
    breadcrumbParent: string;
    breadcrumbParentHref: string;
}

export default function DestinationView({ destination, theme = 'default', breadcrumbParent, breadcrumbParentHref }: DestinationViewProps) {
    const isSpiritual = theme === 'spiritual';

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-grow">
                {/* Banner Section */}
                <section className={`relative w-full ${isSpiritual ? 'h-[500px]' : 'h-[400px]'} overflow-hidden`}>
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] transform scale-105`}
                        style={{ backgroundImage: `url("${destination.image}")` }}
                    />
                    <div className={`absolute inset-0 ${isSpiritual ? 'bg-slate-900/40' : 'bg-black/40'} backdrop-blur-[1px]`} />

                    <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className={`h-14 w-2 ${isSpiritual ? 'bg-primary shadow-primary/20' : 'bg-white'} rounded-full shadow-lg`} />
                                <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight drop-shadow-2xl">
                                    {destination.name}
                                </h1>
                            </div>

                            {/* Breadcrumbs */}
                            <nav className="flex items-center gap-3 text-white/90 text-[10px] sm:text-xs font-black bg-white/10 backdrop-blur-xl w-fit px-8 py-4 rounded-4xl border border-white/20 uppercase tracking-widest shadow-2xl transition-all hover:bg-white/20">
                                 <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                                 <ChevronRight size={10} className="opacity-40" />
                                 <Link href={breadcrumbParentHref} className="hover:text-primary transition-colors">{breadcrumbParent}</Link>
                                 <ChevronRight size={10} className="opacity-40" />
                                 <span className="text-white/60">{destination.name}</span>
                            </nav>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* Left Column - Details */}
                        <div className="lg:col-span-7 flex flex-col gap-16">
                            <div className="flex flex-col gap-8">
                                 <div className="flex items-center gap-3 text-primary">
                                     {isSpiritual ? <Landmark size={30} /> : <Compass size={30} />}
                                     <span className="font-black uppercase tracking-[0.2em] text-sm">{isSpiritual ? 'Divine Experience' : destination.category}</span>
                                 </div>
                                <h2 className="text-slate-900 text-4xl sm:text-5xl font-black">{isSpiritual ? `Spiritual Essence of ${destination.name}` : `About ${destination.name}`}</h2>
                                <div className="h-2 w-24 bg-primary rounded-full shadow-sm" />
                                <p className="text-slate-700 text-xl sm:text-2xl leading-relaxed font-bold italic">
                                    "{destination.description}"
                                </p>
                                <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                    {destination.fullDescription}
                                </p>
                            </div>

                            {/* Highlights Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {(destination.highlights || []).map((highlight: string, idx: number) => (
                                    <div key={idx} className="bg-slate-50 p-8 rounded-4xl border border-slate-100 flex flex-col items-center text-center gap-6 group hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                         <div className="size-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500">
                                             <CheckCircle2 size={30} />
                                         </div>
                                        <span className="font-black text-slate-800 text-sm uppercase tracking-wider">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Call to Action Card */}
                            <div className="bg-primary rounded-[3rem] p-10 sm:p-16 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="relative z-10 flex flex-col gap-8">
                                    <h3 className="text-3xl sm:text-4xl font-black leading-tight">
                                        {isSpiritual ? `Ready for a spiritual journey to ${destination.name}?` : `Interested in visiting ${destination.name}?`}
                                    </h3>
                                    <p className="text-white/80 text-lg sm:text-xl font-medium">
                                        {isSpiritual 
                                            ? "Our personalized pilgrimage packages include darshan assistance, comfortable stays, and experienced guides."
                                            : "Our experts will help you plan the perfect itinerary for your trip."}
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/contact" className="bg-white text-primary px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all shadow-xl shadow-black/10">
                                            Plan My Trip
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-32 flex flex-col gap-8">

                                {/* Booking Card */}
                                <div className="bg-white border border-slate-100 p-10 rounded-[3rem] shadow-xl">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-sm font-black">!</div>
                                        <h4 className="text-2xl font-black text-slate-900">Inquiry Now</h4>
                                    </div>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-5 p-6 bg-slate-50 border border-slate-100 rounded-4xl hover:bg-white hover:shadow-md transition-all">
                                             <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                 <Phone size={28} />
                                             </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Speak to Expert</span>
                                                <span className="text-xl font-black text-slate-900">{siteConfig.contact.phone}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5 p-6 bg-slate-50 border border-slate-100 rounded-4xl hover:bg-white hover:shadow-md transition-all">
                                             <div className="size-14 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm">
                                                 <Mail size={28} />
                                             </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Support</span>
                                                <span className="text-lg font-black text-slate-900 truncate">{siteConfig.contact.email}</span>
                                            </div>
                                        </div>
                                        <a
                                            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in visiting ${destination.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-3"
                                        >
                                            <i className="fab fa-whatsapp text-2xl"></i>
                                            Enquire via WhatsApp
                                        </a>
                                    </div>
                                </div>

                                {/* Perks Card */}
                                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                                    <div className="relative z-10 flex flex-col gap-6">
                                        <h5 className="font-black text-xl italic">TravelEnd Perks</h5>
                                        <ul className="flex flex-col gap-4">
                                            {[
                                                { icon: 'verified_user', text: 'Verified Local Guides' },
                                                { icon: 'hotel', text: 'Premium Accommodations' },
                                                { icon: 'directions_car', text: 'Safe & Clean Vehicles' }
                                            ].map((perk, i) => (
                                                 <li key={i} className="flex items-center gap-3 text-white/70 font-medium">
                                                     {perk.icon === 'verified_user' ? <ShieldCheck size={20} className="text-primary" /> : perk.icon === 'hotel' ? <Bed size={20} className="text-primary" /> : <Car size={20} className="text-primary" />}
                                                     {perk.text}
                                                 </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
