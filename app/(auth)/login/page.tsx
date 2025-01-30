import LoginForm from "@/components/login/login-form";
import { PortfolioInfo } from "@/components/portfolio/portfolio-info";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | My Finance",
  description:
    "Welcome back! Login to your My Finance account to continue managing your personal finances.",
};

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[512px] max-w-lg">
        <div className="bg-white py-6 pb-3 px-6 w-full rounded-lg">
          <h1 className="text-gray-900 text-3xl font-bold mb-8">Login</h1>
          <LoginForm />
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

        <PortfolioInfo />
      </div>
    </div>
  );
}

export default LoginPage;
