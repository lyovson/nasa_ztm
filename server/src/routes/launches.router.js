import express from "express";
import { getLaunches } from "../controllers/launches.controller.js";

const launchesRouter = express.Router();

launchesRouter.get("/launches", getLaunches);

export default launchesRouter;
