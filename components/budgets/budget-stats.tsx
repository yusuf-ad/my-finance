import { getSpendings } from "@/server/actions/transaction";

async function BudgetStats({
  color,
  maxSpend,
  category,
}: {
  color: string;
  maxSpend: number;
  category: string;
}) {
  const res = await getSpendings({ category });

  if (!res.success) {
    return null;
  }

  const { spendings } = res;

  const totalSpent = spendings.reduce((acc, spending) => {
    return spending.isIncome ? 0 : acc + spending.amount;
  }, 0);

  const freeBudget = maxSpend - totalSpent > 0 ? maxSpend - totalSpent : 0;

  return (
    <>
      <div>
        <div className="h-6 bg-lightBeige rounded-sm">
          <div
            className="h-6 rounded-sm"
            style={{
              width: `${
                freeBudget - maxSpend > 0
                  ? "0%"
                  : `${Math.abs(100 - (freeBudget / maxSpend) * 100)}%`
              } `,
              backgroundColor: color,
            }}
          ></div>
        </div>
      </div>

      <div className="flex my-4">
        <div className="flex-1 flex gap-4 items-center">
          <div className="w-1 h-7" style={{ backgroundColor: color }}></div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Spent</span>
            <span className="text-xs font-bold text-gray-900">
              ${totalSpent.toFixed(2)}{" "}
            </span>
          </div>
        </div>
        <div className="flex-1 flex gap-4 items-center">
          <div className="w-1 h-7 bg-lightBeige"></div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-500">Free</span>
            <span className="text-xs font-bold text-gray-900">
              ${freeBudget.toFixed(2)}{" "}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetStats;
