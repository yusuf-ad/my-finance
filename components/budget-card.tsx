import Link from "next/link";
import { CaretRight, Dots } from "./icons";
import { Budget } from "@/server/actions/budget";
import { parseTheme } from "@/lib/utils";

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

      <div>
        <div className="h-6 bg-lightBeige rounded-sm"></div>
      </div>

      <div className="flex my-4">
        <div className="flex-1 flex gap-4 items-center">
          <div className="w-1 h-7" style={{ backgroundColor: code }}></div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Spent</span>
            <span className="text-xs font-bold text-gray-900">$0.00</span>
          </div>
        </div>

        <div className="flex-1 flex gap-4 items-center">
          <div className="w-1 h-7 bg-lightBeige"></div>

          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Free</span>
            <span className="text-xs font-bold text-gray-900">
              ${(budget.maxSpend - 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

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

        <p className="text-center mt-4 text-gray-500 text-sm">
          You haven&apos;t made any spendings yet.
        </p>
      </div>
    </div>
  );
}

export default BudgetCard;
