"use client";
import AdvxApplicationForm from "./advx_application_form";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div
      className={`relative h-screen ${isDark ? "bg-[#1f1f1f] text-[#efefef]" : "bg-[#efefef] text-[#1f1f1f]"}`}
    >
      <button
        onClick={toggleTheme}
        className={`absolute top-4 right-4 p-4 rounded-full ${isDark ? "bg-black hover:bg-[#1f1f1f]" : "bg-white hover:bg-[#efefef]"}`}
      >
        {isDark ? <MdLightMode size={40} /> : <MdDarkMode size={40} />}
      </button>
      <div className="flex justify-center items-center h-full">
        <AdvxApplicationForm />
      </div>
    </div>
  );
}
