import { Router } from "express";
import {
  createMap,
  getAllMaps,
  getMapById,
  getMapLineups,
} from "../controllers/maps.controller";

const router = Router();

router.post("/", createMap);
router.get("/", getAllMaps);
router.get("/:id", getMapById);
router.get("/:id/lineups", getMapLineups);

export default router;
