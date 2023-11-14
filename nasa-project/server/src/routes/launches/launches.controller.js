const { getAllLaunches, addNewLaunch, abortLaunchById, launchExists } = require('../../models/launches.model') 

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
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

  addNewLaunch(req.body)
  return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)
  if (!launchExists(launchId)) {
    return res.status(404).json({
      error: 'Launch not found'
    })
  }

  return res.status(200).json(abortLaunchById(launchId))
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch
}