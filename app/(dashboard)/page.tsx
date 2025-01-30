import { Suspense } from "react";
import Header from "@/components/header";
import LogoutButton from "@/components/logout-button";
import BalanceSummary from "@/components/dashboard/balance-summary";
import DashboardCard from "@/components/dashboard/dashboard-card";
import SkeletonBalance from "@/components/skeletons/skeleton-balance";

import PotsContent from "@/components/dashboard/pots-content";
import TransactionsContent from "@/components/dashboard/transactions-content";
import BudgetsContent from "@/components/dashboard/budgets-content";
import BillsContent from "@/components/dashboard/bills-content";
import { Metadata } from "next";
import PortfolioToast from "@/components/portfolio/portfolio-toast";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "View your financial overview, track expenses, and manage your budgets all in one place.",
};

export default function HomePage() {
  return (
    <div className="pb-28 lg:pb-10">
      {/* Show portfolio toast */}
      <PortfolioToast />

      <Header title="Overview">
        <LogoutButton />
      </Header>

      <Suspense fallback={<SkeletonBalance />} key={"balance-summary"}>
        <BalanceSummary />
      </Suspense>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full space-y-4">
          <DashboardCard title="Pots" href="/pots">
            <PotsContent />
          </DashboardCard>

          <DashboardCard
            title="Transactions"
            href="/transactions"
            minHeight="180px"
          >
            <TransactionsContent />
          </DashboardCard>
        </div>

        <div className="w-full space-y-4">
          <DashboardCard title="Budgets" href="/budgets" minHeight="270px">
            <BudgetsContent />
          </DashboardCard>

          <DashboardCard
            title="Recurring Bills"
            href="/recurring-bills"
            minHeight="270px"
          >
            <BillsContent />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
