const joi = require('joi')

const ObjectIdSchema = joi.string().regex(new RegExp(/^\w{24}$/))

module.exports = ObjectIdSchema
