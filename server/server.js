const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 4000

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
 
// GET /api/users gets JSON bodies
app.get('/api/test', jsonParser, (req, res) => {
  // create user in req.body
  console.log('in test endpoint')
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))

})

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))