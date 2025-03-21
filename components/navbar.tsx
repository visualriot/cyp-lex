"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { jetBrainsMono } from "@/config/fonts";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`${jetBrainsMono.variable} w-full flex justify-center items-center global-padding py-8`}
    >
      <div className="mx-auto flex justify-between global-width container">
        <div>
          <Link href="/">
            <Image alt="CYP-LEX Logo" height={96} src="/logo.png" width={160} />
          </Link>
        </div>
        <div>
          <ul className="hidden lg:flex gap-12 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <li
                key={item.href}
                className="text-base hover:text-secondary hover:-translate-y-1 font-jet font-semibold smooth"
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
