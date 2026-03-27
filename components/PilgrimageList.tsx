'use client';

import React from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, ChevronsRight, Map } from 'lucide-react';

interface PilgrimageListProps {
    pilgrimagePlaces: any[];
}

export default function PilgrimageList({ pilgrimagePlaces }: PilgrimageListProps) {
    return (
        <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
            <main className="grow">
                {/* Banner */}
                <section className="relative w-full h-[400px] sm:h-[500px] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{ backgroundImage: `url("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1920")` }}
                    />
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
                    <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-3xl"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-2 bg-primary rounded-full" />
                                <span className="text-white font-black uppercase tracking-[0.3em] text-sm">Spiritual Journeys</span>
                            </div>
                            <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight">
                                Pilgrimage <span className="text-primary italic">Places</span>
                            </h1>
                            <p className="text-white/80 text-lg sm:text-2xl max-w-2xl font-medium leading-relaxed">
                                Discover the divine heritage and ancient temples of South India. Pure experiences that nourish the soul.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Pilgrimage Grid */}
                <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-slate-900 text-4xl font-black mb-4">Temple <span className="text-primary italic">Heritage</span></h2>
                            <p className="text-slate-500 text-lg font-medium">Explore the most sacred sites, from coastal shrines to architectural marvels.</p>
                        </div>
                        <div className="flex gap-4">
                            <span className="bg-slate-50 text-slate-400 px-6 py-2 rounded-full text-sm font-bold border border-slate-100">
                                {pilgrimagePlaces.length} Destinations Found
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {pilgrimagePlaces.map((dest, idx) => (
                            <motion.div
                                key={dest.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    href={`/pilgrimage/${dest.name.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="group relative h-[500px] block rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url("${dest.image}")` }}
                                    ></div>
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent" />

                                    <div className="absolute top-8 left-8">
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20">
                                            <Landmark size={14} className="text-white" />
                                            <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                                                {dest.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-10 transition-transform duration-300 group-hover:-translate-y-2">
                                        <h3 className="text-3xl font-black text-white mb-3">{dest.name}</h3>
                                        <p className="text-white/70 text-sm line-clamp-2 mb-8 font-medium leading-relaxed">
                                            {dest.description}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-white font-black text-sm group/btn">
                                                Explore Pilgrimage
                                                <ChevronsRight size={18} className="text-primary transition-transform group-hover/btn:translate-x-2" />
                                            </div>
                                            <div className="size-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                                                <Map size={24} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-slate-50 py-24 mb-24 rounded-[4rem] mx-4 sm:mx-8">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">Plan Your Visit</span>
                        <h2 className="text-slate-900 text-4xl sm:text-5xl font-black mb-8">Need a Custom <span className="text-primary italic">Pilgrimage Circuit?</span></h2>
                        <p className="text-slate-600 text-lg sm:text-xl font-medium mb-12 max-w-2xl mx-auto">
                            We specialize in organized temple tours with comfortable transport and accommodation for families and groups.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact" className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                                Request a Quote
                            </Link>
                            <Link href="/planner/outstation" className="bg-white text-slate-900 border-2 border-slate-100 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-50 transition-all">
                                Use Trip Planner
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
