import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import mapRoutes from "./routes/map.routes";
import spawnRoutes from "./routes/spawn.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API is running 🚀" });
});

app.use("/api/maps", mapRoutes);
app.use("/api/spawns", spawnRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
