"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormSchema) {
    console.log(data);
  }

  return (
    <div className="flex justify-center">
      <div className="bg-white py-6 pb-0 px-6 max-w-lg w-[512px] rounded-lg">
        <h1 className="text-gray-900 text-3xl font-bold mb-6">Login</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="email"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.email,
                    })}
                  >
                    Email
                  </label>
                  <FormControl>
                    <Input id="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <label
                    htmlFor="password"
                    className={clsx("text-gray-500 text-sm", {
                      "text-red-500": form.formState.errors.password,
                    })}
                  >
                    Password
                  </label>
                  <FormControl>
                    <Input id="password" placeholder="Password" {...field} />
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
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        <Link
          href="/signup"
          className="flex justify-center my-6 text-sm text-gray-500"
        >
          Need to create an account?{" "}
          <span className="ml-2 underline font-bold text-gray-900">
            {" "}
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
