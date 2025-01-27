import { getSpendings, Transaction } from "@/server/actions/transaction";

export function Spending({ spending }: { spending: Transaction }) {
  return (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0 first:mt-2">
      <h3 className="capitalize font-semibold text-gray-900 text-sm">
        {spending.name}{" "}
      </h3>

      <div className="flex flex-col font-semibold text-sm items-end gap-1">
        {spending.isIncome ? (
          <span className="text-green-600">+${spending.amount.toFixed(2)}</span>
        ) : (
          <span className="text-red-600">-${spending.amount.toFixed(2)}</span>
        )}
        <span className="text-gray-600 font-medium text-xs">
          {new Date(spending.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

async function SpendingList({ category }: { category: string }) {
  const res = await getSpendings({ category: category });

  if (!res.success) {
    return (
      <div>
        <p className="text-center mt-4 text-gray-500 text-sm">
          You haven&apos;t made any spendings yet.
        </p>
      </div>
    );
  }

  const { spendings } = res;

  return (
    <div>
      {spendings.length > 0 ? (
        <ul>
          {spendings.slice(0, 4).map((spending) => (
            <Spending spending={spending} key={spending.id} />
          ))}
        </ul>
      ) : (
        <p className="text-center mt-4 text-gray-500 text-sm">
          You haven&apos;t made any spendings yet.
        </p>
      )}
    </div>
  );
}

export default SpendingList;
