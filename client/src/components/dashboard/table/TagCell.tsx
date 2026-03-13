import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { TAG_SIDE_CONFIG } from "./TagColorConfigs";

export function TagCell({
  initialSelected,
  options,
  onSave, // New prop
}: {
  initialSelected: string;
  options: { value: string; label: string }[];
  onSave?: (newValue: string) => void; // Define the type
}) {
  const [selected, setSelected] = React.useState<string>(initialSelected);
  const [open, setOpen] = React.useState(false); // Controls popover visibility

  const selectOption = (value: string) => {
    setSelected(value);
    setOpen(false); // Close menu on select
    if (onSave) {
      onSave(value); // Trigger the API call
    }
  };

  const config = TAG_SIDE_CONFIG[selected] || {
    label: selected,
    className: "bg-secondary",
  };

  return (
    <div className="flex flex-wrap gap-1 items-center">
      <Badge
        variant="outline"
        className={cn("rounded-sm px-1 font-medium ", config.className)}
      >
        {config.label}
      </Badge>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <Button variant="outline" size="xs" className="h-6 w-6 p-0" />
          }
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
        </PopoverTrigger>
        <PopoverContent className="w-50 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => selectOption(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-xs border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50",
                        )}
                      >
                        {isSelected && <HugeiconsIcon icon={Tick02Icon} />}
                      </div>
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
