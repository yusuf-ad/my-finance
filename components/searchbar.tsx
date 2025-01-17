"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

function Searchbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const createSearchString = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(pathname + "?" + createSearchString(value));
  }, 300);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <Input
      type="search"
      value={searchValue}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search transactions"
    />
  );
}

export default Searchbar;
