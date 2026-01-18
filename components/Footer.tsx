import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-3xl">travel_explore</span>
              </div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-black tracking-tight leading-none">TravelEnd<span className="text-primary">.in</span></h3>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Tours & Travels</span>
              </div>
            </Link>
            <p className="text-white/60 text-base leading-relaxed">
              {siteConfig.description} We specialize in creating unforgettable journeys through the rich heritage of South India.
            </p>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'twitter'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="size-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-primary transition-all group"
                >
                  <span className="sr-only">{social}</span>
                  <i className={`fab fa-${social} text-lg group-hover:scale-110 transition-transform`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold border-b border-white/10 pb-4">Explore</h4>
            <div className="flex flex-col gap-4">
              {siteConfig.navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-white/60 hover:text-primary transition-colors font-medium flex items-center gap-2 group">
                  <span className="h-px w-0 group-hover:w-4 bg-primary transition-all" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold border-b border-white/10 pb-4">Top Places</h4>
            <div className="flex flex-col gap-4">
              {['Ooty', 'Kodaikanal', 'Munnar', 'Wayanad', 'Goa'].map((place) => (
                <Link
                  key={place}
                  href={`/destinations/${place.toLowerCase()}`}
                  className="text-white/60 hover:text-primary transition-colors font-medium flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-xs text-white/20 group-hover:text-primary">double_arrow</span>
                  {place}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-8">
            <h4 className="text-xl font-bold border-b border-white/10 pb-4">Get in Touch</h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 uppercase font-black">Call support</span>
                  <a className="text-white font-bold hover:text-primary transition-colors" href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/40 uppercase font-black">Email us</span>
                  <a className="text-white font-bold hover:text-primary transition-colors" href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/40 text-sm font-medium">
            © {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved. Made with ❤️ for travelers.
          </p>
          <div className="flex items-center gap-8 text-white/40 text-sm font-bold">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-xs">language</span>
              English (IN)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
