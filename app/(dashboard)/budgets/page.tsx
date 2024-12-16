import BudgetsModal from "@/components/budgets-modal";

function BudgetsPage() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Budgets</h1>

        <BudgetsModal />
      </header>

      <section>
        <p className="text-gray-400 font-bold mt-8">
          You haven&apos;t created a budget yet.
        </p>
      </section>
    </>
  );
}

export default BudgetsPage;
