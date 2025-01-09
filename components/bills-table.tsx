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

async function BillsTable({ page, search }: { page: number; search: string }) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Bill Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {bills.map((bill) => (
          <TableRow key={bill.id}>
            <TableCell className="w-[200px]">{bill.name}</TableCell>
            <TableCell> {new Date(bill.date).toLocaleDateString()}</TableCell>
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
              <ActionsDropdown options={["Edit", "Delete", "Mark as income"]} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BillsTable;
