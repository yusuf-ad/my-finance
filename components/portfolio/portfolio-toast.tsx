"use client";

import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { ToastAction } from "../ui/toast";
import Link from "next/link";

function PortfolioToast() {
  useEffect(() => {
    toast({
      title: "This is a portfolio project by Yusuf Ad",
      description: "Check out his GitHub and LinkedIn",
      action: (
        <ToastAction altText="See GitHub">
          <Link href={"https://github.com/yusuf-ad/my-finance"}>
            See GitHub
          </Link>
        </ToastAction>
      ),
      style: {
        padding: "1.4rem",
      },
    });
  }, []);

  return null;
}

export default PortfolioToast;
