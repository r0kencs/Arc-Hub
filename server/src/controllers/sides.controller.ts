import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllSides = async (req: Request, res: Response) => {
  try {
    const sides = await prisma.side.findMany();
    res.status(200).json(sides);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
