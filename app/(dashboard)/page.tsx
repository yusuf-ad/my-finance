import { Suspense } from "react";
import Header from "@/components/header";
import LogoutButton from "@/components/logout-button";
import BalanceSummary from "@/components/balance-summary";
import DashboardCard from "@/components/dashboard-card";
import SkeletonBalance from "@/components/skeletons/skeleton-balance";
import SkeletonDashboardCard from "@/components/skeletons/skeleton-dashboard-card";

import PotsContent from "@/components/dashboard/pots-content";
import TransactionsContent from "@/components/dashboard/transactions-content";
import BudgetsContent from "@/components/dashboard/budgets-content";
import BillsContent from "@/components/dashboard/bills-content";

export default function HomePage() {
  return (
    <div className="pb-32 lg:pb-10">
      <Header title="Overview">
        <LogoutButton />
      </Header>

      <Suspense fallback={<SkeletonBalance />}>
        <BalanceSummary />
      </Suspense>

      <div className="flex gap-4 flex-col lg:flex-row">
        <div className="w-full space-y-4">
          <Suspense
            fallback={<SkeletonDashboardCard title="Pots" href="/pots" />}
          >
            <DashboardCard title="Pots" href="/pots">
              <PotsContent />
            </DashboardCard>
          </Suspense>

          <Suspense
            fallback={
              <SkeletonDashboardCard
                title="Transactions"
                href="/transactions"
                minHeight="180px"
              />
            }
          >
            <DashboardCard
              title="Transactions"
              href="/transactions"
              minHeight={"minHeight: 180px"}
            >
              <TransactionsContent />
            </DashboardCard>
          </Suspense>
        </div>

        <div className="w-full space-y-4">
          <Suspense
            fallback={
              <SkeletonDashboardCard
                minHeight="270px"
                title="Budgets"
                href="/budgets"
              />
            }
          >
            <DashboardCard title="Budgets" href="/budgets" minHeight="270px">
              <BudgetsContent />
            </DashboardCard>
          </Suspense>

          <Suspense
            fallback={
              <SkeletonDashboardCard
                title="Recurring Bills"
                href="/recurring-bills"
                minHeight="270px"
              />
            }
          >
            <DashboardCard
              title="Recurring Bills"
              href="/recurring-bills"
              minHeight="270px"
            >
              <BillsContent />
            </DashboardCard>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
