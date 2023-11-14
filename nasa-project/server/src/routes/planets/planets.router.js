const expresss = require('express')

const planetsRouter = expresss.Router()

const { httpGetAllPlanets } = require('./planets.controller')

planetsRouter.get('/', httpGetAllPlanets)

module.exports = {
  planetsRouter
}

