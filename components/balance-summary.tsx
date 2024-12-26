import { getBalance } from "@/server/actions/balance";

async function BalanceSummary() {
  const res = await getBalance();

  if (!res.success) {
    return null;
  }

  const { balance, income, expenses } = res;

  return (
    <div className="my-8 flex flex-col lg:flex-row  justify-between gap-4">
      <div className="bg-dark text-white py-6 px-8 rounded-lg w-full">
        <h2 className="mb-3 text-sm">Current Balance</h2>
        <p className="text-3xl font-bold">${balance?.toFixed(2)} </p>
      </div>

      <div className="bg-white py-6 px-8 rounded-lg w-full">
        <h2 className="mb-3 text-sm text-gray-500">Income</h2>
        <p className="text-3xl font-bold text-gray-900">
          ${income?.toFixed(2)}
        </p>
      </div>

      <div className="bg-white py-6 px-8 rounded-lg w-full">
        <h2 className="mb-3 text-sm text-gray-500">Expenses</h2>
        <p className="text-3xl font-bold text-gray-900">
          ${expenses?.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default BalanceSummary;
