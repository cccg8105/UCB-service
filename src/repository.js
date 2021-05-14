import Yenv from 'yenv'
import { MongoClient } from 'mongodb'
import { ObjectId } from 'mongodb'

const env = new Yenv()

/**
 * Clase encargada de interactuar con MongoDB
 */
class Repository {
  /**
   * Realiza la conexión con el servidor de BD
   * @returns {MongoClient} Cliente mongoDB
   */
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

  /**
   * Obtiene el registro con la información de estimadores UCB
   * @returns {Object} Objeto json con los datos guardados del UCB
   */
  async getInfoUcb() {
    try {
      return await this.getConnect().findOne({})
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Guarda los indicadores del UCB en BD
   * @param {String} id Identificador único del registro
   * @param {Object} info Objeto json con la información a guardar
   * @returns {void}
   */
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

export { Repository }
