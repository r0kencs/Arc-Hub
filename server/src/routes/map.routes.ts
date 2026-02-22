import { Router } from "express";
import {
  createMap,
  getAllMaps,
  getMapById,
} from "../controllers/maps.controller";

const router = Router();

router.post("/", createMap);
router.get("/", getAllMaps);
router.get("/:id", getMapById);

export default router;
