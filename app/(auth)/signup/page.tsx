import SignupForm from "@/components/signup/signup-form";
import { PortfolioInfo } from "@/components/portfolio/portfolio-info";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | My Finance",
  description:
    "Create a free account to track your expenses, manage budgets, and reach your financial goals with My Finance.",
};

function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[512px] max-w-lg">
        <div className="bg-white py-6 pb-3 px-6 w-full rounded-lg">
          <h1 className="text-gray-900 text-3xl font-bold mb-8">Sign up</h1>
          <SignupForm />
          <Link
            href="/login"
            className="flex justify-center my-8 text-sm text-gray-500"
          >
            Already have an account?{" "}
            <span className="ml-2 underline font-bold text-gray-900">
              {" "}
              Login
            </span>
          </Link>
        </div>
        <PortfolioInfo />
      </div>
    </div>
  );
}

export default SignupPage;
