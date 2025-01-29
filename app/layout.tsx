import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | My Finance",
    default: "My Finance",
  },
  description:
    "Manage your personal finances with ease. Track your expenses, set budgets, and achieve your financial goals.",
};

import { Public_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const publicSans = Public_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.className} antialiased bg-lightBeige selection:bg-orange-400 selection:text-white`}
      >
        {children}

        <Toaster />
      </body>
    </html>
  );
}
