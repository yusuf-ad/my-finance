import BillsSummary from "@/components/recurring-bills/bills-summary";
import BillsTable from "@/components/recurring-bills/bills-table";
import Header from "@/components/header";
import SkeletonBillSummary from "@/components/skeletons/skeleton-bill-summary";
import TablePagination from "@/components/table-pagination";
import { Suspense } from "react";
import BillsHeader from "@/components/recurring-bills/bills-header";
import { getTotalBillsPage } from "@/server/actions/bills";
import { page_size } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recurring Bills",
  description:
    "Create, manage, and track your savings pots effortlessly. Set financial goals, allocate funds, and watch your savings grow with My Finance's comprehensive pot management tools.",
};

async function BillsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search, page, sort } = await searchParams;
  const totalPages = await getTotalBillsPage({
    getBy: search as string,
    pageSize: page_size,
  });

  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Recurring Bills" />

      <section className="flex flex-col lg:flex-row mt-8 gap-6 items-start">
        <Suspense fallback={<SkeletonBillSummary />}>
          <BillsSummary />
        </Suspense>

        <div className="bg-white w-full py-8 px-6 rounded-lg">
          <BillsHeader />

          <BillsTable
            page={parseInt(page as string, 10)}
            search={search as string}
            sortBy={sort as string}
          />

          <TablePagination totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
}

export default BillsPage;
