"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function NavLink({
  link: { href, link, icon },
  isSidebarActive,
}: {
  link: { href: string; link: string; icon: ReactNode };
  isSidebarActive: boolean;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "py-4 px-6 rounded-r-xl block cursor-pointer",
        isActive && isSidebarActive
          ? "bg-white border-l-teal mr-6 border-l-4"
          : "border-transparent mr-6"
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
        <span className={"truncate"}>{link}</span>
      </div>
    </Link>
  );
}

export default NavLink;
