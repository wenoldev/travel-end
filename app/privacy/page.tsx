import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-white text-slate-900 font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-8 text-primary">Privacy Policy</h1>
          <div className="prose max-w-none text-slate-600 space-y-6">
            <p>Your privacy is important to us. This policy explains how we collect and use your data...</p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Data Collection</h2>
              <p>We collect information you provide when booking a tour, contacting us, or signing up for our newsletter. This may include your name, email address, phone number, and travel preferences.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Data Usage</h2>
              <p>We use your data primarily to provide and improve our services, process bookings, and communicate with you about your trip. We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Cookies</h2>
              <p>TravelEnd.in uses cookies to enhance your browsing experience and analyze site traffic. You can choose to disable cookies in your browser settings if you wish.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
