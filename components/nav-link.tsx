"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function NavLink({
  link: { href, link, icon },
}: {
  link: { href: string; link: string; icon: ReactNode };
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href}>
      <li
        className={clsx(
          "py-4 px-8 mr-6 rounded-r-xl border-l-4 cursor-pointer",
          isActive ? "bg-white border-l-teal" : "border-transparent"
        )}
      >
        <div
          className={clsx(
            "font-bold flex items-center gap-3",
            isActive ? "text-dark" : "text-gray-300 hover:text-white"
          )}
        >
          <span className={clsx(isActive ? "text-teal" : "text-current")}>
            {icon}
          </span>
          {link}
        </div>
      </li>
    </Link>
  );
}

export default NavLink;
