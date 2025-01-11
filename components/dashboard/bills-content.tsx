import { getRecurringBills } from "@/server/actions/bills";

export default async function BillsContent() {
  const res = await getRecurringBills();

  if (!res.success) {
    return <p className="text-gray-400 text-sm font-bold">{res.message}</p>;
  }

  const paidBills = res.bills
    .filter(
      (transaction) =>
        !transaction.isIncome && new Date(transaction.date) < new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalUpcoming = res.bills
    .filter(
      (transaction) =>
        !transaction.isIncome && new Date(transaction.date) >= new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const dueSoon = res.bills
    .filter(
      (transaction) =>
        !transaction.isIncome &&
        new Date(transaction.date).getTime() - new Date().getTime() <=
          7 * 24 * 60 * 60 * 1000 &&
        new Date(transaction.date) >= new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="space-y-4">
      <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-teal flex justify-between items-center px-4 py-3">
        <p className="text-gray-500 text-sm capitalize">Paid bills</p>
        <p className="font-bold text-gray-900">${paidBills.toFixed(2)}</p>
      </div>
      <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-peach flex justify-between items-center px-4 py-3">
        <p className="text-gray-500 text-sm capitalize">Total upcoming</p>
        <p className="font-bold text-gray-900">${totalUpcoming.toFixed(2)}</p>
      </div>
      <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-skyBlue flex justify-between items-center px-4 py-3">
        <p className="text-gray-500 text-sm capitalize">Due soon</p>
        <p className="font-bold text-gray-900">${dueSoon.toFixed(2)}</p>
      </div>
    </div>
  );
}
