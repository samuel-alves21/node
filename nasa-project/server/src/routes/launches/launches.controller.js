const { getAllLaunches, addNewLaunch } = require('../../models/launches.model') 

function httpGetAllLaunches(req, res) {
  res.status(200).json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
  const launch = req.body
  console.log(launch)
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

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch
}