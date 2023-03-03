import express from "express";
import { getPlanets } from "../controllers/planets.controller.js";

const planetsRouter = express.Router();

planetsRouter.get("/planets", getPlanets);

export default planetsRouter;
