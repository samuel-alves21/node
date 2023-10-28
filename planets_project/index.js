const { parse } = require('csv-parse')
const { createReadStream } = require('fs')

const isHabitable = (planet) => {
  return (planet.koi_disposition === 'CONFIRMED' && planet.koi_insol < 1.11 && planet.koi_insol > 0.36 && planet.koi_prad < 1.6)
}

const planets = []

// creating a redable stream of data 
createReadStream(__dirname + '/kepler_data.csv')
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
  })
  .on('end', () => {
    console.log('done!!')
    const habitablePlanets = planets.map((planet) => {
      return planet.kepler_name
    })

    console.log(habitablePlanets)
  })

