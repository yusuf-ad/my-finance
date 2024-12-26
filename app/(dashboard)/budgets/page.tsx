import BudgetCard from "@/components/budget-card";
import BudgetsModal from "@/components/budgets-modal";
import BudgetsSummary from "@/components/budgets-summary";
import Header from "@/components/header";
import { getBudgets } from "@/server/actions/budget";
import { Suspense } from "react";

async function BudgetsPage() {
  const res = await getBudgets();

  if (!res.success) {
    return <p>{res.message}</p>;
  }

  const { budgets } = res;

  return (
    <>
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
            <Suspense>
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
    </>
  );
}

export default BudgetsPage;
