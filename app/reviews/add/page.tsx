"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddReviewPage() {
    const [name, setName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [visitedPlace, setVisitedPlace] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [tripType, setTripType] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [profilePhoto, setProfilePhoto] = useState<{ file: File; preview: string } | null>(null);
    const [placePhotos, setPlacePhotos] = useState<{ file: File; preview: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);

    const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setProfilePhoto({ file, preview });
        }
    };

    const handlePlacePhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newPhotos = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        setPlacePhotos(prev => [...prev, ...newPhotos]);
    };

    const uploadImages = async (files: File[]) => {
        if (files.length === 0) return [];

        const formData = new FormData();
        formData.append('store_id', process.env.NEXT_PUBLIC_STORE_ID || '');
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/common/upload`, {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.error) {
            throw new Error(result.error.message || 'Failed to upload images');
        }

        return result.data.results
            .filter((r: { status: string; publicUrl: string }) => r.status === 'success')
            .map((r: { publicUrl: string }) => r.publicUrl);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Upload Profile Photo if exists
            let profileImageUrl = '';
            if (profilePhoto) {
                const urls = await uploadImages([profilePhoto.file]);
                profileImageUrl = urls[0] || '';
            }

            // 2. Upload Gallery Images if exist
            let galleryUrls: string[] = [];
            if (placePhotos.length > 0) {
                galleryUrls = await uploadImages(placePhotos.map(p => p.file));
            }

            // 3. Submit Testimonial
            const testimonialData = {
                store_id: process.env.NEXT_PUBLIC_STORE_ID,
                name: name,
                review: review,
                rating: rating,
                profile_image: profileImageUrl,
                meta_data: {
                    gallery: galleryUrls,
                    visited_place: visitedPlace,
                    service_type: serviceType,
                    trip_type: tripType,
                    subtitle: subtitle,
                    is_verified: true
                }
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/testimonials`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testimonialData),
            });

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error.message || 'Failed to submit review');
            }

            setShowSuccessDialog(true);
            // Reset form
            setName('');
            setSubtitle('');
            setReview('');
            setRating(5);
            setVisitedPlace('');
            setServiceType('');
            setTripType('');
            setProfilePhoto(null);
            setPlacePhotos([]);

        } catch (error: unknown) {
            console.error("Submission Error:", error);
            const errorMessage = error instanceof Error ? error.message : "An error occurred while submitting your review.";
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-white font-sans antialiased">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center mb-16">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors group"
                        >
                            <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
                            Back to Home
                        </Link>
                        <h1 className="text-slate-900 text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4 text-balance">
                            Share Your <span className="text-primary italic">Adventure</span>
                        </h1>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl">
                            Tell us about your trip and help other travelers discover the beauty of our destinations.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl p-8 sm:p-12">
                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Profile Section */}
                            <div className="flex flex-col md:flex-row items-center gap-8 pb-10 border-b border-slate-100">
                                <div className="relative group">
                                    <div className="size-32 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center relative">
                                        {profilePhoto ? (
                                            <Image src={profilePhoto.preview} alt="Profile" fill className="object-cover" />
                                        ) : (
                                            <span className="material-symbols-outlined text-4xl text-slate-300">person</span>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleProfileUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg pointer-events-none transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-xl">camera_alt</span>
                                    </div>
                                </div>
                                <div className="flex flex-col text-center md:text-left">
                                    <h2 className="text-xl font-black text-slate-900 mb-1">Your Profile Photo</h2>
                                    <p className="text-slate-400 text-sm font-medium">Add a photo of yourself for the review.</p>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Your Full Name</label>
                                    <input
                                        id="name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="subtitle" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Your Title (e.g. Solo Explorer)</label>
                                    <input
                                        id="subtitle"
                                        value={subtitle}
                                        onChange={(e) => setSubtitle(e.target.value)}
                                        placeholder="Travel Blogger / Family Traveler"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="visitedPlace" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Visited Place Detail</label>
                                    <input
                                        id="visitedPlace"
                                        value={visitedPlace}
                                        onChange={(e) => setVisitedPlace(e.target.value)}
                                        placeholder="e.g., South India / Rajasthan"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="serviceType" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Service / Vehicle Type</label>
                                    <input
                                        id="serviceType"
                                        value={serviceType}
                                        onChange={(e) => setServiceType(e.target.value)}
                                        placeholder="e.g., Tempo Traveller / SUV Rental"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tripType" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Trip Type</label>
                                    <input
                                        id="tripType"
                                        value={tripType}
                                        onChange={(e) => setTripType(e.target.value)}
                                        placeholder="e.g., Group Tour / Family Trip"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Overall Rating</label>
                                    <div className="flex gap-2 bg-slate-50 w-fit p-3 rounded-2xl border border-slate-100">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <motion.button
                                                key={star}
                                                type="button"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredRating(star)}
                                                onMouseLeave={() => setHoveredRating(0)}
                                                className="focus:outline-none"
                                            >
                                                <span
                                                    className={`material-symbols-outlined text-4xl transition-colors duration-200 ${star <= (hoveredRating || rating)
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-slate-300'
                                                        }`}
                                                    style={{
                                                        fontVariationSettings: star <= (hoveredRating || rating) ? "'FILL' 1" : "'FILL' 0"
                                                    }}
                                                >
                                                    star
                                                </span>
                                            </motion.button>
                                        ))}
                                        <span className="ml-4 flex items-center text-lg font-black text-slate-900 min-w-[3ch]">
                                            {rating}.0
                                        </span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 md:col-span-2">
                                    <label htmlFor="message" className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Your Experience</label>
                                    <textarea
                                        id="message"
                                        required
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        rows={6}
                                        placeholder="Describe your journey, the sights you saw, and your overall experience..."
                                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium text-slate-900 resize-none"
                                    />
                                </div>
                            </div>

                            {/* Place Photos Section */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest pl-1">Trip Gallery</h2>
                                    <p className="text-slate-400 text-sm pl-1 font-medium">Share some beautiful moments from your trip.</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {placePhotos.map((photo, idx) => (
                                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden relative border border-slate-100 shadow-sm transition-transform hover:scale-[1.02]">
                                            <Image src={photo.preview} alt={`Trip ${idx + 1}`} fill className="object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setPlacePhotos(prev => prev.filter((_, i) => i !== idx))}
                                                className="absolute top-2 right-2 size-8 bg-red-500 text-white rounded-lg flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-20"
                                            >
                                                <span className="material-symbols-outlined text-lg">close</span>
                                            </button>
                                        </div>
                                    ))}
                                    <div className="aspect-square rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center relative group transition-colors hover:border-primary hover:bg-primary/5 cursor-pointer overflow-hidden">
                                        <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-primary transition-colors">add_photo_alternate</span>
                                        <span className="text-[10px] font-black uppercase text-slate-400 mt-2 group-hover:text-primary transition-colors tracking-widest">Add Photo</span>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handlePlacePhotosUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white py-4 sm:py-6 rounded-[2rem] font-black text-lg sm:text-xl shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-4"
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="material-symbols-outlined animate-spin">sync</span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">send</span>
                                        Post My Review
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />

            {/* Success Dialog */}
            <AnimatePresence>
                {showSuccessDialog && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowSuccessDialog(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[2.5rem] p-8 text-center shadow-2xl border border-slate-100 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
                            <div className="mb-6 flex justify-center">
                                <div className="size-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-inner">
                                    <span className="material-symbols-outlined text-4xl font-bold">check_circle</span>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 mb-4 italic">Thank You!</h3>
                            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8">
                                Your review has been submitted successfully. It will be visible to other travelers once approved.
                            </p>
                            <Link
                                href="/"
                                className="block w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-primary/20 text-center"
                            >
                                Back to Home
                            </Link>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

