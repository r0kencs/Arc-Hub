import { api } from "@/axios";
import type { Map } from "../map/map";
import type { Position } from "../position/position";

// 1. Define the Side interface (matching your schema)
export interface Side {
  id: string;
}

export interface Spawn extends Position {
  id: string;
  name: string;
  mapId: string; // Included for direct reference
  map: Map;
  sideId: string;
  side: Side; // Added to match the Prisma 'include'
}

// 2. Helper type for creating a new spawn (omits the generated ID and nested objects)
export type CreateSpawnInput = Omit<Spawn, "id" | "map" | "side">;

export const getSpawns = async (): Promise<Spawn[]> => {
  const { data } = await api.get("/spawns");
  return data;
};

// 3. Add Create method
export const createSpawn = async (
  spawnData: CreateSpawnInput,
): Promise<Spawn> => {
  const { data } = await api.post("/spawns", spawnData);
  return data;
};

// 4. Add Update method
export const updateSpawn = async (
  id: string,
  spawnData: Partial<CreateSpawnInput>,
): Promise<Spawn> => {
  const { data } = await api.put(`/spawns/${id}`, spawnData);
  return data;
};

export const deleteSpawn = async (id: string): Promise<void> => {
  const { data } = await api.delete(`/spawns/${id}`);
  return data;
};
