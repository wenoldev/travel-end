import Link from 'next/link';
import siteConfig from '@/data/siteConfig.json';

export default function Header() {
  return (
    <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between whitespace-nowrap py-4">
          <Link href="/" className="flex items-center gap-2 text-slate-900 dark:text-white cursor-pointer">
            <div className="size-8 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">travel_explore</span>
            </div>
            <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">{siteConfig.siteName}</h2>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex flex-1 justify-end gap-8 items-center">
            <nav className="flex items-center gap-8">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-900 dark:text-white text-sm font-medium hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <button className="flex items-center justify-center rounded-lg h-10 px-5 bg-primary hover:bg-blue-600 transition-colors text-white text-sm font-bold shadow-sm">
              <span className="truncate">Plan Your Trip</span>
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden flex items-center">
            <button className="text-slate-900 dark:text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}
