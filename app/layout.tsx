import type { Metadata } from "next";
import "@/styles/globals.css";
import Sidebar from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased flex flex-col lg:flex-row min-h-screen`}>
        <Sidebar />

        <div className="flex-1 bg-lightBeige">{children}</div>
      </body>
    </html>
  );
}
