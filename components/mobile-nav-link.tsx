"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function MobileNavLink({
  link: { href, link, icon },
}: {
  link: { href: string; link: string; icon: ReactNode };
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "py-3 flex-1 border-b-4 rounded-t-xl",
        isActive ? "bg-white border-teal" : "border-transparent"
      )}
    >
      <div
        className={clsx(
          "font-bold flex flex-col items-center justify-center",
          isActive ? "text-dark" : "text-gray-300 hover:text-white"
        )}
      >
        <span className={clsx(isActive ? "text-teal" : "text-current")}>
          {icon}
        </span>
        <span className="hidden md:inline-block">{link}</span>
      </div>
    </Link>
  );
}

export default MobileNavLink;
