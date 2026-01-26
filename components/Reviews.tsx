"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import reviewsData from "@/data/reviews.json";
import Link from 'next/link';

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

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const FALLBACK_IMAGE = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/testimonials?store_id=${process.env.NEXT_PUBLIC_STORE_ID}`);
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
                        is_verified: r.meta_data?.is_verified !== false // Default to true if not specified
                    }));
                    setReviews(formattedReviews);
                } else {
                    setReviews(reviewsData.map(r => ({
                        ...r,
                        image: r.image || FALLBACK_IMAGE,
                        is_verified: true,
                        subtitle: r.role
                    })));
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
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

    const displayReviews = reviews.slice(0, 4);

    if (isLoading) {
        return (
            <section className="w-full bg-[#f8f9fa] py-24 relative overflow-hidden">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-[2.5rem] p-8 h-64 animate-pulse border border-slate-100 shadow-sm" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-[#f8f9fa] py-24 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl opacity-50" />

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center text-center mb-16 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Testimonials
                    </div>
                    <h2 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
                        Hear from Our <span className="text-primary italic">Happy Travelers</span>
                    </h2>
                    <div className="h-1.5 w-24 bg-primary rounded-full mb-6" />
                    <p className="text-slate-500 text-lg font-medium max-w-2xl">
                        We take pride in creating unforgettable memories. Read what our clients have to say about their journeys with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayReviews.map((review) => (
                        <div
                            key={review.id}
                            className="flex flex-col bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
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

                            <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                                <div className="size-14 rounded-2xl overflow-hidden bg-secondary relative shadow-inner">
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
                                <div className="flex flex-col">
                                    <h4 className="text-slate-900 font-bold text-lg leading-tight">{review.name}</h4>
                                    <span className="text-primary text-[11px] font-black uppercase tracking-widest mt-0.5">{review.subtitle}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <Link
                        href="/reviews"
                        className="px-8 py-3.5 sm:px-10 sm:py-4 bg-white border-2 border-primary/20 text-primary rounded-2xl font-black text-base sm:text-lg hover:bg-primary hover:text-white transition-all shadow-lg shadow-primary/5 flex items-center gap-3 group"
                    >
                        View All Reviews
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </Link>
                </div>

                {/* Add Review CTA */}
                <div className="mt-16 bg-white rounded-[3rem] p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group">
                    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">Loved your trip with us?</h3>
                        <p className="text-slate-500 font-medium text-sm sm:text-base">Share your experience and photos with the world!</p>
                    </div>
                    <Link
                        href="/reviews/add"
                        className="px-8 py-4 sm:px-10 sm:py-5 bg-primary text-white rounded-2xl font-black text-base sm:text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 flex items-center gap-3 w-full md:w-auto justify-center"
                    >
                        <span className="material-symbols-outlined">add_comment</span>
                        Add Your Review
                    </Link>
                </div>

                {/* Floating Google Review Badge (Optional UI touch) */}
                <div className="mt-20 flex flex-col items-center">
                    <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-lg border border-slate-100">
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-black text-slate-900">4.9/5</span>
                            <div className="flex text-primary">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-sm">star</span>
                                ))}
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-bold">Trusted by 2000+ travelers</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
