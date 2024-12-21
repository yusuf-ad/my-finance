import BudgetsModal from "@/components/budgets-modal";
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

      <section>
        {budgets.length === 0 && (
          <p className="text-gray-400 font-bold mt-8">
            You haven&apos;t created a budget yet.
          </p>
        )}
      </section>
    </>
  );
}

export default BudgetsPage;
