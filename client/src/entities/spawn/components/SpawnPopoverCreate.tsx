import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function SpawnPopoverCreate() {
  const [map, setMap] = useState<string>("");
  const [side, setSide] = useState<string>("");
  const [setPos, setSetPos] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if (!map || !side || !setPos) {
      alert("Please fill in all fields");
      return;
    }

    const payload = {
      map,
      side,
      setPosCommand: setPos,
    };

    console.log("Creating Spawn:", payload);

    // Add your API call or parent function here
    // Example: await createSpawn(payload);

    setOpen(false); // Close the popover on success
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" />}>
        Create
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <Select
                  onValueChange={(val) => {
                    setMap(val as string);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a map" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Maps</SelectLabel>
                      <SelectItem value="de_mirage">Mirage</SelectItem>
                      <SelectItem value="de_ancient">Ancient</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-1">
                <Select
                  onValueChange={(val) => {
                    setSide(val as string);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a side" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Sides</SelectLabel>
                      <SelectItem value="CT">CT</SelectItem>
                      <SelectItem value="T">T</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Input
              placeholder="Set Pos Command"
              onChange={(e) => {
                setSetPos(e.target.value);
              }}
            />
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
