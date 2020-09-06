const joi = require('joi')

const UserSchema = joi.object({
  name: joi.string().max(255).required(),
  age: joi.number().min(1).max(120).required()
})

module.exports = UserSchema
