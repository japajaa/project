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

// GET /api/departures returns list of bus/train departures
app.get('/api/departures', jsonParser, async (req, res) => {

  const departures = await hslService.getDepartures();

  res.setHeader('Content-Type', 'application/json')
  res.send(departures)
})

// POST /api/stops allows sending queries to HSL API
app.post('/api/stops', jsonParser, async (req, res) => {

  const stops = await hslService.getStops(req.body);

  res.setHeader('Content-Type', 'application/json')
  res.send(stops)
})


// POST /api/routes allows sending queries to HSL API
app.post('/api/routes', jsonParser, async (req, res) => {

  const routes = await hslService.getRoutes(req.body);

  res.setHeader('Content-Type', 'application/json')
  res.send(routes)
})


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))