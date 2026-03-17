import { Router } from "express";
import {
  createLineup,
  deleteLineup,
  getAllLineups,
  getLineup,
  updateLineup,
} from "../controllers/lineups.controller";

const router = Router();

router.post("/", createLineup);
router.get("/", getAllLineups);
router.get("/:id", getLineup);
router.put("/:id", updateLineup);
router.delete("/:id", deleteLineup);

export default router;
