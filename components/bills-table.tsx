import {
  Table,
  TableBody,
  TableCaption,
  //   TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function BillsTable() {
  return (
    <Table>
      <TableCaption className="hover:bg-muted/50 py-8 mt-0 text-gray-900">
        No results.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px] max-w-[200px]">Bill Title</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          {/* <TableCell className="w-[100px] font-medium">INV001</TableCell>
          <TableCell>Paid deneme</TableCell>
          <TableCell className="text-right">$250.00</TableCell> */}
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default BillsTable;
