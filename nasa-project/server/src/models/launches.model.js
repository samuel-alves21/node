const axios = require('axios')

const launchesDatabase = require('./launches.mongo')
const planetsDatabase = require('./planets.mongo')

const DEFAULT_FLIGHT_NUMBER = 100

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'

async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            customers: 1
          }
        }
      ]
    }
  })

  const launchDocs = response.data.docs
  launchDocs.forEach(async (launchDoc) => {

    const payloads = launchDoc.payloads
    const customers = payloads.flatMap((payload) => {
      return payload.customers
    })

    const launch = {
      flightNumber: launchDoc.flight_number,
      mission: launchDoc.name,
      rocket: launchDoc.rocket.name,
      launchDate: launchDoc.date_local,
      upcoming: launchDoc.upcoming,
      success: launchDoc.success,
      customers: customers,
    }

    console.log(`${launch.flightNumber} ${launch.mission} ${launch.rocket}`)

    await saveLaunch(launch)

    if (response.status !== 200) {
      console.log('Problem downloading launch data')
      throw new Error('Launch data download failed')
    }
  })
}

async function findLaunch(filter) {
  return await launchesDatabase.findOne(filter)
}

async function LoadLaunchData() {
  const launch = await findLaunch({
    flightNumber: 1,
    rocket: 'Falcon 1',
    mission: 'FalconSat'
  })

  if (launch) {
    console.log('Launch data already loaded')
  } else {
    await populateLaunches()
  }
}

async function saveLaunch(launch) {
  await launchesDatabase.findOneAndUpdate({
    flightNumber: launch.flightNumber
  }, launch, {
    upsert: true
  })
}

async function getlatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber')

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER
  }

  return latestLaunch.flightNumber
}

async function getAllLaunches(skip, limit) {
  return await launchesDatabase.find({}, {
    '_id': 0,
    '__v': 0
  }).sort({ flightNumber: 1 }).skip(skip).limit(limit)
}

async function scheduleNewLaunch(launch) {
  const planet = await planetsDatabase.findOne({
    keplerName: launch.target
  })

  if (!planet) {
    throw new Error('No matching planet found')
  }

  const newFlightNumber = await getlatestFlightNumber() + 1

  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ['Zero to Mastery', 'NASA'],
    flightNumber: newFlightNumber,
  })

  await saveLaunch(newLaunch)
}

async function launchExists(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  })
}

async function abortLaunchById(launchId) {
  const abortedLaunch = await launchesDatabase.updateOne({
    flightNumber: launchId
  }, {
    success: false,
    upcoming: false,
  })
  
  return abortedLaunch.modifiedCount === 1 && abortedLaunch.matchedCount === 1
}

module.exports = {
  LoadLaunchData,
  getAllLaunches,
  scheduleNewLaunch,
  launchExists,
  abortLaunchById
}