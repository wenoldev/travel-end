import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-50 font-sans flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>Your privacy is important to us. This policy explains how we collect and use your data...</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Data Collection</h2>
            <p>We collect information you provide when booking a tour or contacting us...</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Data Usage</h2>
            <p>We use your data to provide and improve our services...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
