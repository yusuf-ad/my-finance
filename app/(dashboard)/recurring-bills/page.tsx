import BillsTable from "@/components/bills-table";
import FilterSelect from "@/components/filter-select";
import Header from "@/components/header";
import { CaretRight, Receipt2 } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function BillsPage() {
  return (
    <>
      <Header title="Recurring Bills" />

      <section className="flex flex-col lg:flex-row mt-8 gap-6 items-start">
        <div className="space-y-6 max-w-80 w-full">
          <div className="bg-dark text-white py-8 px-6 rounded-lg w-full">
            <Receipt2 />

            <div className="mt-8">
              <h2 className="mb-3 text-sm font-bold">Total bills</h2>
              <p className="text-3xl font-bold">$0.00</p>
            </div>
          </div>

          <div className="bg-white py-6 px-6 rounded-lg">
            <h3 className="text-gray-900 font-semibold mb-2 tracking-wide">
              Summary
            </h3>

            <ul>
              <li className="flex justify-between py-4 border-b">
                <h4 className="capitalize text-gray-500 text-sm">Paid bills</h4>
                <span className="text-gray-900 text-sm">$0.00</span>
              </li>
              <li className="flex justify-between py-4 border-b">
                <h4 className="capitalize text-gray-500 text-sm">
                  Total upcoming
                </h4>
                <span className="text-gray-900 text-sm">$0.00</span>
              </li>
              <li className="flex justify-between py-4 border-b last:border-b-0 last:pb-0">
                <h4 className="capitalize text-gray-500 text-sm">Paid bills</h4>
                <span className="text-sm text-red-600">$0.00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white w-full py-8 px-6 rounded-lg">
          <div className="flex justify-between mb-8 gap-2">
            <div className="flex-grow max-w-sm">
              <Input type="search" placeholder="Search bills" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500 text-sm">Sort by</label>
              <FilterSelect options={["All", "Income", "Expense"]} />
            </div>
          </div>

          <BillsTable />

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
        </div>
      </section>
    </>
  );
}

export default BillsPage;
