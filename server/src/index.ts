import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import mapRoutes from "./routes/map.routes";
import sideRoutes from "./routes/side.routes";
import utilityTypeRoutes from "./routes/utilityType.routes";
import throwTechniqueRoutes from "./routes/throwTechnique.routes";
import spawnRoutes from "./routes/spawn.routes";
import lineupRoutes from "./routes/lineup.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/maps", mapRoutes);
app.use("/api/sides", sideRoutes);
app.use("/api/utilityTypes", utilityTypeRoutes);
app.use("/api/throwTechniques", throwTechniqueRoutes);
app.use("/api/spawns", spawnRoutes);
app.use("/api/lineups", lineupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
