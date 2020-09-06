function validationHandler (schema, check = 'body', value = null) {
  return (req, res, next) => {
    const toValidate = req[check]
    const { error } = value ? schema.validate(toValidate[value]) : schema.validate(toValidate)

    if (error) {
      error.validationError = true
      next(error)
    }

    next()
  }
}

module.exports = validationHandler
