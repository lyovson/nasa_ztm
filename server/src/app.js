import url from "url";
import path from "path";
import morgan from "morgan";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import planetsRouter from "./routes/planets.router.js";
import launchesRouter from "./routes/launches.router.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetsRouter);
app.use(launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
export default app;
