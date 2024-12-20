import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterSelect({
  options,
  triggerStyle,
  placeholder,
}: {
  options: string[];
  triggerStyle?: string;
  id?: string;
  placeholder?: string;
}) {
  return (
    <Select>
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
