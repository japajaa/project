require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const https = require('https');
const geolib = require('geolib');
const fs = require('fs');
const apiPort = process.env.PORT || 4000
// const recipesResource = require('./resources/recipes.resource')
const hslService = require('./services/hsl.service');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', urlencodedParser, (req, res) => {
  res.send('Hello World!')
})
/*
// GET /api/recipes returns all recipes
app.get('/api/recipes', jsonParser, async (req, res) => {

const allRecipes = await recipesResource.readRecipes();

  res.setHeader('Content-Type', 'application/json')
  res.send(allRecipes)
})
*/
// POST /api/departures returns list of departures for chosen routes at chosen stops
app.get('/api/departures', jsonParser, async (req, res) => {

  let stop = req.query.stop;
  let route = req.query.route;

  if (!stop) {
    res.status(400).send('You need to query for one or more stops')
  }

  const stopArray = [].concat(stop)

  const departures = await hslService.getDepartures(stopArray, route);

  res.setHeader('Content-Type', 'application/json')
  res.send(departures)
})

// GET /api/alerts gets all alerts from HSL API.
app.get('/api/alerts', jsonParser, async (req, res) => {

  const alerts = await hslService.getAlerts();

  res.setHeader('Content-Type', 'application/json')
  res.send(alerts)
})




// GET /api/stops gets all (cached) Stops. Can be filtered by name startsWith.
app.get('/api/stops', jsonParser, async (req, res) => {

  const stops = await hslService.getStops();

  let name = req.query.name;

  res.setHeader('Content-Type', 'application/json')
  res.send(name ? stops.filter(stop => stop.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) : stops)
})

// GET /api/stops:id gets single (cached) Stop 
app.get('/api/stops/:stopId', jsonParser, async (req, res) => {

  const stop = await hslService.getStops(req.params.stopId);

  res.setHeader('Content-Type', 'application/json')
  res.send(stop)
})

// GET /api/routes gets all (cached) Routes. Can be filtered by name startsWith.
app.get('/api/routes', jsonParser, async (req, res) => {

  const routes = await hslService.getRoutes();

  let name = req.query.name;

  res.setHeader('Content-Type', 'application/json')
  res.send(name ? routes.filter(route => route.longName.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) : routes)
})

// GET /api/route:id gets single (cached) Route by id 
app.get('/api/routes/:routeId', jsonParser, async (req, res) => {

  const route = await hslService.getRoutes(req.params.routeId);

  res.setHeader('Content-Type', 'application/json')
  res.send(route)
})


// POST /api/rogainingRoute returns calculated route to frontend.
app.post('/api/rogainingRoute', jsonParser, async (req, res) => {

  let counter = 0;

  const {points, velocity, timeLimit, randomFactor} = req.body

  const maxDistance = (parseFloat(velocity) * (1 - (parseFloat(randomFactor) / 100))) * parseFloat(timeLimit) * 1000

  const startPoint = points.find((point) => point.start)
  const endPoint = points.find((point) => point.end)

  const updatedPoints = []
  for (let i = 0; i < points.length; i++) {
    updatedPoints.push({...points[i], distanceToGoal: geolib.getDistance({ latitude: points[i].coordinates[0], longitude: points[i].coordinates[1]}, { latitude: endPoint.coordinates[0], longitude: endPoint.coordinates[1]})})
  }
  
  let calculatedRoutes = [];

  const addLocationToRoute = (routeLength, routePoints, routeLocations, pointToAdd) => {
    const newLength = routeLength + geolib.getDistance({ latitude: pointToAdd.coordinates[0], longitude: pointToAdd.coordinates[1]}, { latitude: routeLocations[routeLocations.length - 1].coordinates[0], longitude: routeLocations[routeLocations.length - 1].coordinates[1]})
 

    if ((newLength + pointToAdd.distanceToGoal) <= maxDistance) {
      routeLength = newLength;
      routePoints = routePoints + parseFloat(pointToAdd.pointValue)
      routeLocations = [...routeLocations, pointToAdd]
      return { routePoints, routeLength, routeLocations }
    }
  }

  const loopLocations = (locationsArray, initialRouteLength, initialRoutePoints, initialRouteLocations, initialDistanceToGoal) => {
    counter = counter + 1
    if (counter % 1000 === 0) console.log('loopLocations counter: ', counter)

// create a shortlist of x locations with best points/meters ratio
const shortListLength = 2
const coordsOfLastPoint = initialRouteLocations[initialRouteLocations.length - 1].coordinates

const shortList = locationsArray.sort((a, b) => (b.pointValue / geolib.getDistance({ latitude: b.coordinates[0], longitude: b.coordinates[1]}, { latitude: coordsOfLastPoint[0], longitude: coordsOfLastPoint[1]})) - (a.pointValue / geolib.getDistance({ latitude: a.coordinates[0], longitude: a.coordinates[1]}, { latitude: coordsOfLastPoint[0], longitude: coordsOfLastPoint[1]}))).slice(0,shortListLength);

for (let i = 0; i < shortList.length; i++) {
  let routeLength = initialRouteLength;
  let routePoints = initialRoutePoints;
  let routeLocations = initialRouteLocations

  const newRoute = addLocationToRoute(routeLength, routePoints, routeLocations, shortList[i])

  if (newRoute !== undefined) {
    const possibleNewStops = locationsArray.filter(loc => loc.distanceToGoal < maxDistance - newRoute.routeLength && !newRoute.routeLocations.map(l => l.id).includes(loc.id));
    if (possibleNewStops.length === 0) calculatedRoutes = [...calculatedRoutes, {routePoints: newRoute.routePoints, routeLength: newRoute.routeLength + shortList[i].distanceToGoal, routeLocations: [...newRoute.routeLocations, endPoint]}]
    loopLocations(possibleNewStops, newRoute.routeLength, newRoute.routePoints, newRoute.routeLocations, shortList[i].distanceToGoal)
  } else {
    calculatedRoutes = [...calculatedRoutes, {routePoints: initialRoutePoints, routeLength: initialRouteLength + initialDistanceToGoal, routeLocations: [...initialRouteLocations, endPoint]}]
  }
}
  }

  loopLocations(updatedPoints.filter(loc => loc.id !== startPoint.id), 0, 0, [startPoint], startPoint.distanceToGoal)

  const sortedRoutes = calculatedRoutes.sort((a, b) => {if (b.routePoints === a.routePoints) {return a.routeLength - b.routeLength} else {return b.routePoints - a.routePoints}}).slice(0,10);

  const response = {maxDistance, sortedRoutes}
  res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(response, null, 3));
})






const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const sslServer=https.createServer(options,app);
sslServer.listen(apiPort,()=>{
console.log(`Server running on port ${apiPort}`)
})

// app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))