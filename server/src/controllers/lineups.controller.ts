import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface LineupParams {
  id: string;
}
interface CreateLineupBody {
  name: string;
  mapId: string;
  sideId: string;
  x: number;
  y: number;
  z: number;
}

export const createSpawn = async (
  req: Request<{}, {}, CreateSpawnBody>,
  res: Response,
) => {
  try {
    const newSpawn = await prisma.spawn.create({
      data: req.body,
      include: { map: true, side: true },
    });

    res.status(201).json(newSpawn);
  } catch (error) {
    res.status(400).json({ error: "Spawn already exists or invalid data" });
  }
};

export const getSpawn = async (req: Request<SpawnParams>, res: Response) => {
  try {
    const spawn = await prisma.spawn.findUnique({
      where: { id: req.params.id },
      include: { map: true, side: true },
    });

    if (!spawn) {
      return res.status(404).json({ error: "Spawn not found" });
    }

    res.status(200).json(spawn);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllSpawns = async (req: Request, res: Response) => {
  try {
    const { mapId, sideId } = req.query;

    const spawns = await prisma.spawn.findMany({
      where: {
        mapId: mapId as string,
        sideId: sideId as string,
      },
      include: { map: true, side: true },
    });
    res.status(200).json(spawns);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateSpawn = async (
  req: Request<SpawnParams, {}, Partial<CreateSpawnBody>>,
  res: Response,
) => {
  try {
    const updatedSpawn = await prisma.spawn.update({
      where: { id: req.params.id },
      data: req.body,
      include: { map: true, side: true },
    });

    res.status(200).json(updatedSpawn);
  } catch (error) {
    res.status(404).json({ error: "Spawn not found or update failed" });
  }
};

export const deleteSpawn = async (req: Request<SpawnParams>, res: Response) => {
  try {
    await prisma.map.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Spawn not found or deletion failed" });
  }
};
