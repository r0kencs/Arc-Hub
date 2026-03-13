import { api } from "@/axios";
import type { Map } from "../map/map";

export interface Spawn {
  id: string;
  name: string;

  map: Map;

  sideId: string;

  x: number;
  y: number;
  z: number;

  pitch: number;
  yaw: number;
}

export const getSpawns = async (): Promise<Spawn[]> => {
  const { data } = await api.get("/spawns");
  return data;
};
