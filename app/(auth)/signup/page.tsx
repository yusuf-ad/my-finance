"use client";

import { Eye } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema, signupSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SignupPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignupFormSchema) {
    console.log(data);
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white py-6 pb-0 px-6 max-w-lg w-[512px] rounded-lg">
        <h1 className="text-gray-900 text-3xl font-bold mb-8">Sign up</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
                    Name
                  </label>
                  <FormControl>
                    <Input id="name" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <div className="relative">
                      <Input
                        id="password"
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <button
                        onClick={togglePasswordVisibility}
                        type="button"
                        className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2"
                      >
                        <Eye />
                      </button>
                    </div>
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
                  Creating
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>

        <Link
          href="/signup"
          className="flex justify-center my-8 text-sm text-gray-500"
        >
          Already have an account?{" "}
          <span className="ml-2 underline font-bold text-gray-900"> Login</span>
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
