import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/data/siteConfig.json";

export default function ContactPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-sans text-slate-900 dark:text-slate-50 antialiased overflow-x-hidden transition-colors duration-200">
      <div className="flex min-h-screen flex-col">
        <Header />
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
                  <form className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</span>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400" placeholder="Enter your full name" type="text" />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</span>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400" placeholder="Enter your email address" type="email" />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</span>
                        <input className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400" placeholder="+91" type="tel" />
                      </label>
                      <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject / Interest</span>
                        <select className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white h-12 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-colors">
                          <option disabled selected value="">Select a topic</option>
                          <option value="packages">Tour Packages</option>
                          <option value="custom">Custom Itinerary</option>
                          <option value="hotel">Hotel Booking</option>
                          <option value="other">Other Inquiry</option>
                        </select>
                      </label>
                    </div>
                    <label className="flex flex-col gap-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Message</span>
                      <textarea className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary transition-colors placeholder:text-slate-400 resize-y" placeholder="Tell us about your travel plans, number of people, dates, etc." rows={5}></textarea>
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                        <span>We usually reply within 2 hours</span>
                      </div>
                      <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-600 transition-all" type="button">
                        Send Message
                        <span className="material-symbols-outlined text-[18px]">send</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-[400px] bg-slate-200 relative group overflow-hidden">
            <div className="absolute inset-0 bg-slate-300 animate-pulse"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC98WhrCsNVYaCkkznMjdewQ6ZfXm0njQxT6Je734nROVwaf-q1WMzzxJIH2-IOYi6HLOR_2o3ElN11zWUSaHTmyPAwWEztX6WNWt64Tx7DDOcO_RLr0LOogXCnHT3SHtK9Kbc0jPLdqRIhklX-tCiKDptLCSo8vcKu7JKbQa2oOjUz7xkEp5KuahlvCyO8E6bAh2YoTQRbfzDRseZvQHxZGa2wIYwiahBGqtG7WSAlOdE-nvVJwLJffzmdWgjR1JQsiIwKaT11hl8k"
              alt="Map"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 max-w-[90%]">
              <span className="material-symbols-outlined text-primary">pin_drop</span>
              <span className="text-sm font-medium text-slate-900 dark:text-white truncate">{siteConfig.contact.address}</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
