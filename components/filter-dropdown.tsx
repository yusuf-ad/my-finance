"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";

function FilterDropdown({
  mode,
  children,
  options,
}: {
  mode: string;
  children: ReactNode;
  options: string[];
}) {
  const [position, setPosition] = useState(options[0]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(mode, filter);

    router.replace(pathname + "?" + params.toString());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-min">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {options.map((item) => (
            <DropdownMenuRadioItem
              key={item}
              value={item}
              onClick={() => handleFilter(item)}
            >
              {item}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default FilterDropdown;
