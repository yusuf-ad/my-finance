import {
  Table,
  TableBody,
  TableCaption,
  //   TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function TransactionsTable() {
  return (
    <Table>
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        No results.
      </TableCaption>
      <TableHeader>
        <TableRow className="flex justify-between items-center">
          <TableHead className="w-[100px]">Recipent/Sender</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Transaction Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow> */}
      </TableBody>
    </Table>
  );
}

export default TransactionsTable;
