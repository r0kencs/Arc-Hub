import { EditableTextCell } from "@/components/dashboard/table/EditableTextCell";
import { TagCell } from "@/components/dashboard/table/TagCell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Spawn } from "@/entities/spawn/spawn";
import { Delete01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const Route = createFileRoute("/spawns")({
  component: RouteComponent,
});

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
    accessorKey: "side",
    header: "Side",
    size: 30,
    cell: ({ row }) => {
      const tags = row.getValue("side") as string;
      return (
        <TagCell
          initialSelected={tags}
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}

function RouteComponent() {
  return (
    <div className="container mx-auto p-10 w-full">
      <DataTable columns={columns} data={[]} />
    </div>
  );
}
