import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

function ActionsDropdown({ options }: { options: string[] }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-600 px-1 flex items-center ml-auto">
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-min">
        <DropdownMenuGroup>
          {options.map((item) => (
            <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsDropdown;
