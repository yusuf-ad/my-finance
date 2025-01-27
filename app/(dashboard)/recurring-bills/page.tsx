import BillsSummary from "@/components/recurring-bills/bills-summary";
import BillsTable from "@/components/recurring-bills/bills-table";
import Header from "@/components/header";
import SkeletonBillSummary from "@/components/skeletons/skeleton-bill-summary";
import TablePagination from "@/components/table-pagination";
import { Suspense } from "react";
import BillsHeader from "@/components/recurring-bills/bills-header";

function BillsPage() {
  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Recurring Bills" />

      <section className="flex flex-col lg:flex-row mt-8 gap-6 items-start">
        <Suspense fallback={<SkeletonBillSummary />}>
          <BillsSummary />
        </Suspense>

        <div className="bg-white w-full py-8 px-6 rounded-lg">
          <BillsHeader />

          <BillsTable page={1} search="" />

          <TablePagination totalPages={0} />
        </div>
      </section>
    </div>
  );
}

export default BillsPage;
