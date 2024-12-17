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
import { toast } from "@/hooks/use-toast";
import { signIn } from "@/lib/auth-client";
import { LoginFormSchema, loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    await signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (ctx) => {
          router.push("/");
        },
        onError: (ctx) => {
          toast({
            variant: "destructive",
            title: "Failed to login",
            description: ctx.error.message,
          });
        },
      }
    );
  }

  function togglePasswordVisibility() {
    setIsPasswordVisible((prev) => !prev);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white py-6 pb-0 px-6 max-w-lg w-[512px] rounded-lg">
        <h1 className="text-gray-900 text-3xl font-bold mb-8">Login</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
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
                  Logging in
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <Link
          href="/signup"
          className="flex justify-center my-8 text-sm text-gray-500"
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
