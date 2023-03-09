import {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  isScheduledLaunch,
} from "./launches.model.js";

export async function httpGetAllLaunches(_, res) {
  const launches = await getAllLaunches();
  return res.status(200).json(launches);
}

export async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.launchDate ||
    !launch.mission ||
    !launch.rocket ||
    !launch.target
  ) {
    return res.status(400).json({ error: "Missing required launch property" });
  }

  launch.launchDate = new Date(launch.launchDate);

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" });
  }

  const scheduledLaunch = await scheduleNewLaunch(launch);
  return res.status(201).json(scheduledLaunch);
}

export async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!isScheduledLaunch(launchId)) {
    return res.status(404).json({ error: "launch not found" });
  }

  const abortedLaunch = await abortLaunchById(launchId);

  if (!abortedLaunch) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({ ok: true });
}
