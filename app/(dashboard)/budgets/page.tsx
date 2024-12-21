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

      <section className="my-8">
        {budgets.length === 0 && (
          <p className="text-gray-400 font-bold mt-8">
            You haven&apos;t created a budget yet.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 lg:max-w-sm bg-white p-6 "></div>
          <div className="flex-grow bg-white p-6 ">
            <h2 className="text-gray-900 font-bold text-lg">Budgets</h2>
            <div className="mt-4">
              {budgets.map((budget) => (
                <div key={budget.id} className="flex justify-between">
                  <p>{budget.category}</p>
                  <p>{budget.theme}</p>
                  <p>{budget.maxSpend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BudgetsPage;
