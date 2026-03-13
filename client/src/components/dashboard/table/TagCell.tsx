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
}: {
  initialSelected: string;
  options: { value: string; label: string }[];
}) {
  const [selected, setSelected] = React.useState<string>(initialSelected);

  const selectOption = (value: string) => {
    setSelected(value);
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

      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="xs" />}>
          <HugeiconsIcon icon={ArrowDown01Icon} />
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
