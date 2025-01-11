import Link from "next/link";
import { CaretRight } from "./icons";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  href: string;
  children: ReactNode;
  minHeight?: string;
}

function DashboardCard({
  title,
  href,
  children,
  minHeight,
}: DashboardCardProps) {
  return (
    <div className="bg-white py-6 px-6 rounded-lg" style={{ minHeight }}>
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">{title}</h3>

        <Link href={href} className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4">{children}</div>
    </div>
  );
}

export default DashboardCard;
