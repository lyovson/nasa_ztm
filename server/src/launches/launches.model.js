import { launches } from "./launches.mongo.js";

import { planets } from "../planets/planets.mongo.js";

async function getLatestFlightNumber() {
  const latestLaunch = await launches.findOne().sort("-flightNumber");
  if (!latestLaunch) {
    return 0;
  }
  return latestLaunch.flightNumber;
}
async function findLaunch(filter) {
  return await launches.findOne(filter);
}

async function setLaunch(launch) {
  try {
    await launches.findOneAndUpdate(
      {
        flightNumber: launch.flightNumber,
      },
      launch,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}`);
  }
}

export async function isScheduledLaunch(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

export async function getAllLaunches() {
  return await launches.find({}, { _id: 0, __v: 0 });
}

export async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
  });

  await setLaunch(newLaunch);
  return newLaunch;
}

export async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}
