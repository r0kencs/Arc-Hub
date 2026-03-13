import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Create a new spawn
export const createSpawn = async (req: Request, res: Response) => {
  try {
    const { name, mapId, sideId, x, y, z, pitch, yaw } = req.body;

    // We use 'connect' to link to existing Map and Side records
    const newSpawn = await prisma.spawn.create({
      data: {
        name,
        x,
        y,
        z,
        pitch,
        yaw,
        map: { connect: { id: mapId } },
        side: { connect: { id: sideId } },
      },
      include: { map: true, side: true }, // Optional: returns the related objects in the response
    });

    res.status(201).json(newSpawn);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create spawn. Check if mapId/sideId are valid.",
    });
  }
};

// Update an existing spawn
export const updateSpawn = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string }; // id is a String (cuid)
    const { name, mapId, sideId, x, y, z, pitch, yaw } = req.body;

    const updatedSpawn = await prisma.spawn.update({
      where: { id },
      data: {
        name,
        x,
        y,
        z,
        pitch,
        yaw,
        // Only update relations if they are provided in the request
        ...(mapId && { map: { connect: { id: mapId } } }),
        ...(sideId && { side: { connect: { id: sideId } } }),
      },
    });

    res.status(200).json(updatedSpawn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Update failed. Spawn ID may not exist." });
  }
};

export const getAllSpawns = async (req: Request, res: Response) => {
  try {
    const spawns = await prisma.spawn.findMany();
    res.status(200).json(spawns);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
