import { getRecurringBills } from "@/server/actions/bills";
import { Receipt2 } from "../icons";

async function BillsSummary() {
  const response = await getRecurringBills();

  if (!response.success) {
    return (
      <>
        <section className="my-8">
          <p className="text-gray-400 font-bold mt-8">
            Failed to fetch bills or balance data
          </p>
        </section>
      </>
    );
  }

  const { bills } = response;

  const paidBills = bills
    .filter(
      (transaction) =>
        !transaction.isIncome && new Date(transaction.date) < new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalUpcoming = bills
    .filter(
      (transaction) =>
        !transaction.isIncome && new Date(transaction.date) >= new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const dueSoon = bills
    .filter(
      (transaction) =>
        !transaction.isIncome &&
        new Date(transaction.date).getTime() - new Date().getTime() <=
          7 * 24 * 60 * 60 * 1000 &&
        new Date(transaction.date) >= new Date()
    )
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  return (
    <div className="space-y-6 lg:max-w-80 w-full">
      <div className="bg-dark text-white py-8 px-6 rounded-lg w-full">
        <Receipt2 />

        <div className="mt-8">
          <h2 className="mb-3 text-sm font-bold">Total bills</h2>
          <p className="text-3xl font-bold">
            ${(paidBills + totalUpcoming + dueSoon).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white py-6 px-6 rounded-lg">
        <h3 className="text-gray-900 font-semibold mb-2 tracking-wide">
          Summary
        </h3>

        <ul>
          <li className="flex justify-between py-4 border-b">
            <h4 className="capitalize text-gray-500 text-sm">Paid bills</h4>
            <span className="text-gray-900 text-sm">
              ${paidBills.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between py-4 border-b">
            <h4 className="capitalize text-gray-500 text-sm">Total upcoming</h4>
            <span className="text-gray-900 text-sm">
              ${totalUpcoming.toFixed(2)}
            </span>
          </li>
          <li className="flex justify-between py-4 border-b last:border-b-0 last:pb-0">
            <h4 className="capitalize text-gray-500 text-sm">Due Soon</h4>
            <span className="text-sm text-red-600">${dueSoon.toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BillsSummary;
