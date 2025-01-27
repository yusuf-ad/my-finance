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
import ActionsDropdown from "../actions-dropdown";

async function TableContent({
  page,
  search,
  sortBy,
  filterBy,
}: {
  page: number;
  search: string;
  sortBy: string;
  filterBy: string;
}) {
  const response = await getTransactions({
    page,
    getBy: search,
    pageSize: page_size,
    sortBy,
    filterBy,
  });

  if (!response.success) {
    return (
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        {response.message}
      </TableCaption>
    );
  }

  const { transactions } = response;

  if (transactions.length === 0) {
    return (
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        No results.
      </TableCaption>
    );
  }

  return (
    <TableBody>
      {transactions.map((transaction) => (
        <TableRow key={transaction.id}>
          <TableCell className="w-[200px]">{transaction.name}</TableCell>
          <TableCell>{transaction.category}</TableCell>
          <TableCell>
            {new Date(transaction.date).toLocaleDateString()}
          </TableCell>
          {transaction.isIncome ? (
            <TableCell className="text-right font-semibold text-green-600">
              +${transaction.amount.toFixed(2)}
            </TableCell>
          ) : (
            <TableCell className="text-right font-semibold">
              -${transaction.amount.toFixed(2)}
            </TableCell>
          )}
          <TableCell className="text-right">
            <ActionsDropdown
              id={transaction.id}
              options={[
                "Delete",
                `Mark as ${transaction.isIncome ? "Expense" : "Income"}`,
                `${transaction.recurring ? "Unmark" : "Mark"} as Recurring`,
              ]}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function TransactionsTable({
  page,
  search,
  sortBy,
  filterBy,
}: {
  page: number;
  search: string;
  sortBy: string;
  filterBy: string;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Recipent/Sender</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <Suspense
        fallback={<TableLoadingState />}
        key={`${page}-${search}-${sortBy}-${filterBy}`} // Key helps force remount on page/search change
      >
        <TableContent
          page={page}
          search={search}
          sortBy={sortBy}
          filterBy={filterBy}
        />
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
