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
import { Input } from "./ui/input";
import {
  BudgetFormSchema,
  budgetSchema,
  Categories,
  Themes,
} from "@/lib/validations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseTheme } from "@/lib/utils";
import { createBudget } from "@/server/actions/budget";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import clsx from "clsx";

function BudgetsModal() {
  const form = useForm<BudgetFormSchema>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      category: "",
      maximumSpend: 0,
      theme: "",
    },
  });

  async function onSubmit(values: BudgetFormSchema) {
    await createBudget(values);
  }

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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
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
              name="maximumSpend"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="maximumSpend"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.maximumSpend,
                    })}
                  >
                    Maximum Spend
                  </label>
                  <FormControl>
                    <Input
                      id="maximumSpend"
                      placeholder="e.g. $2000"
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
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="theme"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.theme,
                    })}
                  >
                    Theme
                  </label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Themes.map((theme) => {
                        const { color, code } = parseTheme(theme);
                        return (
                          <SelectItem key={color} value={`${color}${code}`}>
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
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default BudgetsModal;
