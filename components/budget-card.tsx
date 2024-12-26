import Link from "next/link";
import { CaretRight, Dots } from "./icons";
import { Budget } from "@/server/actions/budget";
import { parseTheme } from "@/lib/utils";
import SpendingList from "./spending-list";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import BudgetStats from "./budget-stats";

function BudgetCard({ budget }: { budget: Budget }) {
  const { code } = parseTheme(budget.theme);

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: code }}
          ></div>
          <h3 className="text-gray-900 font-semibold">{budget.category} </h3>
        </div>

        <Dots />
      </div>

      <p className="text-sm text-gray-500 my-4">
        Maximum of ${budget.maxSpend.toFixed(2)}
      </p>

      <Suspense>
        <BudgetStats
          color={code}
          maxSpend={budget.maxSpend}
          category={budget.category}
        />
      </Suspense>

      <div className="p-4 bg-lightBeige rounded-sm">
        <div className="flex  justify-between">
          <h4 className="text-gray-900 font-bold text-sm">Latest Spending</h4>
          <Link
            href={"/transactions"}
            className="flex items-center text-sm text-gray-500 gap-2"
          >
            See All
            <CaretRight />
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="py-4 flex justify-center items-center">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <SpendingList category={budget.category} />
        </Suspense>
      </div>
    </div>
  );
}

export default BudgetCard;
