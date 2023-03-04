import express from "express";
import { httpGetAllPlanets } from "../controllers/planets.controller.js";

export const planetsRouter = express.Router();

planetsRouter.get("/", httpGetAllPlanets);
