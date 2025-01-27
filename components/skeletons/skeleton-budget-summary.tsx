import { parseTheme } from "@/lib/utils";
import { Budget } from "@/server/actions/budget";
import BudgetsChart from "../budgets/budgets-chart";

async function SkeletonBudgetSummary({ budgets }: { budgets: Budget[] }) {
  return (
    <div className="flex-1 lg:max-w-sm bg-white p-6 ">
      <div>
        <BudgetsChart budgets={budgets} totalSpent={0} />
      </div>

      <h3 className="text-gray-900 font-semibold mb-2 tracking-wide">
        Spending Summary
      </h3>

      <ul>
        {budgets.map((budget) => {
          const { code } = parseTheme(budget.theme);

          return (
            <li
              key={budget.id}
              className="flex justify-between items-center py-4 border-b last:border-b-0"
            >
              <div className="flex gap-2 items-center">
                <div
                  className="w-[2px] h-5"
                  style={{ backgroundColor: code }}
                ></div>
                <h4 className="capitalize text-gray-500 text-sm">
                  {budget.category}
                </h4>
              </div>
              <p className="font-semibold flex items-center gap-2">
                <span className="inline-block w-14 h-4 bg-gray-200 rounded animate-pulse"></span>
                <span className="text-gray-400 font-medium text-sm inline-block w-16 h-4 bg-gray-200 rounded animate-pulse"></span>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SkeletonBudgetSummary;
