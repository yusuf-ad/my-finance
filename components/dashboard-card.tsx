import Link from "next/link";
import { CaretRight } from "./icons";
import { ReactNode, Suspense } from "react";
import { Loader2 } from "lucide-react";

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

        <Link
          href={href}
          className="flex items-center text-gray-500 sm:gap-3 gap-1 text-nowrap"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="mt-4 flex items-center justify-center flex-grow">
            <Loader2 className="animate-spin" size={32} />
          </div>
        }
      >
        <div className="mt-4">{children}</div>
      </Suspense>
    </div>
  );
}

export default DashboardCard;
