const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 8080
const usersRoutes = require('./routes/users')
const handleError = require('./utils/middlewares/handleError')

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../client/build')))

usersRoutes(app)

app.use(handleError)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
