import { getSpendings, Transaction } from "@/server/actions/transaction";

function Spending({ spending }: { spending: Transaction }) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0 first:mt-2">
      <h3 className="capitalize font-semibold text-gray-900 text-sm">
        {spending.name}{" "}
      </h3>

      <div className="flex flex-col font-semibold text-sm items-end gap-1">
        {spending.isIncome ? (
          <span className="text-green-600">+$1249.00</span>
        ) : (
          <span className="text-red-600">-$1249.00</span>
        )}
        <span className="text-gray-600 font-normal text-xs">12/26/2024</span>
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
          {spendings.map((spending) => (
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
