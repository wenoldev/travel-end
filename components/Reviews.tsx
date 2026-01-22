"use client";

import React from 'react';
import Image from 'next/image';
import reviewsData from "@/data/reviews.json";

const Reviews = () => {
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
                    {reviewsData.map((review) => (
                        <div
                            key={review.id}
                            className="flex flex-col bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center gap-1 text-primary mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="material-symbols-outlined text-xl">
                                        {i < review.rating ? 'star' : 'star_outline'}
                                    </span>
                                ))}
                            </div>

                            <p className="text-slate-700 text-lg font-medium italic leading-relaxed mb-8 flex-grow">
                                &quot;{review.content}&quot;
                            </p>

                            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                <div className="size-14 rounded-2xl overflow-hidden bg-secondary relative">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <h4 className="text-slate-900 font-bold text-lg">{review.name}</h4>
                                    <span className="text-primary text-sm font-black uppercase tracking-wider">{review.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
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
