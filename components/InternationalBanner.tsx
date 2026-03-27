'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function InternationalBanner() {
    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full min-h-[600px] sm:aspect-auto sm:min-h-[500px] md:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden group shadow-2xl">
                    <img
                        src="/international-trip.png"
                        alt="International Tours"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/70 sm:via-slate-900/40 to-transparent" />

                    <div className="absolute inset-0 flex items-center px-6 sm:px-16 md:px-24">
                        <div className="max-w-2xl flex flex-col gap-4 sm:gap-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-6 sm:h-8 w-1 sm:w-1.5 bg-primary rounded-full" />
                                <span className="text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-sm">Global Adventures</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
                                    International <span className="text-primary italic">Dream</span> Vacations
                                </h2>
                                <p className="text-white/80 text-sm sm:text-lg md:text-xl font-medium mt-2 sm:mt-4 max-w-lg">
                                    Explore the world's most iconic destinations. From European escapes to Asian wonders, we plan your global journey.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-4"
                            >
                                <Link
                                    href="/international-trip"
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 group/btn"
                                >
                                    <span>Plan International Trip</span>
                                    <Globe size={24} className="transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                                <Link
                                    href="/contact?type=international"
                                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:bg-white/20 transition-all"
                                >
                                    <span>Enquire Custom Tour</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    <div className="absolute top-10 right-10 hidden lg:block">
                        <div className="flex flex-col items-end">
                            <span className="text-white/10 text-8xl font-black select-none uppercase tracking-tighter leading-none">Global</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
