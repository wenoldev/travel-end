'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Destination, slugify } from '@/lib/data';

interface StateDestinationSectionProps {
    stateName: string;
    stateId: string;
    destinations: Destination[];
    subtitle?: string;
    reverse?: boolean;
}

export default function StateDestinationSection({ 
    stateName, 
    stateId, 
    destinations, 
    subtitle,
    reverse = false 
}: StateDestinationSectionProps) {
    if (!destinations || destinations.length === 0) return null;

    return (
        <section className={`w-full py-24 ${reverse ? 'bg-[#f8f9fa]' : 'bg-white'}`}>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className={`flex flex-col gap-6 mb-16 relative ${reverse ? 'items-end text-right' : ''}`}>
                    <div className="flex flex-col gap-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider w-fit ${reverse ? 'ml-auto' : ''}`}>
                             Explore {stateName}
                        </div>
                        <h2 className="text-slate-900 text-4xl sm:text-6xl font-black leading-none tracking-tight">
                            Magical <span className="text-primary italic">{stateName}</span>
                        </h2>
                        <div className={`h-1.5 w-24 bg-primary rounded-full mt-2 ${reverse ? 'ml-auto' : ''}`} />
                    </div>
                    {subtitle && (
                        <p className="text-slate-500 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed">
                            {subtitle}
                        </p>
                    )}
                    
                    {/* Decorative Background Text */}
                    <div className={`absolute -top-10 opacity-[0.03] select-none pointer-events-none hidden lg:block ${reverse ? '-left-10' : '-right-10'}`}>
                        <span className="text-[12rem] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
                            {stateName}
                        </span>
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {destinations.slice(0, 4).map((dest, idx) => (
                        <motion.div
                            key={dest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={`/destinations/${stateId}/${slugify(dest.name)}`}
                                className="group relative block aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl font-black text-white leading-tight">
                                            {dest.name}
                                        </h3>
                                        <p className="text-white/70 text-sm font-medium line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {dest.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mt-4">
                                            <span>Explore Now</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="mt-16 flex justify-center">
                    <Link
                        href="/destinations"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-[2rem] font-black text-lg hover:bg-slate-50 hover:border-primary/20 transition-all group"
                    >
                        <span>View All {stateName} Places</span>
                        <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">double_arrow</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
