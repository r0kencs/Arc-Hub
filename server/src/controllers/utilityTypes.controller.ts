import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const getAllUtilityTypes = async (req: Request, res: Response) => {
  try {
    const utilityTypes = await prisma.utilityType.findMany();
    res.status(200).json(utilityTypes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
