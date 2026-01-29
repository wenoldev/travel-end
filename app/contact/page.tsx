'use client';

import { useState } from 'react';
import siteConfig from "@/data/siteConfig.json";
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    store_id: process.env.NEXT_PUBLIC_STORE_ID,
    name: '',
    email: '',
    phone: '',
    message: '',
    meta_data: {
      subject: ''
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/public/queries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(({ data, error }) => {
        if (error) {
          console.error("API Error:", error);
          alert("Failed to send message: " + (error.message || "Unknown error"));
        } else {
          console.log("Success:", data);
          setShowSuccessDialog(true);
          setFormData({
            store_id: process.env.NEXT_PUBLIC_STORE_ID,
            name: '',
            email: '',
            phone: '',
            message: '',
            meta_data: { subject: '' }
          });
        }
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        alert("A technical error occurred. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'subject') {
      setFormData(prev => ({
        ...prev,
        meta_data: {
          ...prev.meta_data,
          subject: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="bg-white font-sans text-slate-900 antialiased overflow-x-hidden transition-colors duration-200">
      <div className="flex min-h-screen flex-col">
        <main className="flex-grow">
          {/* Hero Header Section */}
          <div className="bg-white dark:bg-slate-900 py-12 sm:py-16 lg:py-20 border-b border-slate-100 dark:border-slate-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl mb-6">
                  Get in Touch with {siteConfig.siteName}
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                  Planning your Tamil Nadu adventure? Whether you have questions about our packages, need a custom itinerary, or just want to say hello, we are here to help you every step of the way.
                </p>
              </div>
            </div>
          </div>

          {/* Content Split Section */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Contact Info */}
              <div className="lg:col-span-4 flex flex-col gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Contact Information</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Reach out to us through any of the following channels. We look forward to hearing from you.
                  </p>
                  <div className="flex flex-col gap-4">
                    {/* Address Card */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Visit Us</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{siteConfig.contact.address}</p>
                      </div>
                    </div>
                    {/* Phone Card */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Call Us</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{siteConfig.contact.phone}</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span> Available 9am - 6pm
                        </p>
                      </div>
                    </div>
                    {/* Email Card */}
                    <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Email Us</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{siteConfig.contact.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8 lg:p-10">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</span>
                        <input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400 outline-none"
                          placeholder="Enter your full name"
                          type="text"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</span>
                        <input
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400 outline-none"
                          placeholder="Enter your email address"
                          type="email"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</span>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400 outline-none"
                          placeholder="+91"
                          type="tel"
                        />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject / Interest</span>
                        <select
                          name="subject"
                          value={formData.meta_data.subject}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                        >
                          <option value="" disabled>Select a topic</option>
                          <option value="packages">Tour Packages</option>
                          <option value="custom">Custom Itinerary</option>
                          <option value="hotel">Hotel Booking</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </label>
                    </div>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Message</span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400 resize-y outline-none"
                        placeholder="Tell us about your travel plans, number of people, dates, etc."
                        rows={5}
                      ></textarea>
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span>We usually reply within 2 hours</span>
                      </div>
                      <button
                        disabled={isSubmitting}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-orange-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <span className="material-symbols-outlined animate-spin">sync</span>
                        ) : (
                          <>
                            Send Message
                            <span className="material-symbols-outlined text-[18px]">send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-[450px] relative group overflow-hidden border-t">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126135.2599554316!2d78.06649887856448!3d8.756247959085023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03ee06543b5993%3A0x6fb247d5f0967a57!2sThoothukudi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1705570000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
            ></iframe>
            <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-xl flex items-center gap-2 max-w-[90%] border border-slate-100">
              <span className="material-symbols-outlined text-primary">pin_drop</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white truncate">Thoothukudi, Tamil Nadu</span>
            </div>
          </div>
        </main>
      </div>

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
                Your query has been received. Our travel experts will get back to you shortly.
              </p>
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg hover:bg-orange-600 transition-all shadow-xl shadow-primary/20"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
