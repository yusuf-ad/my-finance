"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, Plus } from "lucide-react";
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
import { z } from "zod";
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
import { Categories } from "@/lib/validations";

const TransactionSchema = z.object({
  name: z.string().min(1).max(30),
  amount: z.number().min(1),
  category: z.string().min(1),
  date: z.date(),
  recurring: z.boolean(),
});

function TransactionsModal() {
  const form = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      date: new Date(),
      recurring: false,
    },
  });

  function onSubmit(values: z.infer<typeof TransactionSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <label htmlFor="name" className="text-gray-500 text-sm">
                    Transaction Name
                  </label>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="e.g. Urban Services Hub"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-right text-gray-500 text-sm">
                    30 characters left
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <label htmlFor="date" className="text-gray-500 text-sm">
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
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
                  <label className="text-gray-500 text-sm">Category</label>
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
                  <label htmlFor="amount" className="text-gray-500 text-sm">
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
                      className="text-gray-500 text-sm select-none"
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

            <Button className="w-full py-6 font-bold mt-6" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionsModal;
