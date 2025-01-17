"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FilterSelect({
  mode,
  options,
  triggerStyle,
  placeholder,
}: {
  mode: string;
  options: string[];
  triggerStyle?: string;
  placeholder?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleFilter = (filter: string) => {
    console.log(filter);

    const params = new URLSearchParams(searchParams.toString());
    params.set(mode, filter);

    router.replace(pathname + "?" + params.toString());
  };

  return (
    <Select onValueChange={(value) => handleFilter(value)}>
      <SelectTrigger className={`w-[164px] ${triggerStyle}`}>
        <SelectValue placeholder={placeholder || options[0]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FilterSelect;
