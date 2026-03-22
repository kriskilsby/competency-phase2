// // src/app/layout.tsx
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export const metadata = {
//   title: "Competency Intelligence Platform",
//   description: "Employee competency management system",
// };

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-100">
//         <div className="flex flex-col md:flex-row min-h-screen">

//           {/* Sidebar */}
//           <aside className="w-full md:w-64 bg-[#47525e] text-white p-4">
//             <h1 className="text-xl text-[#fff] font-bold mb-8">
//               Competency Platform
//             </h1>

//             <nav className="space-y-3">
//               <a href="/" className="block hover:text-gray-300">Dashboard</a>
//               <a href="/employees" className="block hover:text-gray-300">Employees</a>
//               <a href="/profile" className="block hover:text-gray-300">My Profile</a>
//               <a href="/projects" className="block hover:text-gray-300">Projects</a>
//               <a href="/qualifications" className="block hover:text-gray-300">Qualifications</a>
//               <a href="/cpd" className="block hover:text-gray-300">CPD</a>
//               <a href="/reports" className="block hover:text-gray-300">Reports</a>
//               <a href="/admin" className="block hover:text-gray-300">Admin</a>
//             </nav>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1 p-4 md:p-6 overflow-y-auto">
//             {children}
//           </main>

//         </div>
//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx
"use client";

import { useState } from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-100 font-sans flex min-h-screen">

        {/* Sidebar overlay */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#47525e] text-white p-4 transform
                      md:translate-x-0 transition-transform duration-300 ease-in-out
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <h1 className="text-xl font-bold mb-8">Competency Platform</h1>
          <nav className="space-y-3">
            <a href="/" className="block hover:text-gray-300">Dashboard</a>
            <a href="/employees" className="block hover:text-gray-300">Employees</a>
            <a href="/profile" className="block hover:text-gray-300">My Profile</a>
            <a href="/projects" className="block hover:text-gray-300">Projects</a>
            <a href="/qualifications" className="block hover:text-gray-300">Qualifications</a>
            <a href="/cpd" className="block hover:text-gray-300">CPD</a>
            <a href="/reports" className="block hover:text-gray-300">Reports</a>
            <a href="/admin" className="block hover:text-gray-300">Admin</a>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64">
          {/* Header with hamburger */}
          <header className="flex items-center justify-between bg-white shadow p-4 md:hidden">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold">Competency Platform</h1>
          </header>

          <main className="p-4 md:p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}