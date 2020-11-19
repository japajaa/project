const fetch = require('node-fetch');

let cachedStops;
let cachedRoutes;

const getStops = async (query) => {

    if (!cachedStops) {
        console.log('no cached stops, going to fetch from HSL')
    try {
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'post',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json'  }
          })
          cachedStops = (await response.json()).data.stops;
        return cachedStops
    } catch (e) {
        console.log(e)
        return {error: e}
    }
}

console.log(`${cachedStops.length} stops found from cache, no need to query again!`)

return cachedStops;
}

const getRoutes = async (query) => {

    if (!cachedRoutes) {
        console.log('no cached routes, going to fetch from HSL')
    try {
        const response = await fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            method: 'post',
            body: JSON.stringify(query),
            headers: { 'Content-Type': 'application/json'  }
          })
          cachedRoutes = (await response.json()).data.routes;
        return cachedRoutes
    } catch (e) {
        console.log(e)
        return {error: e}
    }
}

console.log(`${cachedRoutes.length} routes found from cache, no need to query again!`)

return cachedRoutes;
}

exports.getStops = getStops;
exports.getRoutes = getRoutes;