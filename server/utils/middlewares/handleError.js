function handleError (err, req, res, next) {
  console.log(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  if (err.validationError) {
    return res.status(500).send({ error: err.message })
  }

  res.status(500).send({ error: 'Something went wrong!' })
}

module.exports = handleError
