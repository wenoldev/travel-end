import React from 'react';
import Link from 'next/link';
import InternationalTripForm from '@/components/InternationalTripForm';
import { ChevronRight } from 'lucide-react';

export default function InternationalTripPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <nav className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-4">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-slate-600">International Trip</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
                        <div className="max-w-xl">
                            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                                International <span className="text-primary italic">Trip</span> Planner
                            </h1>
                            <p className="text-slate-500 mt-4 font-medium text-lg leading-relaxed">
                                Curating breathtaking global experiences. Tell us your dream destination, and we'll handle the rest.
                            </p>
                        </div>
                        <div className="w-full lg:w-72 h-44 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <img 
                                src="/international-trip.png" 
                                alt="International Trip" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <InternationalTripForm />
            </div>
        </div>
    );
}
