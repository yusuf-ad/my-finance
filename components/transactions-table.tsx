import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/server/actions/transaction";

function TransactionsTable({ data }: { data: Transaction[] }) {
  return (
    <Table>
      {data.length === 0 && (
        <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
          No results.
        </TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Recipent/Sender</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((transaction) => (
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
    </Table>
  );
}

export default TransactionsTable;
