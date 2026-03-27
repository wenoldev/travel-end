'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, Home, Map } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] bg-white flex flex-col items-center justify-center p-6 sm:p-8 pb-32 sm:pb-8 relative overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl opacity-50" />

            <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-8">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="size-40 sm:size-64 bg-secondary/30 rounded-full flex items-center justify-center relative"
                >
                    <div className="absolute inset-0 animate-ping bg-primary/10 rounded-full" />
                    <Compass size={100} className="text-primary animate-bounce opacity-40" />
                </motion.div>

                {/* Text Content */}
                <div className="space-y-4">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl sm:text-9xl font-black text-slate-900 tracking-tighter"
                    >
                        4<span className="text-primary italic">0</span>4
                    </motion.h1>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl sm:text-4xl font-black text-slate-800 px-4"
                    >
                        Lost in <span className="text-primary">Paradise?</span>
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-slate-500 text-base sm:text-xl font-medium max-w-[280px] sm:max-w-md mx-auto"
                    >
                        It looks like this destination hasn't been discovered yet. Let's get you back on the right track!
                    </motion.p>
                </div>

                {/* Navigation Buttons */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link
                        href="/"
                        className="px-6 sm:px-10 py-4 sm:py-5 bg-primary text-white rounded-[2rem] font-black text-base sm:text-lg shadow-xl shadow-primary/25 hover:scale-105 transition-transform flex items-center justify-center gap-3"
                    >
                        <Home size={24} />
                        Back to Home
                    </Link>
                    <Link
                        href="/packages"
                        className="px-6 sm:px-10 py-4 sm:py-5 bg-white border-2 border-slate-100 text-slate-900 rounded-[2rem] font-black text-base sm:text-lg hover:bg-slate-50 transition-all shadow-lg shadow-black/5 flex items-center justify-center gap-3"
                    >
                        <Map size={24} />
                        Explore Packages
                    </Link>
                </motion.div>

                {/* Contact Support */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-slate-400 font-bold text-sm mt-8"
                >
                    Still can't find your way? <Link href="/contact" className="text-primary hover:underline">Contact Support</Link>
                </motion.p>
            </div>

            {/* Rotating Compass Decoration (Bottom Right) */}
            <div className="fixed -bottom-20 -right-20 pointer-events-none opacity-5 lg:opacity-10">
                <Compass size={300} className="text-slate-900 animate-spin-slow" />
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
        </div>
    );
}
