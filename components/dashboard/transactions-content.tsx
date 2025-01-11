import { getLatestTransactions } from "@/server/actions/transaction";
import { Spending } from "@/components/spending-list";

export default async function TransactionsContent() {
  const res = await getLatestTransactions();

  if (!res.success) {
    return <p className="text-gray-400 text-sm font-bold">{res.message}</p>;
  }

  if (res.transactions.length === 0) {
    return <p className="text-gray-400 text-sm font-bold">No data provided</p>;
  }

  return (
    <div>
      {res.transactions.map((transaction) => (
        <Spending key={transaction.id} spending={transaction} />
      ))}
    </div>
  );
}
