import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-600">Ticket & Hotel Booking</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                        <div className="max-w-xl">
                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                                Book Your <span className="text-primary italic">Travel</span> Essentials
                            </h1>
                            <p className="text-slate-500 mt-4 font-medium text-lg leading-relaxed">
                                Get confirmed tickets and premium hotel stays at the best rates. Simple, fast, and reliable.
                            </p>
                        </div>
                    </div>
                </div>

                <BookingForm />
            </div>
        </div>
    );
}
