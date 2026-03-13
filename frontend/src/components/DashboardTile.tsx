// frontend/src/components/DashboardTile.tsx
"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  total: number;
  approved: number;
  link: string;
  totalLabel: string;
  approvedLabel: string;
};

export default function DashboardTile({ 
  title, 
  total, 
  approved, 
  link,
  totalLabel,
  approvedLabel,
}: Props) {
  const [showApproved, setShowApproved] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowApproved((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href={link}
      className="bg-white border-5 border-zinc-200 rounded-lg shadow p-4 h-48 flex flex-col justify-center items-center text-center hover:shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#E73D5C]"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>

      {/* Animated value container */}
      <div className="relative h-24 w-full flex items-center justify-center overflow-hidden">

        {/* TOTAL VIEW */}
        <div
          className={`absolute transition-all duration-700 ${
            showApproved
              ? "opacity-0 translate-y-6"
              : "opacity-100 translate-y-0"
          }`}
        >
          <p className="text-4xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-600 mt-1">{totalLabel}</p>
        </div>

        {/* APPROVED VIEW */}
        <div
          className={`absolute transition-all duration-700 ${
            showApproved
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-6"
          }`}
        >
          <p className="text-4xl font-bold text-green-600">{approved}</p>
          <p className="text-sm text-gray-600 mt-1">{approvedLabel}</p>
        </div>

      </div>
    </a>
  );

}