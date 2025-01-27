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
import {
  deleteTransaction,
  updateTransactionType,
  updateTransactionStatus,
} from "@/server/actions/transaction";
import { EllipsisVertical, Loader2 } from "lucide-react";

type ActionType =
  | "Delete"
  | "Mark as Income"
  | "Mark as Expense"
  | "Mark as Recurring"
  | "Unmark as Recurring";

function ActionsDropdown({
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
          await deleteTransaction(id);
          toast({
            title: "Success",
            description: "Transaction deleted successfully",
          });
          break;
        case "Mark as Income":
        case "Mark as Expense":
          await updateTransactionType(id);
          toast({
            title: "Success",
            description: `Transaction marked as ${
              action === "Mark as Income" ? "income" : "expense"
            }`,
          });
          break;
        case "Mark as Recurring":
          await updateTransactionStatus(id, true);
          toast({
            title: "Success",
            description: "Transaction marked as recurring",
          });
          break;
        case "Unmark as Recurring":
          await updateTransactionStatus(id, false);
          toast({
            title: "Success",
            description: "Transaction unmarked as recurring",
          });
          break;
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to ${action.toLowerCase()} transaction: ${
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
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <EllipsisVertical />
          )}
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

export default ActionsDropdown;
