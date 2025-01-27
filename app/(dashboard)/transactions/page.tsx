import Header from "@/components/header";
import TablePagination from "@/components/table-pagination";
import TransactionsHeader from "@/components/transactions/transactions-header";
import TransactionsModal from "@/components/transactions/transactions-modal";
import TransactionsTable from "@/components/transactions/transactions-table";
import { page_size } from "@/lib/constants";
import { getTotalPages } from "@/server/actions/transaction";

async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { search, page, sort, filter } = await searchParams;
  const totalPages = await getTotalPages({
    getBy: search as string,
    pageSize: page_size,
    filterBy: filter as string,
  });

  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Transactions">
        <TransactionsModal />
      </Header>

      <section className="bg-white my-8 rounded-lg px-6 py-10 ">
        <TransactionsHeader />

        <TransactionsTable
          page={parseInt(page as string, 10)}
          search={search as string}
          sortBy={sort as string}
          filterBy={filter as string}
        />

        <TablePagination totalPages={totalPages} />
      </section>
    </div>
  );
}

export default TransactionsPage;
