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
import ActionsDropdown from "./actions-dropdown";
import { getRecurringBills } from "@/server/actions/bills";
import { getOrdinalSuffix } from "@/lib/utils";
import { Suspense } from "react";

async function TableContent({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const response = await getRecurringBills({
    page,
    getBy: search,
    pageSize: page_size,
  });

  if (!response.success) {
    return (
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        {response.message}
      </TableCaption>
    );
  }

  const { bills } = response;

  if (bills.length === 0) {
    return (
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        No results.
      </TableCaption>
    );
  }

  return (
    <TableBody>
      {bills.map((bill) => (
        <TableRow key={bill.id}>
          <TableCell className="w-[200px]">{bill.name}</TableCell>
          <TableCell className="text-gray-500">
            {`Monthly - ${bill.date.getDate()}${getOrdinalSuffix(
              bill.date.getDate()
            )}`}
          </TableCell>
          {bill.isIncome ? (
            <TableCell className="text-right font-semibold text-green-600">
              +${bill.amount.toFixed(2)}
            </TableCell>
          ) : (
            <TableCell className="text-right font-semibold">
              -${bill.amount.toFixed(2)}
            </TableCell>
          )}
          <TableCell className="text-right">
            <ActionsDropdown
              options={["Delete", "Mark as Income"]}
              id={bill.id}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default function BillsTable({
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
          <TableHead className="w-[200px]">Bill Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
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
