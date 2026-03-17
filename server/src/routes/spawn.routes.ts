import { Router } from "express";
import {
  createSpawn,
  deleteSpawn,
  getAllSpawns,
  getSpawn,
  updateSpawn,
} from "../controllers/spawns.controller";

const router = Router();

router.post("/", createSpawn);
router.get("/", getAllSpawns);
router.get("/:id", getSpawn);
router.put("/:id", updateSpawn);
router.delete("/:id", deleteSpawn);

export default router;
