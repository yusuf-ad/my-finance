import FilterDropdown from "@/components/filter-dropdown";
import FilterSelect from "@/components/filter-select";
import { CaretRight, Filter, Sort } from "@/components/icons";
import Searchbar from "@/components/searchbar";
import TransactionsModal from "@/components/transactions-modal";
import TransactionsTable from "@/components/transactions-table";
import { Button } from "@/components/ui/button";
import { Categories } from "@/lib/validations";
import { getTransactions } from "@/server/actions/transaction";

async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search } = await searchParams;

  const data = await getTransactions(search as string);

  return (
    <>
      <header className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
        <h1 className="text-gray-900 text-4xl font-bold text-center sm:text-left">
          Transactions
        </h1>

        <TransactionsModal />
      </header>

      <section className="bg-white my-8 rounded-lg px-6 py-10 ">
        <div className="flex justify-between mb-8">
          <div className="flex-grow max-w-sm">
            <Searchbar />
          </div>
          {/* desktop */}
          <div className="md:flex hidden gap-2">
            <div className="flex items-center">
              <label className="text-gray-500 text-sm ">Sort by</label>
              <FilterSelect options={["All", "Income", "Expense"]} />
            </div>
            <div className="flex items-center">
              <label className="text-gray-500 text-sm w-min xl:w-auto">
                Filter by Category
              </label>
              <FilterSelect options={["All Transactions", ...Categories]} />
            </div>
          </div>
          {/* mobil */}
          <div className="flex md:hidden items-center">
            <FilterDropdown options={["All", "Income", "Expense"]}>
              <button className="p-2">
                <Sort className="w-5 h-5" />
              </button>
            </FilterDropdown>
            <FilterDropdown options={["All Transactions", ...Categories]}>
              <button className="p-2">
                <Filter className="w-5 h-5" />
              </button>
            </FilterDropdown>
          </div>
        </div>

        <TransactionsTable data={data} />

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
