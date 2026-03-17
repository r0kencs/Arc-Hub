import { DataTable } from "@/components/dashboard/table/DataTable";
import { getMaps } from "@/entities/map/map";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createSpawn,
  deleteSpawn,
  getSpawns,
  updateSpawn,
  type Spawn,
} from "../spawn";
import { columns } from "./columns";
import { SpawnPopoverCreate } from "./SpawnPopoverCreate";

export function SpawnDataTable() {
  const queryClient = useQueryClient();

  const { data: spawns, isLoading: loadingSpawns } = useQuery({
    queryKey: ["spawns"],
    queryFn: getSpawns,
  });

  // Fetch Maps from DB
  const { data: maps = [], isLoading: loadingMaps } = useQuery({
    queryKey: ["maps"],
    queryFn: getMaps,
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

  if (loadingSpawns || loadingMaps) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex justify-between w-full px-4">
        <h2 className="text-xl font-bold">Map Spawns</h2>
        <SpawnPopoverCreate
          onCreate={(payload) => createMutation.mutate(payload)}
        />
      </div>
      <DataTable
        columns={columns(updateMutation, deleteMutation, maps)}
        data={spawns as Spawn[]}
      />
    </div>
  );
}
