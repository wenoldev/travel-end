'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BookingBanner() {
    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                   <div className="relative w-full min-h-[600px] sm:aspect-auto sm:min-h-[500px] md:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden group shadow-2xl">
                    <img
                        src="/booking-banner.png"
                        alt="Ticket and Hotel Booking"
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
                                <span className="text-white font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-sm">Swift & Secure</span>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black leading-tight">
                                    Instant <span className="text-primary italic">Booking</span> for Tickets & Hotels
                                </h2>
                                <p className="text-white/80 text-sm sm:text-lg md:text-xl font-medium mt-2 sm:mt-4 max-w-lg">
                                    Book your flights, trains, and premium star-rated hotels with ease. Guaranteed best prices and instant support.
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
                                    href="/booking"
                                    className="inline-flex items-center justify-center gap-3 bg-primary text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 group/btn"
                                >
                                    <span>Book Now</span>
                                    <span className="material-symbols-outlined transition-transform group-hover/btn:translate-x-1 text-xl sm:text-2xl">confirmation_number</span>
                                </Link>
                                <Link
                                    href="/taxi-tariff"
                                    className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg hover:bg-white/20 transition-all"
                                >
                                    <span>Taxi Tariff</span>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
