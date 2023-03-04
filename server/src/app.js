import fs from "fs";
import url from "url";
import path from "path";
import morgan from "morgan";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//a way to get the current directory in esm
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

//importing routers
import { planetsRouter } from "./routes/planets.router.js";
import { launchesRouter } from "./routes/launches.router.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs", "access.log"),
  {
    flags: "a",
  }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);

// Serving react app
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

export default app;
