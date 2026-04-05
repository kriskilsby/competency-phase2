// frontend/src/components/LayoutShell.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useOverlay } from "@/hooks/useOverlay";
import Image from "next/image";

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

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
        if (!prev && scrollY > 80) return true;   // shrink
        if (prev && scrollY < 20) return false;   // expand
        return prev; // no change → prevents flicker
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useOverlay(sidebarOpen, () => setSidebarOpen(false));

  useEffect(() => {
    if (sidebarOpen) {
      // Focus first link in sidebar
      const firstLink = sidebarRef.current?.querySelector("a");
      firstLink?.focus();
    } else {
      // Return focus to hamburger
      buttonRef.current?.focus();
    }
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside
        id="sidebar"
        ref={sidebarRef}
        aria-hidden={!sidebarOpen}
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

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 min-w-0">

        {/* Header */}
        <header
          className={`sticky top-0 z-40 flex items-center justify-between bg-background dark:bg-graphite-900 transition-all duration-300 px-4 sm:px-5 md:px-6
          ${scrolled ? "py-2 shadow-md shadow-black/10" : "py-4 shadow-none"}`}
        >
          
          {/* Left: Hamburger + Title */}
          <div className={`flex items-center pl-4 md:pl-6 transition-all duration-300 ${
            scrolled ? "space-x-2" : "space-x-4"
          }`}>
            {/* Hamburger for mobile */}
            <button
              ref={buttonRef}
              aria-label="Toggle menu"
              aria-expanded={sidebarOpen}
              aria-controls="sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-primary hover:text-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>  
            
            {/* Logo container */}
            <div className="flex items-center h-full transition-all duration-300">

              {/* Mobile: stacked logo */}
              <Image
                src={darkMode ? "/dark-stacked-logo.svg" : "/light-stacked-logo.svg"}
                alt="SkillTrack logo"
                width={50}
                height={50}
                className={`block md:hidden w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-9" : "h-11"
                }`}
                priority
              />

              {/* Desktop: long logo */}
              <Image
                src={darkMode ? "/dark-long-logo.svg" : "/light-long-logo.svg"}
                alt="SkillTrack logo"
                width={200}
                height={70}
                className={`hidden md:block w-auto object-contain transition-all duration-500 ${
                  scrolled ? "h-10 md:h-12" : "h-14 md:h-16"
                }`}
                priority
              />

            </div>

            {/* Title */}
            {/* <h1
              className={`text-primary font-medium transition-all duration-700
              ${scrolled ? "text-1xl sm:text-2xl md:text-3xl lg:text-4xl" : "text-4xl md:text-5xl lg:text-6xl xl:text-7xl"} p-2`}
            >
              Competency Platform
            </h1> */}
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