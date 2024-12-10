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

function PotsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Pot
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Pot</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </DialogDescription>

        <form action="" className="flex flex-col gap-3">
          <div className="space-y-2">
            <label htmlFor="name" className="text-gray-500 text-sm">
              Pot Name
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

          <div className="space-y-1">
            <label htmlFor="target" className="text-gray-500 text-sm">
              Target Amount
            </label>
            <Input id="target" type="number" placeholder="$e.g. 2000" />
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

export default PotsModal;
