import Yenv from 'yenv'
import { MongoClient, ObjectId } from 'mongodb'

const env = new Yenv()

export default class {
  getConnect() {
    if (!this.client) {
      this.client = new MongoClient(
        `mongodb://${env.DB_SERVER.SERVER_NAME}:${env.DB_SERVER.PORT}`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )

      this.client.connect()
    }
    return this.client
      .db(env.DB_SERVER.DATABASE)
      .collection(env.DB_SERVER.COLLECTION)
  }

  async getInfoUcb() {
    try {
      return await this.getConnect().findOne({})
    } catch (err) {
      console.log(err)
    }
  }

  async saveInfoUcb(id, info) {
    try {
      if (!id) {
        const resp = await this.getConnect().insertOne({ ucbInfo: info })
        id = resp.insertedId
      } else {
        await this.getConnect().updateOne(
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
