require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = process.env.PORT || 4000
const recipesResource = require('./resources/recipes.resource')
const hslService = require('./services/hsl.service')

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
 
// GET /api/recipes returns all recipes
app.get('/api/recipes', jsonParser, async (req, res) => {

const allRecipes = await recipesResource.readRecipes();

  res.setHeader('Content-Type', 'application/json')
  res.send(allRecipes)
})

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


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))