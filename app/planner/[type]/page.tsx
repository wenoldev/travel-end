'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';

// --- Types & Data ---

interface Destination {
    id: string;
    name: string;
    price: number;
}

const OUTSTATION_LOCATIONS: Destination[] = [
    { id: 'tirunelveli', name: 'Tirunelveli', price: 1200 },
    { id: 'kanyakumari', name: 'Kanyakumari', price: 3500 },
    { id: 'madurai', name: 'Madurai', price: 4000 },
    { id: 'rameswaram', name: 'Rameswaram', price: 4500 },
    { id: 'courtallam', name: 'Courtallam', price: 2500 },
];

const LOCAL_LOCATIONS: Destination[] = [
    { id: 'temple_tour', name: 'Local Temple Tour', price: 1000 },
    { id: 'beach_tour', name: 'Beach & Harbour Tour', price: 800 },
    { id: 'city_highlights', name: 'City Highlights', price: 1200 },
];

const COLLEGE_LOCATIONS: Destination[] = [
    { id: 'industrial_visit', name: 'Industrial Visit (Chennai/Coimbatore)', price: 15000 },
    { id: 'tour_kerala', name: 'College Tour (Kerala)', price: 12000 },
    { id: 'tour_karnataka', name: 'College Tour (Karnataka)', price: 10000 },
];

interface ExpenseOption {
    id: string;
    label: string;
    price: number;
    description: string;
}

const EXPENSE_OPTIONS: ExpenseOption[] = [
    { id: 'food', label: 'Food', price: 500, description: '+₹500 per day' },
    { id: 'accommodation', label: 'Accommodation', price: 1500, description: '+₹1500 per night' },
    { id: 'toll_parking', label: 'Toll & Parking', price: 300, description: '+₹300 flat' },
];

// --- Component ---

export default function PlannerPage() {
    const params = useParams();
    const tripType = params.type as string;

    // State
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
    const [days, setDays] = useState(1);
    const [nights, setNights] = useState(0);

    // Get locations based on trip type
    const locations = useMemo(() => {
        if (tripType === 'local') return LOCAL_LOCATIONS;
        if (tripType === 'college') return COLLEGE_LOCATIONS;
        return OUTSTATION_LOCATIONS;
    }, [tripType]);

    // Display Name for Trip Type
    const tripTitle = useMemo(() => {
        switch (tripType) {
            case 'local': return 'Local Trip';
            case 'college': return 'IV or College Trip';
            default: return 'Outstation Trip';
        }
    }, [tripType]);

    // Calculations
    const calculations = useMemo(() => {
        let basePrice = 0;
        selectedDestinations.forEach(id => {
            const loc = locations.find(l => l.id === id);
            if (loc) basePrice += loc.price;
        });

        let extraPrice = 0;
        if (selectedExpenses.includes('food')) extraPrice += 500 * days;
        if (selectedExpenses.includes('accommodation')) extraPrice += 1500 * nights;
        if (selectedExpenses.includes('toll_parking')) extraPrice += 300;

        return {
            base: basePrice,
            extras: extraPrice,
            total: basePrice + extraPrice
        };
    }, [selectedDestinations, selectedExpenses, days, nights, locations]);

    // Handlers
    const toggleDestination = (id: string) => {
        setSelectedDestinations(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const toggleExpense = (id: string) => {
        setSelectedExpenses(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const shareToWhatsApp = () => {
        const selectedLocNames = selectedDestinations.map(id => locations.find(l => l.id === id)?.name).join(', ');
        const selectedExpLabels = selectedExpenses.map(id => EXPENSE_OPTIONS.find(e => e.id === id)?.label);

        const message = `Trip Architecture: ${tripTitle}
*From:* Thoothukudi
*To:* ${selectedLocNames || 'Not specified'}
*Duration:* ${days} Day(s), ${nights} Night(s)

*Selected Options:*
${selectedExpLabels.length > 0 ? selectedExpLabels.map(l => `- ${l}`).join('\n') : '- None'}

*Estimated Price:* ₹${calculations.total.toLocaleString()}

_Generated via TravelEnd Planner_`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-slate-600">Trip Planner</span>
                        </nav>
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">
                            {tripTitle} <span className="text-primary italic">Planner</span>
                        </h1>
                    </div>
                    <div className="hidden lg:flex items-center gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm">
                        <span className="material-symbols-outlined text-primary">location_on</span>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Origin City</p>
                            <p className="text-sm font-black text-slate-900 leading-none">Thoothukudi, TN</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Main Configurator */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Step 1: Destinations */}
                        <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">1</div>
                                <h2 className="text-2xl font-black text-slate-900 italic">Route Details</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">From Location</label>
                                    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl h-14 px-6 flex items-center font-bold text-slate-500 cursor-not-allowed">
                                        Thoothukudi, Tamil Nadu
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">To Destination(s)</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {locations.map(loc => (
                                            <button
                                                key={loc.id}
                                                onClick={() => toggleDestination(loc.id)}
                                                className={`group flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${selectedDestinations.includes(loc.id)
                                                        ? 'border-primary bg-primary/5 shadow-md'
                                                        : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
                                                    }`}
                                            >
                                                <div className="flex flex-col">
                                                    <span className={`font-bold transition-colors ${selectedDestinations.includes(loc.id) ? 'text-primary' : 'text-slate-700'}`}>
                                                        {loc.name}
                                                    </span>
                                                    <span className="text-xs text-slate-400 mt-0.5">Base: ₹{loc.price.toLocaleString()}</span>
                                                </div>
                                                <span className={`material-symbols-outlined transition-all ${selectedDestinations.includes(loc.id) ? 'text-primary scale-110' : 'text-slate-200 group-hover:text-slate-300'
                                                    }`}>
                                                    {selectedDestinations.includes(loc.id) ? 'check_circle' : 'add_circle'}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Duration & Expenses */}
                        <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">2</div>
                                <h2 className="text-2xl font-black text-slate-900 italic">Preferences & Duration</h2>
                            </div>

                            <div className="space-y-8">
                                {/* Duration Selectors */}
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Number of Days</label>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setDays(Math.max(1, days - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <span className="text-2xl font-black text-slate-900 w-8 text-center">{days}</span>
                                            <button onClick={() => setDays(days + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Number of Nights</label>
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setNights(Math.max(0, nights - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <span className="text-2xl font-black text-slate-900 w-8 text-center">{nights}</span>
                                            <button onClick={() => setNights(nights + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Extra Options */}
                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Additional Services</label>
                                    <div className="space-y-3">
                                        {EXPENSE_OPTIONS.map(opt => (
                                            <label
                                                key={opt.id}
                                                className={`flex items-start gap-4 p-5 rounded-3xl border-2 transition-all cursor-pointer ${selectedExpenses.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50/50 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={selectedExpenses.includes(opt.id)}
                                                    onChange={() => toggleExpense(opt.id)}
                                                />
                                                <div className={`mt-0.5 size-6 rounded-md border-2 flex items-center justify-center transition-all ${selectedExpenses.includes(opt.id) ? 'bg-primary border-primary text-white' : 'bg-white border-slate-200'
                                                    }`}>
                                                    {selectedExpenses.includes(opt.id) && <span className="material-symbols-outlined text-lg font-black">check</span>}
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="font-bold text-slate-800">{opt.label}</span>
                                                        <span className="text-slate-900 font-black">₹{opt.price.toLocaleString()}</span>
                                                    </div>
                                                    <p className="text-sm text-slate-500">{opt.description}</p>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sticky Estimation Sidebar */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                                {/* Background Decor */}
                                <div className="absolute top-0 right-0 size-64 bg-primary/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />

                                <h3 className="text-2xl font-black italic mb-8 relative z-10">Trip Estimation</h3>

                                <div className="space-y-6 mb-10 relative z-10">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Base Fares</span>
                                        <span className="font-black text-xl">₹{calculations.base.toLocaleString()}</span>
                                    </div>

                                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                        <div className="flex flex-col">
                                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Add-ons</span>
                                            <p className="text-[10px] text-white/30 italic">Includes Food, Stay, Tolls</p>
                                        </div>
                                        <span className="font-black text-xl text-primary">+ ₹{calculations.extras.toLocaleString()}</span>
                                    </div>

                                    <div className="pt-6">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Estimated Total</span>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-6xl font-black tracking-tighter">₹{calculations.total.toLocaleString()}</span>
                                                <span className="text-white/40 text-sm font-medium">approx.</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <button
                                        onClick={shareToWhatsApp}
                                        disabled={selectedDestinations.length === 0}
                                        className="w-full bg-primary hover:bg-[#6c193d] disabled:opacity-50 disabled:cursor-not-allowed text-white h-16 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                                    >
                                        <span className="material-symbols-outlined">send</span>
                                        Send via WhatsApp
                                    </button>
                                    <p className="text-center text-white/30 text-xs font-medium">
                                        *Actual price may vary based on vehicle availability and season.
                                    </p>
                                </div>
                            </div>

                            {/* Tips / Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-8 bg-secondary/50 backdrop-blur-md rounded-[2rem] p-8 border border-slate-100"
                            >
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary text-3xl">info</span>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-slate-900">Need a Custom Quote?</h4>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            For large groups or multi-day tours, our team can curate a better package with transparent pricing.
                                        </p>
                                        <Link href="/contact" className="text-primary font-black text-sm flex items-center gap-1 group">
                                            Talk to an Expert
                                            <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
