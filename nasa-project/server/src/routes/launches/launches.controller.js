const { getAllLaunches, scheduleNewLaunch, abortLaunchById, launchExists } = require('../../models/launches.model') 

async function httpGetAllLaunches(req, res) {
  res.status(200).json(await getAllLaunches())
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body
  launch.launchDate = new Date(launch.launchDate)

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: 'Missing required launch property'
    })
  }

  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Invalid launch date'
    })
  }
  console.log(launch)
  await scheduleNewLaunch(req.body)
  console.log(launch)
  return res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)

  const hasLaunch = await launchExists(launchId)

  if (!hasLaunch) {
    return res.status(404).json({
      error: 'Launch not found'
    })
  }

  const abortedLaunch = await abortLaunchById(launchId)
  
  if (!abortedLaunch) {
    return res.status(404).json({
      error: 'Launch not aborted'
    })
  }

  return res.status(200).json({
    ok: true
  })
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}