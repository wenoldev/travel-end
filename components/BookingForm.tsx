'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/data/siteConfig.json';

export default function BookingForm() {
    const [bookingType, setBookingType] = useState('ticket'); // ticket, hotel
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        ticketType: 'Flight', // Flight, Train
        hotelType: '4 Star', // 5 Star, 4 Star, 3 Star
        foodType: 'Veg', // Veg, Non-Veg
        date: '',
        destination: '',
        passengers: 1
    });

    const handleInputChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const shareToWhatsApp = () => {
        let message = `*NEW BOOKING REQUEST*\n`;
        message += `----------------------------\n`;
        message += `*Name:* ${formData.name}\n`;
        message += `*Mobile:* ${formData.mobile}\n`;
        message += `*Booking Type:* ${bookingType === 'ticket' ? 'Transport Ticket' : 'Hotel Accommodation'}\n`;
        
        if (bookingType === 'ticket') {
            message += `*Ticket For:* ${formData.ticketType}\n`;
        } else {
            message += `*Hotel Category:* ${formData.hotelType}\n`;
            message += `*Food Preference:* ${formData.foodType}\n`;
        }
        
        message += `*Destination/Route:* ${formData.destination}\n`;
        message += `*Date:* ${formData.date}\n`;
        message += `*Passengers/Adults:* ${formData.passengers}\n`;
        message += `\n_Generated via TravelEnd Booking System_`;

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

            <div className="flex flex-col gap-4">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">What are you booking?</label>
                <div className="flex gap-4">
                    {['ticket', 'hotel'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setBookingType(type)}
                            className={`flex-1 py-4 rounded-2xl border-2 flex items-center justify-center gap-2 font-bold transition-all ${bookingType === type ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                        >
                            <span className="material-symbols-outlined">
                                {type === 'ticket' ? 'confirmation_number' : 'hotel'}
                            </span>
                            {type === 'ticket' ? 'Tickets' : 'Hotels'}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {bookingType === 'ticket' ? (
                    <motion.div
                        key="ticket-fields"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ticket Type</label>
                            <div className="flex gap-4">
                                {['Flight', 'Train'].map((type) => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="ticketType"
                                                className="peer appearance-none size-6 rounded-full border-2 border-slate-200 checked:border-primary transition-all"
                                                checked={formData.ticketType === type}
                                                onChange={() => handleInputChange('ticketType', type)}
                                            />
                                            <div className="absolute size-3 rounded-full bg-primary scale-0 peer-checked:scale-100 transition-transform" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-primary transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hotel-fields"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Hotel Category</label>
                                <div className="flex flex-col gap-3">
                                    {['5 Star', '4 Star', '3 Star'].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleInputChange('hotelType', star)}
                                            className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold transition-all ${formData.hotelType === star ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            <span className="material-symbols-outlined">stars</span>
                                            {star}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Food Preference</label>
                                <div className="flex flex-col gap-3">
                                    {['Veg', 'Non-Veg'].map((food) => (
                                        <button
                                            key={food}
                                            onClick={() => handleInputChange('foodType', food)}
                                            className={`p-4 rounded-2xl border-2 flex items-center gap-3 font-bold transition-all ${formData.foodType === food ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-500 hover:border-slate-200'}`}
                                        >
                                            <span className="material-symbols-outlined">restaurant</span>
                                            {food}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Destination / Route</label>
                <input
                    type="text"
                    value={formData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    placeholder="e.g. Chennai to Dubai, Ooty Hotel, etc."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Travel Date</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl h-14 px-6 font-bold text-slate-900 focus:border-primary outline-none transition-all"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">How many Persons?</label>
                    <div className="flex items-center gap-4">
                        <button onClick={() => handleInputChange('passengers', Math.max(1, formData.passengers - 1))} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                            <span className="material-symbols-outlined">remove</span>
                        </button>
                        <span className="text-2xl font-black text-slate-900 w-12 text-center">{formData.passengers}</span>
                        <button onClick={() => handleInputChange('passengers', formData.passengers + 1)} className="size-12 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center text-slate-600">
                            <span className="material-symbols-outlined">add</span>
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={shareToWhatsApp}
                disabled={!isFormValid}
                className="w-full bg-primary hover:bg-[#6c193d] disabled:opacity-50 disabled:cursor-not-allowed text-white min-h-16 py-4 rounded-2xl font-black text-base sm:text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 mt-8"
            >
                <span className="material-symbols-outlined shrink-0">book_online</span>
                <span className="text-center">Confirm Booking via WhatsApp</span>
            </button>
        </div>
    );
}

import { AnimatePresence } from 'framer-motion';
