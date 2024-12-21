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
import { Categories, Themes } from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseTheme } from "@/lib/utils";

function BudgetsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Budget
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Add New Budget</DialogTitle>
        </DialogHeader>

        <DialogDescription>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </DialogDescription>

        <form action="/pots" className="flex flex-col gap-3">
          <div className="space-y-1">
            <label className="text-gray-500 text-sm">Category</label>
            <FilterSelect
              triggerStyle="w-full"
              options={Categories}
              placeholder="Select a category"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="max" className="text-gray-500 text-sm">
              Maximum Spend
            </label>
            <Input
              name="spend"
              id="max"
              type="number"
              placeholder="$e.g. 2000"
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-500 text-sm">Theme</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Themes.map((theme) => {
                  const { color, code } = parseTheme(theme);

                  return (
                    <SelectItem key={color} value={color}>
                      <div className="flex gap-2 items-center">
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: code }}
                        ></div>
                        <span className="capitalize">{color}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
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
