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
  defaultValue,
}: {
  mode: string;
  options: string[];
  triggerStyle?: string;
  placeholder?: string;
  defaultValue?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentValue = searchParams.get(mode) || defaultValue || options[0];

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(mode, filter);

    if (filter === options[0]) {
      params.delete(mode);
    } else {
      params.set(mode, filter);
    }

    router.replace(pathname + "?" + params.toString());
  };

  return (
    <Select
      defaultValue={currentValue}
      onValueChange={(value) => handleFilter(value)}
    >
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
