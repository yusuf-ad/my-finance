"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import clsx from "clsx";
import { Input } from "./ui/input";
import { Pot } from "@/server/actions/pots";
import { parseTheme } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AddMoneyFormSchema, addMoneySchema } from "@/lib/validations";

function AddMoneyModal({ pot }: { pot: Pot }) {
  const { code } = parseTheme(pot.theme);

  const form = useForm<AddMoneyFormSchema>({
    resolver: zodResolver(addMoneySchema),
    defaultValues: {
      amount: 0,
    },
  });

  const amount = form.watch("amount") || 0;
  const newPercentage = ((pot.totalSaved + amount) / pot.target) * 100;

  async function onSubmit(values: AddMoneyFormSchema) {
    const res = {
      success: true,
      message: "Money added successfully",
    };

    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
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
        <Button className="flex-1 py-6 font-bold bg-lightBeige text-gray-900 hover:bg-white  border-2 border-transparent hover:border-black">
          <Plus /> Add Money
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to &quot;{pot.name}&quot;</DialogTitle>
          <DialogDescription>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 my-8">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-500">New Amount</h4>
                <span className="text-3xl tracking-wide font-bold text-gray-900">
                  ${(pot.totalSaved + amount).toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden relative">
                <div
                  className="h-2.5 rounded-l-full transition-all duration-500 absolute inset-0 z-50"
                  style={{
                    width: `${pot.totalSaved / pot.target}%`,
                    backgroundColor: code,
                  }}
                ></div>
                <div
                  className="h-2.5 rounded-l-full transition-all duration-500 absolute inset-0"
                  style={{
                    width: `${newPercentage}%`,
                    backgroundColor: "#8ce99a",
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <p className="text-green-700">{newPercentage.toFixed(2)}%</p>
                <p className="text-gray-600">Target of ${pot.target}</p>
              </div>
            </div>

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
                    Amount to Add
                  </label>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                          field.onChange("");
                        } else {
                          field.onChange(Number(value));
                        }

                        if (pot.totalSaved + Number(value) > pot.target) {
                          field.onChange(pot.target - pot.totalSaved);
                        }

                        if (Number(value) < 0) {
                          field.onChange(0);
                        }
                      }}
                      value={field.value === 0 ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
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
                "Confirm Addition"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddMoneyModal;
