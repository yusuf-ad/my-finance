"use client";

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
  Transaction,
  updateTransactionType,
} from "@/server/actions/transaction";
import { EllipsisVertical } from "lucide-react";

function ActionsDropdown({
  transaction,
  options,
}: {
  transaction: Transaction;
  options: string[];
}) {
  const handleAction = async (action: string) => {
    switch (action) {
      case "Edit":
        console.log("Edit");
        break;
      case "Delete":
        {
          try {
            await deleteTransaction(transaction.id);
          } catch {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to delete transaction",
            });
          }
        }
        break;
      case "Mark as Income":
        {
          try {
            await updateTransactionType(transaction.id);
          } catch {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update transaction",
            });
          }
        }

        break;
      case "Mark as Expense":
        {
          try {
            await updateTransactionType(transaction.id);
          } catch {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to update transaction",
            });
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-gray-600 px-1 flex items-center ml-auto">
          <EllipsisVertical />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-min">
        <DropdownMenuGroup>
          {options.map((option) => (
            <DropdownMenuItem onClick={() => handleAction(option)} key={option}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionsDropdown;
