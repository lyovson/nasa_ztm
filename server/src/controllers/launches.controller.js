import {
  getAllLaunches,
  addNewLaunch,
  abortLaunch,
  scheduledLaunch,
} from "../models/launches.model.js";

export function httpGetAllLaunches(_, res) {
  return res.status(200).json(getAllLaunches());
}

export function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({ error: "wrong data" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "wrong date" });
  }

  const addedLaunch = addNewLaunch(launch);
  return res.status(200).json(addedLaunch);
}

export function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!scheduledLaunch(launchId)) {
    return res.status(400).json({ error: "launch not found" });
  }

  const abortedLaunch = abortLaunch(launchId);
  return res.status(200).json(abortedLaunch);
}
