'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';
import { Minus, Plus, Plane, Train, Ship, Star, Award, Bed, Utensils, Ticket, Check, Send } from 'lucide-react';

export default function InternationalTripForm() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        travelType: 'Luxury',
        needsTicket: 'Flight',
        needsEntryTickets: false,
        hotelType: '4 Star',
        foodType: 'Veg',
        accommodation: 'Star Hotel',
        date: '',
        days: 5,
        destination: ''
    });

    const travelTypes = ['Luxury', 'Budget', 'Adventure', 'Family', 'Honeymoon'];
    const hotelTypes = ['5 Star', '4 Star', '3 Star', 'Standard'];
    const transportTypes = ['Flight', 'Train', 'Ship'];
    const foodTypes = ['Veg', 'Non-Veg', 'Both'];

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const shareToWhatsApp = () => {
        const message = `*NEW INTERNATIONAL TRIP INQUIRY*
----------------------------
*Name:* ${formData.name}
*Mobile:* ${formData.mobile}
*Destination:* ${formData.destination}
*Travel Type:* ${formData.travelType}
*Transport Needed:* ${formData.needsTicket}
*Accommodation:* ${formData.accommodation} (${formData.hotelType})
*Food Preference:* ${formData.foodType}
*Entry Tickets:* ${formData.needsEntryTickets ? 'Included' : 'Not Needed'}
*Start Date:* ${formData.date}
*Duration:* ${formData.days} Days

_Generated via TravelEnd International Planner_`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodedMessage}`, '_blank');
    };

    const isFormValid = formData.name && formData.mobile && formData.destination && formData.date;

    return (
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-100 shadow-sm space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Your Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your name"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Mobile Number</label>
                    <input
                        type="tel"
                        value={formData.mobile}
                        onChange={(e) => handleInputChange('mobile', e.target.value)}
                        placeholder="Enter mobile number"
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Destination</label>
                <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="e.g. Dubai, Singapore, Europe, etc."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Travel Type</label>
                    <select
                        value={formData.travelType}
                        onChange={(e) => handleInputChange('travelType', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none appearance-none cursor-pointer"
                    >
                        {travelTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Duration (Days)</label>
                    <div className="flex items-center gap-4">
                        <button onClick={() => handleInputChange('days', Math.max(1, formData.days - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                            <Minus size={20} />
                        </button>
                        <span className="text-2xl font-black text-slate-900 w-12 text-center">{formData.days}</span>
                        <button onClick={() => handleInputChange('days', formData.days + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                            <Plus size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Transport Type</label>
                <div className="flex flex-wrap gap-3">
                    {transportTypes.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleInputChange('needsTicket', type)}
                            className={`px-6 py-3 rounded-2xl border-2 flex items-center gap-2 font-bold transition-all ${formData.needsTicket === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                        >
                            {type === 'Flight' ? <Plane size={20} /> : type === 'Train' ? <Train size={20} /> : <Ship size={20} />}
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Accommodation</label>
                    <div className="grid grid-cols-1 gap-3">
                        {hotelTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => handleInputChange('hotelType', type)}
                                className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold transition-all ${formData.hotelType === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                            >
                                {type === '5 Star' ? <Star size={20} /> : type === '4 Star' ? <Award size={20} /> : <Bed size={20} />}
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Food & Tickets</label>
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 gap-3 mb-4">
                            {foodTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleInputChange('foodType', type)}
                                    className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold transition-all ${formData.foodType === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                >
                                    <Utensils size={20} />
                                    {type}
                                </button>
                            ))}
                        </div>
                        <button 
                            onClick={() => handleInputChange('needsEntryTickets', !formData.needsEntryTickets)}
                            className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.needsEntryTickets ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'}`}
                        >
                            <div className="flex items-center gap-3 font-bold text-slate-700">
                                <Ticket size={20} className="text-primary" />
                                Entry Tickets
                            </div>
                            <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-all ${formData.needsEntryTickets ? 'border-primary bg-primary' : 'border-slate-200'}`}>
                                {formData.needsEntryTickets && <Check size={14} className="text-white font-bold" />}
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Departure Date</label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                />
            </div>

            <button
                onClick={shareToWhatsApp}
                disabled={!isFormValid}
                className="w-full bg-primary hover:bg-[#6c193d] disabled:opacity-50 disabled:cursor-not-allowed text-white min-h-16 py-4 rounded-2xl font-black text-base sm:text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-8"
            >
                <Send size={24} className="shrink-0" />
                <span className="text-center">Enquire for Details via WhatsApp</span>
            </button>
        </div>
    );
}
