'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Car, ArrowRight } from 'lucide-react';

interface TripType {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    link: string;
    featured: boolean;
}

const tripTypes: TripType[] = [
    {
        id: 'local',
        title: 'Local Trip',
        description: 'Explore local attractions and surrounding areas with ease.',
        icon: 'MapPin',
        color: 'bg-blue-500',
        link: '/planner/local',
        featured: false
    },
    {
        id: 'outstation',
        title: 'Outstation Trip',
        description: 'Venture beyond to Madurai, Kanyakumari, and more.',
        icon: 'Car',
        color: 'bg-primary',
        link: '/planner/outstation',
        featured: true
    }
];

export default function TripPlannerCards() {
    return (
        <section className="w-full bg-white py-24">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-slate-900 text-4xl sm:text-5xl font-black mb-4">Plan Your <span className="text-primary italic">Perfect Trip</span></h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        Select your trip type and get an instant price estimation for your next adventure starting from your city.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {tripTypes.map((trip, idx) => (
                        <motion.div
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <Link
                                href={trip.link}
                                className={`group relative block rounded-[2.5rem] p-8 border transition-all duration-500 overflow-hidden h-full bg-white border-slate-100 shadow-sm hover:shadow-xl}`}
                            >
                                {trip.featured && (
                                    <div className="absolute top-6 right-6">
                                        <span className="bg-primary px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-widest leading-none shadow-lg">
                                            Popular
                                        </span>
                                    </div>
                                )}
                                <div className={`size-16 rounded-2xl ${trip.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
                                    {(() => {
                                        const Icon = trip.icon === 'MapPin' ? MapPin : Car;
                                        return <Icon size={36} />;
                                    })()}
                                </div>

                                <h3 className={`text-2xl font-black mb-4 ${trip.featured ? 'text-slate-900' : 'text-slate-900'}`}>{trip.title}</h3>
                                <p className={`leading-relaxed mb-8 ${trip.featured ? 'text-slate-400' : 'text-slate-500'}`}>{trip.description}</p>

                                <div className="flex items-center gap-2 text-primary font-bold">
                                    Start Planning
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Decorative background circle */}
                                <div className={`absolute -bottom-12 -right-12 size-32 rounded-full ${trip.color} opacity-5 group-hover:scale-150 transition-transform duration-700`} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
