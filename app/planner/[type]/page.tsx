'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import tripPlanner from '@/data/tripPlanner.json';

// --- Types & Data ---

interface Destination {
    id: string;
    name: string;
    price: number;
}

const OUTSTATION_LOCATIONS: Destination[] = tripPlanner.destinations.outstation;
const LOCAL_LOCATIONS: Destination[] = tripPlanner.destinations.local;
const COLLEGE_LOCATIONS: Destination[] = tripPlanner.destinations.college;

interface ExpenseOption {
    id: string;
    label: string;
    price: number;
    description: string;
}

const EXPENSE_OPTIONS: ExpenseOption[] = tripPlanner.expenseOptions;


// --- Component ---

export default function PlannerPage() {
    const params = useParams();
    const tripType = params.type as string;

    // State
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
    const [customDestinations, setCustomDestinations] = useState<string[]>([]);
    const [tempCustomDest, setTempCustomDest] = useState('');
    const [originLocation, setOriginLocation] = useState('Thoothukudi');
    const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
    const [days, setDays] = useState(1);
    const [nights, setNights] = useState(0);
    const [personCount, setPersonCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [accommodationType, setAccommodationType] = useState('hotel'); // homestay, hotel, 3star

    const SUGGESTED_ORIGINS = ['Thoothukudi', 'Tirunelveli', 'Madurai', 'Kanyakumari', 'Chennai', 'Coimbatore', 'Trichy', 'Salem'];

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
        selectedExpenses.forEach(id => {
            const opt = EXPENSE_OPTIONS.find(e => e.id === id);
            if (!opt) return;

            if (id === 'food') {
                extraPrice += opt.price * days * personCount;
            } else if (id === 'accommodation') {
                extraPrice += opt.price * nights * roomCount;
            } else {
                extraPrice += opt.price;
            }
        });

        return {
            base: basePrice,
            extras: extraPrice,
            total: basePrice + extraPrice
        };
    }, [selectedDestinations, selectedExpenses, days, nights, personCount, roomCount, locations]);

    // Handlers
    const toggleDestination = (id: string) => {
        setSelectedDestinations(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const addCustomDest = () => {
        if (tempCustomDest.trim()) {
            setCustomDestinations(prev => [...prev, tempCustomDest.trim()]);
            setTempCustomDest('');
        }
    };

    const removeCustomDest = (index: number) => {
        setCustomDestinations(prev => prev.filter((_, i) => i !== index));
    };

    const toggleExpense = (id: string) => {
        setSelectedExpenses(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const shareToWhatsApp = () => {
        const selectedLocNames = [
            ...selectedDestinations.map(id => locations.find(l => l.id === id)?.name),
            ...customDestinations
        ].join(', ');

        const selectedExpLabels = selectedExpenses.map(id => {
            if (id === 'accommodation') return `Accommodation (${accommodationType}: ${roomCount} Room(s))`;
            return EXPENSE_OPTIONS.find(e => e.id === id)?.label;
        });

        const message = `*NEW TRIP INQUIRY*
----------------------------
*Type:* ${tripTitle}
*From:* ${originLocation}
*To:* ${selectedLocNames || 'Not specified'}
*Duration:* ${days} Day(s), ${nights} Night(s)
*Group Size:* ${personCount} Person(s)

*Packages & Add-ons:*
${selectedExpLabels.length > 0 ? selectedExpLabels.map(l => `- ${l}`).join('\n') : '- None'}

${selectedExpenses.includes('accommodation') ? `*Room Count:* ${roomCount}
*Stay Type:* ${accommodationType.toUpperCase()}` : ''}

*Estimated Price:* ₹${calculations.total.toLocaleString()}
${customDestinations.length > 0 ? `*(Note: Price excludes custom destinations: ${customDestinations.join(', ')})*` : ''}
*(Note: Final price subject to confirmation)*

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
                                <div className="flex flex-col gap-2 relative">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">From Location</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={originLocation}
                                            onChange={(e) => {
                                                setOriginLocation(e.target.value);
                                                setShowOriginSuggestions(true);
                                            }}
                                            onFocus={() => setShowOriginSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowOriginSuggestions(false), 200)}
                                            placeholder="Enter starting city..."
                                            className="w-full bg-white border border-slate-200 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
                                        />
                                        <AnimatePresence>
                                            {showOriginSuggestions && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto p-2"
                                                >
                                                    {SUGGESTED_ORIGINS.filter(city => city.toLowerCase().includes(originLocation.toLowerCase())).map(city => (
                                                        <button
                                                            key={city}
                                                            onClick={() => {
                                                                setOriginLocation(city);
                                                                setShowOriginSuggestions(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700 flex items-center gap-3"
                                                        >
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">location_on</span>
                                                            {city}
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">To Destination(s)</label>

                                    {/* Selected Custom Destinations */}
                                    {customDestinations.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-2 text-center sm:text-left">
                                            {customDestinations.map((dest, idx) => (
                                                <div key={idx} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                                                    {dest}
                                                    <button onClick={() => removeCustomDest(idx)} className="material-symbols-outlined text-sm hover:text-red-500 transition-colors">close</button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

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
                                                    {loc.price > 0 ? (
                                                        <span className="text-xs text-slate-400 mt-0.5">Base: ₹{loc.price.toLocaleString()}</span>
                                                    ) : (
                                                        <span className="text-xs text-primary font-bold mt-0.5">Request Quote</span>
                                                    )}
                                                </div>
                                                <span className={`material-symbols-outlined transition-all ${selectedDestinations.includes(loc.id) ? 'text-primary scale-110' : 'text-slate-200 group-hover:text-slate-300'
                                                    }`}>
                                                    {selectedDestinations.includes(loc.id) ? 'check_circle' : 'add_circle'}
                                                </span>
                                            </button>
                                        ))}

                                        {/* Custom Destination Input */}
                                        <div className="relative group flex items-center">
                                            <input
                                                type="text"
                                                value={tempCustomDest}
                                                onChange={(e) => setTempCustomDest(e.target.value)}
                                                onKeyDown={(e) => e.key === 'Enter' && addCustomDest()}
                                                placeholder="Other destination..."
                                                className="w-full h-full min-h-[70px] bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 pr-14 font-bold text-slate-700 focus:bg-white focus:border-slate-200 outline-none transition-all placeholder:text-slate-300"
                                            />
                                            <button
                                                onClick={addCustomDest}
                                                className="absolute right-3 size-10 rounded-xl bg-slate-200 text-slate-500 hover:bg-primary hover:text-white transition-all flex items-center justify-center"
                                            >
                                                <span className="material-symbols-outlined font-black">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Step 2: Group Size & Duration */}
                        <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">2</div>
                                <h2 className="text-2xl font-black text-slate-900 italic">Travel Details</h2>
                            </div>

                            <div className="space-y-8">
                                {/* Group Size */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center sm:text-left">No. of Persons</label>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <button onClick={() => setPersonCount(Math.max(1, personCount - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <span className="text-2xl font-black text-slate-900 w-8 text-center">{personCount}</span>
                                            <button onClick={() => setPersonCount(personCount + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider text-center sm:text-left">No. of Rooms Required</label>
                                        <div className="flex items-center justify-center sm:justify-start gap-4">
                                            <button onClick={() => setRoomCount(Math.max(1, roomCount - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">remove</span>
                                            </button>
                                            <span className="text-2xl font-black text-slate-900 w-8 text-center">{roomCount}</span>
                                            <button onClick={() => setRoomCount(roomCount + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

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
                            </div>
                        </section>

                        {/* Step 3: Extra Services */}
                        <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">3</div>
                                <h2 className="text-2xl font-black text-slate-900 italic">Extras & Accommodation</h2>
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Additional Services</label>
                                    <div className="space-y-4">
                                        {EXPENSE_OPTIONS.map(opt => (
                                            <div key={opt.id} className="flex flex-col gap-4">
                                                <label
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
                                                            {opt.price > 0 && <span className="text-slate-900 font-black">₹{opt.price.toLocaleString()}</span>}
                                                        </div>
                                                        <p className="text-sm text-slate-500">{opt.description}</p>
                                                    </div>
                                                </label>

                                                {/* Accommodation Sub-options */}
                                                {opt.id === 'accommodation' && selectedExpenses.includes('accommodation') && (
                                                    <div className="ml-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {['homestay', 'hotel', '3star'].map(type => (
                                                            <button
                                                                key={type}
                                                                onClick={() => setAccommodationType(type)}
                                                                className={`px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${accommodationType === type ? 'border-primary bg-primary text-white' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                                                            >
                                                                {type === 'homestay' ? 'Home Stay' : type === 'hotel' ? 'Hotel' : '3 Star Hotel'}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
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
                                            <p className="text-[10px] text-white/30 italic">Includes Food & Extras</p>
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
                                    <p className="text-center text-white/30 text-[10px] font-medium leading-relaxed">
                                        *Toll, Parking & Permit charges are extra based on trip. Final price may vary.
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
                                            For large groups, corporate events or multi-day tours, our team can curate a better package with transparent pricing.
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

