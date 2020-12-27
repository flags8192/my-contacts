const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(express.static(__dirname + '/uploaded'))

require('./database')

app.use(cors())
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
// app.use(express.json({extended: true}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/', function (request, response) {
  return response.send('Hello from API')
})

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/contacts', require('./routes/contacts.routes'))

const port = 5000

app.listen(port, () => {
  console.log('Server is running... on port ' + port)
})
