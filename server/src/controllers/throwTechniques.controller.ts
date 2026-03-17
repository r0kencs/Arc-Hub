import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllThrowTechniques = async (req: Request, res: Response) => {
  try {
    const throwTechniques = await prisma.throwTechnique.findMany();
    res.status(200).json(throwTechniques);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
