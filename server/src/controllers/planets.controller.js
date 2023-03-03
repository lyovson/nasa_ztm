import { habitablePlanets as planets } from "../models/planets.model.js";

function getPlanets(req, res) {
  return res.status(200).json(planets);
}

export { getPlanets };
