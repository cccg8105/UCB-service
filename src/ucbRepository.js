var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
const { ObjectId } = require('mongodb')

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
client.connect()
const ucbCollection = client.db('ucb_db').collection('info_arms')

class UcbRepository {
  async getInfoUcb() {
    return await ucbCollection.findOne({})
  }

  async saveInfoUcb(id, info) {
    if (!id) {
      const resp = await ucbCollection.insertOne({ ucbInfo: info })
      id = resp.insertedId
    } else {
      await ucbCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { ucbInfo: info } }
      )
    }
    return id
  }
}

module.exports = UcbRepository
