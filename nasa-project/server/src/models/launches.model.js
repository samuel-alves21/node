// const launches = require('./launches.mongo')

const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: 'Kepler Exploration X',
  rocket: 'Explorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customers: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch)

function getAllLaunches() {
  return Array.from(launches.values())
}

function addNewLaunch(launch) {
  latestFlightNumber++
  launches.set(latestFlightNumber, Object.assign(launch, {
    upcoming: true,
    success: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: latestFlightNumber
  }))
} 

function launchExists(launchId) {
  console.log(launches.has(launchId))
  console.log(launches)
  return launches.has(launchId)
}

function abortLaunchById(launchId) {
  const abortedLaunch = launches.get(launchId)
  abortedLaunch.upcoming = false
  abortedLaunch.success = false
  return abortedLaunch
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  launchExists,
  abortLaunchById
}