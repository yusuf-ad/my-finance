import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import FilterSelect from "./filter-select";
import { Checkbox } from "./ui/checkbox";
import DatePicker from "./date-picker";

function TransactionsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <form action="" className="flex flex-col gap-3">
          <div className="space-y-2">
            <label htmlFor="name" className="text-gray-500 text-sm">
              Transaction Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="e.g. Urban Services Hub"
            />
            <p className="text-right text-gray-500 text-sm">
              30 characters left
            </p>
          </div>

          <div className="space-y-2 flex flex-col">
            <label htmlFor="date" className="text-gray-500 text-sm">
              Transaction Date
            </label>

            <DatePicker />
          </div>

          <div className="space-y-2">
            <label className="text-gray-500 text-sm">Category</label>
            <FilterSelect
              triggerStyle="w-full"
              options={["All", "Income", "Expense"]}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-gray-500 text-sm">
              Amount
            </label>
            <Input id="amount" type="number" placeholder="e.g. $1000" />
          </div>

          <div className="flex items-center space-x-3 py-2">
            <label
              htmlFor="recurring"
              className="text-gray-500 text-sm select-none"
            >
              Recurring
            </label>

            <Checkbox id="recurring" />
          </div>

          <Button className="w-full py-6 font-bold mt-4" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionsModal;
