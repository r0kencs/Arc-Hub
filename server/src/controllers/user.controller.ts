import { PrismaClient } from "@prisma/client/extension";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Prisma automatically knows 'users' has an email, name, etc.
    const users = await prisma.user.findMany({
      include: { posts: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    // You can check for specific Prisma error codes here (e.g., P2002 for unique constraint)
    res.status(400).json({ error: "User already exists or invalid data" });
  }
};
