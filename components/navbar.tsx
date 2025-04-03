"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { jetBrainsMono } from "@/config/fonts";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change background after scrolling 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${jetBrainsMono.variable} w-full flex justify-center items-center global-padding py-4 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      } sticky top-0 z-50`}
    >
      <div className="mx-auto flex justify-between global-width container">
        <div>
          <Link href="/">
            <Image
              alt="CYP-LEX Logo"
              height={126}
              width={126}
              src="/logo.png"
              priority
            />
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex gap-12 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <li
                key={item.href}
                className="text-base hover:text-secondary mt-[2px] hover:-translate-y-1 font-jet font-semibold smooth"
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden flex items-center z-50">
          <button
            className={`hamburger  ${isMobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <ul className="flex flex-col gap-8 items-center">
          {siteConfig.navItems.map((item) => (
            <li
              key={item.href}
              className="text-2xl font-jet font-semibold hover:text-secondary smooth"
            >
              <Link href={item.href} onClick={toggleMobileMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
