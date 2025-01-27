import FilterSelect from "../filter-select";
import Searchbar from "../searchbar";
import FilterDropdown from "../filter-dropdown";
import { Filter, Sort } from "../icons";

function BillsHeader() {
  return (
    <div className="flex justify-between mb-8 gap-2">
      <div className="flex-grow max-w-sm">
        <Searchbar />
      </div>
      {/* desktop */}
      <div className="hidden md:flex items-center gap-2">
        <label className="text-gray-500 text-sm">Sort by</label>
        <FilterSelect
          triggerStyle="w-32"
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
      {/* mobile */}
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
      </div>
    </div>
  );
}

export default BillsHeader;
