import { EditableTextCell } from "@/components/dashboard/table/EditableTextCell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapSelect } from "@/entities/map/components/MapSelect";
import { SideSelect } from "@/entities/side/components/SideSelect";
import {
  Copy01Icon,
  Delete01Icon,
  UploadSquare01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import type { Spawn } from "../spawn";
import type { Map } from "@/entities/map/map";

export const columns = (
  updateMutation: any,
  deleteMutation: any,
  maps: Map[],
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
    accessorKey: "map",
    header: "Map",
    size: 60,
    cell: ({ row }) => {
      const map = row.getValue("map") as Map;
      const spawnId = row.original.id;
      return (
        <MapSelect
          value={map}
          maps={maps}
          onChange={(newMap) => {
            updateMutation.mutate({ id: spawnId, data: { mapId: newMap.id } });
          }}
        />
      );
    },
  },
  {
    accessorKey: "sideId",
    header: "Side",
    size: 40,
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
