import FilterDropdown from "@/components/filter-dropdown";
import FilterSelect from "@/components/filter-select";
import Header from "@/components/header";
import { Filter, Sort } from "@/components/icons";
import Searchbar from "@/components/searchbar";
import TablePagination from "@/components/table-pagination";
import TransactionsModal from "@/components/transactions-modal";
import TransactionsTable from "@/components/transactions-table";
import { page_size } from "@/lib/constants";
import { Categories } from "@/lib/validations";
import { getTotalPages } from "@/server/actions/transaction";

async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search, page } = await searchParams;
  const totalPages = await getTotalPages({
    getBy: search as string,
    pageSize: page_size,
  });

  return (
    <div className="pb-32 lg:pb-10">
      <Header title="Transactions">
        <TransactionsModal />
      </Header>

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

        <TransactionsTable
          page={parseInt(page as string, 10)}
          search={search as string}
        />

        <TablePagination totalPages={totalPages} />
      </section>
    </div>
  );
}

export default TransactionsPage;
