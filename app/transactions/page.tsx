import FilterSelect from "@/components/filter-select";
import { CaretRight } from "@/components/icons";
import TransactionsTable from "@/components/transactions-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

function TransactionsPage() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Transactions</h1>

        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Transaction
        </Button>
      </header>

      <section className="bg-white my-8 rounded-lg px-6 py-10 ">
        <div className="flex justify-between mb-8">
          <div className="flex-grow max-w-sm">
            <Input type="search" placeholder="Search transaction" />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-500 text-sm">Sort by</label>
              <FilterSelect options={["All", "Income", "Expense"]} />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500 text-sm">
                Filter by Category
              </label>
              <FilterSelect options={["All", "Income", "Expense"]} />
            </div>
          </div>
        </div>

        <TransactionsTable />

        <div className="flex justify-between mt-4">
          <Button
            disabled={true}
            className="py-6 font-bold bg-lightBeige text-gray-900"
          >
            <CaretRight className="rotate-180" />
            Prev
          </Button>

          <Button
            disabled={true}
            className="py-6 font-bold bg-lightBeige text-gray-900"
          >
            Next
            <CaretRight />
          </Button>
        </div>
      </section>
    </>
  );
}

export default TransactionsPage;
