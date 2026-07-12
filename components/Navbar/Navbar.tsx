"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ResumeButton } from "../ui/Button";
import Image from "next/image";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 30);

    const sections = navItems.map((item) =>
      document.querySelector(item.href)
    );

    sections.forEach((section, index) => {
      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top <= 120 && rect.bottom >= 120) {
        setActiveSection(navItems[index].href.substring(1));
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <a href="#home" className="text-2xl font-bold text-white">
          <Image
    src="/logo.png"
    alt="GM Logo"
    width={44}
    height={44}
/>
        </a>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
  <a
    key={item.name}
    href={item.href}
    className="group relative font-medium"
  >
    <span
      className={
        activeSection === item.href.substring(1)
          ? "text-indigo-400"
          : "text-gray-300 group-hover:text-indigo-400"
      }
    >
      {item.name}
    </span>

    <span
      className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-indigo-500 transition-all duration-300 ${
        activeSection === item.href.substring(1)
          ? "w-full"
          : "w-0 group-hover:w-full"
      }`}
    />
  </a>
))}

          <ResumeButton>Resume</ResumeButton>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white lg:hidden"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0B0F19] lg:hidden">
          <div className="flex flex-col p-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`py-3 transition ${
  activeSection === item.href.substring(1)
    ? "text-indigo-400"
    : "text-gray-300"
}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <ResumeButton>Resume</ResumeButton>
          </div>
        </div>
      )}
    </header>
  );
}