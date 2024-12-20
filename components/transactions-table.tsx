import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { page_size } from "@/lib/constants";
import { getTransactions } from "@/server/actions/transaction";
import { Suspense } from "react";

async function TableContent({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const transactions = await getTransactions({
    page,
    getBy: search,
    pageSize: page_size,
  });

  return (
    <>
      {transactions.length === 0 && (
        <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
          No results.
        </TableCaption>
      )}
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell className="w-[200px]">{transaction.name}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>
              {new Date(transaction.date).toLocaleDateString()}
            </TableCell>
            <TableCell className="text-right">{transaction.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

export default function TransactionsTable({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Recipent/Sender</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <Suspense
        fallback={<TableLoadingState />}
        key={`${page}-${search}`} // Key helps force remount on page/search change
      >
        <TableContent page={page} search={search} />
      </Suspense>
    </Table>
  );
}

function TableLoadingState() {
  return (
    <TableBody>
      {[...Array(5)].map((_, i) => (
        <TableRow key={i}>
          {[...Array(4)].map((_, j) => (
            <TableCell key={j}>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
