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

// Sample Options
const FRAMEWORKS = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
];

export function TagCell({
  initialSelected = [],
}: {
  initialSelected: string[];
}) {
  const [selected, setSelected] = React.useState<string[]>(initialSelected);

  const toggleFramework = (value: string) => {
    setSelected((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {/* Render Active Badges */}
      {selected.map((val) => (
        <Badge
          key={val}
          variant="secondary"
          className="rounded-sm px-1 font-normal"
        >
          {FRAMEWORKS.find((f) => f.value === val)?.label || val}
        </Badge>
      ))}

      {/* The Combobox Trigger */}
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Add
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search frameworks..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {FRAMEWORKS.map((framework) => {
                  const isSelected = selected.includes(framework.value);
                  return (
                    <CommandItem
                      key={framework.value}
                      onSelect={() => toggleFramework(framework.value)}
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
                      {framework.label}
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
