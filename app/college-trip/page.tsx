'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import touristSpots from '@/data/touristSpots.json';

// Flatten tourist spots for easy searching
const ALL_SPOTS = [
    ...touristSpots.TamilNadu,
    ...touristSpots.Kerala
].map(spot => ({
    name: spot.name,
    district: spot.district
}));

const ALL_PLACE_NAMES = [...new Set(ALL_SPOTS.map(s => s.name))];

export default function CollegeTripPage() {
    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [department, setDepartment] = useState('');
    const [personCount, setPersonCount] = useState(30);
    const [days, setDays] = useState(1);
    const [destination, setDestination] = useState('');
    const [mobile, setMobile] = useState('');
    const [showDestSuggestions, setShowDestSuggestions] = useState(false);

    const shareToWhatsApp = () => {
        const message = `*NEW IV / COLLEGE TRIP INQUIRY*
----------------------------
*Name:* ${name}
*Institution:* ${institution}
*Department:* ${department}
*Group Size:* ${personCount} Students/Staff
*Duration:* ${days} Day(s)
*Target Destination:* ${destination}
*Contact:* ${mobile}

_Generated via TravelEnd College Planner_`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
    };

    const suggestions = useMemo(() => {
        if (!destination) return [];
        return ALL_PLACE_NAMES.filter(item => 
            item.toLowerCase().includes(destination.toLowerCase())
        ).slice(0, 8);
    }, [destination]);

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="material-symbols-outlined text-xs">chevron_right</span>
                        <span className="text-slate-600">IV & College Trip</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                        <div className="max-w-xl">
                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                                IV or College <span className="text-primary italic">Trip</span> Explorer
                            </h1>
                            <p className="text-slate-500 mt-4 font-medium text-lg leading-relaxed">
                                Specialized in educational tours, industrial visits, and leisure trips for schools and colleges across South India.
                            </p>
                        </div>
                        <div className="w-full lg:w-72 h-44 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="https://images.unsplash.com/photo-1523050853063-89a1f4969877?auto=format&fit=crop&q=80&w=600" 
                                alt="College Trip" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Contact Person Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Mobile Number</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                placeholder="Enter mobile number"
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Institution / College Name</label>
                        <input
                            type="text"
                            value={institution}
                            onChange={(e) => setInstitution(e.target.value)}
                            placeholder="Enter college name"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Department / Group Name</label>
                        <input
                            type="text"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            placeholder="e.g. Mechanical Engineering"
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Approximate Strength</label>
                            <div className="flex items-center gap-4">
                                <button onClick={() => setPersonCount(Math.max(1, personCount - 5))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <span className="text-2xl font-black text-slate-900 w-12 text-center">{personCount}</span>
                                <button onClick={() => setPersonCount(personCount + 5)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Duration (Days)</label>
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
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Target Destination(s)</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={destination}
                                onChange={(e) => {
                                    setDestination(e.target.value);
                                    setShowDestSuggestions(true);
                                }}
                                onFocus={() => setShowDestSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowDestSuggestions(false), 200)}
                                placeholder="e.g. Kerala, Coimbatore, etc."
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all shadow-sm"
                            />
                            <AnimatePresence>
                                {showDestSuggestions && suggestions.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto p-2"
                                    >
                                        {suggestions.map(item => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    setDestination(item);
                                                    setShowDestSuggestions(false);
                                                }}
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
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button
                        onClick={shareToWhatsApp}
                        disabled={!name || !mobile || !institution || !destination}
                        className="w-full bg-primary hover:bg-[#6c193d] disabled:opacity-50 disabled:cursor-not-allowed text-white min-h-16 py-4 rounded-2xl font-black text-base sm:text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-8"
                    >
                        <span className="material-symbols-outlined shrink-0">send</span>
                        <span className="text-center">Get Custom Quote via WhatsApp</span>
                    </button>
                    
                    <p className="text-center text-slate-400 text-xs font-medium">
                        Our team will contact you with a tailored itinerary and bulk pricing options.
                    </p>
                </div>
            </div>
        </div>
    );
}
