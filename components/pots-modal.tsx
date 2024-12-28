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
import { useForm } from "react-hook-form";
import { PotsFormSchema, potsSchema, Themes } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import clsx from "clsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { parseTheme } from "@/lib/utils";
import { createPot } from "@/server/actions/pots";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

function PotsModal() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PotsFormSchema>({
    resolver: zodResolver(potsSchema),
    defaultValues: {
      name: "",
      target: 0,
      theme: "",
    },
  });

  async function onSubmit(values: PotsFormSchema) {
    const res = await createPot(values);

    if (res.success) {
      toast({
        title: "Success",
        description: res.message,
      });
      form.reset({
        name: "",
        target: 0,
        theme: "",
      });
      setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    Pot Name
                  </label>
                  <FormControl>
                    <Input
                      maxLength={30}
                      id="name"
                      placeholder="e.g. Vacation"
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
              name="target"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="target"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.target,
                    })}
                  >
                    Target Amount
                  </label>
                  <FormControl>
                    <Input
                      id="target"
                      type="number"
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Themes.map((theme) => {
                        const { color, code } = parseTheme(theme);
                        return (
                          <SelectItem
                            key={color}
                            // disabled={selectedThemes.includes(theme)}
                            value={`${color}${code}`}
                          >
                            <div className="flex gap-2 items-center">
                              <div
                                className="w-5 h-5 rounded-full"
                                style={{ backgroundColor: code }}
                              ></div>
                              <span className="capitalize">
                                {color}{" "}
                                {/* {selectedThemes.includes(theme) &&
                                  "(Already used)"}{" "} */}
                              </span>
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

export default PotsModal;
