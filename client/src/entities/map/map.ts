import { api } from "@/axios";

export interface Map {
  id: string;
  name: string;
}

export const getMaps = async (): Promise<Map[]> => {
  const { data } = await api.get("/maps");
  return data;
};
