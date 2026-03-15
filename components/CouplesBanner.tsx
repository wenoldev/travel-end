'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CouplesBannerProps {
    imageUrl?: string;
}

export default function CouplesBanner({ imageUrl }: CouplesBannerProps) {
    const displayImage = imageUrl || "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=2000";
    
    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden group shadow-2xl">
                    <img
                        src={displayImage}
                        alt="Couples Special Packages"
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
                                <span className="text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-sm">Romantic Getaways</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
                                    Couples <span className="text-primary italic">Special</span> Packages
                                </h2>
                                <p className="text-white/80 text-sm sm:text-lg md:text-xl font-medium mt-2 sm:mt-4 max-w-lg">
                                    Crafting unforgettable memories for your special moments. From serene hills to romantic beaches.
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
                                    href="/packages?type=couples"
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 group/btn"
                                >
                                    <span>View Couple Packages</span>
                                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1 text-xl sm:text-2xl">favorite</span>
                                </Link>
                                <Link
                                    href="/contact?type=honeymoon"
                                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:bg-white/20 transition-all"
                                >
                                    <span>Enquire Custom Trip</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="absolute top-10 right-10 hidden lg:block">
                        <div className="flex flex-col items-end">
                            <span className="text-white/10 text-8xl font-black select-none">LOVE</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
