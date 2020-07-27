import Yenv from 'yenv'
import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

const env = new Yenv()
const client = new MongoClient(env.DB_SERVER.URL_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

client.connect()
const ucbCollection = client
  .db(env.DB_SERVER.DATABASE)
  .collection(env.DB_SERVER.COLLECTION)

class UcbRepository {
  async getInfoUcb() {
    try {
      return await ucbCollection.findOne({})
    } catch (err) {
      console.log(err)
    }
  }

  async saveInfoUcb(id, info) {
    try {
      if (!id) {
        const resp = await ucbCollection.insertOne({ ucbInfo: info })
        id = resp.insertedId
      } else {
        await ucbCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: { ucbInfo: info } }
        )
      }
    } catch (err) {
      console.log(err)
    }

    return id
  }
}

export default UcbRepository
