import { Router } from "express";
import {
  createSpawn,
  getAllSpawns,
  updateSpawn,
} from "../controllers/spawns.controller";

const router = Router();

router.post("/", createSpawn);
router.put("/:id", updateSpawn);
router.get("/", getAllSpawns);

export default router;
