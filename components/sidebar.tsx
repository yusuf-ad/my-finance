"use client";

import { useState, useEffect } from "react";
import {
  ArrowFatLinesLeft,
  ArrowsDownUp,
  ChartDonut,
  House,
  Jar,
  Receipt,
} from "./icons";
import clsx from "clsx";
import NavLink from "./nav-link";
import MobileNavLink from "./mobile-nav-link";
import Link from "next/link";

const navLinks = [
  {
    href: "/",
    link: "Overview",
    icon: <House className="size-6" />,
  },
  {
    href: "/transactions",
    link: "Transactions",
    icon: <ArrowsDownUp className="size-6" />,
  },
  {
    href: "/budgets",
    link: "Budgets",
    icon: <ChartDonut className="size-6" />,
  },
  {
    href: "/pots",
    link: "Pots",
    icon: <Jar className="size-6" />,
  },
  {
    href: "/recurring-bills",
    link: "Recurring Bills",
    icon: <Receipt className="size-6" />,
  },
];

function Sidebar() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const sidebar = localStorage.getItem("sidebar");
    if (sidebar !== null) {
      setIsActive(JSON.parse(sidebar));
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isActive;
    localStorage.setItem("sidebar", JSON.stringify(newValue));
    setIsActive(newValue);
  };

  return (
    <div
      className={clsx(
        "fixed w-full lg:sticky bottom-0 z-50 lg:inset-0 bg-dark lg:max-h-screen rounded-t-xl lg:rounded-r-xl lg:rounded-t-none lg:rounded-tr-xl pt-4 px-6 lg:px-0 lg:py-10 flex flex-col lg:h-auto transition-all duration-500",
        isActive ? "lg:max-w-80 lg:w-80" : "lg:w-20"
      )}
    >
      <Link
        href="/"
        className={clsx(
          "text-white text-3xl font-bold px-8 hidden lg:inline-block"
        )}
      >
        <span
          className={clsx(
            "transition-all duration-700 absolute truncate",
            isActive
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          myfinance
        </span>

        <span
          className={clsx(
            "transition-all duration-700 absolute",
            isActive
              ? "opacity-0 pointer-events-none"
              : "opacity-100  pointer-events-auto"
          )}
        >
          f
        </span>
      </Link>

      {/* desktop navbar */}
      <nav className="mt-24 flex-grow hidden lg:block">
        {navLinks.map((link) => (
          <NavLink key={link.link} link={link} isSidebarActive={isActive} />
        ))}
      </nav>

      {/* mobile navbar */}
      <nav className="flex flex-grow lg:hidden">
        {navLinks.map((link) => (
          <MobileNavLink link={link} key={link.link} />
        ))}
      </nav>

      <button
        type="button"
        onClick={handleToggle}
        className="text-gray-400 items-center gap-2 px-8 mb-4 font-bold hover:text-white hidden lg:flex"
      >
        <span
          className={clsx(
            "w-6 h-6 flex items-center justify-center transition-transform duration-500",
            isActive ? "rotate-0" : "rotate-180"
          )}
        >
          <ArrowFatLinesLeft />
        </span>
        <span
          className={clsx(
            "transition-opacity duration-500 truncate",
            isActive ? "opacity-100" : "opacity-0"
          )}
        >
          Minimize Menu
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
