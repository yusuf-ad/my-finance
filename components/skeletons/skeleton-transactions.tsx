import Link from "next/link";
import { CaretRight } from "../icons";
import { Loader2 } from "lucide-react";

function SkeletonTransactions() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[180px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Transactions</h3>

        <Link
          href={"/transactions"}
          className="flex items-center text-gray-500  gap-3"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    </div>
  );
}

export default SkeletonTransactions;
