"use client";

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import reviewsData from "@/data/reviews.json";
import { motion } from 'framer-motion';

interface Review {
    id: string | number;
    name: string;
    subtitle?: string;
    content: string;
    rating: number;
    image: string;
    gallery?: string[];
    visited_place?: string;
    trip_type?: string;
    service_type?: string;
    is_verified?: boolean;
}

interface TestimonialAPIResponse {
    id: string;
    name: string;
    review: string;
    rating: number;
    profile_image: string;
    meta_data: {
        gallery?: string[];
        visited_place?: string;
        trip_type?: string;
        service_type?: string;
        subtitle?: string;
        is_verified?: boolean;
    };
}

export default function AllReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const FALLBACK_IMAGE = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL;
                const storeId = process.env.NEXT_PUBLIC_STORE_ID;

                if (!apiUrl || !storeId) {
                    throw new Error("Missing API configuration");
                }

                const response = await fetch(`${apiUrl}/api/v1/public/testimonials?store_id=${storeId}`);

                if (!response.ok) {
                    throw new Error(`API error: ${response.status}`);
                }

                const result = await response.json();

                if (result.data?.testimonials && result.data.testimonials.length > 0) {
                    const formattedReviews = result.data.testimonials.map((r: TestimonialAPIResponse) => ({
                        id: r.id,
                        name: r.name,
                        subtitle: r.meta_data?.subtitle || "Traveler",
                        content: r.review,
                        rating: r.rating || 5,
                        image: r.profile_image || FALLBACK_IMAGE,
                        gallery: r.meta_data?.gallery || [],
                        visited_place: r.meta_data?.visited_place,
                        trip_type: r.meta_data?.trip_type,
                        service_type: r.meta_data?.service_type,
                        is_verified: r.meta_data?.is_verified !== false
                    }));
                    setReviews(formattedReviews);
                } else {
                    throw new Error("No reviews found in API");
                }
            } catch (error) {
                console.error("Error fetching reviews, using fallback:", error);
                setReviews(reviewsData.map(r => ({
                    ...r,
                    image: r.image || FALLBACK_IMAGE,
                    is_verified: true,
                    subtitle: r.role
                })));
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#f8f9fa] font-sans antialiased">
            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col items-center text-center mb-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors group"
                        >
                            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 className="text-slate-900 text-4xl sm:text-6xl font-black leading-tight tracking-tight mb-4 text-balance">
                            What Our <span className="text-primary italic">Travelers</span> Say
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">
                            Real stories from real explorers. Discover why thousands of travelers trust us with their dream vacations.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-[2.5rem] p-8 h-80 animate-pulse border border-slate-100 shadow-sm" />
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    key={review.id}
                                    className="flex flex-col bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-0.5 text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`material-symbols-outlined text-xl ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>
                                                    star
                                                </span>
                                            ))}
                                        </div>
                                        {review.is_verified && (
                                            <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-green-100">
                                                <span className="material-symbols-outlined text-sm font-bold">verified</span>
                                                Verified Booking
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <p className="text-slate-700 text-lg font-medium italic leading-relaxed mb-6">
                                        &quot;{review.content}&quot;
                                    </p>

                                    {/* Trip Info */}
                                    {(review.visited_place || review.service_type || review.trip_type) && (
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
                                            <div className="flex items-center gap-1.5 text-slate-400 group">
                                                <span className="material-symbols-outlined text-lg">location_on</span>
                                                <span className="text-sm font-bold text-slate-600">
                                                    {[review.visited_place, review.service_type, review.trip_type].filter(Boolean).join(' · ')}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Gallery Preview */}
                                    {review.gallery && review.gallery.length > 0 && (
                                        <div className="grid grid-cols-4 gap-2 mb-8">
                                            {review.gallery.slice(0, 4).map((img, idx) => (
                                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-50 group">
                                                    <Image
                                                        src={img}
                                                        alt={`Gallery ${idx}`}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    {idx === 3 && review.gallery!.length > 4 && (
                                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
                                                            <span className="text-white font-black text-sm">+{review.gallery!.length - 4}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* User Info */}
                                    <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                                        <div className="size-14 rounded-2xl overflow-hidden bg-secondary relative flex-shrink-0">
                                            <Image
                                                src={review.image}
                                                alt={review.name}
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = FALLBACK_IMAGE;
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <h4 className="text-slate-900 font-bold text-lg truncate leading-tight">{review.name}</h4>
                                            <span className="text-primary text-[11px] font-black uppercase tracking-widest mt-0.5">{review.subtitle}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="mt-24 bg-primary rounded-[3rem] p-8 sm:p-12 text-center text-white shadow-2xl shadow-primary/30 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-2xl sm:text-4xl font-black mb-4 relative z-10 italic">Ready to make your own memories?</h2>
                        <p className="text-white/80 text-base sm:text-lg font-medium mb-10 max-w-2xl mx-auto relative z-10">
                            Book your next adventure today and join our community of happy travelers.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <Link
                                href="/reviews/add"
                                className="px-8 py-4 sm:px-10 sm:py-5 bg-white text-primary rounded-2xl font-black text-lg sm:text-xl hover:scale-105 transition-transform shadow-xl w-full sm:w-auto flex items-center justify-center gap-3"
                            >
                                <span className="material-symbols-outlined">add_comment</span>
                                Share Your Experience
                            </Link>
                            <Link
                                href="/packages"
                                className="px-8 py-4 sm:px-10 sm:py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-lg sm:text-xl hover:bg-white/20 transition-all w-full sm:w-auto"
                            >
                                Explore Packages
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
