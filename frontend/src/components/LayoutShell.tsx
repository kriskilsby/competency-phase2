// frontend/src/components/LayoutShell.tsx
"use client";

import { useState, useEffect } from "react";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(prev => {
        if (!prev && scrollY > 40) return true;   // shrink
        if (prev && scrollY < 10) return false;   // expand
        return prev; // no change → prevents flicker
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-fit bg-sidebar text-sidebar-text text-lg p-4 transform
        md:translate-x-0 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="space-y-3 mt-8">
          <a href="/" className="block hover:text-sidebar-hover">Dashboard</a>
          <a href="/employees" className="block hover:text-sidebar-hover">Employees</a>
          <a href="/profile" className="block hover:text-sidebar-hover">My Profile</a>
          <a href="/projects" className="block hover:text-sidebar-hover">Projects</a>
          <a href="/qualifications" className="block hover:text-sidebar-hover">Qualifications</a>
          <a href="/cpd" className="block hover:text-sidebar-hover">CPD</a>
          <a href="/reports" className="block hover:text-sidebar-hover">Reports</a>
          <a href="/admin" className="block hover:text-sidebar-hover">Admin</a>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">

        {/* Header */}
        <header
          className={`sticky top-0 z-40 flex items-center justify-between bg-background dark:bg-graphite-900 transition-all duration-300 px-4 sm:px-5 md:px-6
          ${scrolled ? "py-2 shadow-md" : "py-4"}`}
        >
          
          {/* Left: Hamburger + Title */}
          <div className="flex items-center space-x-4 pl-04 md:pl-6">
            {/* Hamburger for mobile */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-primary hover:text-primary-hover"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Title */}
            <h1
              className={`text-primary font-medium transition-all duration-1000
              ${scrolled ? "text-2xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl"} p-2`}
            >
              Competency Platform
            </h1>
          </div>

          {/* Right: Dark/Light toggle */}
          <div className="pr-4 md:pr-6">
            <button
              onClick={toggleTheme}
              className="bg-button-bg hover:bg-button-hover text-button-text px-3 py-1 rounded font-semibold hover:opacity-90 transition"
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-6 pt-6 overflow-y-auto overflow-x-hidden min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}