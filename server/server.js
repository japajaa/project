const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 4000
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

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))