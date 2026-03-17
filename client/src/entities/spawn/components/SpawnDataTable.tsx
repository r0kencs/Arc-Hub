import { DataTable } from "@/components/dashboard/table/DataTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpawns, updateSpawn, type Spawn } from "../spawn";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import {
  Copy01Icon,
  Delete01Icon,
  UploadSquare01Icon,
} from "@hugeicons/core-free-icons";
import { TagCell } from "@/components/dashboard/table/TagCell";
import { EditableTextCell } from "@/components/dashboard/table/EditableTextCell";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { toast, useSonner } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const columns = (updateMutation: any): ColumnDef<Spawn>[] => [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row }) => {
      const initialValue = getValue() as string;
      const spawnId = row.original.id;

      return (
        <EditableTextCell
          initialValue={initialValue}
          onSave={(newValue) => {
            // Call the mutation passed from the component
            updateMutation.mutate({ id: spawnId, data: { name: newValue } });
          }}
        />
      );
    },
  },
  {
    accessorKey: "sideId",
    header: "Side",
    size: 30,
    cell: ({ row }) => {
      const tag = row.getValue("sideId") as string;
      const spawnId = row.original.id;

      return (
        <TagCell
          initialSelected={tag}
          options={[
            { value: "CT", label: "CT" },
            { value: "T", label: "T" },
          ]}
          // Assuming TagCell has an onChange or onSave prop
          onSave={(newSide) => {
            updateMutation.mutate({ id: spawnId, data: { sideId: newSide } });
          }}
        />
      );
    },
  },
  {
    id: "position",
    header: "Position",
    cell: ({ row }) => {
      const { x, y, z } = row.original;
      const posString = `setpos ${x} ${y} ${z}`;

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(posString);
          toast.success("Coordinates copied", {
            description: "Ready to paste into console.",
          });
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      };

      return (
        <div className="flex items-center gap-1">
          <Badge className="font-mono text-xs rounded-sm bg-transparent text-white">
            {`${x.toFixed(2)} / ${y.toFixed(2)} / ${z.toFixed(2)}`}
          </Badge>

          <Button
            variant="ghost"
            size="xs"
            className="h-8 w-8 p-0"
            onClick={handleCopy}
          >
            <HugeiconsIcon icon={Copy01Icon} size={16} />
          </Button>

          <Button variant="ghost" size="xs" className="h-8 w-8 p-0">
            <HugeiconsIcon icon={UploadSquare01Icon} size={16} />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 20,
    cell: () => (
      <div className="flex justify-end">
        <Button variant="destructive" className="h-8 w-8 p-0">
          <HugeiconsIcon icon={Delete01Icon} size={20} />
        </Button>
      </div>
    ),
  },
];

export function SpawnDataTable() {
  const queryClient = useQueryClient();

  // 1. Fetching logic
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["spawns"],
    queryFn: getSpawns,
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Spawn> }) =>
      updateSpawn(id, data),

    // Step 1: When mutate is called
    onMutate: async (newSpawn) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["spawns"] });

      // Snapshot the previous value
      const previousSpawns = queryClient.getQueryData<Spawn[]>(["spawns"]);

      // Step 2: Optimistically update to the new value
      queryClient.setQueryData<Spawn[]>(["spawns"], (old) =>
        old?.map((spawn) =>
          spawn.id === newSpawn.id ? { ...spawn, ...newSpawn.data } : spawn,
        ),
      );

      // Return a context object with the snapshotted value
      return { previousSpawns };
    },

    // Step 3: If the mutation fails, use the context we returned above
    onError: (err, newSpawn, context) => {
      queryClient.setQueryData(["spawns"], context?.previousSpawns);
      //toast.error("Update failed. Reverting changes...");
    },

    // Step 4: Always refetch after error or success to sync with the server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["spawns"] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  // Pass the mutation to the columns function
  return (
    <div className="flex flex-col items-center gap-4">
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
      <DataTable columns={columns(mutation)} data={data as Spawn[]} />
    </div>
  );
}
