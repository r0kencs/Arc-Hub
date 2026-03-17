import { DataTable } from "@/components/dashboard/table/DataTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSpawns,
  updateSpawn,
  createSpawn,
  type Spawn,
  deleteSpawn,
} from "../spawn";
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
import { toast } from "sonner";
import { SpawnPopoverCreate } from "./SpawnPopoverCreate";
import { SideSelect } from "@/entities/side/components/SideSelect";

// Column Definitions
export const columns = (
  updateMutation: any,
  deleteMutation: any,
): ColumnDef<Spawn>[] => [
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
      const side = row.getValue("sideId") as string;
      const spawnId = row.original.id;
      return (
        <SideSelect
          value={side}
          onChange={(newSide) => {
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
          toast.success("Coordinates copied");
        } catch (err) {
          console.error("Failed to copy!", err);
        }
      };

      return (
        <div className="flex items-center gap-1">
          <Badge className="font-mono text-xs rounded-sm bg-transparent text-white border-zinc-800">
            {`${x.toFixed(2)} / ${y.toFixed(2)} / ${z.toFixed(2)}`}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCopy}
          >
            <HugeiconsIcon icon={Copy01Icon} size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <HugeiconsIcon icon={UploadSquare01Icon} size={16} />
          </Button>
        </div>
      );
    },
  },
  {
    id: "actions",
    size: 20,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="destructive"
          className="h-8 w-8 p-0"
          onClick={() => {
            if (confirm("Are you sure?"))
              deleteMutation.mutate(row.original.id);
          }}
        >
          <HugeiconsIcon icon={Delete01Icon} size={18} />
        </Button>
      </div>
    ),
  },
];

export function SpawnDataTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["spawns"],
    queryFn: getSpawns,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Spawn> }) =>
      updateSpawn(id, data),
    onMutate: async (newSpawn) => {
      await queryClient.cancelQueries({ queryKey: ["spawns"] });
      const previousSpawns = queryClient.getQueryData<Spawn[]>(["spawns"]);
      queryClient.setQueryData<Spawn[]>(["spawns"], (old) =>
        old?.map((spawn) =>
          spawn.id === newSpawn.id ? { ...spawn, ...newSpawn.data } : spawn,
        ),
      );
      return { previousSpawns };
    },
    onError: (err, newSpawn, context) => {
      queryClient.setQueryData(["spawns"], context?.previousSpawns);
      toast.error("Update failed");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["spawns"] }),
  });

  const createMutation = useMutation({
    mutationFn: (newSpawn: Omit<Spawn, "id">) => createSpawn(newSpawn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spawns"] });
      toast.success("Spawn created!");
    },
    onError: () => toast.error("Failed to create spawn"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSpawn(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spawns"] });
      toast.success("Spawn deleted");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex justify-between w-full px-4">
        <h2 className="text-xl font-bold">Map Spawns</h2>
        <SpawnPopoverCreate
          onCreate={(payload) => createMutation.mutate(payload)}
        />
      </div>
      <DataTable
        columns={columns(updateMutation, deleteMutation)}
        data={data as Spawn[]}
      />
    </div>
  );
}
