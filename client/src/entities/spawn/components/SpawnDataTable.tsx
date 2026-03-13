import { DataTable } from "@/components/dashboard/table/DataTable";
import { EditableTextCell } from "@/components/dashboard/table/EditableTextCell";
import { TagCell } from "@/components/dashboard/table/TagCell";
import { Button } from "@/components/ui/button";
import { getSpawns, type Spawn } from "@/entities/spawn/spawn";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { type ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Spawn>[] = [
  {
    accessorKey: "id",
    header: "Id",
    size: 50,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue, row, column, table }) => {
      const initialValue = getValue() as string;

      return (
        <EditableTextCell
          initialValue={initialValue}
          onSave={(newValue) => {
            // Option A: Update local table state via meta
            (table.options.meta as any).updateData(
              row.index,
              column.id,
              newValue,
            );

            // Option B: Trigger an API call/Toast here
            console.log(`Updating row ${row.id} to ${newValue}`);
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
      return (
        <TagCell
          initialSelected={tag}
          options={[
            { value: "CT", label: "CT" },
            { value: "T", label: "T" },
          ]}
        />
      );
    },
  },
  {
    id: "actions",
    size: 20,
    cell: () => {
      return (
        <div className="flex justify-end">
          <Button variant="destructive" className="h-8 w-8 p-0">
            <HugeiconsIcon icon={Delete01Icon} size={20} />
          </Button>
        </div>
      );
    },
  },
];

export function SpawnDataTable() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["spawns"], // cache key
    queryFn: getSpawns,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {(error as Error).message}</p>;

  return <DataTable columns={columns} data={data as Spawn[]} />;
}
