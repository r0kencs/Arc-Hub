import { Router } from "express";
import { getAllSpawns } from "../controllers/spawns.controller";

const router = Router();

//router.post("/", createSpawn);
router.get("/", getAllSpawns);

export default router;
