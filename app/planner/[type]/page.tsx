'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import tripPlanner from '@/data/tripPlanner.json';
import packagesData from '@/data/packages.json';
import touristSpots from '@/data/touristSpots.json';

// --- Types & Data ---

interface Destination {
    id: string;
    name: string;
}

const OUTSTATION_LOCATIONS: Destination[] = tripPlanner.destinations.outstation;
const LOCAL_LOCATIONS: Destination[] = tripPlanner.destinations.local;

// Flatten tourist spots for easy searching
const ALL_SPOTS = [
    ...touristSpots.TamilNadu,
    ...touristSpots.Kerala
].map(spot => ({
    name: spot.name,
    district: spot.district
}));

const ALL_PLACE_NAMES = [...new Set(ALL_SPOTS.map(s => s.name))];

interface ExpenseOption {
    id: string;
    label: string;
    description: string;
}

const EXPENSE_OPTIONS: ExpenseOption[] = tripPlanner.expenseOptions;


// --- Component ---

export default function PlannerPage() {
    const params = useParams();
    const router = useRouter();
    const tripType = params.type as string;

    // State
    const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
    const [originLocation, setOriginLocation] = useState('Thoothukudi');
    const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
    const [selectedExpenses, setSelectedExpenses] = useState<string[]>([]);
    const [days, setDays] = useState(1);
    const [nights, setNights] = useState(0);
    const [personCount, setPersonCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [accommodationType, setAccommodationType] = useState('hotel'); // homestay, hotel, 3star
    const [pickupTime, setPickupTime] = useState('');
    
    // Suggestion state
    const [destinationInput, setDestinationInput] = useState('');
    const [showDestSuggestions, setShowDestSuggestions] = useState(false);

    // Redirect if college trip
    useEffect(() => {
        if (tripType === 'college') {
            router.replace('/college-trip');
        }
    }, [tripType, router]);

    const SUGGESTED_ORIGINS = [...new Set(['Thoothukudi', 'Tirunelveli', 'Madurai', 'Kanyakumari', 'Chennai', 'Coimbatore', 'Trichy', 'Salem', ...ALL_PLACE_NAMES])];

    // Get locations based on trip type
    const baseLocations = useMemo(() => {
        if (tripType === 'local') return LOCAL_LOCATIONS;
        return OUTSTATION_LOCATIONS;
    }, [tripType]);

    // Combine locations, packages and ALL_SPOTS for total suggestions
    const suggestionList = useMemo(() => {
        const locations = baseLocations.map(l => l.name);
        const packages = packagesData.packages.map(p => p.title);
        return [...new Set([...locations, ...packages, ...ALL_PLACE_NAMES])];
    }, [baseLocations]);

    // Display Name for Trip Type
    const tripTitle = useMemo(() => {
        switch (tripType) {
            case 'local': return 'Local Trip';
            case 'college': return 'College Trip';
            default: return 'Outstation Trip';
        }
    }, [tripType]);

    // Handlers
    const addDestination = (name: string) => {
        if (!selectedDestinations.includes(name)) {
            setSelectedDestinations(prev => [...prev, name]);
        }
        setDestinationInput('');
        setShowDestSuggestions(false);
    };

    const removeDestination = (name: string) => {
        setSelectedDestinations(prev => prev.filter(n => n !== name));
    };

    const toggleExpense = (id: string) => {
        setSelectedExpenses(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const shareToWhatsApp = () => {
        const selectedExpLabels = selectedExpenses.map(id => {
            if (id === 'accommodation') return `Accommodation (${accommodationType}: ${roomCount} Room(s))`;
            return EXPENSE_OPTIONS.find(e => e.id === id)?.label;
        });

        const message = `*NEW TRIP INQUIRY*
----------------------------
*Type:* ${tripTitle}
*From:* ${originLocation}
*To:* ${selectedDestinations.join(', ') || 'Not specified'}
*Preferred Timing:* ${pickupTime || 'Not specified'}
*Duration:* ${days} Day(s), ${nights} Night(s)
*Group Size:* ${personCount} Person(s)

*Packages & Add-ons:*
${selectedExpLabels.length > 0 ? selectedExpLabels.map(l => `- ${l}`).join('\n') : '- None'}

${selectedExpenses.includes('accommodation') ? `*Room Count:* ${roomCount}
*Stay Type:* ${accommodationType.toUpperCase()}` : ''}

*(Please provide availability and pricing details)*

_Generated via TravelEnd Planner_`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
    };

    if (tripType === 'college') return null;

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-12">
                    <div className="max-w-2xl">
                        <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-slate-600">Trip Planner</span>
                        </nav>
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                            {tripTitle} <span className="text-primary italic">Planner</span>
                        </h1>
                        <p className="text-slate-500 mt-4 font-medium text-lg leading-relaxed">
                            Tell us your dream route and preferences. We'll design the perfect roadmap for your journey.
                        </p>
                    </div>
                    <div className="hidden lg:block w-72 h-44 rounded-3xl overflow-hidden shadow-2xl-soft border-4 border-white shadow-xl -rotate-2">
                        <img 
                            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800" 
                            alt="Travel Planning" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-8">

                    {/* Step 1: Destinations */}
                    <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">1</div>
                            <h2 className="text-2xl font-black text-slate-900 italic">Route Details</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Origin */}
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
                                                        <div className="flex flex-col overflow-hidden">
                                                            <span className="truncate">{city}</span>
                                                            {ALL_SPOTS.find(s => s.name === city)?.district && (
                                                                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{ALL_SPOTS.find(s => s.name === city)?.district}</span>
                                                            )}
                                                        </div>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Destination Selection */}
                            <div className="flex flex-col gap-2 relative">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">To Destination(s)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={destinationInput}
                                        onChange={(e) => {
                                            setDestinationInput(e.target.value);
                                            setShowDestSuggestions(true);
                                        }}
                                        onFocus={() => setShowDestSuggestions(true)}
                                        onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && destinationInput.trim()) {
                                                addDestination(destinationInput.trim());
                                            }
                                        }}
                                        placeholder="Type city or package name..."
                                        className="w-full bg-white border border-slate-200 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
                                    />
                                    <AnimatePresence>
                                        {showDestSuggestions && destinationInput.length > 0 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto p-2"
                                            >
                                                {suggestionList
                                                    .filter(item => item.toLowerCase().includes(destinationInput.toLowerCase()))
                                                    .slice(0, 8)
                                                    .map(item => (
                                                        <button
                                                            key={item}
                                                            onClick={() => addDestination(item)}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700 flex items-center gap-3"
                                                        >
                                                            <span className="material-symbols-outlined text-slate-400 text-lg">map</span>
                                                            <div className="flex flex-col overflow-hidden">
                                                                <span className="truncate">{item}</span>
                                                                {ALL_SPOTS.find(s => s.name === item)?.district && (
                                                                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{ALL_SPOTS.find(s => s.name === item)?.district}</span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                {destinationInput.trim() && !suggestionList.find(i => i.toLowerCase() === destinationInput.toLowerCase()) && (
                                                    <button
                                                        onClick={() => addDestination(destinationInput.trim())}
                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-primary/10 transition-colors font-bold text-primary flex items-center gap-3 border-t border-slate-50 mt-1"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">add</span>
                                                        Add "{destinationInput}"
                                                    </button>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Selected Destinations Tags */}
                        {selectedDestinations.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                                {selectedDestinations.map((name) => (
                                    <div key={name} className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold">
                                        {name}
                                        <button onClick={() => removeDestination(name)} className="material-symbols-outlined text-sm hover:text-red-500 transition-colors">close</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Step 2: Travel Details */}
                        <section className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="size-10 rounded-xl bg-secondary text-primary flex items-center justify-center font-bold text-lg">2</div>
                                <h2 className="text-2xl font-black text-slate-900 italic">Travel Details</h2>
                            </div>

                            <div className="space-y-8">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Preferred Timing</label>
                                    <input
                                        type="text"
                                        value={pickupTime}
                                        onChange={(e) => setPickupTime(e.target.value)}
                                        placeholder="e.g. 6:00 AM or Morning"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:bg-white focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Persons</label>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setPersonCount(Math.max(1, personCount - 1))} className="size-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="text-xl font-black text-slate-900 w-6 text-center">{personCount}</span>
                                            <button onClick={() => setPersonCount(personCount + 1)} className="size-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined text-sm">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Days</label>
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => setDays(Math.max(1, days - 1))} className="size-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined text-sm">remove</span>
                                            </button>
                                            <span className="text-xl font-black text-slate-900 w-6 text-center">{days}</span>
                                            <button onClick={() => setDays(days + 1)} className="size-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                                <span className="material-symbols-outlined text-sm">add</span>
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
                                <h2 className="text-2xl font-black text-slate-900 italic">Extras</h2>
                            </div>

                            <div className="space-y-4">
                                {EXPENSE_OPTIONS.map(opt => (
                                    <div key={opt.id} className="flex flex-col gap-4">
                                        <label
                                            className={`flex items-start gap-4 p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedExpenses.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-slate-50 bg-slate-50/50 hover:bg-slate-50'
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
                                                <span className="font-bold text-slate-800 block">{opt.label}</span>
                                                <p className="text-xs text-slate-500">{opt.description}</p>
                                            </div>
                                        </label>

                                        {/* Accommodation Sub-options */}
                                        {opt.id === 'accommodation' && selectedExpenses.includes('accommodation') && (
                                            <div className="flex flex-wrap gap-2">
                                                {['homestay', 'hotel', '3star'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setAccommodationType(type)}
                                                        className={`px-3 py-2 rounded-xl border-2 font-bold text-xs transition-all ${accommodationType === type ? 'border-primary bg-primary text-white' : 'border-slate-100 bg-white text-slate-500 hover:border-slate-200'}`}
                                                    >
                                                        {type === 'homestay' ? 'Home' : type === 'hotel' ? 'Hotel' : '3 Star'}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Action Button */}
                    <div className="mt-8 flex flex-col items-center gap-6">
                        <button
                            onClick={shareToWhatsApp}
                            disabled={selectedDestinations.length === 0}
                            className="w-full max-w-lg bg-primary hover:bg-[#6c193d] disabled:opacity-50 disabled:cursor-not-allowed text-white min-h-16 py-4 rounded-[2rem] font-black text-base sm:text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined shrink-0">send</span>
                            <span className="text-center">Request Pricing via WhatsApp</span>
                        </button>
                        <p className="text-slate-400 text-sm font-medium text-center">
                            * Pricing will be provided based on your custom requirements and vehicle availability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
