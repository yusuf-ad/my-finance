import BudgetCard from "@/components/budget-card";
import BudgetsModal from "@/components/budgets-modal";
import { CaretRight, Dots } from "@/components/icons";
import { parseTheme } from "@/lib/utils";
import { getBudgets } from "@/server/actions/budget";
import Link from "next/link";

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

        <div className="flex flex-col items-start lg:flex-row gap-4">
          <div className="flex-1 lg:max-w-sm bg-white p-6 ">
            <div>
              <h3 className="text-gray-900 font-semibold mb-2 tracking-wide">
                Spending Summary
              </h3>

              <ul>
                {budgets.map((budget) => {
                  const { code } = parseTheme(budget.theme);

                  return (
                    <li
                      key={budget.id}
                      className="flex justify-between items-center py-4 border-b last:border-b-0"
                    >
                      <div className="flex gap-2 items-center">
                        <div
                          className="w-[2px] h-5"
                          style={{ backgroundColor: code }}
                        ></div>
                        <h4 className="capitalize text-gray-500 text-sm">
                          {budget.category}
                        </h4>
                      </div>
                      <p className="font-semibold">
                        ${Number(0).toFixed(2)}{" "}
                        <span className="text-gray-400 font-medium text-sm">
                          of ${budget.maxSpend.toFixed(2)}
                        </span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <ul className="flex-grow space-y-4">
            {budgets.map((budget) => {
              return <BudgetCard budget={budget} key={budget.id} />;
            })}
          </ul>
        </div>
      </section>
    </>
  );
}

export default BudgetsPage;
