import BudgetCard from "@/components/budgets/budget-card";
import BudgetsModal from "@/components/budgets/budgets-modal";
import BudgetsSummary from "@/components/budgets/budgets-summary";
import Header from "@/components/header";
import SkeletonBudgetSummary from "@/components/skeletons/skeleton-budget-summary";
import { getBudgets } from "@/server/actions/budget";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Budgets",
  description:
    "Create, manage, and track your budgets effortlessly. Set financial goals, monitor your expenses, and stay on top of your spending with My Finance's comprehensive budgeting tools.",
};

async function BudgetsPage() {
  const res = await getBudgets();

  if (!res.success) {
    return <p>{res.message}</p>;
  }

  const { budgets } = res;

  return (
    <div className="pb-28 lg:pb-10">
      <Header title="Budgets">
        <BudgetsModal selectedThemes={budgets.map((budget) => budget.theme)} />
      </Header>

      <section className="my-8">
        {budgets.length === 0 ? (
          <p className="text-gray-400 font-bold mt-8">
            You haven&apos;t created a budget yet.
          </p>
        ) : (
          <div className="flex flex-col lg:items-start lg:flex-row gap-4">
            <Suspense fallback={<SkeletonBudgetSummary budgets={budgets} />}>
              <BudgetsSummary budgets={budgets} />
            </Suspense>

            <ul className="flex-grow space-y-4">
              {budgets.map((budget) => (
                <BudgetCard budget={budget} key={budget.id} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default BudgetsPage;
