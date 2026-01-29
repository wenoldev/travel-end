'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const tripTypes = [
    {
        id: 'local',
        title: 'Local Trip',
        description: 'Explore Thoothukudi and surrounding areas with ease.',
        icon: 'location_on',
        color: 'bg-blue-500',
        link: '/planner/local'
    },
    {
        id: 'outstation',
        title: 'Outstation Trip',
        description: 'Venture beyond to Madurai, Kanyakumari, and more.',
        icon: 'directions_car',
        color: 'bg-primary',
        link: '/planner/outstation'
    },
    {
        id: 'college',
        title: 'IV or College Trip',
        description: 'Custom group packages for students and institutions.',
        icon: 'school',
        color: 'bg-orange-600',
        link: '/planner/college'
    }
];

export default function TripPlannerCards() {
    return (
        <section className="w-full bg-white py-24">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-slate-900 text-4xl sm:text-5xl font-black mb-4">Plan Your <span className="text-primary italic">Perfect Trip</span></h2>
                    <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">
                        Select your trip type and get an instant price estimation for your next adventure starting from Thoothukudi.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tripTypes.map((trip, idx) => (
                        <motion.div
                            key={trip.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link
                                href={trip.link}
                                className="group relative block bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden h-full"
                            >
                                <div className={`size-16 rounded-2xl ${trip.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-current/20 group-hover:scale-110 transition-transform`}>
                                    <span className="material-symbols-outlined text-4xl">{trip.icon}</span>
                                </div>

                                <h3 className="text-2xl font-black text-slate-900 mb-4">{trip.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8">{trip.description}</p>

                                <div className="flex items-center gap-2 text-primary font-bold">
                                    Start Planning
                                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
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
