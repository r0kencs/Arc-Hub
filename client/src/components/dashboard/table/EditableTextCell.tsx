import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableCellProps {
  initialValue: string;
  onSave: (value: string) => void;
  className?: string;
}

export function EditableTextCell({
  initialValue,
  onSave,
  className,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [value, setValue] = React.useState(initialValue);

  // Sync state if the prop changes externally
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      onSave(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-8 w-full min-w-[100px] px-2 py-1"
      />
    );
  }

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className={cn(
        "cursor-text truncate px-2 py-1 transition-colors hover:bg-muted/50 rounded-sm",
        className,
      )}
    >
      {value || <span className="text-muted-foreground italic">Empty...</span>}
    </div>
  );
}
