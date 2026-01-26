import Header from "@/components/Header";
import Footer from "@/components/Footer";
import destinationsData from "@/data/destinations.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import siteConfig from "@/data/siteConfig.json";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function DestinationPage({ params }: PageProps) {
    const { slug } = await params;
    const destination = destinationsData.destinations.find(
        (d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug || d.id === slug
    );

    if (!destination) {
        return notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />

            <main className="flex-grow">
                {/* Banner Section - Inspired by Image 2 */}
                <section className="relative w-full h-[400px] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-105"
                        style={{ backgroundImage: `url("${destination.image}")` }}
                    />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

                    <div className="relative z-10 h-full max-w-[1280px] mx-auto px-4 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-1.5 bg-white rounded-full" />
                            <h1 className="text-white text-5xl sm:text-6xl font-black tracking-tight drop-shadow-xl">
                                {destination.category} - {destination.name}
                            </h1>
                        </div>

                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-3 text-white/90 text-sm font-bold bg-white/10 backdrop-blur-md w-fit px-6 py-3 rounded-full border border-white/20">
                            <Link href="/" className="hover:text-white flex items-center gap-1">
                                Home
                            </Link>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="opacity-70">{destination.category === 'International' ? 'International Tours' : 'Domestic Tours'}</span>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="opacity-70">{destination.category}</span>
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                            <span className="text-white">{destination.name}</span>
                        </nav>
                    </div>
                </section>

                {/* Content Section */}
                <section className="max-w-[1280px] mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left Column - Details */}
                        <div className="lg:col-span-2 flex flex-col gap-12">
                            <div className="flex flex-col gap-6">
                                <span className="text-primary font-black uppercase tracking-widest text-sm">Destination</span>
                                <h2 className="text-slate-900 text-4xl font-black">About {destination.name}</h2>
                                <div className="h-1.5 w-20 bg-primary rounded-full" />
                                <p className="text-slate-600 text-xl leading-relaxed font-medium">
                                    {destination.description}
                                </p>
                                <p className="text-slate-500 text-lg leading-relaxed">
                                    {destination.fullDescription}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {destination.highlights.map((highlight, idx) => (
                                    <div key={idx} className="bg-secondary p-8 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center gap-4 group hover:bg-white hover:shadow-xl transition-all">
                                        <div className="size-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-3xl">verified</span>
                                        </div>
                                        <span className="font-bold text-slate-800">{highlight}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Form / Booking Section */}
                            <div className="bg-slate-900 text-white p-12 rounded-[3rem] relative overflow-hidden">
                                <div className="relative z-10 flex flex-col gap-8">
                                    <h3 className="text-3xl font-black">Interested in visiting {destination.name}?</h3>
                                    <p className="text-white/60 text-lg">Our experts will help you plan the perfect itinerary for your trip.</p>
                                    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input type="text" placeholder="Your Name" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none" />
                                        <input type="email" placeholder="Your Email" className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary outline-none" />
                                        <button className="sm:col-span-2 bg-primary text-white font-black py-4 rounded-xl hover:scale-[1.02] transition-transform">
                                            Send Enquiry
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="flex flex-col gap-8">
                            <div className="bg-white border-2 border-slate-100 p-8 rounded-[2rem] shadow-sm sticky top-32">
                                <h4 className="text-2xl font-black mb-6 text-slate-900">For Booking</h4>
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-2xl">
                                        <span className="material-symbols-outlined text-primary text-3xl">call</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Call us</span>
                                            <span className="text-xl font-black text-slate-900">{siteConfig.contact.phone}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-secondary rounded-2xl">
                                        <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-400 uppercase">Email us</span>
                                            <span className="text-lg font-black text-slate-900 truncate">{siteConfig.contact.email}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://wa.me/${siteConfig.contact.phone.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in visiting ${destination.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all text-center flex items-center justify-center gap-2"
                                    >
                                        WhatsApp Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
