const { createReadStream } = require('fs')
const path = require('path')

const { parse } = require('csv-parse')

const isHabitable = (planet) => {
  return (planet.koi_disposition === 'CONFIRMED' && planet.koi_insol < 1.11 && planet.koi_insol > 0.36 && planet.koi_prad < 1.6)
}

const planets = []

const loadPLanetsData = () => {
  return new Promise(((resolve, reject) => {
    // creating a redable stream of data 
    createReadStream(path.join(__dirname, '..', 'data', 'kepler_data.csv'))
    //piping the stream into the parsing fn 
    .pipe(parse({
      comment: '#',
      columns: true
    }))
    .on('data', (data) => {
      if (isHabitable(data)) planets.push(data)
    })
    .on('error', (error) => {
      console.log(error)
      reject(error)
    })
    .on('end', () => {
      const habitablePlanets = planets.map((planet) => {
        return planet.kepler_name
      })
      console.log(`${habitablePlanets.length} habitable planets found!`)
      resolve()
    })
  }))
}

function getAllPlanets() {
  return planets
}

module.exports = { 
  loadPLanetsData,
  getAllPlanets
}
