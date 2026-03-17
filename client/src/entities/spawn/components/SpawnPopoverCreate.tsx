import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

export function SpawnPopoverCreate() {
  return (
    <Popover>
      <PopoverTrigger className="">
        <Button variant="outline">Create</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Select>
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
            <Select>
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
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Set Pos</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
