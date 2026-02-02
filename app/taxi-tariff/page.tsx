'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import taxiTariff from '@/data/taxiTariff.json';

export default function TaxiTariffPage() {
    // Form State
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        openingTiming: '',
        closingTiming: '',
        days: '1',
        adults: '1',
        children: '0',
        vehicleType: 'Sedan (4 Seater)'
    });

    const VEHICLE_OPTIONS = [
        'Sedan (4 Seater)',
        'SUV (7 Seater - Ertiga/Tavera)',
        'Innova (7 Seater)',
        'Tempo Traveller',
        'URBANIA',
        'Coach Van',
        'Marcopolo Van',
        'Tourist Bus',
        'Volvo Bus'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const shareToWhatsApp = () => {
        const message = `*TAXI TARIFF INQUIRY*
----------------------------
*From:* ${formData.from || 'Not specified'}
*To:* ${formData.to || 'Not specified'}
*Opening Timing:* ${formData.openingTiming || 'Not specified'}
*Closing Timing:* ${formData.closingTiming || 'Not specified'}
*Duration:* ${formData.days} Day(s)
*Passengers:* ${formData.adults} Adult(s), ${formData.children} Child(ren)
*Vehicle Type:* ${formData.vehicleType}

----------------------------
_Generated via TravelEnd Taxi Tariff_`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-12">
                    <div className="max-w-2xl">
                        <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-slate-600">Taxi Tariff</span>
                        </nav>
                        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                            Taxi <span className="text-primary italic">Tariff Sheet</span>
                        </h1>
                        <p className="text-slate-500 mt-4 font-medium text-lg leading-relaxed">
                            Transparent pricing for all your travel needs. Select a vehicle and check our competitive hourly and kilometer-based rates.
                        </p>
                    </div>
                    <div className="flex-1 max-w-md">
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl-soft border-4 border-white shadow-xl">
                            <img 
                                src="https://images.unsplash.com/photo-1449965022632-6a1a6b0ef68a?auto=format&fit=crop&q=80&w=800" 
                                alt="Taxi Service" 
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Tariff Table Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-900 text-white">
                                            <th className="px-6 py-5 font-black uppercase tracking-wider text-xs border-r border-white/10">Hours</th>
                                            <th className="px-6 py-5 font-black uppercase tracking-wider text-xs border-r border-white/10">KM</th>
                                            <th className="px-6 py-5 font-black uppercase tracking-wider text-xs border-r border-white/10 text-center">Sedan</th>
                                            <th className="px-6 py-5 font-black uppercase tracking-wider text-xs border-r border-white/10 text-center">SUV (Ertiga)</th>
                                            <th className="px-6 py-5 font-black uppercase tracking-wider text-xs text-center">Innova</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {taxiTariff.tariffs.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-slate-900 border-r border-slate-50">{row.hours}h</td>
                                                <td className="px-6 py-4 font-bold text-slate-500 border-r border-slate-50">{row.km} km</td>
                                                <td className="px-6 py-4 font-black text-slate-900 text-center border-r border-slate-50">₹{row.sedan}</td>
                                                <td className="px-6 py-4 font-black text-slate-900 text-center border-r border-slate-50">{row.suv ? `₹${row.suv}` : '-'}</td>
                                                <td className="px-6 py-4 font-black text-slate-900 text-center">{row.innova ? `₹${row.innova}` : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Extra per KM</span>
                                <p className="text-slate-900 font-black">S: ₹13 | E: ₹15 | I: ₹16</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Extra Hour</span>
                                <p className="text-slate-900 font-black">₹{taxiTariff.extraHours} / hr</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Night Halt</span>
                                <p className="text-slate-900 font-black">₹{taxiTariff.nightHalt}</p>
                            </div>
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                                <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Hills Extra</span>
                                <p className="text-slate-900 font-black">₹{taxiTariff.hillsExtraPerKm} / KM</p>
                            </div>
                        </div>

                        <div className="mt-8 bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10">
                            <div className="flex gap-4">
                                <span className="material-symbols-outlined text-primary text-3xl">info</span>
                                <div>
                                    <h4 className="font-bold text-slate-900">Important Note</h4>
                                    <p className="text-sm text-slate-600 mt-1">
                                        Toll, Parking, and Permit charges are extra based on actual usage.
                                        We also offer Crysta, Tempo Traveller, Urbania, and various Buses. Contact us for custom quotes for these vehicles.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form Section */}
                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl sticky top-32">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 italic">Quick Inquiry</h3>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">From Destination</label>
                                        <input
                                            name="from"
                                            value={formData.from}
                                            onChange={handleChange}
                                            placeholder="Starting city"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">To Destination</label>
                                        <input
                                            name="to"
                                            value={formData.to}
                                            onChange={handleChange}
                                            placeholder="Destination city"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Opening Time</label>
                                        <input
                                            type="time"
                                            name="openingTiming"
                                            value={formData.openingTiming}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Closing Time</label>
                                        <input
                                            type="time"
                                            name="closingTiming"
                                            value={formData.closingTiming}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Vehicle Type</label>
                                        <select
                                            name="vehicleType"
                                            value={formData.vehicleType}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900 appearance-none"
                                        >
                                            {VEHICLE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Days</label>
                                        <input
                                            type="number"
                                            name="days"
                                            value={formData.days}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Adults</label>
                                        <input
                                            type="number"
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Children</label>
                                        <input
                                            type="number"
                                            name="children"
                                            value={formData.children}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 outline-none focus:border-primary focus:bg-white transition-all font-bold text-slate-900"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={shareToWhatsApp}
                                    className="w-full bg-primary hover:bg-orange-600 text-white h-16 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-4"
                                >
                                    <span className="material-symbols-outlined">send</span>
                                    Enquire on WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
