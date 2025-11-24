"use client";

import { useEffect } from "react";
import ADVXForm from "@/components/advx_form";
import { FaList } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Aarav&#39;s tests to enter ADVX
            </h1>
            <a
              href="/all_submitted_data"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FaList className="w-4 h-4 mr-2" />
              View All Submitted Data
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <ADVXForm />
      </main>
    </div>
  );
}
