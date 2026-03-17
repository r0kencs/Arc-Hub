import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sides = [
  {
    value: "CT",
  },
  { value: "T" },
];

interface SideSelectProps {
  value: string;
  onChange: (value: string) => any;
}

export function SideSelect({ value, onChange }: SideSelectProps) {
  return (
    <Select
      onValueChange={(val) => {
        onChange(val as string);
      }}
    >
      <SelectTrigger
        className={`w-full ${value === "CT" ? "bg-blue-600/40! border-blue-600" : value === "T" ? "bg-amber-600/40! border-amber-600" : ""}`}
      >
        <SelectValue
          placeholder="Select a side"
          className={`${value === "CT" ? "text-blue-600" : value === "T" ? "text-amber-600" : ""}`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sides</SelectLabel>
          {sides.map((side) => (
            <SelectItem value={side.value}>{side.value}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
