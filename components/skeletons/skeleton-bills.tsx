import Link from "next/link";
import { CaretRight } from "../icons";
import { Loader2 } from "lucide-react";

function SkeletonBills() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[270px] flex flex-col">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Recurring Bills</h3>

        <Link
          href={"/recurring-bills"}
          className="flex items-center text-gray-500  gap-3"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-center flex-grow">
        <Loader2 className="animate-spin" size={32} />
      </div>
    </div>
  );
}

export default SkeletonBills;
