import BillsSummary from "@/components/bills-summary";
import BillsTable from "@/components/bills-table";
import FilterSelect from "@/components/filter-select";
import Header from "@/components/header";
import SkeletonBillSummary from "@/components/skeletons/skeleton-bill-summary";
import TablePagination from "@/components/table-pagination";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

function BillsPage() {
  return (
    <>
      <Header title="Recurring Bills" />

      <section className="flex flex-col lg:flex-row mt-8 gap-6 items-start">
        <Suspense fallback={<SkeletonBillSummary />}>
          <BillsSummary />
        </Suspense>

        <div className="bg-white w-full py-8 px-6 rounded-lg">
          <div className="flex justify-between mb-8 gap-2">
            <div className="flex-grow max-w-sm">
              <Input type="search" placeholder="Search bills" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-500 text-sm">Sort by</label>
              <FilterSelect
                options={[
                  "Latest",
                  "Oldest",
                  "A to Z",
                  "Z to A",
                  "Highest",
                  "Lowest",
                ]}
              />
            </div>
          </div>

          <BillsTable page={1} search="" />

          <TablePagination totalPages={0} />
        </div>
      </section>
    </>
  );
}

export default BillsPage;
