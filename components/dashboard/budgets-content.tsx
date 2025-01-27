import { getBudgets } from "@/server/actions/budget";
import { getSpendings } from "@/server/actions/transaction";
import BudgetsChart from "@/components/budgets/budgets-chart";
import { parseTheme } from "@/lib/utils";

export default async function BudgetsContent() {
  const [budgets, spendings] = await Promise.all([
    getBudgets(),
    getSpendings({ category: "all" }),
  ]);

  if (!budgets.success || !spendings.success) {
    return (
      <p className="text-gray-400 text-sm font-bold">
        {!budgets.success && budgets.message}
        {!spendings.success && spendings.message}
      </p>
    );
  }

  if (budgets.budgets.length === 0) {
    return <p className="text-gray-400 text-sm font-bold">No data provided</p>;
  }

  const totalSpent = spendings.spendings.reduce((acc, spending) => {
    return spending.isIncome ? 0 : acc + spending.amount;
  }, 0);

  return (
    <div className="flex items-center gap-4">
      <div className="h-full w-full">
        <BudgetsChart budgets={budgets.budgets} totalSpent={totalSpent} />
      </div>

      <ul className="space-y-2">
        {budgets.budgets.map((budget) => {
          const { code } = parseTheme(budget.theme);
          const categorizedSpendings = spendings.spendings.filter(
            (spending) => spending.category === budget.category
          );

          const totalSpent = categorizedSpendings.reduce((acc, spending) => {
            return spending.isIncome ? 0 : acc - spending.amount;
          }, 0);

          return (
            <li key={budget.id} className="flex items-center gap-4">
              <div
                className="w-[2px] h-8"
                style={{ backgroundColor: code }}
              ></div>
              <div className="flex flex-col font-semibold text-xs gap-1 items-start">
                <span className="text-gray-600">{budget.category}</span>
                <span className="font-bold">${totalSpent.toFixed(2)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
