import { Router } from "express";
import { getAllUtilityTypes } from "../controllers/utilityTypes.controller";

const router = Router();

router.get("/", getAllUtilityTypes);

export default router;
