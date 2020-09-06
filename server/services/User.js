const Model = require('../lib/Model')

class User {
  constructor () {
    this.db = new Model('users')
  }

  async get (query) {
    const users = await this.db.get(query)
    return users || []
  }

  async create (user) {
    const userId = await this.db.create(user)
    return userId
  }

  async update (id, user) {
    const userId = await this.db.update(id, user)
    return userId
  }

  async delete (id) {
    const userId = await this.db.delete(id)
    return userId
  }
}

module.exports = User
