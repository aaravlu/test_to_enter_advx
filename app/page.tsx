"use client";

import FormComponent from "@/components/advx_form";

export default function Home() {
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Form</h1>
      <a
        href="/all_submitted_data"
        className="text-blue-500 underline block mb-4"
      >
        View All Submitted Data
      </a>
      <FormComponent />
    </div>
  );
}
