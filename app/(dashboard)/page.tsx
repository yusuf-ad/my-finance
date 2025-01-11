import { Suspense } from "react";
import Link from "next/link";

import Header from "@/components/header";
import LogoutButton from "@/components/logout-button";
import BalanceSummary from "@/components/balance-summary";
import BudgetsChart from "@/components/budgets-chart";
import { Spending } from "@/components/spending-list";

import SkeletonBalance from "@/components/skeletons/skeleton-balance";

import { CaretRight, JarLight } from "@/components/icons";

import { parseTheme } from "@/lib/utils";

import { getRecurringBills } from "@/server/actions/bills";
import { getBudgets } from "@/server/actions/budget";
import { getPots } from "@/server/actions/pots";
import {
  getLatestTransactions,
  getSpendings,
} from "@/server/actions/transaction";
import SkeletonDashboardCard from "@/components/skeletons/skeleton-dashboard-card";

function HomePage() {
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
            <Pots />
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
            <Transactions />
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
            <Budgets />
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
            <Bills />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function Pots() {
  const res = await getPots();

  return (
    <div className="bg-white py-6 px-6 rounded-lg">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Pots</h3>

        <Link href={"/pots"} className="flex items-center text-gray-500  gap-3">
          See Details
          <CaretRight />
        </Link>
      </div>

      {!res.success ? (
        <p className="text-gray-400 text-sm font-bold mt-4">{res.message}</p>
      ) : res.pots.length > 0 ? (
        <div className="flex gap-4">
          <div className="bg-lightBeige w-1/2 px-4 py-4 flex items-center gap-4 mt-4 rounded-xl shadow-sm">
            <JarLight />
            <div>
              <h4 className="text-sm text-gray-500 mb-3">Pots</h4>
              <p className="text-3xl font-bold text-gray-900">$0</p>
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-4 mt-4 flex-grow">
            {res.pots.map((pot) => (
              <li key={pot.id} className="flex items-center gap-4 col-span-1">
                <div
                  className="w-1 h-10"
                  style={{ backgroundColor: parseTheme(pot.theme).code }}
                ></div>

                <div className="flex flex-col font-semibold text-xs gap-1 items-start">
                  <span className="text-gray-600">{pot.name}</span>
                  <span className="font-bold">
                    ${pot.totalSaved.toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="capitalize text-gray-400 text-sm font-bold mt-4">
          No data provided
        </p>
      )}
    </div>
  );
}

async function Transactions() {
  const res = await getLatestTransactions();

  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[180px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Transactions</h3>

        <Link
          href={"/transactions"}
          className="flex items-center text-gray-500  gap-3"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4">
        {!res.success ? (
          <p className="text-gray-400 text-sm font-bold">{res.message}</p>
        ) : res.transactions.length > 0 ? (
          <div className="space-y-4">
            {res.transactions.map((transaction) => (
              <Spending key={transaction.id} spending={transaction} />
            ))}
          </div>
        ) : (
          <p className="capitalize text-gray-400 text-sm font-bold">
            No data provided
          </p>
        )}
      </div>
    </div>
  );
}

async function Budgets() {
  const budgetsData = getBudgets();
  const spendingsData = getSpendings({ category: "all" });

  const [budgets, spendings] = await Promise.all([budgetsData, spendingsData]);

  const totalSpent = spendings.success
    ? spendings.spendings.reduce((acc, spending) => {
        return spending.isIncome ? 0 : acc - spending.amount;
      }, 0)
    : 0;

  const totalIncome = spendings.success
    ? spendings.spendings.reduce((acc, spending) => {
        return spending.isIncome ? acc + spending.amount : acc;
      }, 0)
    : 0;

  const freeBudget = totalSpent + totalIncome;

  const errorMsg = !budgets.success ? budgets.message : "";

  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[270px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Budgets</h3>

        <Link
          href={"/budgets"}
          className="flex items-center text-gray-500  gap-3"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4">
        {!budgets.success || !spendings.success ? (
          <p className="text-gray-400 text-sm font-bold">{errorMsg}</p>
        ) : budgets.budgets.length > 0 ? (
          <div className="flex items-center gap-4">
            <div className="h-full w-full">
              <BudgetsChart budgets={budgets.budgets} free={freeBudget} />
            </div>

            <ul className="space-y-2">
              {budgets.budgets.map((budget) => {
                const { code } = parseTheme(budget.theme);
                const categorizedSpendings = spendings.spendings.filter(
                  (spending) => spending.category === budget.category
                );

                const totalSpent = categorizedSpendings.reduce(
                  (acc, spending) => {
                    return spending.isIncome ? 0 : acc - spending.amount;
                  },
                  0
                );

                const totalIncome = categorizedSpendings.reduce(
                  (acc, spending) => {
                    return spending.isIncome ? acc + spending.amount : acc;
                  },
                  0
                );

                const free =
                  totalIncome + totalSpent >= 0 ? 0 : totalIncome + totalSpent;

                return (
                  <li key={budget.id} className="flex items-center gap-4">
                    <div
                      className="w-[2px] h-8"
                      style={{ backgroundColor: code }}
                    ></div>

                    <div className="flex flex-col font-semibold text-xs gap-1 items-start">
                      <span className="text-gray-600">{budget.category}</span>
                      <span className="font-bold">${free.toFixed(2)}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <p className="capitalize text-gray-400 text-sm font-bold">
            No data provided
          </p>
        )}
      </div>
    </div>
  );
}

async function Bills() {
  const res = await getRecurringBills();

  let content;

  if (!res.success) {
    content = (
      <p className="capitalize text-gray-400 text-sm font-bold">
        {res.message}
      </p>
    );
  }

  if (res.success) {
    const paidBills = res.bills
      .filter(
        (transaction) =>
          !transaction.isIncome && new Date(transaction.date) < new Date()
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalUpcoming = res.bills
      .filter(
        (transaction) =>
          !transaction.isIncome && new Date(transaction.date) >= new Date()
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const dueSoon = res.bills
      .filter(
        (transaction) =>
          !transaction.isIncome &&
          new Date(transaction.date).getTime() - new Date().getTime() <=
            7 * 24 * 60 * 60 * 1000 &&
          new Date(transaction.date) >= new Date()
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    content = (
      <>
        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-teal flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Paid bills</p>
          <p className=" font-bold text-gray-900">${paidBills.toFixed(2)}</p>
        </div>
        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-peach flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Total upcoming</p>
          <p className=" font-bold text-gray-900">
            ${totalUpcoming.toFixed(2)}
          </p>
        </div>
        <div className="bg-lightBeige w-full rounded-lg border-l-4 border-l-skyBlue flex justify-between items-center px-4 py-3">
          <p className="text-gray-500 text-sm capitalize">Due soon</p>
          <p className=" font-bold text-gray-900">${dueSoon.toFixed(2)}</p>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white py-6 px-6 rounded-lg min-h-[270px]">
      <div className="flex justify-between">
        <h3 className="text-gray-900 font-bold text-xl">Recurring Bills</h3>

        <Link
          href={"/recurring-bills"}
          className="flex items-center text-gray-500  gap-3"
        >
          See Details
          <CaretRight />
        </Link>
      </div>

      <div className="mt-4 space-y-4">{content}</div>
    </div>
  );
}

export default HomePage;
