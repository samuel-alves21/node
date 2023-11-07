const expresss = require('express')

const planetsRouter = expresss.Router()

const { getAllPlanets } = require('./planets.controller')

planetsRouter.get('/', getAllPlanets)

module.exports = {
  planetsRouter
}

