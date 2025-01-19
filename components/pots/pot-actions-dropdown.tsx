"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Dots } from "../icons";
import { deletePot } from "@/server/actions/pots";

type ActionType = "Delete";

function PotActionsDropdown({
  id,
  options,
}: {
  id: number;
  options: ActionType[];
}) {
  const [isLoading, setIsLoading] = useState(false);

  const executeAction = async (action: ActionType) => {
    try {
      setIsLoading(true);
      switch (action) {
        case "Delete":
          await deletePot(id);
          toast({
            title: "Success",
            description: "Pot deleted successfully",
          });
          break;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action.toLowerCase()} pot: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={isLoading} asChild>
        <button className="text-gray-600 px-1 flex items-center ml-auto">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Dots />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-min">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem
              onClick={() => executeAction(option)}
              disabled={isLoading}
              key={option}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PotActionsDropdown;
