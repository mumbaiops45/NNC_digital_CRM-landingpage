import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nexus Platform</h1>
          <p className="text-gray-600 mb-6">Explore the CRM landing page below.</p>
          <Link
            href="/nnc-crm"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View NNC Digital CRM →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
