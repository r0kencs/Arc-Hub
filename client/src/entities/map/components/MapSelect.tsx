import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Map } from "../map";

const maps: Map[] = [
  { id: "de_mirage", name: "Mirage" },
  { id: "de_ancient", name: "Ancient" },
];

interface MapSelectProps {
  value: Map | null;
  onChange: (value: Map) => void;
}

export function MapSelect({ value, onChange }: MapSelectProps) {
  return (
    <Select
      value={value?.id}
      onValueChange={(id) => {
        const selectedMap = maps.find((m) => m.id === id);
        if (selectedMap) {
          onChange(selectedMap);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a map">{value?.name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Maps</SelectLabel>
          {maps.map((map) => (
            <SelectItem key={map.id} value={map.id}>
              {map.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
