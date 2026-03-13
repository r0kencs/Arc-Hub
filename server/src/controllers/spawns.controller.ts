import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllSpawns = async (req: Request, res: Response) => {
  try {
    const spawns = await prisma.spawn.findMany();
    res.status(200).json(spawns);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
