"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Categories,
  newTransactionSchema,
  NewTransactionFormSchema,
} from "@/lib/validations";
import clsx from "clsx";
import { createTransaction } from "@/server/actions/transaction";
import { toast } from "@/hooks/use-toast";

function TransactionsModal() {
  const form = useForm<NewTransactionFormSchema>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      date: new Date(),
      recurring: false,
    },
  });

  async function onSubmit(values: NewTransactionFormSchema) {
    const res = await createTransaction({ ...values });

    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
      });
      form.reset({
        name: "",
        amount: 0,
        category: form.getValues("category"),
        date: new Date(),
        recurring: false,
      });
    }

    if (!res.success) {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.message,
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="modal-description">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="name"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.name,
                    })}
                  >
                    Transaction Name
                  </label>
                  <FormControl>
                    <Input
                      maxLength={30}
                      id="name"
                      placeholder="e.g. Urban Services Hub"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-right text-gray-500 text-sm">
                    {30 - field.value.length} characters left
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <label
                    htmlFor="date"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.date,
                    })}
                  >
                    Transaction Date
                  </label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="category"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.category,
                    })}
                  >
                    Category
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="amount"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.amount,
                    })}
                  >
                    Amount
                  </label>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="e.g. $1000"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange("");
                        } else {
                          field.onChange(Number(value));
                        }
                      }}
                      value={field.value === 0 ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recurring"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-3 py-2">
                    <label
                      htmlFor="recurring"
                      className={clsx("text-gray-500 text-sm select-none", {
                        "text-red-500": form.formState.errors.recurring,
                      })}
                    >
                      Recurring
                    </label>

                    <Checkbox
                      id="recurring"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormItem>
              )}
            />

            <Button
              disabled={form.formState.isSubmitting}
              className="w-full py-6 font-bold mt-6"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionsModal;
