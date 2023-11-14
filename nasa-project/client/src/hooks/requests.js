const API_URL = 'http://localhost:5000'

async function httpGetPlanets() {
  const planets = await fetch(`${API_URL}/planets`).then((res) => res.json());
  return planets
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const launches = await fetch(`${API_URL}/launches`).then((res) => res.json());
  return launches.sort((a, b) => a.flightNumber - b.flightNumber )
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.

  try {
    console.log(launch)
    return await fetch(`${API_URL}/launches`, {
      method: 'post', 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    })
  } catch (error) {
    console.log(error)
    return { 
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};