const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const usersRoutes = require('./routes/users')
const handleError = require('./utils/middlewares/handleError')

app.use(bodyParser.json())

usersRoutes(app)

app.use(handleError)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
