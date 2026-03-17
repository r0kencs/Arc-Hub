import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

interface LineupParams {
  id: string;
}

export const createLineup = async (req: Request, res: Response) => {
  try {
    const {
      mapId,
      typeId,
      sideIds,
      techniqueIds,
      mouseClick,
      x,
      y,
      z,
      pitch,
      yaw,
    } = req.body;

    const newLineup = await prisma.lineup.create({
      data: {
        x,
        y,
        z,
        pitch,
        yaw,
        mouseClick,
        map: { connect: { id: mapId } },
        type: { connect: { id: typeId } },
        sides: {
          connect: sideIds.map((id: string) => ({ id })),
        },
        techniques: {
          connect: techniqueIds.map((id: string) => ({ id })),
        },
      },
      include: { map: true, type: true, sides: true, techniques: true },
    });

    res.status(201).json(newLineup);
  } catch (error) {
    res.status(400).json({ error: "Failed to create Lineup" });
  }
};

export const getLineup = async (req: Request<LineupParams>, res: Response) => {
  try {
    const lineup = await prisma.lineup.findUnique({
      where: { id: req.params.id },
      include: { map: true, type: true, sides: true, techniques: true },
    });

    if (!lineup) {
      return res.status(404).json({ error: "Lineup not found" });
    }

    res.status(200).json(lineup);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllLineups = async (req: Request, res: Response) => {
  try {
    const sideIds = req.query.sideIds;
    const techniqueIds = req.query.techniqueIds;

    const formatQuery = (val: any): string[] | undefined => {
      if (!val) return undefined;
      return Array.isArray(val) ? val.map(String) : [String(val)];
    };

    const cleanSideIds = formatQuery(sideIds);
    const cleanTechniqueIds = formatQuery(techniqueIds);

    const lineups = await prisma.lineup.findMany({
      where: {
        mapId: req.query.mapId ? String(req.query.mapId) : undefined,
        typeId: req.query.typeId ? String(req.query.typeId) : undefined,

        ...(cleanSideIds && {
          sides: {
            some: {
              id: { in: cleanSideIds },
            },
          },
        }),

        ...(cleanTechniqueIds && {
          techniques: {
            some: {
              id: { in: cleanTechniqueIds },
            },
          },
        }),
      },
      include: {
        sides: true,
        techniques: true,
        type: true,
      },
    });

    res.status(200).json(lineups);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateLineup = async (
  req: Request<LineupParams>,
  res: Response,
) => {
  try {
    const { sideIds, techniqueIds, ...otherData } = req.body;

    const updatedLineup = await prisma.lineup.update({
      where: { id: req.params.id },
      data: {
        ...otherData,
        ...(sideIds && {
          sides: { set: sideIds.map((id: string) => ({ id })) },
        }),
        ...(techniqueIds && {
          techniques: { set: techniqueIds.map((id: string) => ({ id })) },
        }),
      },
      include: { map: true, type: true, sides: true, techniques: true },
    });

    res.status(200).json(updatedLineup);
  } catch (error) {
    res.status(404).json({ error: "Lineup not found or update failed" });
  }
};

export const deleteLineup = async (
  req: Request<LineupParams>,
  res: Response,
) => {
  try {
    await prisma.lineup.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Lineup not found or deletion failed" });
  }
};
