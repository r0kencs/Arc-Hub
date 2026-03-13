import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllSpawns = async (req: Request, res: Response) => {
  try {
    const maps = await prisma.map.findMany();
    res.status(200).json(maps);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
