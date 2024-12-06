import { CaretRight, JarLight } from "@/components/icons";

function HomePage() {
  return (
    <div>
      <h1 className="text-gray-900 text-4xl font-bold">Overview</h1>

      <div className="my-8 flex  justify-between gap-4">
        <div className="bg-dark text-white py-6 px-8 rounded-lg w-full">
          <h2 className="mb-3 text-sm">Current Balance</h2>
          <p className="text-3xl font-bold">$0.00</p>
        </div>

        <div className="bg-white py-6 px-8 rounded-lg w-full">
          <h2 className="mb-3 text-sm text-gray-500">Income</h2>
          <p className="text-3xl font-bold text-gray-900">$0.00</p>
        </div>

        <div className="bg-white py-6 px-8 rounded-lg w-full">
          <h2 className="mb-3 text-sm text-gray-500">Expenses</h2>
          <p className="text-3xl font-bold text-gray-900">$0.00</p>
        </div>
      </div>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full space-y-4">
          <Pots />

          <Transactions />
        </div>

        <div className="w-full space-y-4">
          <Budgets />

          <Bills />
        </div>
      </div>
    </div>
  );
}

function Pots() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Pots</h3>

        <button className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </button>
      </div>

      <div className="bg-lightBeige w-1/2 px-4 py-4 flex items-center gap-4 mt-4 rounded-xl shadow-sm">
        <JarLight />
        <div>
          <h4 className="text-sm text-gray-500 mb-3">Pots</h4>
          <p className="text-3xl font-bold text-gray-900">$0</p>
        </div>
      </div>
    </div>
  );
}

function Transactions() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[180px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Transactions</h3>

        <button className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </button>
      </div>

      <div className="mt-4">
        <p className="capitalize text-gray-400 text-sm font-bold">
          No data provided
        </p>
      </div>
    </div>
  );
}

function Budgets() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[270px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Budgets</h3>

        <button className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </button>
      </div>

      <div className="mt-4">
        <p className="capitalize text-gray-400 text-sm font-bold">
          No data provided
        </p>
      </div>
    </div>
  );
}

function Bills() {
  return (
    <div className="bg-white py-6 px-6 rounded-lg ">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Recurring Bills</h3>

        <button className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-teal flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Paid bills</p>

          <p className=" font-bold text-gray-900">$0.00</p>
        </div>

        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-peach flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Total upcoming</p>

          <p className=" font-bold text-gray-900">$0.00</p>
        </div>

        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-skyBlue flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Due soon</p>

          <p className=" font-bold text-gray-900">$0.00</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
