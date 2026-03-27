import Link from 'next/link';
import { Car, Banknote, CheckCircle2, Headset, ChevronsRight } from 'lucide-react';

export default function TaxiBanner() {
    return (
        <section className="w-full bg-white py-12">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full min-h-[600px] sm:aspect-auto sm:min-h-[500px] md:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden group shadow-2xl">
                    {/* Background Image */}
                    <img
                        src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000"
                        alt="Premium Taxi and Self Drive"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-slate-900/95 via-slate-900/70 sm:via-slate-900/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex items-center px-6 sm:px-16 md:px-24">
                        <div className="max-w-2xl flex flex-col gap-4 sm:gap-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 backdrop-blur-md text-white border border-white/20 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider w-fit">
                                <Car size={14} />
                                Premium Fleet Available
                            </div>

                            <h2 className="text-white text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight">
                                Taxi Tariff & <span className="text-primary italic">Self-Drive</span> Cars
                            </h2>

                            <p className="text-white/80 text-sm sm:text-lg font-medium leading-relaxed max-w-lg">
                                Choose from our wide range of premium vehicles. Whether you need a professional driver or prefer the freedom of self-driving, we have the perfect ride.
                            </p>

                            <div className="flex flex-wrap gap-3 sm:gap-8 items-center pt-2">
                                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold">
                                    <div className="size-8 sm:size-10 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary">
                                        <Banknote size={16} className="sm:size-5" />
                                    </div>
                                    <span className="text-[10px] sm:text-sm">Best Rates</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold">
                                    <div className="size-8 sm:size-10 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary">
                                        <CheckCircle2 size={16} className="sm:size-5" />
                                    </div>
                                    <span className="text-[10px] sm:text-sm">Verified</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-white font-bold">
                                    <div className="size-8 sm:size-10 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary">
                                        <Headset size={16} className="sm:size-5" />
                                    </div>
                                    <span className="text-[10px] sm:text-sm">24/7 Support</span>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/taxi-tariff"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-primary text-white rounded-[2rem] font-black text-base sm:text-lg hover:bg-orange-600 transition-all shadow-xl shadow-primary/20 group/btn"
                                >
                                    <span>View Taxi Tariff</span>
                                    <ChevronsRight size={20} className="sm:size-6 transition-transform group-hover/btn:translate-x-1" />
                                </Link>
                                <Link
                                    href="/contact?type=self-drive"
                                    className="inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-[2rem] font-black text-base sm:text-lg hover:bg-white hover:text-slate-900 transition-all"
                                >
                                    <span>Enquire Self-Drive</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}
