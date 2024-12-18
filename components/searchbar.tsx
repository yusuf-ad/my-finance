"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useCallback } from "react";

function Searchbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createSearchString = useCallback(
    (search: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);

      return params.toString();
    },

    [searchParams]
  );

  return (
    <>
      <Input
        type="search"
        onChange={(e) => {
          router.push(pathname + "?" + createSearchString(e.target.value));
        }}
        placeholder={searchParams.get("search") || "Search transactions"}
      />
    </>
  );
}

export default Searchbar;
