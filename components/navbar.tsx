import Link from "next/link";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { jetBrainsMono } from "@/config/fonts";

export const Navbar = () => {
  return (
    <nav
      className={`${jetBrainsMono.variable} w-full flex justify-center items-center global-padding py-4`}
    >
      <div className="mx-auto flex justify-between global-width container">
        <div>
          <Image alt="CYP-LEX Logo" height={96} src="/logo.png" width={160} />
        </div>
        <div>
          <ul className="hidden lg:flex gap-12 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <li
                key={item.href}
                className="text-base hover:text-secondary font-jet font-semibold smooth"
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
