import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function BudgetsPage() {
  return (
    <>
      <header className="flex justify-between">
        <h1 className="text-gray-900 text-4xl font-bold">Budgets</h1>

        <Button className="text-white py-6 font-bold">
          <Plus />
          Add New Budget
        </Button>
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
