import { Router } from "express";
import {
  createMap,
  deleteMap,
  getAllMaps,
  getMap,
  updateMap,
} from "../controllers/maps.controller";

const router = Router();

router.post("/", createMap);
router.get("/", getAllMaps);
router.get("/:id", getMap);
router.put("/:id", updateMap);
router.delete("/:id", deleteMap);

export default router;
