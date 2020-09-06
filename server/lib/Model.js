const { MongoClient, ObjectId } = require('mongodb')
const { dbHost, dbPort, dbName } = require('../config')

const mongoURI = `mongodb://${dbHost}:${dbPort}/${dbName}`

class Model {
  constructor (collection) {
    this.client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    this.dbName = dbName
    this.collection = collection
    this.db = null
    this.connect()
  }

  connect () {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) return reject(error)

        console.log('MongoDB connected successfully')
        const connection = this.client.db(this.dbName).collection(this.collection)
        this.db = connection
        resolve(connection)
      })
    })
  }

  async get (query) {
    const result = await this.db.find(query).toArray()
    return result
  }

  async create (data) {
    const inserted = await this.db.insertOne(data)
    return inserted.insertedId
  }

  async update (id, data) {
    const updated = await this.db.updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    return updated.upsertedId || id
  }

  async delete (id) {
    await this.db.deleteOne({ _id: ObjectId(id) })
    return id
  }
}

module.exports = Model
