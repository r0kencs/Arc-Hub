import * as React from "react";
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
import { TAG_SIDE_CONFIG } from "./TagColorConfigs";

export function TagCell({
  initialSelected = [],
  options,
}: {
  initialSelected: string[];
  options: { value: string; label: string }[];
}) {
  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  const toggleOption = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {selected.map((val) => {
        const config = TAG_SIDE_CONFIG[val] || {
          label: val,
          className: "bg-secondary",
        };

        return (
          <Badge
            key={val}
            variant="outline"
            className={cn("rounded-sm px-1 font-medium ", config.className)}
          >
            {config.label}
          </Badge>
        );
      })}

      {/* The Combobox Trigger */}
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Add
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search options..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50",
                        )}
                      >
                        {/* {isSelected && <Check className="h-3 w-3" />} */}
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
