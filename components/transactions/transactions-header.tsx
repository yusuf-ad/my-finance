"use client";

import Searchbar from "@/components/searchbar";
import FilterSelect from "@/components/filter-select";
import { Categories } from "@/lib/validations";
import FilterDropdown from "@/components/filter-dropdown";
import { Filter, Sort } from "@/components/icons";

function TransactionsHeader() {
  return (
    <div className="flex justify-between mb-8">
      <div className="flex-grow max-w-sm">
        <Searchbar />
      </div>

      {/* desktop */}
      <div className="md:flex hidden gap-2">
        <div className="flex items-center">
          <label className="text-gray-500 text-sm ">Sort by</label>
          <FilterSelect
            mode="sort"
            options={[
              "Latest",
              "Oldest",
              "A to Z",
              "Z to A",
              "Highest",
              "Lowest",
            ]}
          />
        </div>
        <div className="flex items-center">
          <label className="text-gray-500 text-sm w-min xl:w-auto">
            Filter by Category
          </label>
          <FilterSelect
            mode="filter"
            options={["All Transactions", ...Categories]}
          />
        </div>
      </div>
      {/* mobil */}
      <div className="flex md:hidden items-center">
        <FilterDropdown
          mode={"sort"}
          options={[
            "Latest",
            "Oldest",
            "A to Z",
            "Z to A",
            "Highest",
            "Lowest",
          ]}
        >
          <button className="p-2">
            <Sort className="w-5 h-5" />
          </button>
        </FilterDropdown>
        <FilterDropdown
          mode={"filter"}
          options={["All Transactions", ...Categories]}
        >
          <button className="p-2">
            <Filter className="w-5 h-5" />
          </button>
        </FilterDropdown>
      </div>
    </div>
  );
}

export default TransactionsHeader;
