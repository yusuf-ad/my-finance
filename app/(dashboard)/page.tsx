import { Suspense } from "react";
import Header from "@/components/header";
import LogoutButton from "@/components/logout-button";
import BalanceSummary from "@/components/balance-summary";
import DashboardCard from "@/components/dashboard-card";
import SkeletonBalance from "@/components/skeletons/skeleton-balance";

import PotsContent from "@/components/dashboard/pots-content";
import TransactionsContent from "@/components/dashboard/transactions-content";
import BudgetsContent from "@/components/dashboard/budgets-content";
import BillsContent from "@/components/dashboard/bills-content";

export default function HomePage() {
  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Overview">
        <LogoutButton />
      </Header>

      <Suspense fallback={<SkeletonBalance />}>
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
