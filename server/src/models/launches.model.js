import { launches } from "../../data/launches.js";

const testLaunch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

let latestFlightNumber = 100;

function setLaunch(number, launch) {
  launches.set(number, launch);
  return launch;
}

setLaunch(testLaunch.flightNumber, testLaunch);

export function getAllLaunches() {
  return Array.from(launches.values());
}

export function addNewLaunch(launch) {
  latestFlightNumber++;
  return setLaunch(
    latestFlightNumber,
    Object.assign(launch, {
      flightNumber: latestFlightNumber,
      customers: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

export function abortLaunch(id) {
  const aborted = launches.get(id);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

export function scheduledLaunch(id) {
  return launches.has(id);
}
