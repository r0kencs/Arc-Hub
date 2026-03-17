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
import { MapSelect } from "@/entities/map/components/MapSelect";
import type { Map } from "@/entities/map/map";
import { parseSetPos } from "@/entities/position/position";
import { useState } from "react";
import { toast } from "sonner";

interface SpawnPopoverCreateProps {
  maps: Map[];
  onCreate: (data: any) => void;
}

export function SpawnPopoverCreate({
  maps,
  onCreate,
}: SpawnPopoverCreateProps) {
  const [map, setMap] = useState<Map>();
  const [side, setSide] = useState<string>("");
  const [setPos, setSetPos] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleCreate = () => {
    if (!map || !side || !setPos) {
      toast.warning("Please fill all fields");
      return;
    }

    const position = parseSetPos(setPos);
    if (!position) {
      toast.error("Invalid setpos format. Please copy exactly from console.");
      return;
    }

    onCreate({
      name: `${side} Spawn - ${map}`,
      mapId: map?.id,
      sideId: side,
      x: position.x,
      y: position.y,
      z: position.z,
    });

    setOpen(false);
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
                <MapSelect
                  value={map as Map}
                  maps={maps}
                  onChange={(map) => {
                    setMap(map);
                  }}
                />
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
