import { Router } from "express";
import { getAllThrowTechniques } from "../controllers/throwTechniques.controller";

const router = Router();

router.get("/", getAllThrowTechniques);
