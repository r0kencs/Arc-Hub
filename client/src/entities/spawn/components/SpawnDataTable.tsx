import { DataTable } from "@/components/dashboard/table/DataTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSpawns, updateSpawn, type Spawn } from "../spawn";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@/components/ui/button";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { TagCell } from "@/components/dashboard/table/TagCell";
import { EditableTextCell } from "@/components/dashboard/table/EditableTextCell";
import type { ColumnDef } from "@tanstack/react-table";

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

  // 2. Mutation logic
  const mutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Spawn> }) =>
      updateSpawn(id, data),
    onSuccess: () => {
      // Refresh the table data
      queryClient.invalidateQueries({ queryKey: ["spawns"] });
      //toast.success("Spawn updated successfully");
    },
    onError: () => {
      ///toast.error("Failed to update spawn");
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  // Pass the mutation to the columns function
  return <DataTable columns={columns(mutation)} data={data as Spawn[]} />;
}
