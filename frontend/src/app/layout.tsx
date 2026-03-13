// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Competency Intelligence Platform",
  description: "Employee competency management system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <aside className="w-64 bg-[#47525e] text-white p-4">
            <h1 className="text-xl text-[#fff] font-bold mb-8">
              Competency Platform
            </h1>

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

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
