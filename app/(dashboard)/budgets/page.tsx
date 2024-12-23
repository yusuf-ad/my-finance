import BudgetCard from "@/components/budget-card";
import BudgetsModal from "@/components/budgets-modal";
import BudgetsSummary from "@/components/budgets-summary";
import { getBudgets } from "@/server/actions/budget";

async function BudgetsPage() {
  const res = await getBudgets();

  if (!res.success) {
    return <p>{res.message}</p>;
  }

  const { budgets } = res;

  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Budgets</h1>

        <BudgetsModal />
      </header>

      <section className="my-8">
        {budgets.length === 0 && (
          <p className="text-gray-400 font-bold mt-8">
            You haven&apos;t created a budget yet.
          </p>
        )}

        <div className="flex flex-col lg:items-start lg:flex-row gap-4">
          <BudgetsSummary budgets={budgets} />

          <ul className="flex-grow space-y-4">
            {budgets.map((budget) => (
              <BudgetCard budget={budget} key={budget.id} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default BudgetsPage;
