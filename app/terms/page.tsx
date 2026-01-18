import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="bg-white text-slate-900 font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-8 text-primary">Terms & Conditions</h1>
          <div className="prose max-w-none text-slate-600 space-y-6">
            <p>Welcome to TravelEnd.in. By using our website and services, you agree to comply with and be bound by the following terms and conditions.</p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Booking Policy</h2>
              <p>All bookings are subject to availability and confirmation. A booking is only considered confirmed once the required deposit or full payment has been received and acknowledged by us.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Cancellation & Refunds</h2>
              <p>Cancellations made 7 days or more prior to the scheduled departure are eligible for a full refund (minus administrative fees). Cancellations made within 7 days are subject to partial or no refund depending on the specific package and vendor policies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Responsibility</h2>
              <p>TravelEnd.in acts as an agent for transportation and accommodation providers. We are not liable for any personal injury, property damage, or delays caused by third-party service providers or unforeseen circumstances.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
