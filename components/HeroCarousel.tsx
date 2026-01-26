'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const carouselItems = [
    {
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=1920",
        title: "Experience Kerala",
        description: "Discover the serene backwaters and lush greenery of God's Own Country."
    },
    {
        image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&q=80&w=1920",
        title: "Misty Munnar",
        description: "Walk through emerald tea plantations and breathe in the fresh mountain air."
    },
    {
        image: "https://images.unsplash.com/photo-1588623598822-9ff0cd048b8a?q=80&w=1174&auto=format&fit=crop&q=80&w=1920",
        title: "Charming Pondicherry",
        description: "Where French heritage meets tranquil beaches and spiritual calm."
    },
    {
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=1920",
        title: "Serene Kodaikanal",
        description: "Explore the Princess of Hill Stations and its tranquil lakeside beauty."
    }
];

export default function HeroCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % carouselItems.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[80vh] overflow-hidden">

            {/* IMAGE ONLY ANIMATION */}
            <AnimatePresence>
                <motion.div
                    key={carouselItems[index].image}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url("${carouselItems[index].image}")`,
                        transformOrigin: "center center",
                    }}
                />
            </AnimatePresence>

            {/* STATIC OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-black/20 to-transparent" />

            {/* TEXT CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="max-w-4xl">

                    {/* TITLE */}
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={carouselItems[index].title}
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-white text-5xl sm:text-6xl lg:text-8xl font-black mb-6 drop-shadow-2xl"
                        >
                            {carouselItems[index].title}
                        </motion.h1>
                    </AnimatePresence>

                    {/* DESCRIPTION */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={carouselItems[index].description}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="text-white/90 text-xl sm:text-2xl font-medium max-w-2xl mx-auto drop-shadow-lg mb-10"
                        >
                            {carouselItems[index].description}
                        </motion.p>
                    </AnimatePresence>

                </div>
            </div>

            {/* INDICATORS */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {carouselItems.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === i
                            ? 'w-10 bg-white'
                            : 'w-2 bg-white/50 hover:bg-white'
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}
