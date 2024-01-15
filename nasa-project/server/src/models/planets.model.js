const { createReadStream } = require('fs')
const path = require('path')

const { parse } = require('csv-parse')

const planets = require('./planets.mongo')

const isHabitable = (planet) => {
  return (planet.koi_disposition === 'CONFIRMED' && planet.koi_insol < 1.11 && planet.koi_insol > 0.36 && planet.koi_prad < 1.6)
}

const loadPLanetsData = () => {
  return new Promise(((resolve, reject) => {
    // creating a redable stream of data 
    createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
    //piping the stream into the parsing fn 
    .pipe(parse({
      comment: '#',
      columns: true
    }))
    .on('data', async (data) => {
      if (isHabitable(data)) {
        await savePlanet(data)
      }
    })
    .on('error', (error) => {
      console.log(error)
      reject(error)
    })
    .on('end', async () => {
      const countHabitablePlanets = await getAllPlanets() 
      console.log(`${countHabitablePlanets.length} habitable planets found!`)
      resolve()
    })
  }))
}

async function getAllPlanets () {
  return await planets.find({}, {
    '__v': 0,
    '_id': 0,
  })
}

async function savePlanet (planet) {
  try {
    planets.updateOne({
      keplerName: planet.kepler_name,
    }, {
      keplerName: planet.kepler_name,
    }, {
      upsert: true,
    })
  } catch (error) {
    console.error(`Could not save planet ${error}`)
  } 
}
 
module.exports = { 
  loadPLanetsData,
  getAllPlanets
}
