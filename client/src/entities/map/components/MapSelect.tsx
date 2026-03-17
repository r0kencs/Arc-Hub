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
      // 1. If you want to keep 'value' as an object in your state,
      //    you must pass the 'id' string to the primitive so it matches the items.
      value={value?.id}
      onValueChange={(id) => {
        // 2. Base UI returns the 'value' prop of the selected Item (which is the ID string)
        const selectedMap = maps.find((m) => m.id === id);
        if (selectedMap) {
          onChange(selectedMap);
        }
      }}
    >
      <SelectTrigger className="w-full">
        {/* 3. Manually render the name inside SelectValue so it stays in sync 
              with your object state immediately. */}
        <SelectValue placeholder="Select a map">{value?.name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Maps</SelectLabel>
          {maps.map((map) => (
            // 4. Ensure the value here is the ID string to match the Root value
            <SelectItem key={map.id} value={map.id}>
              {map.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
