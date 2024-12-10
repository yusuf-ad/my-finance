import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import FilterSelect from "./filter-select";

function BudgetsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </DialogDescription>

        <form action="" className="flex flex-col gap-3">
          <div className="space-y-1">
            <label className="text-gray-500 text-sm">Category</label>
            <FilterSelect
              triggerStyle="w-full"
              options={["All", "Income", "Expense"]}
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="max" className="text-gray-500 text-sm">
              Maximum Spend
            </label>
            <Input id="max" type="number" placeholder="e.g. $2000" />
          </div>

          <div className="space-y-1">
            <label className="text-gray-500 text-sm">Theme</label>
            <FilterSelect
              triggerStyle="w-full"
              options={["All", "Income", "Expense"]}
              placeholder="Select a theme"
            />
          </div>

          <Button className="w-full py-6 font-bold mt-4" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BudgetsModal;
