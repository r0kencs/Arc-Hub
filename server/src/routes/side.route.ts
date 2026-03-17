import { Router } from "express";
import { getAllSides } from "../controllers/sides.controller";

const router = Router();

router.get("/", getAllSides);
