import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50 font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-8">Terms & Conditions</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>Welcome to Travelend.in. By using our services, you agree to the following terms and conditions...</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Booking Policy</h2>
            <p>All bookings are subject to availability and confirmation...</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Cancellation Policy</h2>
            <p>Cancellations made 7 days prior to the trip are fully refundable...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
