import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllMaps = async (req: Request, res: Response) => {
  try {
    const maps = await prisma.map.findMany();
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createMap = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;

    const newMap = await prisma.map.create({
      data: {
        id,
        name,
      },
    });

    res.status(201).json(newMap);
  } catch (error) {
    res.status(400).json({ error: "Map already exists or invalid data" });
  }
};

export const getMapById = async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };

  try {
    const map = await prisma.map.findUnique({
      where: { id },
    });

    if (!map) {
      return res.status(404).json({ error: "Map not found" });
    }

    res.status(200).json(map);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
