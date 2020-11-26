const fetch = require('node-fetch');

let cachedStops = [];
let cachedRoutes = [];

const initialize = async (query) => {

try {
    const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
        method: 'post',
        body: JSON.stringify(query),
        headers: { 'Content-Type': 'application/json'  }
      })
      result = (await response.json());
      return result
} catch (e) {
    return {error: e}
}
}

const doInitialize = async () =>{

    console.log('Initializing stops...')
    const stopResponse = await initialize({ query: '{stops {id gtfsId code name routes {id}}}'});
    if (stopResponse.data.stops) {
        cachedStops = stopResponse.data.stops
        console.log(`Initialized cachedStops with ${cachedStops.length} stops found from HSL API!`)
    }
    else {console.log('failed initializing stops', response.error || 'something went wrong...')}

    console.log('Initializing routes...')
    const routesResponse = await initialize({ query: '{routes {id longName shortName}}'});
    if (routesResponse.data.routes) {
        cachedRoutes = routesResponse.data.routes
        console.log(`Initialized cachedRoutes with ${cachedRoutes.length} routes found from HSL API!`)
}
else {console.log('failed initializing routes', response.error || 'something went wrong...')}
}

doInitialize();

const getStops = async (stopId) => {

    if (stopId) {
console.log('going to find', stopId)
const match = cachedStops.find(stop => stop.id === stopId)
return match || null
    }

return cachedStops;
}

const getRoutes = async (routeId) => {

    if (routeId) {
        console.log('going to find', routeId)
        const match = cachedRoutes.find(route => route.id === routeId)
        return match || null
            }

return cachedRoutes;
}

const getDepartures = async (stopIdArray, routeIdArray) => {

    console.log(stopIdArray)
    const query = 
    { query: `{stops(ids: [${stopIdArray.map(stopId => `"${stopId}"`)}]) { gtfsId name stoptimesWithoutPatterns(timeRange: 1800, numberOfDepartures: 20) {
          scheduledArrival
          realtimeArrival
          arrivalDelay
          scheduledDeparture
          realtimeDeparture
          departureDelay
          realtime
          realtimeState
          serviceDay
          headsign
          trip {
            route {
              shortName
              gtfsId
            }
          }
        }
      }}}
    `}

    console.log(query)

    try {
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'post',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json'  }
          })
          result = (await response.json());
          return result
    } catch (e) {
        return {error: e}
    }   
}

exports.getStops = getStops;
exports.getRoutes = getRoutes;
exports.getDepartures = getDepartures;